<template>
  <v-app>
    <SideBar />
    <div class="content">
      <h2 class="header mb-2">Maintenance</h2>
      <v-container>
        <v-card>
          <!-- HERE -->
          <iframe src="http://instagram.com/" width="640" height="480" />
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import SideBar from "@/components/SideBar";
export default {
  components: {
    SideBar,
  },
};
</script>
<style scoped>
.content {
  height: 100%;
  background-color: #efefef;
}
.header {
  color: #000000;
  font-weight: 300;
  padding: 10px 10px 0 25px;
  font-family: "Poppins", sans-serif;
}
</style>
