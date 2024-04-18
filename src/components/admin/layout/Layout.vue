<template>
    <Header v-if="this.token"></Header>
    <Sidebar v-if="this.token"></Sidebar>
    <router-view></router-view>
    <Footer v-if="this.token"></Footer>
</template>
<script>
import Header from '@components/admin/layout/Header.vue';
import Sidebar from '@components/admin/layout/Sidebar.vue';
import Footer from '@components/admin/layout/Footer.vue';
export default {
    components: {
        Header,
        Sidebar,
        Footer,
    },
    data(){
        return{
            token : null
        }
    },
    created(){
        this.token = localStorage.getItem('admin-token')
        // console.log('token',this.token);
    }
}
</script>