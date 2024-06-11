<template>
    <div class="contact-us-container">
        <h1 class="contact-us-heading">Contact Us</h1>
        <hr class="contact-us-divider" />
        <div class="row contact-content">
            <div class="col contact-text">
                <div class="row">
                    <h4 class="title-contact">Get In Touch!</h4>
                    <p>Need to get in touch with us? We’d love to hear from you. Here’s how you can reach us. Fill out
                        the form with your inquiry.</p>
                </div>
            </div>
            <div class="col contact-us-content">
                <div class="contact-us-form">
                    <label>Name</label>
                    <input type="text" v-model="fullName" placeholder="Name" />
                    <label>Email</label>
                    <input type="email" v-model="email" placeholder="Email" />
                    <label>Message</label>
                    <textarea type="message" v-model="message" placeholder="Message"></textarea>
                    <button class="send-button" @click="sendChanges">Send</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactUs',
    methods: {
        sendChanges() {
            alert('Message Sent!');
        }
    }
}
</script>

<style scoped>
.contact-text {
    display: flex;
    align-items: center;
    margin-right: 25px;
}

.title-contact {
    font-weight: 700;
}

.contact-us-container {
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 100px;
}

.contact-us-heading {
    color: #AB533C;
    font-weight: 700;
}

.contact-us-divider {
    border: 1px solid #ccc;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.contact-us-content {
    display: flex;
    flex-direction: column;
}

.contact-us-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.contact-us-form label {
    margin-top: 10px;
    margin-bottom: 5px;
}

.contact-us-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.contact-us-form textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.send-button {
    background-color: #085487;
    color: white;
    border: 0;
    border-radius: 8px;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.send-button:hover {
    background-color: #023362;
}

@media (max-width: 426px) {
    .contact-content {
        flex-direction: column;
        align-items: center;
    }

    .contact-text {
        margin-right: 0;
    }
}
</style>
