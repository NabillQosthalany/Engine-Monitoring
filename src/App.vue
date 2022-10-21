<template>
  <v-app>
    <v-main>
      <router-view
          :baseURL="baseURL"
      />
    </v-main>
  </v-app>
</template>
<script>
import axios from 'axios';
export default {
  data(){
    return{
      baseURL : "https://limitless-lake-55070.herokuapp.com/",
    }
  },
  name: "App"

  // data: () => ({
  //   //
  // }),
};
</script>

<style>
.v-main {
  min-height: 100vh;
}
</style>
