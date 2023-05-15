<template>
  <v-app>
    <SideBar />
    <div class="content">
      <h2 class="header mb-2">Site Management</h2>
      <v-container fluid>
        <v-data-table
          :headers="headers"
          :items="resultData"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="mr-15">Server Monitoring</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <!--        Tombol Search-->
              <v-text-field
                class="mx-10"
                v-model="search"
                append-icon="mdi-magnify"
                label="Search by Server Ip"
                single-line
                hide-details
              ></v-text-field>

              <!--        Dialog Create-->
              <v-dialog v-model="dialogCreate" persistant max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Add Data
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline"> Add Data </span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form ref="form" v-model="valid">
                        <v-row>
                          <v-col cols="6">
                            <v-select
                              v-model="select"
                              :items="listproject"
                              item-value="project_id"
                              item-text="project_name"
                              label="Project Name"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              :rules="[rules.required, rules.ip]"
                              label="Server Ip"
                              v-model="serverIp"
                              required
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              :rules="[rules.required]"
                              label="Keterangan"
                              v-model="keterangan"
                              required
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              :rules="[rules.required]"
                              label="Username"
                              v-model="username"
                              required
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="blue-draken-1" text @click="closeDialogCreate"
                      >Batal</v-btn
                    >
                    <v-btn
                      color="blue-draken-1"
                      :disabled="!valid"
                      text
                      @click="createServer"
                      >Tambah</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!--                Dialog Edit-->
              <v-dialog v-model="dialogEdit" persistant max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline"> Update Data Project </span>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          label="Server Ip"
                          v-model="editServerIp"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          v-model="editProjectId"
                          :items="listproject"
                          item-value="project_id"
                          item-text="project_name"
                          label="Project Name"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          label="Keterangan"
                          v-model="editKeterangan"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          disabled
                          label="Username"
                          v-model="editUsername"
                          required
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue-draken-1"
                      text
                      @click="dialogEdit = false"
                      >Batal</v-btn
                    >
                    <v-btn color="blue-draken-1" text @click="updateServer"
                      >Ubah</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!--        Dialog Delete-->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue-draken-1"
                      text
                      @click="dialogDelete = false"
                      >Batal</v-btn
                    >
                    <v-btn color="blue-draken-1" text @click="deleteServer()"
                      >Delete</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.project_name="{ item }">
            <p>{{ dynamic(item)?.project_name }}</p>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editServer(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="getDelete(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import Swal from "sweetalert2";
import SideBar from "@/components/SideBar.vue";
import axios from "axios";

import { mapState, mapActions } from "vuex";

export default {
  components: {
    SideBar,
  },
  data: () => ({
    dataServer: [],
    dialogCreate: false,
    dialogEdit: false,
    dialogDelete: false,
    serverId: 0,
    projectId: 0,
    projectName: "",
    search: "",
    serverIp: null,
    keterangan: "",
    username: "",
    editServerIp: "",
    editProjectId: 0,
    editServerId: 0,
    editKeterangan: "",
    editUsername: "",
    deleteServerId: "",
    deleteUsername: "",
    valid: false,
    Method: true,
    select: 0,
    dataProjectId: [],
    dynamicProjectName: "",

    rules: {
      required: (value) => !!value || "Required.",
      ip: (value) => {
        const pattern =
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return pattern.test(value) || "Invalid ip Addres.";
      },
    },
    headers: [
      { text: "Project Name", value: "project_name" },
      { text: "Username", value: "username" },
      { text: "server Ip", value: "server_ip" },
      { text: "Keterangan", value: "keterangan" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  created() {
    this.selectServer();
    this.getDataProject();
  },
  computed: {
    ...mapState(["listproject"]),
    resultData() {
      if (this.search) {
        return this.dataServer.filter((i) =>
          i.server_ip.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.dataServer;
      }
    },
  },
  methods: {
    dynamic(e) {
      return this.listproject?.find((i) => i.project_id == e.project_id);
    },
    ...mapActions(["getProject"]),
    async getDataProject() {
      try {
        const resp = await this.getProject();
      } catch (e) {
        console.log(e);
      }
    },
    closeDialogCreate() {
      this.$refs.form.reset();
      this.dialogCreate = false;
    },
    selectServer() {
      axios
        .get("http://localhost:8080/server/")
        .then((res) => {
          this.dataServer = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    createServer() {
      axios
        .post("http://localhost:8080/server/save-server", {
          keterangan: this.keterangan,
          project_id: this.select,
          server_id: this.serverId,
          server_ip: this.serverIp,
          username: this.username,
        })
        .then((res) => {
          this.selectServer();
          (this.keterangan = ""),
            (this.select = 0),
            (this.dialogCreate = false),
            (this.serverIp = "");
          this.serverId = "";
          this.username = "";

          Swal.fire({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The entered username is not available!",
          });
        });
    },
    editServer(dataServer) {
      this.dialogEdit = true;
      this.editProjectId = dataServer.project_id;
      this.editServerId = dataServer.server_id;
      this.editServerIp = dataServer.server_ip;
      this.editKeterangan = dataServer.keterangan;
      this.editUsername = dataServer.username;
    },
    updateServer() {
      axios
        .put("http://localhost:8080/server/update-server", {
          keterangan: this.editKeterangan,
          project_id: this.editProjectId,
          server_id: this.editServerId,
          server_ip: this.editServerIp,
          username: this.editUsername,
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
            text: "The entered username is not available!",
          });
        });
    },
    getDelete(dataServer) {
      this.dialogDelete = true;
      this.deleteServerId = dataServer.server_id;
      this.deleteUsername = dataServer.server_ip;
    },
    deleteServer() {
      const id = this.deleteServerId;
      axios
        .delete(`http://localhost:8080/server/delete-server/${id}`, {
          data: {
            server_id: this.deleteServerId,
          },
        })
        .then((res) => {
          this.selectServer();
          this.dialogDelete = false;
          Swal.fire({
            icon: "success",
            title: "Data Project has been deleted",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The entered username is not available!",
          });
        });
    },
  },
};
// import Swal from "sweetalert2";
// import SideBar from "@/components/SideBar";
// import axios from "axios";

// export default {
//   components: {
//     SideBar,
//   },
//   data: () => ({
//     anchor: "Example CSV",
//     niceBytes: "",
//     link: "https://drive.google.com/uc?export=download&id=15DXlXfxEea77agug287Wu65NGUk-KkaP",
//     dialog: false,
//     dragover: false,
//     messageUploading: "",
//     uploadedFile: [],
//     selectedFile: null,
//     uploadPercentage: 0,
//     loading: false,
//     messagesUploading: "",
//     isSuccess: null,
//     blob: null,
//     checkingDialog: false,
//     deleteScreenName: "",
//     dataSosmed: [],
//     dialogCreate: false,
//     dialogEdit: false,
//     dialogDelete: false,
//     search: "",
//     valid: false,
//     getSosmed: {
//       screenName: "",
//       email: "",
//       select: "",
//       phoneNo: 0,
//       accessToken: "",
//       accessTokenSecret: "",
//       description: "",
//       password: "",
//       id: "",
//       appName: "",
//       status: "",
//       username: "",
//       consumerSecret: "",
//       consumerKey: "",
//     },
//     editSosmed: {
//       editScreenName: "",
//       editEmail: "",
//       editPhoneNo: 0,
//       editAccessToken: "",
//       editAccessTokenSecret: "",
//       editAppName: "",
//       editDescription: "",
//       editPassword: "",
//       editType: "",
//       editStatus: "",
//       editUsername: "",
//       editConsomerSecret: "",
//       editConsumerKey: "",
//     },

//     rules: {
//       required: (value) => !!value || "Required.",
//       email: (value) => {
//         const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//         return pattern.test(value) || "Invalid Email.";
//       },
//       number: (value) => {
//         const pattern = /^[0-9]+$/;
//         return pattern.test(value) || "Number Only.";
//       },
//     },

//     headers: [
//       { text: "Id", value: "id" },
//       { text: "Username", value: "username" },
//       { text: "Email", value: "email" },
//       { text: "Phone No", value: "phone_no" },
//       { text: "Password", value: "password" },
//       { text: "Status", value: "status" },
//       { text: "Type", value: "type" },
//       { text: "Description", value: "description" },
//       { text: "App Name", value: "app_name" },
//       { text: "Screen Name", value: "screen_name" },
//       { text: "Consumer Key", value: "consumer_key" },
//       { text: "Consumer Secret", value: "consumer_secret" },
//       { text: "Access Token", value: "access_token" },
//       { text: "Access Token Secret", value: "access_token_secret" },
//       { text: "Actions", value: "actions", sortable: false },
//     ],

//     dataStatus: ["Active", "Available", "Non Active", "Blocked"],
//     permissions: [
//       {
//         name: "Facebook",
//         flag: "mdi-facebook",
//       },
//       {
//         name: "Instagram",
//         flag: "mdi-instagram",
//       },

//       {
//         name: "Telegram",
//         flag: "mdi-telegram",
//       },
//       {
//         name: "Tiktok",
//         flag: "mdi-music-box",
//       },
//       {
//         name: "Twitter",
//         flag: "mdi-twitter",
//       },
//       {
//         name: "Whatsapp",
//         flag: "mdi-whatsapp",
//       },
//     ],
//   }),
//   created() {
//     this.selectSosmed();
//   },
//   computed: {
//     resultData() {
//       if (this.search) {
//         return this.dataSosmed.filter((i) =>
//           i.status.toLowerCase().includes(this.search.toLowerCase())
//         );
//       } else {
//         return this.dataSosmed;
//       }
//     },
//   },
//   methods: {
//     bytesToSize(bytes) {
//       const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
//       if (bytes === 0) return "n/a";
//       const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
//       if (i === 0) return `${bytes} ${sizes[i]})`;
//       return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
//     },
//     closeDialog() {
//       this.selectedFile = null;
//       this.uploadPercentage = 0;
//       this.isSuccess = null;
//       this.messageUploading = "";
//       this.dialog = false;
//     },
//     closeDialogCreate() {
//       this.$refs.form.reset();
//       this.dialogCreate = false;
//     },
//     removeFile() {
//       this.selectedFile = null;
//       this.isSuccess = null;
//       this.messageUploading = "";
//       this.uploadPercentage = 0;
//     },
//     onDrop(e) {
//       this.dragover = false;
//       if (this.selectedFile === null) this.selectedFile = null;
//       else this.selectedFile = e.target.files[0];
//       this.blob = URL.createObjectURL(this.selectedFile);
//     },
//     submit() {
//       if (this.selectedFile !== null) {
//         this.isSuccess = null;
//         this.messageUploading = "";
//         let formData = new FormData();

//         formData.append("file", this.selectedFile);
//         axios
//           .post("http://localhost:8080/account/upload", formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//             onUploadProgress: function (progressEvent) {
//               this.uploadPercentage = parseInt(
//                 Math.round((progressEvent.loaded / progressEvent.total) * 100)
//               );
//               if (this.uploadPercentage === 100) {
//                 this.loading = true;
//               }
//             }.bind(this),
//           })
//           .then((response) => {
//             this.dataProcessing = response.data;
//             this.loading = false;
//             this.isSuccess = true;
//             this.messageUploading = Swal.fire({
//               icon: "success",
//               title: "Congratulation! Your upload successfully done",
//               showConfirmButton: false,
//               timer: 2000,
//             });
//             this.closeDialog();
//           })
//           .catch((err) => {
//             Swal.fire({
//               icon: "error",
//               title: "Oops...",
//               text: "Sorry Something Wrong!",
//             });
//           });
//       }
//     },
//     iconClick() {
//       this.$refs.uploader.click();
//     },
//     onFileChanged(e) {
//       this.selectedFile = e.target.files[0];
//       // this.blob = URL.createObjectURL(this.selectedFile);
//     },

//     selectSosmed() {
//       axios
//         .get("http://localhost:8080/account/")
//         .then((res) => {
//           this.dataSosmed = res.data;
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//     createSosmed() {
//       axios
//         .post("http://localhost:8080/account/save-account", {
//           access_token: this.getSosmed.accessToken,
//           access_token_secret: this.getSosmed.accessTokenSecret,
//           app_name: this.getSosmed.select,
//           consumer_key: this.getSosmed.consumerKey,
//           consumer_secret: this.getSosmed.consumerSecret,
//           description: this.getSosmed.description,
//           email: this.getSosmed.email,
//           id: this.getSosmed.id,
//           password: this.getSosmed.password,
//           phone_no: this.getSosmed.phoneNo,
//           screen_name: this.getSosmed.screenName,
//           status: this.getSosmed.status,
//           type: this.getSosmed.select,
//           username: this.getSosmed.username,
//         })
//         .then((res) => {
//           this.selectSosmed();
//           (this.keterangan = ""),
//             (this.projectId = 0),
//             (this.dialogCreate = false),
//             (this.projectName = "");

//           Swal.fire({
//             icon: "success",
//             title: "Your work has been saved",
//             showConfirmButton: false,
//             timer: 2000,
//           });
//         })
//         .catch((err) => {
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Sorry! Something went wrong",
//           });
//         });
//     },
//     getEditSosmed(dataSosmed) {
//       this.dialogEdit = true;
//       this.editSosmed.editStatus = dataSosmed.status;
//       this.editSosmed.editConsumerKey = dataSosmed.consumer_key;
//       this.editSosmed.editDescription = dataSosmed.description;
//       this.editSosmed.editUsername = dataSosmed.username;
//       this.editSosmed.editEmail = dataSosmed.email;
//       this.editSosmed.editAccessToken = dataSosmed.access_token;
//       this.editSosmed.editAppName = dataSosmed.app_name;
//       this.editSosmed.editAccessTokenSecret = dataSosmed.access_token_secret;
//       this.editSosmed.editConsomerSecret = dataSosmed.consumer_secret;
//       this.editSosmed.editPassword = dataSosmed.password;
//       this.editSosmed.editPhoneNo = dataSosmed.phone_no;
//       this.editSosmed.editScreenName = dataSosmed.screen_name;
//     },
//     updateSosmed() {
//       axios
//         .put("http://localhost:8080/account/update-account", {
//           id: 14,
//           screen_name: this.editSosmed.editScreenName,
//           email: this.editSosmed.editEmail,
//           phone_no: this.editSosmed.editPhoneNo,
//           password: this.editSosmed.editPassword,
//           status: this.editSosmed.editStatus,
//           type: this.editSosmed.editType,
//           app_name: this.editSosmed.editAppName,
//           consumer_key: this.editSosmed.editConsumerKey,
//           consumer_secret: this.editSosmed.editConsumerKey,
//           access_token: this.editSosmed.editAccessToken,
//           access_token_secret: this.editSosmed.editAccessTokenSecret,
//           username: this.editSosmed.editUsername,
//           description: this.editSosmed.editDescription,
//         })
//         .then((res) => {
//           this.selectSosmed();
//           this.dialogEdit = false;
//           Swal.fire({
//             icon: "success",
//             title: "Data Project has been updated",
//             showConfirmButton: false,
//             timer: 2000,
//           });
//         })
//         .catch((err) => {
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "The entered username is not available!",
//           });
//         });
//     },
//     getDelete(dataSosmed) {
//       this.dialogDelete = true;
//       this.deleteScreenName = dataSosmed.screen_name;
//     },
//     deleteSosmed() {
//       const id = this.deleteScreenName;
//       axios
//         .delete(`http://localhost:8080/account/delete-account/${id}`, {
//           data: {
//             screen_name: this.deleteScreenName,
//           },
//         })
//         .then((res) => {
//           this.selectSosmed();
//           this.dialogDelete = false;
//           Swal.fire({
//             icon: "success",
//             title: "Data Sosmed has been deleted",
//             showConfirmButton: false,
//             timer: 2000,
//           });
//         })
//         .catch((err) => {
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Sorry! Something went wrong",
//           });
//         });
//     },
//     getColor(dataStatus) {
//       let status = dataStatus?.toLowerCase();

//       if (status == "active") return "green";
//       else if (status == "non active") return "red";
//       else if (status == "available") return "warning";
//       else return "black";
//     },
//   },
// };
// // import SideBar from "@/components/SideBar";
// // import ServerManagement from "@/components/ServerManagement";
// // import ProjectManagement from "@/components/ProjectManagement";
// // import SosmedManagement from "@/components/SosmedManagement";
// // import MonitoringManagement from "@/components/MonitoringManagement";

// // export default {
// //   components: {
// //     SideBar,
// //     ServerManagement,
// //     ProjectManagement,
// //     SosmedManagement,
// //     MonitoringManagement,
// //   },

// //   data: () => ({
// //     tabs: null,
// //   }),
// // };
//
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
