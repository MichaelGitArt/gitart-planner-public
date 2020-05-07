<template>
  <div>
    <base-page-back route="/myprofile" class="mb-5">
      <h2>Редагування</h2>
    </base-page-back>

    <validation-observer ref="observer" v-slot="{ touched }">
      <v-form @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="4">
            <validation-provider name="Ім'я" rules="required|min:3|max:30" v-slot="{errors}">
              <v-text-field
                :error-messages="mergeErrors('name', errors)"
                color="green"
                v-model="name"
                :counter="30"
                label="Ім'я"
                @input="resetError('name')"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" md="4">
            <validation-provider name="Нік" rules="required|min:5|max:20" v-slot="{errors}">
              <v-text-field
                :error-messages="mergeErrors('slug', errors)"
                v-model="slug"
                :counter="20"
                color="green"
                :loading="slugLoading"
                label="Нік"
                :hint="slugHint"
                @input="resetError('slug'); checkSlug()"
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row class="pt-2" justify="end">
          <v-col cols="12">
            <content-alert v-model="alert.value" :type="alert.type"></content-alert>
          </v-col>
          <v-col cols="auto" class="d-flex flex-wrap justify-end mb-n3">
            <v-btn class="mb-3" color="error" to="/myprofile" v-if="touched">Відмінити</v-btn>
            <v-btn type="submit" class="ml-3 mb-3" color="success" :loading="loading">Зберегти</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </validation-observer>
  </div>
</template>

<script>
import axios from "axios";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ContentAlert from "@/components/General/ContentAlert";

import authService from "@/services/authService";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    ContentAlert
  },
  data: () => ({
    name: "",
    slug: "",
    slugErrors: [],
    slugHint: null,
    slugLoading: false,
    validationErrors: [],
    loading: false,
    alert: {
      type: "success",
      value: ""
    }
  }),
  created() {
    this.name = this.user.name;
    this.slug = this.user.slug;
  },
  methods: {
    submit() {
      this.loading = true;
      this.alert.value = null;

      const updateObj = {
        name: this.name,
        slug: this.slug
      };
      authService
        .updateProfile(this.user.slug, updateObj)
        .then(({ data }) => {
          if (data.success) {
            this.$store.commit("setUser", data.user);
            this.alert.type = "success";
            this.alert.value = "Профіль оновлено!";
          }
        })
        .catch(({ response: { data, status } }) => {
          if (status === 422) {
            this.parseSlugRes(data.slugValidation);

            if (data.errors) {
              this.validationErrors.push(...data.errors);
            }

            this.alert.type = "error";
            this.alert.value =
              "Не вдалося оновини профіль. Перевір поля та спробуй знову";
            return;
          }
          this.alert.type = "error";
          this.alert.value =
            "Щось пішло не так. Спробуй ще або звернись до адміністратора";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    checkSlug() {
      console.log("check...");
      // this.slugErrors = [];
      this.slugHint = null;
      this.$refs.observer.validate().then(valid => {
        if (!valid) return;

        this.slugLoading = true;
        if (this.source) {
          this.source.cancel("Відмінити перевірку");
        }

        this.source = axios.CancelToken.source();

        authService
          .checkFreeSlug(this.slug, this.source)
          .then(({ data }) => {
            this.parseSlugRes(data);
          })
          .catch(err => {
            if (!axios.isCancel(err)) {
              console.log(err);
            }
          })
          .finally(() => {
            this.slugLoading = false;
          });
      });
    },
    parseSlugRes(res) {
      if (res.message && !res.status) {
        // Returned error message
        this.validationErrors.push({
          param: "slug",
          msg: res.message
        });
      } else if (res.message && res.status) {
        //	Returned hint
        this.slugHint = res.message;
      } else {
        // Returne status "false"
        this.slugHint = "Нік вільний";
      }
    },
    resetError(field) {
      this.validationErrors = this.validationErrors.filter(
        err => err.param !== field
      );
    }
  },
  computed: {
    mergeErrors() {
      return (field, errors = []) => {
        let fieldValidationErrors = this.validationErrors.filter(
          err => err.param === field
        );

        fieldValidationErrors = fieldValidationErrors.map(err => err.msg);

        return [...errors, ...fieldValidationErrors];
      };
    }
  }
};
</script>