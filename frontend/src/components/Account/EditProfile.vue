<template>
    <div class="edit-profile-container">
        <h1 class="edit-profile-heading">Edit Profile</h1>
        <hr class="edit-profile-divider" />
        <div class="edit-profile-content">
            <div class="edit-profile-picture">
                <div>
                    <img :src="profilePicture" class="profile-picture" />
                </div>
                <div>
                    <label for="file-upload" class="custom-file-upload">
                        Choose File
                    </label>
                    <input id="file-upload" type="file" @change="onFileChange" />
                </div>
            </div>
            <div class="edit-profile-form">
                <label>Full Name</label>
                <input type="text" v-model="fullName" />
                <label>Username</label>
                <input type="text" v-model="username" />
                <label>Email</label>
                <input type="email" v-model="email" />
                <button class="save-button" @click="saveChanges">Save Changes</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditProfile',
    data() {
        return {
            profilePicture: 'https://via.placeholder.com/150',
            fullName: '',
            username: '',
            email: ''
        }
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.profilePicture = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        saveChanges() {
            alert('Profile changes saved!');
        }
    }
}
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