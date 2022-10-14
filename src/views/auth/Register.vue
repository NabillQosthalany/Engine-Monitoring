<template>
  <v-container  fluid fill-height>
    <v-layout class="align-center justify-center">
      <v-flex>
        <v-card class="card mx-auto pa-3" width="29rem">
          <v-img
              class="mx-auto"
              src="@/assets/img/logo.png"
              width="150px"></v-img>
          <h1 class="text-center">Register</h1>
          <div class="text-form pa-3">
            <v-text-field class="text-input"

                          outlined hide-details
                          v-model="user.username"
                          label="Username">
            </v-text-field>
            <v-text-field class="text-input"
                          outlined hide-details
                          v-model="user.email"
                          label="email">
            </v-text-field>
            <v-text-field class="text-input"
                          outlined hide-details
                          v-model="user.password"
                          :append-icon="passwordType?'mdi-eye-off':'mdi-eye'"
                          :type="passwordType ? 'password': 'text'"
                          label="Password"
                          @click:append="togglePassword">
            </v-text-field>
            <v-text-field class="text-input"
                          outlined hide-details
                          :rules="[
                              (v) => !!v || 'Password is required',
                              user.password == user.confirmPassword || ''
                          ]"
                          @update:error="check"
                          v-model="user.confirmPassword"
                          :append-icon="passwordType2?'mdi-eye-off':'mdi-eye'"
                          :type="passwordType2 ? 'password': 'text'"
                          label="Confirm Password"
                          @click:append="togglePassword2">
            </v-text-field>
            <v-alert
                v-show="alert"
                dense
                outlined
                type="error"

            >
              The password you entered does not match
            </v-alert>
          </div>
          <div class="text-center">
            <v-btn
                class="btn-login my-2"
                depressed
                large
                rounded
                color="#4F6499"
                dark
            >
              Register Now
            </v-btn>
          </div>
          <div class="text-account text-center pb-1">
            <p>already have an account? <router-link to="/Login">Login Here!</router-link></p>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "loginPage",
  data(){
    return {
      passwordType:true,
      passwordType2:true,
      user:{
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
      },
      alert:false,

    }
  },
  methods: {
    togglePassword(){
      this.passwordType = !this.passwordType
    },
    togglePassword2(){
      this.passwordType2 = !this.passwordType2
    },
    check(invalid){
      this.alert = invalid

    }
  }
}
</script>
<style scoped>
.container{
  background-color:#2A3551 ;
}
.card{
  border-radius: 15px!important;
}
.text-form{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.btn-login{
  width: 23rem;
}
a {
  text-decoration: none !important;
  color: #1A70D7 !important;
}
p{
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
}
</style>