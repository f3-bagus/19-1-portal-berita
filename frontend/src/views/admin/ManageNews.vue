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
                                    <tr v-for="(news, index) in newsList" :key="news.news_id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ news.title }}</td>
                                        <td>{{ news.content }}</td>
                                        <td>{{ getCategoryName(news.categories_id) }}</td>
                                        <td>
                                            <img v-if="news.image_url" :src="news.image_url" alt="News Image"
                                                class="img-thumbnail" />
                                        </td>
                                        <td>{{ news.status }}</td>
                                        <td class="gap-2">
                                            <div class="d-flex flex-column flex-sm-row gap-2">
                                                <button class="btn btn-info" @click="toggleVerification(news)">
                                                    {{ news.status === 'published' ? 'Unverify' : 'Verify' }}
                                                </button>
                                                <button class="btn btn-warning" @click="showUpdateModal(news)">
                                                    Update
                                                </button>
                                                <button class="btn btn-danger" @click="deleteNews(news.news_id)">
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
                                <button class="btn btn-danger" @click="showCreateModal = false"><i
                                        class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="createNews">
                                    <div class="mb-3">
                                        <label for="title" class="form-label">Title</label>
                                        <input type="text" class="form-control" id="title" v-model="newNews.title"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="content" class="form-label">Content</label>
                                        <textarea class="form-control" id="content" v-model="newNews.content"
                                            required></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="category" class="form-label">Category</label>
                                        <select class="form-select" id="category" v-model="newNews.categories_id"
                                            required>
                                            <option value="">Select Category</option>
                                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name
                                                }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="image" class="form-label">Image URL</label>
                                        <input type="text" class="form-control" id="image" v-model="newNews.image_url">
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
                                <button class="btn btn-danger" @click="showUpdateModalFlag = false"><i
                                        class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="updateNews">
                                    <div class="mb-3">
                                        <label for="update-title" class="form-label">Title</label>
                                        <input type="text" class="form-control" id="update-title"
                                            v-model="currentNews.title" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-content" class="form-label">Content</label>
                                        <textarea class="form-control" id="update-content" v-model="currentNews.content"
                                            required></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-category" class="form-label">Category</label>
                                        <select class="form-select" id="update-category"
                                            v-model="currentNews.categories_id" required>
                                            <option value="">Select Category</option>
                                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name
                                                }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-image" class="form-label">Image URL</label>
                                        <input type="text" class="form-control" id="update-image"
                                            v-model="currentNews.image_url">
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
  import axios from '../../../services/axios';
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
                categories_id: "",
                image_url: "",
            },
            currentNews: null,
            newsList: [],
            categories: [],
        };
    },
    created() {
        this.fetchNews();
        this.fetchCategories();
    },
    methods: {
      async fetchNews() {
    try {
        const response = await axios.get('/news');
        this.newsList = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
        console.error('Failed to fetch news:', error);
    }
        },
        async fetchCategories() {
            try {
                const response = await axios.get('/categories');
                this.categories = response.data.map(category => ({
                    id: category.categories_id,
                    name: category.categories_name
                }));
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }, 
        async createNews() {
            try {
                const response = await axios.post('/news/create', this.newNews);
                this.newsList.push(response.data);
                this.showCreateModal = false;
                this.newNews = {
                    title: "",
                    content: "",
                    categories_id: "",
                    image_url: "",
                    status: "",
                };
                this.fetchNews();
                alert(response.data.msg);
            } catch (error) {
                console.error('Failed to create news:', error);
            }
        },
        async toggleVerification(news) {
  const action = news.status === 'published' ? 'unverify' : 'verify';
  console.log(`Toggling verification for news ID: ${news.news_id}, action: ${action}`);
  try {
    const response = await axios.post('/news/verify', { news_id: news.news_id, action });
    console.log('Response from server:', response.data);
    alert(response.data.msg);
    this.fetchNews(); // Memperbarui daftar berita
  } catch (error) {
    console.error('Failed to change news status:', error);
  }
}
,
        showUpdateModal(news) {
            this.currentNews = { ...news };
            this.showUpdateModalFlag = true;
        },
        async updateNews() {
            try {
                const response = await axios.patch(`/news/${this.currentNews.news_id}`, {
                    title: this.currentNews.title,
                    content: this.currentNews.content,
                    categories_id: this.currentNews.categories_id,
                    image_url: this.currentNews.image_url,
                });
                this.showUpdateModalFlag = false;
                this.fetchNews();
                alert(response.data.msg);
            } catch (error) {
                console.error('Failed to update news:', error);
            }
        },
        async deleteNews(newsId) {
            try {
                await axios.delete(`/news/${newsId}`);
                this.newsList = this.newsList.filter(news => news.news_id !== newsId);
                alert('News deleted successfully');
            } catch (error) {
                console.error('Failed to delete news:', error);
            }
        },
        getCategoryName(categoryId) {
            const category = this.categories.find(cat => cat.id === categoryId);
            return category ? category.name : 'Unknown Category';
        }
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
  