<template>
  <v-app>
    <SideBar />
    <div class="content">
      <h1 class="header">Settings</h1>
      <v-card height="25rem" class="card pa-5 ma-5">
        <h2>Profile Details</h2>
        <template>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="fullname"
                    :rules="nameRules"
                    :counter="10"
                    label="Full Name"
                    required
                    outlined
                    class="text-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="username"
                    :rules="nameRules"
                    :counter="10"
                    label="Username"
                    required
                    outlined
                    class="text-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="email"
                    :rules="nameRules"
                    :counter="10"
                    label="Email"
                    required
                    outlined
                    class="text-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="Role"
                    :rules="nameRules"
                    :counter="10"
                    label="Role"
                    required
                    outlined
                    class="text-input"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </template>
      </v-card>
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
.header {
  color: #000000;
  font-weight: 300;
  padding: 10px 10px 0 25px;
}
.content {
  height: 100%;
  background-color: #efefef;
}
</style>
