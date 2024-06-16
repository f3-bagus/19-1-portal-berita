<template>
    <AdminLayout>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4 mb-4">Manage Categories</h1>
                    <div class="container-category mb-4">
                        <button variant="primary" class="btn btn-success" @click="showCreateModal = true">
                            Create Category
                        </button>
                        <div class="table-responsive">
                            <table class="table table-light mt-3 table-rounded">
                                <thead>
                                    <tr>
                                        <th scope="col" class="col-no">No</th>
                                        <th scope="col" class="col-name">Name</th>
                                        <th scope="col" class="col-action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(category, index) in categories" :key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ category.name }}</td>
                                        <td class="d-flex gap-3">
                                            <button variant="primary" class="btn btn-warning"
                                                @click="showUpdateModal(category)">
                                                Update
                                            </button>
                                            <button variant="primary" class="btn btn-danger"
                                                @click="deleteCategory(index)">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Create Category Modal -->
                <div class="modal" tabindex="-1" v-if="showCreateModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Create Category</h5>
                                <button class="btn btn-danger" @click="showCreateModal = false"><i
                                        class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="createCategory">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="name"
                                            v-model="newCategory.name" required>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Update Category Modal -->
                <div class="modal" tabindex="-1" v-if="showUpdateModalFlag">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Update Category</h5>
                                <button class="btn btn-danger" @click="showUpdateModalFlag = false"><i
                                        class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="updateCategory">
                                    <div class="mb-3">
                                        <label for="update-name" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="update-name"
                                            v-model="currentCategory.name" required>
                                    </div>
                                    <button type="submit" class="btn btn-warning">Update</button>
                                </form>
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
    name: "ManageCategory",
    components: {
        AdminLayout,
    },
    created() {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            this.$router.push({
                name: 'LandingPage'
            });
        }
    },
    data() {
        return {
            showCreateModal: false,
            showUpdateModalFlag: false,
            newCategory: {
                name: "",
            },
            currentCategory: null,
            categories: [{
                    name: "Category 1",
                },
                {
                    name: "Category 2",
                },
                // Add more categories as needed
            ],
        };
    },
    methods: {
        createCategory() {
            this.categories.push({
                ...this.newCategory
            });
            this.showCreateModal = false;
            this.newCategory = {
                name: "",
            };
        },
        showUpdateModal(category) {
            this.currentCategory = {
                ...category
            };
            this.showUpdateModalFlag = true;
        },
        updateCategory() {
            const index = this.categories.findIndex(cat => cat.name === this.currentCategory.name);
            if (index !== -1) {
                this.categories.splice(index, 1, {
                    ...this.currentCategory
                });
            }
            this.showUpdateModalFlag = false;
        },
        deleteCategory(index) {
            this.categories.splice(index, 1);
        },
    },
};
</script>

<style scoped>
.container-category {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    border-radius: 0.5rem;
    background: #085487;
    color: white;
}

.table-rounded {
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 0.5rem;
    overflow: hidden;
}

.table-rounded th,
.table-rounded td {
    border: 1px solid #dee2e6;
}

.col-no {
    width: 5%;
}

.col-name {
    width: 30%;
}

.col-description {
    width: 50%;
}

.col-action {
    width: 15%;
}

.modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
    margin: 1.75rem auto;
}

.modal-content {
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    outline: 0;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem;
    border-bottom: 1px solid #dee2e6;
}

.modal-body {
    position: relative;
    padding: 1rem;
}

.btn-close {
    background-color: #085487;
}
</style>