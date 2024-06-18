<template>
    <ContributorLayout>
        <div class="edit-profile-container" v-if="isLoggedIn">
            <h1 class="edit-profile-heading">Edit Profile</h1>
            <hr class="edit-profile-divider" />
            <div class="edit-profile-content">
                <div class="edit-profile-picture">
                    <img src="../../assets/Profile.svg" class="profile-picture" />
                </div>
                <div class="edit-profile-form">
                    <label>Username</label>
                    <input type="text" v-model="username" placeholder="Username" />
                    <label>Email</label>
                    <input type="email" v-model="email" placeholder="Email" />
                    <label>Password</label>
                    <input type="password" v-model="password" placeholder="Password" />
                    <label>Confirm Password</label>
                    <input type="password" v-model="confPassword" placeholder="Confirm Password" />
                    <button class="save-button" @click="saveChanges">Save Changes</button>
                </div>
            </div>
        </div>
    </ContributorLayout>
</template>

<script>
import axios from '../../../services/axios';
import ContributorLayout from "../../components/Contributor/ContributorLayout.vue";

export default {
    name: 'EditProfileAuthor',
    components: {
        ContributorLayout,
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confPassword: '',
            isLoggedIn: false,
            userId: null, // Add a property to store the user ID
        };
    },
    created() {
        const userRole = localStorage.getItem("userRole");
        if (userRole) {
            this.isLoggedIn = true;
        }
        this.fetchProfileData();
    },
    methods: {
        async fetchProfileData() {
            try {
                const response = await axios.get("me");
                if (response.data.success) {
                    const { username, email, user_id } = response.data.user;
                    this.username = username;
                    this.email = email;
                    this.userId = user_id; // Store the user ID
                } else {
                    console.error("Failed to fetch profile data:", response.data.error);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        },
        async saveChanges() {
            try {
                if (this.password !== this.confPassword) {
                    alert("Passwords do not match!");
                    return;
                }

                const updateData = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    confPassword: this.confPassword,
                };

                const response = await axios.patch(`/users/${this.userId}`, updateData);
                if (response.status === 200) {
                    alert('Profile updated successfully');
                    this.$router.push('/author-profile');
                } else {
                    alert('Failed to update profile');
                    console.error('Failed to update profile:', response.data.msg);
                }
            } catch (error) {
                console.error("Error updating profile:", error);
                alert('An error occurred while updating the profile');
            }
        }
    }
};
</script>

<style scoped>
.edit-profile-container {
    text-align: center;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 100px;
}

.edit-profile-heading {
    color: #AB533C;
    font-weight: 700;
}

.edit-profile-divider {
    border: 1px solid #ccc;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.edit-profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.edit-profile-picture {
    margin-top: 20px;
    margin-bottom: 50px;
    position: relative;
}

.profile-picture {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
}

#file-upload {
    display: none;
}

.custom-file-upload {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: #085487;
    color: white;
    border-radius: 8px;
    margin-top: 10px;
    transition: background-color 0.3s;
}

.custom-file-upload:hover {
    background-color: #023362;
}

.edit-profile-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 300px;
}

.edit-profile-form label {
    margin-top: 10px;
    margin-bottom: 5px;
}

.edit-profile-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.save-button {
    background-color: #085487;
    color: white;
    border: 0;
    border-radius: 8px;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.save-button:hover {
    background-color: #023362;
}
</style>
