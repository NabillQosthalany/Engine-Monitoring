<template>
  <v-app>
    <SideBar/>
    <div class="content">
      <h1 class="header mb-2">Site Management</h1>
      <template>

        <v-toolbar
            color="#4f6499"
            dark
            flat
            prominent
            height="15rem"
            class="pt-1"
        >
          <template v-slot:extension>
            <v-tabs
                v-model="tabs"
                centered
                class="mb-2"
            >
              <v-tab
              >
                Server Management
              </v-tab>
              <v-tab
              >
                Project Management
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tabs">
          <!--                  Server Management Card-->
          <v-tab-item>
            <ServerManagement/>
          </v-tab-item>


          <!--                  Project Management Card-->
          <v-tab-item>
            <ProjectManagement/>

          </v-tab-item>
        </v-tabs-items>
      </template>
    </div>
  </v-app>
</template>
<script>
import SideBar from "@/components/SideBar";
import ServerManagement from "@/components/ServerManagement";
import ProjectManagement from "@/components/ProjectManagement";


export default {
components: {
    SideBar,
    ServerManagement,
    ProjectManagement
  },

  data: () => ({
  tabs:null
})
}
</script>
<style scoped>
.content {
  background-color: #efefef;
  height: 100vh;
}

.header {
  color: #000000;
  font-weight: 300;
  padding: 10px 10px 0 25px;
  font-family: "Poppins", sans-serif;

}

.v-tab {
  font-family: "Poppins", sans-serif;
}

.text-1 {
  font-family: "Poppins", sans-serif;
}

v-data-table {
  font-family: "Poppins", sans-serif;

}
</style>
