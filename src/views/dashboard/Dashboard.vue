<template>
    <v-app id="inspire">
        <SideBar/>
   </v-app>
  
  </template>


  <script>
  import SideBar from '@/components/SideBar';

  export default {
    name: 'Home',
    components: {
      SideBar
  },
  }
  </script>