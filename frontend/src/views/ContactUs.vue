<template>
  <div class="contact-us-container">
    <h1 class="contact-us-heading">Contact Us</h1>
    <hr class="contact-us-divider" />
    <div class="row contact-content">
      <div class="col contact-text">
        <div class="row">
          <h4 class="title-contact">Get In Touch!</h4>
          <p>
            Need to get in touch with us? We’d love to hear from you. Here’s how
            you can reach us. Fill out the form with your inquiry.
          </p>
        </div>
      </div>
      <div class="col contact-us-content">
        <div class="contact-us-form">
          <p v-if="message" class="alert alert-success">{{ message }}</p>
          <p v-if="error" class="alert alert-danger">{{ error }}</p>
          <label>Subject</label>
          <input type="text" v-model="subject" placeholder="Subject" />
          <label>Message</label>
          <textarea v-model="messageText" placeholder="Message"></textarea>
          <button class="send-button" @click="sendChanges">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../services/axios";

export default {
  name: "ContactUs",
  data() {
    return {
      subject: "",
      messageText: "",
      message: "",
      error: "",
    };
  },
  methods: {
    async sendChanges() {
      try {
        const response = await axios.post("/contact", {
          subject: this.subject,
          message_text: this.messageText,
        });
        this.message = response.data.msg;
        this.error = ""; // Clear any previous error message

        // Clear the subject and message inputs
        this.subject = ""; 
        this.messageText = ""; 

        // Set a timeout to clear the message after 5 seconds
        setTimeout(() => {
          this.message = "";
        }, 5000);
      } catch (error) {
        this.error = error.response.data.error;
        this.message = ""; // Clear any previous success message
        console.error("Error sending message:", error);
      }
    },
  },
};
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
  color: #ab533c;
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

.alert {
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
  font-weight: 200;
  text-align: left;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
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
