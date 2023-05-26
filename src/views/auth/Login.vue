<template>
  <v-container fluid fill-height>
    <v-layout class="align-center justify-center">
      <v-flex>
        <v-card class="card mx-auto pa-3" width="29rem">
          <v-img
            class="mx-auto"
            src="@/assets/img/Logo.png"
            width="150px"
          ></v-img>
          <h1 class="text-center">Login</h1>
          <div>
            <form ref="form" @submit.prevent="login()">
              <v-text-field
                v-model="username"
                name="userName"
                label="Username"
                type="text"
                placeholder="username"
                class="username"
                required
                outlined
              ></v-text-field>

              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show3 ? 'text' : 'password'"
                v-model="password"
                name="password"
                label="Password"
                placeholder="Password"
                class="password"
                outlined
                @click:append="show3 = !show3"
              ></v-text-field>

              <div class="red--text">{{ errorMessage }}</div>
              <div class="text-center">
                <v-btn
                  type="submit"
                  class="mt-4"
                  depressed
                  large
                  rounded
                  color="#4F6499"
                  dark
                  value="log in"
                  >Login</v-btn
                >
              </div>
            </form>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      show3: false,
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8080/user/login", {
          userName: this.username,
          password: this.password,
        })
        .then((res) => {
          this.$router.replace({
            name: "Dashboard",
          });

          console.log(res.data);

          Swal.fire({
            icon: "success",
            title: "Login Succesfully",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password or Username was worng!",
          });
        });
    },
  },
  computed: {
    toggleMessage: function () {
      return this.isRegister
        ? this.stateObj.register.message
        : this.stateObj.login.message;
    },
  },
};
</script>
<style scoped>
.container {
  background-color: #2a3551;
}
.card {
  border-radius: 15px !important;
}
.text-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.btn-login {
  width: 23rem;
}
a {
  text-decoration: none !important;
  color: #1a70d7 !important;
}
p {
  font-family: "Poppins", sans-serif;
  font-size: 12px;
}
</style>
