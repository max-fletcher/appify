/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');

window.Vue = require('vue')
import router from './router'
import App from './components/App'
import ViewUI from 'view-design';

// Import IView UI plugin for Vue
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

//importing common.js and using it as a mixin so it is available on every vue file(since this file is the entry point)
import common from './common'
Vue.mixin(common)

Vue.component('App', require('./components/App.vue').default)
const app = new Vue({
    el: '#app',
    router,
    components: {
        App
    }
});