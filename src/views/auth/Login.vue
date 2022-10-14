<template>
 <v-container  fluid fill-height>
  <v-layout class="align-center justify-center">
    <v-flex>
      <v-card class="card mx-auto pa-3" width="350px">
        <v-img
            class="mx-auto"
            src="@/assets/img/Logo.png"
            width="150px"></v-img>
        <h1 class="text-center">Login</h1>
       <div class="text-form pa-3">
         <v-text-field class="text-input" outlined hide-details label="Username"></v-text-field>
         <v-text-field class="text-input" outlined hide-details  :append-icon="passwordType?'mdi-eye-off':'mdi-eye'" :type="passwordType ? 'password': 'text'" label="Password" @click:append="togglePassword"></v-text-field>
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
            Login
          </v-btn>
        </div>
        <div class="text-account text-center pb-1">
          <p>Don’t have account? <router-link to="/Register">Make it here!</router-link></p>
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
      passwordType:true
    }
  },
  methods: {
    togglePassword(){
      this.passwordType = !this.passwordType
    }
  }
}
</script>
<style scoped>
.container{
  background-color:#2A3551 ;
}
.text-form{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.btn-login{
  width: 150px;
}

.card{
  border-radius: 15px!important;
}
</style>