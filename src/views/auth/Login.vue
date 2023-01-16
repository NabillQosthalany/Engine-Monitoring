<template>
  <v-container fluid fill-height>
    <v-layout class="align-center justify-center">
      <v-flex>
        <v-card class="card mx-auto pa-3" width="350px">
          <v-img
              class="mx-auto"
              src="@/assets/img/logo.png"
              width="150px"
          ></v-img>
          <v-form>
            <template  v-if="btnRegis == true ">
              <h1 class="text-center">Login</h1>
            </template>
            <template v-else>
              <h1 class="text-center">Register</h1>
            </template>

<!--            Bagian Text Field-->
            <div class="text-form pa-3">
              <template  v-if="btnRegis == true ">
                <v-text-field
                    v-model="email"
                    class="text-input"
                    outlined
                    hide-details
                    label="Username"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    class="text-input"
                    outlined
                    hide-details
                    :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passwordType ? 'password' : 'text'"
                    label="Password"
                    @click:append="togglePassword"
                ></v-text-field>
              </template>
              <template v-else>
                <v-text-field
                    v-model="email"
                    class="text-input"
                    outlined
                    hide-details
                    label="Email"
                ></v-text-field>
                <v-text-field
                    v-model="firstName"
                    class="text-input"
                    outlined
                    hide-details
                    label="First Name"
                ></v-text-field>
                <v-text-field
                    v-model="lastName"
                    class="text-input"
                    outlined
                    hide-details
                    label="Last Name"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    class="text-input"
                    outlined
                    hide-details
                    :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passwordType ? 'password' : 'text'"
                    label="Password"
                    @click:append="togglePassword"
                ></v-text-field>
              </template>

            </div>
            <div class="text-center">
              <template  v-if="btnRegis == true ">
                <v-btn
                    @click="handleSubmit"
                    class="btn-login my-2"
                    depressed
                    large
                    rounded
                    color="#4F6499"
                    dark
                >
                  Login
                </v-btn>
              </template>
              <template v-else>
                <v-btn
                    @click="registerSubmit"
                    class="btn-login my-2"
                    depressed
                    large
                    rounded
                    color="#4F6499"
                    dark
                >
                  Register
                </v-btn>
              </template>
            </div>
            <div class="text-account text-center pb-1">
              <p>
                Don’t have account?
<!--                <router-link to="/Register">Make it here!</router-link>-->
                <template v-if ="btnRegis == true">
                  <v-btn
                      class="btnLogic"
                      @click="Regis">
                    Make it Here
                  </v-btn>
                </template>
                <template v-else>
                  <v-btn
                      class="btnLogic"
                      @click="Regis">
                    Login Here
                  </v-btn>
                </template>


              </p>
            </div>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import SideBar from "@/components/SideBar";
import Swal from "sweetalert2";

export default {
  name: "loginPage",
  data() {
    return {
      dataAkun:'',
      passwordType: true,
      firstName:'',
      lastName:'',
      email: "",
      password: "",
      btnRegis:true,
    };
  },
  methods: {
    Regis(){
      this.btnRegis = !this.btnRegis
    },
    togglePassword() {
      this.passwordType = !this.passwordType;
    },
    registerSubmit(){
      axios.post('http://localhost:8010/user/signup', {
        "email": this.email,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "password": this.password
      })
          .then(res => {
            this.dataAkun()
            this.email= '',
                this.firstName = '',
                this.lastName = '',
                this.password = ''
            this.btnRegis = true

            Swal.fire({
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 2000

            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 2000
            })
          })

    },
    async handleSubmit() {
      const response = await axios
          .post("http://localhost:8010/user/signin", {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            if ((res.data.status = "success")) {
              const token = res.data.token;
              sessionStorage.setItem("token", true);
              this.$router.push("/Dashboard");
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "looks like the username or password you entered is wrong!",
            });
          });
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
  width: 150px;
}
.btnLogic{
   background-color:transparent  !important;
  margin-left: 20px;
  border-radius: 20px;
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
