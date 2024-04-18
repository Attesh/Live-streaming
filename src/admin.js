import { createApp } from 'vue';
import store from '@/store/index.js';
import adminRouter  from '@/router/admin';
import AdminApp from '@components/admin/layout/AdminApp.vue';
import GlobalTable from '@components/admin/Core/Table/GlobalTable.vue';
import TableSearch from '@components/admin/Core/TableSearch.vue';

const app = createApp(AdminApp);
app.component("Table",GlobalTable);
app.component("table-search",TableSearch);
app.use(adminRouter);
app.use(store);
app.mount('#admin-app');