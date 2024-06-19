<template>
  <AdminLayout>
    <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <h1 class="mt-4 mb-4">Manage Messages</h1>
          <div class="container-message mb-4">
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
                  <tr v-for="(message, index) in messages" :key="message.message_id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ message.user.username }}</td>
                    <td>{{ message.user.email }}</td>
                    <td>{{ message.message_text }}</td>
                    <td class="gap-2">
                      <div class="d-flex flex-column flex-sm-row gap-2">
                        <button class="btn btn-danger" @click="deleteMessage(message.message_id, index)">
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
      </main>
    </div>
  </AdminLayout>
</template>

<script>
import axios from '../../../services/axios';
import AdminLayout from '../../components/Admin/AdminLayout.vue';

export default {
  name: 'ManageMessages',
  components: {
    AdminLayout,
  },
  data() {
    return {
      messages: [],
      showReplyModalFlag: false,
      replyMessageDetails: {},
    };
  },
  created() {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      this.$router.push({
        name: 'LandingPage',
      });
    } else {
      this.fetchMessages();
    }
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await axios.get('/admin/contact');
        this.messages = response.data;
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    },
    async deleteMessage(message_id, index) {
      try {
        await axios.delete(`/admin/contact/${message_id}`);
        this.messages.splice(index, 1); // Remove message from array
        alert('Message deleted successfully');
      } catch (error) {
        console.error('Error deleting message:', error);
      }
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
