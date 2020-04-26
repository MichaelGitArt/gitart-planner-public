import { localize, extend } from "vee-validate";
import uk from "vee-validate/dist/locale/uk.json";
import { required, max, min } from 'vee-validate/dist/rules';

extend("required", {
	...required
});
extend("min", {
	...min
});
extend("max", {
	...max
});


localize("uk", uk);
localize({
	uk: {
		messages: {
			required: "Поле повинно бути заповнене"
		}
	}
});