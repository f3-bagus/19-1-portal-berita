<template>
    <ContributorLayout>
        <div class="container margin-top mb-5">
            <div class="title-mypost d-flex justify-content-between">
                <h4>My Post</h4>
                <button class="btn btn-primary" @click="addNews">Add News</button>
            </div>
            <hr>
            <div class="contributor-news mt-5">
                <div class="news-post d-flex">
                    <img src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                        alt="">
                    <div class="news-title">
                        <h5>Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</h5>
                        <span class="text-secondary mt-4">Published -
                            <span>June 8 2024</span>
                        </span>
                        <div>
                            <button variant="primary" class="detail-button mt-2">View Post</button>
                        </div>
                    </div>
                </div>
                <div class="news-post d-flex mt-5">
                    <img src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                        alt="">
                    <div class="news-title">
                        <h5>Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</h5>
                        <span class="text-secondary mt-4">Published -
                            <span>June 8 2024</span>
                        </span>
                        <div>
                            <button variant="primary" class="detail-button mt-2">View Post</button>
                        </div>
                    </div>
                </div>
                <div class="news-post d-flex mt-5">
                    <img src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                        alt="">
                    <div class="news-title">
                        <h5>Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</h5>
                        <span class="text-secondary mt-4">Published -
                            <span>June 8 2024</span>
                        </span>
                        <div>
                            <button variant="primary" class="detail-button mt-2">View Post</button>
                        </div>
                    </div>
                </div>
                <div class="news-post d-flex mt-5">
                    <img src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                        alt="">
                    <div class="news-title">
                        <h5>Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</h5>
                        <span class="text-secondary mt-4">Published -
                            <span>June 8 2024</span>
                        </span>
                        <div>
                            <button variant="primary" class="detail-button mt-2">View Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContributorLayout>
</template>


<script>
import ContributorLayout from "../../components/Contributor/ContributorLayout.vue";

export default {
    name: "Contributor",
    components: {
        ContributorLayout,
    },
    created() {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'author') {
            this.$router.push({ name: 'LandingPage' });
        }
    },
    methods: {
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
    width: 25%;
    margin-right: 20px;
}

.title-mypost {
    align-items: center;
}
</style>