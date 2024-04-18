// main.js
import { createApp } from 'vue';
import App from './App.vue';
import commonRouter  from './router';
import { createPinia } from 'pinia';
import store from '@/store/index.js';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';


// Create a new Pusher instance
const pusher = new Pusher("7b777ee6756a4d1e3e89", {
    cluster: 'ap1',
    encrypted: true,
  });

// Instantiate Echo with the Pusher instance
const echo = new Echo({
    broadcaster: 'pusher',
    client: pusher, // Pass the Pusher instance
    key: "7b777ee6756a4d1e3e89",
    cluster: 'ap1',
    encrypted: true,
  });
  


const app = createApp(App);
app.use(commonRouter);
app.use(store);
app.use(createPinia());
app.config.globalProperties.$echo = echo; // Make Echo accessible globally
app.mount('#app');
