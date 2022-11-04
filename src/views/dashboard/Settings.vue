<template>
  <v-app>
    <SideBar />
    <div class="content">
   <h1 class="header">Settings</h1>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card height="35rem">
              <div class="text-user text-center pa-6">
                <v-avatar size="20rem">
                  <v-icon size="20rem"> mdi-account </v-icon>
                </v-avatar>
                <h2>Hello</h2>
                <h5>User 1</h5>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card height="35rem">
              <v-form v-model="valid">
                <v-container>
                  <v-row class="pa-6">
                    <v-col cols="12" md="12">
                      <h2 class="pb-3">User Profile</h2>
                      <v-text-field
                        v-model="Username"
                        :rules="nameRules"
                        label="Username"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="Name"
                        :rules="nameRules"
                        label="Name"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="Role"
                        :rules="emailRules"
                        label="Role"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
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
</style>
