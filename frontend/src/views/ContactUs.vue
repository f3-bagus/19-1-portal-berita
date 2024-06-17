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
          <label>Subject</label>
          <input type="text" v-model="subject" placeholder="Subject" />
          <label>Message Text</label>
          <textarea v-model="messageText" placeholder="Message Text"></textarea>
          <button class="send-button" @click="sendChanges">Send</button>
          <p v-if="message">{{ message }}</p>
          <p v-if="error">{{ error }}</p>
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
        this.subject = ""; // Clear subject input
        this.messageText = ""; // Clear message text area
      } catch (error) {
        this.error = error.response.data.error;
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
