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
                                    <h3> News</h3>
                                    <h1 class="jumlah">10</h1>
                                </div>
                                <!-- <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div> -->
                            </div>      
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-warning text-white mb-4">
                                <div class="card-body d-flex justify-content-between align-items-center">
                                    <h3>User</h3>
                                    <h1 class="jumlah">10</h1>
                                </div>
                                <!-- <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div> -->
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-success text-white mb-4">
                                <div class="card-body d-flex justify-content-between align-items-center">
                                    <h3>Category</h3>
                                    <h1 class="jumlah">10</h1>
                                </div>
                                <!-- <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div> -->
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="card bg-danger text-white mb-4">
                                <div class="card-body d-flex justify-content-between align-items-center">
                                    <h3>Messeges</h3>
                                    <h1 class="jumlah">10</h1>
                                </div>
                                <!-- <div class="card-footer d-flex align-items-center justify-content-between">
                                    <a class="small text-white stretched-link" href="#">View Details</a>
                                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    </AdminLayout>
</template>


<script>
import AdminLayout from "../../components/Admin/AdminLayout.vue";

export default {
    name: "Admin",
    components: {
        AdminLayout,
    },
};
</script>

<style scoped>
.card-body{
    padding: 40px;
}
</style>