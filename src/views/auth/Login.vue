<template>
 <v-container  fluid fill-height>
  <v-layout class="align-center justify-center">
    <v-flex>
      <v-card class="card mx-auto pa-3" width="350px">
        <v-img
            class="mx-auto"
            src="@/assets/img/logo.png"
            width="150px"></v-img>
       <v-form >
         <h1  class="text-center">Login</h1>
         <div class="text-form pa-3 ">
           <v-text-field v-model="email" class="text-input" outlined hide-details label="Username"></v-text-field>
           <v-text-field v-model="password" class="text-input" outlined hide-details :append-icon="passwordType?'mdi-eye-off':'mdi-eye'" :type="passwordType ? 'password': 'text'" label="Password" @click:append="togglePassword"></v-text-field>
         </div>
         <div class="text-center">

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

         </div>
         <div class="text-account text-center pb-1">
           <p>Don’t have account? <router-link to="/Register">Make it here!</router-link></p>
         </div>
       </v-form>
      </v-card>
    </v-flex>
  </v-layout>
 </v-container>
</template>
<script>
import axios from "axios"
import swal from "sweetalert2";
import SideBar from '@/components/SideBar'
export default {
  name: "loginPage",
  component:{
    SideBar,
  },
  data(){
    return {
      passwordType:true,
      email: '',
      password:'',
    }
  },
  methods: {
    togglePassword(){
      this.passwordType = !this.passwordType
    },
   async handleSubmit(){
      const response = await axios.post('https://limitless-lake-55070.herokuapp.com/user/signIn',{
        email:this.email,
        password:this.password
      }).then(res=>{
        if(res.data.status = "success"){
          const token = res.data.token;
          sessionStorage.setItem("token", token);
          this.$router.push("/Dashboard");
        }
      }).catch(err=>{
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'looks like the username or password you entered is wrong!',
        })
      })
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
  width: 150px;
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