<template>
  <v-app>
    <SideBar />
    <div class="content">
      <h1 class="header">Maintenance</h1>
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
h2 {
  font-family: "Poppins", sans-serif;
  color: #000000;
  font-weight: 600;
  font-size: 40px;
}
.header {
  color: #000000;
  font-weight: 300;
  padding: 10px 10px 0 25px;
}
h5 {
  font-family: "Poppins", sans-serif;
  color: #000000;
  font-weight: 400;
  font-size: 20px;
}

.header {
  color: #000000;
  font-weight: 300;
  padding: 10px 10px 0 25px;
}
</style>
