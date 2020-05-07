import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { upperFirst, camelCase } from 'lodash'

import vuetify from './plugins/vuetify';
import userExpration from './plugins/user-expantion';
import '@/utils/VeeValidate.js';

import '@/scss/main.scss';

Vue.config.productionTip = false

Vue.use(userExpration);


const requireComponent = require.context(
	// Относительный путь до каталога компонентов
	'./components/',
	// Обрабатывать или нет подкаталоги
	true,
	// Регулярное выражение для определения файлов базовых компонентов
	/Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
	// Получение конфигурации компонента
	const componentConfig = requireComponent(fileName)

	// Получение имени компонента в PascalCase
	const componentName = upperFirst(
		camelCase(
			// Получаем имя файла независимо от глубины вложенности
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	)

	// Глобальная регистрация компонента
	Vue.component(
		componentName,
		// Поиск опций компонента в `.default`, который будет существовать,
		// если компонент экспортирован с помощью `export default`,
		// иначе будет использован корневой уровень модуля.
		componentConfig.default || componentConfig
	)
})


new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
