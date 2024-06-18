<template>
    <AdminLayout>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4 mb-4">Manage Authors</h1>
                    <div class="container-author mb-4">
                        <button variant="primary" class="btn btn-success" @click="showCreateModal = true">
                            Create Author
                        </button>
                        <div class="table-responsive">
                            <table class="table table-light mt-3 table-rounded">
                                <thead>
                                    <tr>
                                        <th scope="col" class="col-no">No</th>
                                        <th scope="col" class="col-username">Username</th>
                                        <th scope="col" class="col-email">Email</th>
                                        <th scope="col" class="col-password">Password</th>
                                        <th scope="col" class="col-role">Role</th>
                                        <th scope="col" class="col-verified">Verified</th>
                                        <th scope="col" class="col-action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(author, index) in authors" :key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ author.username }}</td>
                                        <td>{{ author.email }}</td>
                                        <td>*******</td>
                                        <td>{{ author.role }}</td>
                                        <td>{{ author.status }}</td>
                                        <td class="d-flex gap-3">
                                            <button variant="primary" class="btn btn-info"
                                                @click="toggleVerification(author)">
                                                {{ author.status === 'active' ? 'Unverify' : 'Verify' }}
                                            </button>
                                            <button variant="primary" class="btn btn-warning"
                                                @click="showUpdateModal(author)">
                                                Update
                                            </button>
                                            <button variant="primary" class="btn btn-danger"
                                                @click="deleteAuthor(author.user_id)">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Create Author Modal -->
                <div class="modal" tabindex="-1" v-if="showCreateModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Create Author</h5>
                                <button class="btn btn-danger" @click="showCreateModal = false"><i
                                        class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="createAuthor">
                                    <div class="mb-3">
                                        <label for="username" class="form-label">Username</label>
                                        <input type="text" class="form-control" id="username"
                                            v-model="newAuthor.username" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" v-model="newAuthor.email"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="password"
                                            v-model="newAuthor.password" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="confPassword" class="form-label">Confirm Password</label>
                                        <input type="password" class="form-control" id="confPassword"
                                            v-model="newAuthor.confPassword" required>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Update Author Modal -->
                <div class="modal" tabindex="-1" v-if="showUpdateModalFlag">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Update Author</h5>
                                <button class="btn btn-danger" @click="showUpdateModalFlag = false"><i
                                        class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="updateAuthor">
                                    <div class="mb-3">
                                        <label for="update-username" class="form-label">Username</label>
                                        <input type="text" class="form-control" id="update-username"
                                            v-model="currentAuthor.username" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="update-email"
                                            v-model="currentAuthor.email" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="password"
                                            v-model="currentAuthor.password" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="confPassword" class="form-label">Confirm Password</label>
                                        <input type="password" class="form-control" id="confPassword"
                                            v-model="currentAuthor.confPassword" required>
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
import axios from '../../../services/axios';

export default {
    name: "ManageAuthor",
    components: {
        AdminLayout,
    },
    created() {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            this.$router.push({
                name: 'LandingPage'
            });
        } else {
            this.fetchAuthors();
        }
    },
    data() {
        return {
            showCreateModal: false,
            showUpdateModalFlag: false,
            newAuthor: {
                username: "",
                email: "",
                password: "",
                confPassword: "",
                role: "author",
                status: "pending",
            },
            currentAuthor: null,
            authors: [],
        };
    },
    methods: {
        async fetchAuthors() {
            try {
                const response = await axios.get('users');
                this.authors = response.data.filter(user => user.role === 'author');
            } catch (error) {
                console.error(error);
            }
        },
        async createAuthor() {
            try {
                const response = await axios.post('users', {
                    username: this.newAuthor.username,
                    email: this.newAuthor.email,
                    password: this.newAuthor.password,
                    confPassword: this.newAuthor.confPassword,
                    role: this.newAuthor.role,
                    status: this.newAuthor.status,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.fetchAuthors();
                this.showCreateModal = false;
                alert('Author created successfully');
            } catch (error) {
                console.error(error);
            }
        },

        showUpdateModal(author) {
            this.currentAuthor = {
                ...author,
                password: author.password,
                confPassword: author.password,
            };
            this.showUpdateModalFlag = true;
        },
        async updateAuthor() {
            try {
                const { user_id, username, email, password, confPassword, role } = this.currentAuthor;
                await axios.patch(`users/${user_id}`, {
                    username,
                    email,
                    password,
                    confPassword,
                    role
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.fetchAuthors();
                this.showUpdateModalFlag = false;
                alert('Author updated successfully');
            } catch (error) {
                console.error(error);
            }
        },
        async deleteAuthor(userId) {
            try {
                await axios.delete(`users/${userId}`);
                this.fetchAuthors();
                alert('Author deleted successfully');
            } catch (error) {
                console.error(error);
            }
        },
        async toggleVerification(author) {
            try {
                if (author.status === 'pending') {
                    const response = await axios.post('/validate-author', {
                        user_id: author.user_id
                    });
                    if (response.data.success) {
                        author.status = 'active';
                    } else {
                        alert('Gagal melakukan validasi author');
                    }
                    alert('Author verified successfully');
                } else {
                    alert('Author sudah diverifikasi sebelumnya');
                }
                this.fetchAuthors();
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>
.container-author {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #085487;
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

.col-username {
    width: 15%;
}

.col-email {
    width: 20%;
}

.col-password {
    width: 15%;
}

.col-role {
    width: 10%;
}

.col-verified {
    width: 10%;
}

.col-action {
    width: 20%;
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
