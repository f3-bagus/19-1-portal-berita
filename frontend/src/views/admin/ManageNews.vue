<template>
    <AdminLayout>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4 mb-4">Manage News</h1>
                    <div class="container-news mb-4">
                        <button class="btn btn-success" @click="showCreateModal = true">
                            Create News
                        </button>
                        <div class="table-responsive">
                            <table class="table table-light mt-3 table-rounded">
                                <thead>
                                    <tr>
                                        <th scope="col" class="col-no">No</th>
                                        <th scope="col" class="col-title">Title</th>
                                        <th scope="col" class="col-content">Content</th>
                                        <th scope="col" class="col-category">Category</th>
                                        <th scope="col" class="col-image">Image</th>
                                        <th scope="col" class="col-status">Status</th>
                                        <th scope="col" class="col-action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(news, index) in newsList" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ news.title }}</td>
                                        <td>{{ news.content }}</td>
                                        <td>{{ news.category }}</td>
                                        <td>
                                            <img v-if="news.image" :src="news.image" alt="News Image" class="img-thumbnail" />
                                        </td>
                                        <td>{{ news.status }}</td>
                                        <td class="gap-2">
                                            <div class="d-flex flex-column flex-sm-row gap-2">
                                                <button class="btn btn-warning" @click="showUpdateModal(news)">
                                                    Update
                                                </button>
                                                <button class="btn btn-danger" @click="deleteNews(index)">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Create News Modal -->
                <div class="modal" tabindex="-1" v-if="showCreateModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Create News</h5>
                                <button class="btn btn-danger" @click="showCreateModal = false"><i class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="createNews">
                                    <div class="mb-3">
                                        <label for="title" class="form-label">Title</label>
                                        <input type="text" class="form-control" id="title" v-model="newNews.title" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="content" class="form-label">Content</label>
                                        <textarea class="form-control" id="content" v-model="newNews.content" required></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="category" class="form-label">Category</label>
                                        <select class="form-select" id="category" v-model="newNews.category" required>
                                            <option value="">Select Category</option>
                                            <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="image" class="form-label">Image URL</label>
                                        <input type="text" class="form-control" id="image" v-model="newNews.image">
                                    </div>
                                    <div class="mb-3">
                                        <label for="status" class="form-label">Status</label>
                                        <select class="form-select" id="status" v-model="newNews.status" required>
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-success">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Update News Modal -->
                <div class="modal" tabindex="-1" v-if="showUpdateModalFlag">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Update News</h5>
                                <button class="btn btn-danger" @click="showUpdateModalFlag = false"><i class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="updateNews">
                                    <div class="mb-3">
                                        <label for="update-title" class="form-label">Title</label>
                                        <input type="text" class="form-control" id="update-title" v-model="currentNews.title" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-content" class="form-label">Content</label>
                                        <textarea class="form-control" id="update-content" v-model="currentNews.content" required></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-category" class="form-label">Category</label>
                                        <select class="form-select" id="update-category" v-model="currentNews.category" required>
                                            <option value="">Select Category</option>
                                            <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-image" class="form-label">Image URL</label>
                                        <input type="text" class="form-control" id="update-image" v-model="currentNews.image">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-status" class="form-label">Status</label>
                                        <select class="form-select" id="update-status" v-model="currentNews.status" required>
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
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
    name: "ManageNews",
    components: {
        AdminLayout,
    },
    data() {
        return {
            showCreateModal: false,
            showUpdateModalFlag: false,
            newNews: {
                title: "",
                content: "",
                category: "",
                image: "",
                status: "draft",
            },
            currentNews: null,
            newsList: [
                { title: "News 1", content: "Content 1", category: "Category A", image: "https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200", status: "draft" },
                { title: "News 2", content: "Content 2", category: "Category B", image: "https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200", status: "published" },
                // Add more news items as needed
            ],
            categories: [
                { id: 1, name: "Category A" },
                { id: 2, name: "Category B" },
                // Add more categories as needed
            ],
        };
    },
    methods: {
        createNews() {
            this.newsList.push({ ...this.newNews });
            this.showCreateModal = false;
            this.newNews = {
                title: "",
                content: "",
                category: "",
                image: "",
                status: "draft",
            };
        },
        showUpdateModal(news) {
            this.currentNews = { ...news };
            this.showUpdateModalFlag = true;
        },
        updateNews() {
            const index = this.newsList.findIndex(item => item.title === this.currentNews.title);
            if (index !== -1) {
                this.newsList.splice(index, 1, { ...this.currentNews });
            }
            this.showUpdateModalFlag = false;
        },
        deleteNews(index) {
            this.newsList.splice(index, 1);
        },
    },
};
</script>

<style scoped>
/* Add your scoped styles here */
.container-news {
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

.col-title {
    width: 15%;
}

.col-content {
    width: 25%;
}

.col-category {
    width: 15%;
}

.col-image {
    width: 10%;
}

.col-status {
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
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    border-radius: 0.2rem;
}

.btn-close:hover {
    background-color: #074b71;
}
</style>
