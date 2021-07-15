import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';

import '../assets/css/index.css';

import axiosPlugins from './axios';

const plugins = {
	install(Vue) {
		Vue.use(ElementUI, { locale});
		Vue.use(axiosPlugins);
	},
};

export default plugins;
