<template>
  <v-app>
    <SideBar />
    <div class="content">
      <h1 class="header">Recovery</h1>
      <v-container>
        <v-card style="height: 60vh">
          <v-container>
            <h5>Recovery Instagram Account</h5>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="id"
                :rules="idRules"
                label="Id"
                outlined
                required
              ></v-text-field>

              <!-- <v-select
                v-model="select"
                :items="taken"
                :rules="[(v) => !!v || 'Item is required']"
                label="Taken"
                outlined
                required
              ></v-select>

              <v-select
                v-model="select"
                :items="status"
                :rules="[(v) => !!v || 'Item is required']"
                label="Status"
                outlined
                required
              ></v-select> -->

              <v-text-field
                v-model="cookies"
                :rules="cookiesRules"
                label="Web Cookies"
                outlined
                required
                height="30vh"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="updateCrawler"
              >
                Update
              </v-btn>

              <v-btn color="error" class="mr-4" @click="reset">
                Reset Form
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import SideBar from "@/components/SideBar";
export default {
  data: () => ({
    dataAccount: [],
    id: 0,
    taken: false,
    status: "active",
    web_cookies: "",
    valid: true,
    id: "",
    idRules: [(v) => !!v || "Id is required"],

    cookies: "",
    cookiesRules: [(v) => !!v || "Cookies is required"],

    select: null,
    taken: ["False", "True"],
    select: null,
    status: ["Active", "Checkpoint"],
  }),

  methods: {
    // validate() {
    //   this.$refs.form.validate();
    // },
    reset() {
      this.$refs.form.reset();
    },

    updateCrawler() {
      axios
        .put("http://192.168.20.225:8500/account/update", {
          id: this.id,
          web_cookies: this.web_cookies,
        })
        .then((res) => {
          this.selectServer();
          this.dialogEdit = false;
          Swal.fire({
            icon: "success",
            title: "Data Project has been updated",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something has Wrong!",
          });
        });
    },
  },
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
