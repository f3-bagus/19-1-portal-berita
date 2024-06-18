<template>
    <AdminLayout>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Welcome Admin!</h1>
                    <hr>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div class="row">
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-primary text-white mb-4">
                                <div class="card-body d-flex justify-content-between align-items-center">
                                    <h4> News</h4>
                                    <h3 class="jumlah">{{ newsCount }}</h3>
                                </div>
                            </div>      
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-warning text-white mb-4">
                                <div class="card-body d-flex justify-content-between align-items-center">
                                    <h4>User</h4>
                                    <h3 class="jumlah">{{ userCount }}</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-success text-white mb-4">
                                <div class="card-body d-flex justify-content-between align-items-center">
                                    <h4>Category</h4>
                                    <h3 class="jumlah">{{ categoryCount }}</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-danger text-white mb-4">
                                <div class="card-body d-flex justify-content-between align-items-center">
                                    <h4>Messages</h4>
                                    <h3 class="jumlah">{{ messageCount }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </AdminLayout>
</template>

<script>
import axios from '../../../services/axios';
import AdminLayout from "../../components/Admin/AdminLayout.vue";

export default {
    name: "Admin",
    components: {
        AdminLayout,
    },
    data() {
        return {
            newsCount: 0,
            userCount: 0,
            categoryCount: 0,
            messageCount: 0,
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const [newsResponse, usersResponse, categoriesResponse, messagesResponse] = await Promise.all([
                    axios.get('/news'),
                    axios.get('/users'),
                    axios.get('/categories'),
                    axios.get('/admin/contact')
                ]);
                
                this.newsCount = newsResponse.data.length;
                this.userCount = usersResponse.data.length;
                this.categoryCount = categoriesResponse.data.length;
                this.messageCount = messagesResponse.data.length;
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
    }
};
</script>

<style scoped>
.card-body {
    padding: 40px;
}
</style>
