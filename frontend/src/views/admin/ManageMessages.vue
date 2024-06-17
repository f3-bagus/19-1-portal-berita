<template>
  <AdminLayout>
    <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <h1 class="mt-4 mb-4">Manage Messages</h1>
          <div class="container-message mb-4">
            <button
              variant="primary"
              class="btn btn-success"
              @click="showCreateModal = true"
            >
              Create Message
            </button>
            <div class="table-responsive">
              <table class="table table-light mt-3 table-rounded">
                <thead>
                  <tr>
                    <th scope="col" class="col-no">No</th>
                    <th scope="col" class="col-name">Name</th>
                    <th scope="col" class="col-email">Email</th>
                    <th scope="col" class="col-message">Message</th>
                    <th scope="col" class="col-action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(message, index) in messages" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ message.name }}</td>
                    <td>{{ message.email }}</td>
                    <td>{{ message.message }}</td>
                    <td class="gap-2">
                      <div class="d-flex flex-column flex-sm-row gap-2">
                        <button
                          class="btn btn-warning"
                          @click="showUpdateModal(message)"
                        >
                          Update
                        </button>
                        <button
                          class="btn btn-danger"
                          @click="deleteMessage(index)"
                        >
                          Delete
                        </button>
                        <button
                          class="btn btn-info"
                          @click="showReplyModal(message)"
                        >
                          Reply
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Create Message Modal -->
        <div class="modal" tabindex="-1" v-if="showCreateModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Create Message</h5>
                <button class="btn btn-danger" @click="showCreateModal = false">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="createMessage">
                  <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      v-model="newMessage.name"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="newMessage.email"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea
                      class="form-control"
                      id="message"
                      v-model="newMessage.message"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" class="btn btn-success">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Update Message Modal -->
        <div class="modal" tabindex="-1" v-if="showUpdateModalFlag">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Update Message</h5>
                <button
                  class="btn btn-danger"
                  @click="showUpdateModalFlag = false"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="updateMessage">
                  <div class="mb-3">
                    <label for="update-name" class="form-label">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="update-name"
                      v-model="currentMessage.name"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="update-email" class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="update-email"
                      v-model="currentMessage.email"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="update-message" class="form-label"
                      >Message</label
                    >
                    <textarea
                      class="form-control"
                      id="update-message"
                      v-model="currentMessage.message"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" class="btn btn-warning">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Reply Message Modal -->
        <div class="modal" tabindex="-1" v-if="showReplyModalFlag">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Reply to Message</h5>
                <button
                  class="btn btn-danger"
                  @click="showReplyModalFlag = false"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="replyMessage">
                  <div class="mb-3">
                    <label for="reply-name" class="form-label">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="reply-name"
                      v-model="replyMessageDetails.name"
                      disabled
                    />
                  </div>
                  <div class="mb-3">
                    <label for="reply-email" class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="reply-email"
                      v-model="replyMessageDetails.email"
                      disabled
                    />
                  </div>
                  <div class="mb-3">
                    <label for="reply-original-message" class="form-label"
                      >Original Message</label
                    >
                    <textarea
                      class="form-control"
                      id="reply-original-message"
                      v-model="replyMessageDetails.message"
                      disabled
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="reply-message" class="form-label"
                      >Your Reply</label
                    >
                    <textarea
                      class="form-control"
                      id="reply-message"
                      v-model="replyMessageDetails.reply"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" class="btn btn-info">Send Reply</button>
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
  name: "ManageMessages",
  components: {
    AdminLayout,
  },
  created() {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      this.$router.push({
        name: "LandingPage",
      });
    }
  },
  data() {
    return {
      showCreateModal: false,
      showUpdateModalFlag: false,
      showReplyModalFlag: false,
      newMessage: {
        name: "",
        email: "",
        message: "",
      },
      currentMessage: null,
      replyMessageDetails: {
        name: "",
        email: "",
        message: "",
        reply: "",
      },
      messages: [
        {
          name: "User 1",
          email: "user1@example.com",
          message: "Hello, this is a message.",
        },
        {
          name: "User 2",
          email: "user2@example.com",
          message: "This is another message.",
        },
        // Add more messages as needed
      ],
    };
  },
  methods: {
    createMessage() {
      this.messages.push({
        ...this.newMessage,
      });
      this.showCreateModal = false;
      this.newMessage = {
        name: "",
        email: "",
        message: "",
      };
    },
    showUpdateModal(message) {
      this.currentMessage = {
        ...message,
      };
      this.showUpdateModalFlag = true;
    },
    updateMessage() {
      const index = this.messages.findIndex(
        (msg) => msg.email === this.currentMessage.email
      );
      if (index !== -1) {
        this.messages.splice(index, 1, {
          ...this.currentMessage,
        });
      }
      this.showUpdateModalFlag = false;
    },
    deleteMessage(index) {
      this.messages.splice(index, 1);
    },
    showReplyModal(message) {
      this.replyMessageDetails = {
        ...message,
        reply: "",
      };
      this.showReplyModalFlag = true;
    },
    replyMessage() {
      // Handle the reply (e.g., send an email or store the reply)
      console.log(
        `Reply sent to ${this.replyMessageDetails.email}: ${this.replyMessageDetails.reply}`
      );
      this.showReplyModalFlag = false;
    },
  },
};
</script>

<style scoped>
.container-message {
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

.col-name {
  width: 20%;
}

.col-email {
  width: 25%;
}

.col-message {
  width: 35%;
}

.col-action {
  width: 15%;
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
</style>
