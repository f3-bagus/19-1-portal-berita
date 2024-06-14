import moment from 'moment';
import 'moment/loacle/id';

export default {
    install(Vue) {
        moment.locale('id');
        Vue.prototype.$moment = moment;
    },
};