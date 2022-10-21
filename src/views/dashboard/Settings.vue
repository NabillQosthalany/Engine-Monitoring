<template>
  <v-app>
    <SideBar />
    <div class="content">
      <v-app-bar fixed app flat>
        <h4>Settings</h4>

      </v-app-bar>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card height="25rem">
            <div class="text-user text-center  pa-6">
              <v-avatar size="15rem">
                <v-icon size="15rem">
                  mdi-account
                </v-icon>
              </v-avatar>
              <h1>Hello</h1>
             <h5>User 1</h5>
            </div>
            </v-card>

          </v-col>
          <v-col cols="12" md="6">
            <v-card height="25rem">
              <template>
                <v-form v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                          md="12"
                      >
                        <v-text-field
                            v-model="Username"
                            :rules="nameRules"
                            :counter="10"
                            label="Username"
                            required
                        ></v-text-field>
                      </v-col>

                      <v-col
                          cols="12"
                          md="12"
                      >
                        <v-text-field
                            v-model="Name"
                            :rules="nameRules"
                            :counter="10"
                            label="Name"
                            required
                        ></v-text-field>
                      </v-col>

                      <v-col
                          cols="12"
                          md="12"
                      >
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          md="12"
                      >
                        <v-text-field
                            v-model="Role"
                            :rules="emailRules"
                            label="Role"
                            required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </template>
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
h1{
  font-family: "Poppins", sans-serif;
  color: #000000;
  font-weight: 600;
}
h5{
  font-family: "Poppins", sans-serif;
  color: #000000;
  font-weight: 400;
}

</style>
