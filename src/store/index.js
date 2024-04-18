import { createApp, Vue } from 'vue';
import { createStore } from 'vuex';
import { loadState, saveState } from './vuex-persist';

// importing modules
import global from '@/store/Global/index.js';
const persistedState = loadState();
export default createStore({
  confirmPopupParams : {
    title : null,
    subtitle : null,
    icon : null,
  },
  modules : {
    global
  },
});