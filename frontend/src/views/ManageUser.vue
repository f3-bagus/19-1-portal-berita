<template>
  <AdminLayout>
    <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <h1 class="mt-4 mb-4">User Manager</h1>
          <div class="container-user mb-4">
            <button variant="primary" class="btn btn-success" @click="showCreateModal = true">
              Create User
            </button>
            <div class="table-responsive">
              <table class="table table-light mt-3 table-rounded">
                <thead>
                  <tr>
                    <th scope="col" class="col-no">No</th>
                    <th scope="col" class="col-username">Username</th>
                    <th scope="col" class="col-email">Email</th>
                    <th scope="col" class="col-password">Password</th>
                    <th scope="col" class="col-role">Role</th>
                    <th scope="col" class="col-action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>*******</td>
                    <td>{{ user.role }}</td>
                    <td class="d-flex gap-3">
                      <button variant="primary" class="btn btn-warning" @click="showUpdateModal(user)">
                        Update
                      </button>
                      <button variant="primary" class="btn btn-danger" @click="deleteUser(index)">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Create User Modal -->
    <div class="modal" tabindex="-1" v-if="showCreateModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create User</h5>
            <button class="btn btn-danger" @click="showCreateModal = false"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createUser">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="newUser.username" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="newUser.email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="newUser.password" required>
              </div>
              <button type="submit" class="btn btn-success">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Update User Modal -->
    <div class="modal" tabindex="-1" v-if="showUpdateModalFlag">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update User</h5>
            <button class="btn btn-danger" @click="showUpdateModalFlag = false"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser">
              <div class="mb-3">
                <label for="update-username" class="form-label">Username</label>
                <input type="text" class="form-control" id="update-username" v-model="currentUser.username" required>
              </div>
              <div class="mb-3">
                <label for="update-email" class="form-label">Email</label>
                <input type="email" class="form-control" id="update-email" v-model="currentUser.email" required>
              </div>
              <div class="mb-3">
                <label for="update-password" class="form-label">Password</label>
                <input type="password" class="form-control" id="update-password" v-model="currentUser.password" required>
              </div>
              <button type="submit" class="btn btn-warning">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "../components/Admin/AdminLayout.vue";

export default {
  name: "ManageUser",
  components: {
    AdminLayout,
  },
  data() {
    return {
      showCreateModal: false,
      showUpdateModalFlag: false,
      newUser: {
        username: "",
        email: "",
        password: "",
        role: "User",
      },
      currentUser: null,
      users: [
        { username: "Mark", email: "mark@example.com", password: "password1", role: "User" },
        { username: "Jacob", email: "jacob@example.com", password: "password2", role: "User" },
        // More users
      ],
    };
  },
  methods: {
    createUser() {
      this.users.push({ ...this.newUser });
      this.showCreateModal = false;
      this.newUser = { username: "", email: "", password: "", role: "User" };
    },
    showUpdateModal(user) {
      this.currentUser = { ...user };
      this.showUpdateModalFlag = true;
    },
    updateUser() {
      const index = this.users.findIndex(user => user.email === this.currentUser.email);
      if (index !== -1) {
        this.users.splice(index, 1, { ...this.currentUser });
      }
      this.showUpdateModalFlag = false;
    },
    deleteUser(index) {
      this.users.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.container-user {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #085487;
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

.col-username {
  width: 15%;
}

.col-email {
  width: 20%;
}

.col-password {
  width: 15%;
}

.col-role {
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
  /* background: #870808;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: #000;
  cursor: pointer; */
}
</style>
