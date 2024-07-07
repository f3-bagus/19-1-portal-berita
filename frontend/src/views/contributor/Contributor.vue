<template>
    <ContributorLayout>
        <div class="container margin-top mb-5">
            <div class="title-mypost d-flex justify-content-between">
                <h4>My Post</h4>
                <button class="btn btn-primary" @click="addNews">Add News</button>
            </div>
            <hr>
            <div class="contributor-news mt-5">
                <div v-for="(news, index) in filteredNewsList" :key="news.news_id"
                    class="news-post d-flex flex-column flex-md-row mt-5 mb-4">
                    <img :src="news.image_url" alt="">
                    <div class="news-title">
                        <h5 class="title-news">{{ news.title }}</h5>
                        <span class="text-secondary mt-4 status-date">{{ news.status }} -
                            <span>{{ formatDate(news.createdAt) }}</span>
                        </span>
                        <div>
                            <button variant="primary" class="detail-button mt-2" @click="viewPost(news.news_id)">View
                                Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContributorLayout>
</template>

<script>
import axios from "../../../services/axios";
import ContributorLayout from "../../components/Contributor/ContributorLayout.vue";

export default {
    name: "Contributor",
    components: {
        ContributorLayout,
    },
    data() {
        return {
            newsList: [],
            user_id: null,
        };
    },
    created() {
        // this.fetchAuthorId();
        this.fetchProfileData();
        this.fetchNews();
    },
    computed: {
        filteredNewsList() {
            return this.newsList.filter(news => news.author.user_id === this.user_id);
        }
    },
    methods: {
        // async fetchAuthorId() {
        //     try {
        //         const userId = this.$route.params.id; // Assuming the user ID is passed as a route parameter
        //         const response = await axios.get(`/users/${userId}`);
        //         this.userId = response.data.user_id;
        //     } catch (error) {
        //         console.error('Failed to fetch author ID:', error);
        //     }
        // },
        async fetchProfileData() {
            try {
                const response = await axios.get("me");
                if (response.data.success) {
                    const { user_id } = response.data.user;
                    this.user_id = user_id
                } else {
                    // Handle if success is false or other error cases
                    console.error("Failed to fetch profile data:", response.data.error);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                // Handle any network errors or other exceptions
            }
        },
        async fetchNews() {
            try {
                const response = await axios.get('/news');
                this.newsList = response.data;
                this.newsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } catch (error) {
                console.error('Failed to fetch news:', error);
            }
        },
        formatDate(dateString) {
            return moment(dateString).format('dddd, D MMMM YYYY HH.mm [WIB]');
        },
        viewPost(newsId) {
            this.$router.push({ name: "News", params: { id: newsId } });
        },
        addNews() {
            this.$router.push({ name: "AddNews" });
        },
    },
};
</script>

<style>
.margin-top {
    margin-top: 100px;
}

.title-mypost button {
    --bs-btn-bg: #ff3300 !important;
    --bs-btn-hover-bg: #c24121 !important;
    --bs-btn-active-bg: #c2412;
    border: 0 !important;
    color: white;
}

.news-post img {
    width: 100%;
    margin-bottom: 15px;
    border-radius: 10px;
    object-fit: cover;
}

@media (min-width: 768px) {
    .news-post {
        flex-direction: row;
    }

    .news-post img {
        width: 25%;
        margin-right: 20px;
        margin-bottom: 0;
    }
}

.title-mypost {
    align-items: center;
}

.status-date {
    font-size: 13px;
}
</style>