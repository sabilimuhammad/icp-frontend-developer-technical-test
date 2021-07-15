import axios from 'axios';
import VueAxios from 'vue-axios';

const axiosPlugins = {
	install(Vue){
		const incenPlus = axios.create({
			baseURL: 'https://test.incenplus.com', 
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept : 'application/json'
			},
		});
		Vue.use(VueAxios, incenPlus);
	}
};

export default axiosPlugins;
