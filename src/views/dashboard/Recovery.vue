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
    taken: false,
    status: "active",
    web_cookies: "",
    valid: true,
    id: "",
    idRules: [(v) => !!v || "Id is required"],

    cookies: "",
    cookiesRules: [(v) => !!v || "Cookies is required"],
  }),

  methods: {
    reset() {
      this.$refs.form.reset();
    },

    updateCrawler() {
      axios
        .put("https://jsonplaceholder.typicode.com/posts/", {
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
