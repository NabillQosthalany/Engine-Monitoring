<template>
  <v-data-table
      :headers="headers"
      :items="resultData"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:item.status="{ item }">
      <v-chip
          :color="getColor(item.status)"
          dark
      >
        {{ item.status ?? 'undifined' }}
      </v-chip>
    </template>

    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title class="mr-15">Sosmed Management</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <!--        Tombol Search-->
        <v-text-field
            class="mx-10                             "
            v-model="search"
            append-icon="mdi-magnify"
            label="Search By Status"
            single-line
            hide-details
        ></v-text-field>

        <v-btn class="mr-4" color="primary" dark @click="dialog = true">
          Upload
        </v-btn>


        <!--        Upload file -->
        <v-dialog persistent v-model="dialog" scrollable max-width="700px">
          <v-card
              @drop.prevent="onDrop($event)"
              @dragover.prevent="dragover = true"
              @dragenter.prevent="dragover = true"
              @dragleave.prevent="dragover = false"
              :class="{ 'grey lighten-2': dragover }"
          >
            <v-card-title>
              <v-spacer></v-spacer>
              <span class="font-weight-bold">Upload File</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeDialog">
                <v-icon color="gray">mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row
                  v-if="selectedFile === null"
                  class="d-flex flex-column"
                  dense
                  align="center"
                  justify="center"
              >
                <v-icon
                    @click="iconClick"
                    :class="[dragover ? 'mt-2, mb-6' : 'mt-5']"
                    size="60"
                >
                  mdi-cloud-upload
                </v-icon>
                <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    accept=".text/csv"
                    @change="onFileChanged"
                />
                <p>Click to select them.</p>
              </v-row>
              <template v-if="selectedFile !== null">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ selectedFile.name }}
                      <span class="ml-3 text--secondary">
                    {{  bytesToSize(selectedFile.size) }}</span
                      >
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn @click.stop="removeFile()" icon>
                      <v-icon color="error"> mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <object :data="blob" width="100%" height="400"/>
                <div v-if="isSuccess !== null" class="text-center">
                  <strong
                      :class="{
                  'error--text': !isSuccess,
                  'success--text': isSuccess,
                }"
                  >
                    {{ messageUploading }}
                  </strong>
                </div>
                <v-progress-linear
                    v-if="uploadPercentage !== 0 && !loading && isSuccess === null"
                    height="25"
                    color="primary"
                >
                  <strong>{{ Math.ceil(uploadPercentage) }}%</strong>
                </v-progress-linear>

                <v-progress-linear
                    v-if="loading"
                    indeterminate
                    height="25"
                    color="primary"
                >
                  <div class="text-center">
                    <strong> Processing... Please Wait... </strong>
                  </div>
                </v-progress-linear>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  @click.stop="submit"
                  depressed
                  rounded
                  color="primary"
                  :disabled="selectedFile === null || loading"
                  class="mr-4"
              >
                Upload
              </v-btn>
              <a v-bind:href="link" target="_blank">{{ anchor }}</a>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <!--        Dialog Create-->
        <v-dialog v-model="dialogCreate" persistant max-width="700px">
          <template v-slot:activator="{on,attrs}">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Tambah
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
            <span class="headline">
              Tambah Data
            </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form
                    ref="form"
                    v-model="valid">
                  <v-row>
                    <v-col cols="3">
                      <v-text-field :rules="[rules.required]" label="Username" v-model="getSosmed.username" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field :rules="[rules.required]" label="Screen Name" v-model="getSosmed.screenName"
                                    required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field label="Email" v-model="getSosmed.email" :rules="[rules.required,rules.email]">
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field label="Phone No" v-model="getSosmed.phoneNo" :rules="[rules.required,rules.number]">
                        >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field label="Password" v-model="getSosmed.password" :rules="[rules.required]">
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                          v-model="getSosmed.status"
                          :items="dataStatus"
                          label="Status"
                          :rules="[rules.required]"
                      ></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                          v-model="getSosmed.select"
                          :items="permissions"
                          label="Type"
                          item-text="name"
                          :rules="[rules.required]"
                      >
                        <template v-slot:item="items">
                          <i :class="['mr-2', 'mdi',items.item.flag]"></i>
                          {{ items.item.name }}
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field disabled label="App Name" v-model="getSosmed.select" :rules="[rules.required]">
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field label="Description" v-model="getSosmed.description">
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field v-if="getSosmed.select == `Twitter`" label="Consumer Key false"
                                    v-model="getSosmed.consumerKey">
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field v-if="getSosmed.select == `Twitter`" label="Consumer Secret"
                                    v-model="getSosmed.consumerSecret">
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field v-if="getSosmed.select == `Twitter`" label="Access Token"
                                    v-model="getSosmed.accessToken">
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field v-if="getSosmed.select == `Twitter`" label="Access Token Secret"
                                    v-model="getSosmed.accessTokenSecret">
                      </v-text-field>
                    </v-col>

                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-draken-1" text @click="closeDialogCreate">Batal</v-btn>
              <v-btn color="blue-draken-1" :disabled="!valid" text @click="createSosmed">Tambah</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--        Dialog Edit-->
        <v-dialog v-model="dialogEdit" persistant max-width="700px">
          <v-card>
            <v-card-title>
            <span class="headline">
              Update Data Project
            </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="3">
                    <v-text-field :rules="[rules.required]" label="Username" v-model="editSosmed.editUsername" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field :rules="[rules.required]" label="Screen Name" v-model="editSosmed.editScreenName"
                                  required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field label="Email" v-model="editSosmed.editEmail" :rules="[rules.required]">
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field label="Phone No" v-model="editSosmed.editPhoneNo" :rules="[rules.required]">
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field label="Password" v-model="editSosmed.editPassword" :rules="[rules.required]">
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                        v-model="editSosmed.editStatus"
                        :items="dataStatus"
                        label="Status"
                        :rules="[rules.required]"
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field label="App Name" v-model="editSosmed.editAppName" :rules="[rules.required]">
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field label="Description" v-model="editSosmed.editDescription">
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-if="getSosmed.select == `Twitter`" label="Consumer Key false"
                                  v-model="editSosmed.editConsumerKey">
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-if="getSosmed.select == `Twitter`" label="Consumer Secret"
                                  v-model="editSosmed.editConsomerSecret">
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-if="getSosmed.select == `Twitter`" label="Access Token"
                                  v-model="editSosmed.editAccessToken">
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-if="getSosmed.select == `Twitter`" label="Access Token Secret"
                                  v-model="editSosmed.editAccessTokenSecret">
                    </v-text-field>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-draken-1" text @click="dialogEdit = false">Batal</v-btn>
              <v-btn color="blue-draken-1" text @click="updateSosmed">Ubah</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--        Dialog Delete-->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-draken-1" text @click="dialogDelete = false">Batal</v-btn>
              <v-btn color="blue-draken-1" text @click="deleteSosmed()">Delete</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="getEditSosmed(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="getDelete(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes'

export default {
  data: () => ({
    anchor: 'Example CSV',
    niceBytes: '',
    link: 'https://drive.google.com/uc?export=download&id=15DXlXfxEea77agug287Wu65NGUk-KkaP',
    dialog: false,
    dragover: false,
    messageUploading: '',
    uploadedFile: [],
    selectedFile: null,
    uploadPercentage: 0,
    loading: false,
    messagesUploading: '',
    isSuccess: null,
    blob: null,
    checkingDialog: false,
    deleteScreenName: '',
    dataSosmed: [],
    dialogCreate: false,
    dialogEdit: false,
    dialogDelete: false,
    search: '',
    valid: false,
    getSosmed: {
      screenName: '',
      email: '',
      select: '',
      phoneNo: 0,
      accessToken: '',
      accessTokenSecret: '',
      description: '',
      password: '',
      id: '',
      appName: '',
      status: '',
      username: '',
      consumerSecret: '',
      consumerKey: ''
    },
    editSosmed: {
      editScreenName: '',
      editEmail: '',
      editPhoneNo: 0,
      editAccessToken: '',
      editAccessTokenSecret: '',
      editAppName: '',
      editDescription: '',
      editPassword: '',
      editType: '',
      editStatus: '',
      editUsername: '',
      editConsomerSecret: '',
      editConsumerKey: ''
    },


    rules: {
      required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return pattern.test(value) || 'Invalid Email.'
      },
      number: value => {
        const pattern = /^[0-9]+$/
        return pattern.test(value) || 'Number Only.'
      },
    },

    headers: [

      {text: 'Id', value: 'id'},
      {text: 'Username', value: 'username'},
      {text: 'Email', value: 'email'},
      {text: 'Phone No', value: 'phone_no'},
      {text: 'Password', value: 'password'},
      {text: 'Status', value: 'status'},
      {text: 'Type', value: 'type'},
      {text: 'Description', value: 'description'},
      {text: 'App Name', value: 'app_name'},
      {text: 'Screen Name', value: 'screen_name'},
      {text: 'Consumer Key', value: 'consumer_key'},
      {text: 'Consumer Secret', value: 'consumer_secret'},
      {text: 'Access Token', value: 'access_token'},
      {text: 'Access Token Secret', value: 'access_token_secret'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],

    dataStatus: [
      'Active',
      'Available',
      'Non Active',
      'Blocked'

    ],
    permissions: [
      {
        name: "Facebook",
        flag: "mdi-facebook"
      },
      {
        name: "Instagram",
        flag: "mdi-instagram"
      },

      {
        name: "Telegram",
        flag: "mdi-telegram"
      },
      {
        name: "Tiktok",
        flag: "mdi-music-box"
      },
      {
        name: "Twitter",
        flag: "mdi-twitter"
      },
      {
        name: "Whatsapp",
        flag: "mdi-whatsapp"
      }
    ],
  }),
  created() {
    this.selectSosmed()
  },
  computed: {
    resultData() {
      if (this.search) {
        return this.dataSosmed.filter(i => i.status.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        return this.dataSosmed
      }
    }
  },
  methods: {
    bytesToSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) return 'n/a'
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
      if (i === 0) return `${bytes} ${sizes[i]})`
      return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
    },
    closeDialog() {
      this.selectedFile = null;
      this.uploadPercentage = 0;
      this.isSuccess = null;
      this.messageUploading = "";
      this.dialog = false
    },
    closeDialogCreate() {
      this.$refs.form.reset()
      this.dialogCreate = false

    },
    removeFile() {
      this.selectedFile = null;
      this.isSuccess = null;
      this.messageUploading = "";
      this.uploadPercentage = 0;
    },
    onDrop(e) {
      this.dragover = false;
      if (this.selectedFile === null) this.selectedFile = null;
      else this.selectedFile = e.target.files[0];
      this.blob = URL.createObjectURL(this.selectedFile);
    },
    submit() {
      if (this.selectedFile !== null) {
        this.isSuccess = null;
        this.messageUploading = "";
        let formData = new FormData();

        formData.append("file", this.selectedFile);
        axios
            .post("http://localhost:8080/account/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: function (progressEvent) {
                this.uploadPercentage = parseInt(
                    Math.round((progressEvent.loaded / progressEvent.total) * 100)
                );
                if (this.uploadPercentage === 100) {
                  this.loading = true;
                }
              }.bind(this),
            })
            .then((response) => {
              this.dataProcessing = response.data;
              this.loading = false;
              this.isSuccess = true;
              this.messageUploading =

              Swal.fire({
                icon: 'success',
                title:  "Congratulation! Your upload successfully done",
                showConfirmButton: false,
                timer: 2000
              })
              this.closeDialog();
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sorry Something Wrong!',
              })
            })
      }
    },
    iconClick() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      // this.blob = URL.createObjectURL(this.selectedFile);
    },

    selectSosmed() {
      axios.get('http://localhost:8080/account/')
          .then(res => {
            this.dataSosmed = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    createSosmed() {
      axios.post('http://localhost:8080/account/save-account', {
        "access_token": this.getSosmed.accessToken,
        "access_token_secret": this.getSosmed.accessTokenSecret,
        "app_name": this.getSosmed.select,
        "consumer_key": this.getSosmed.consumerKey,
        "consumer_secret": this.getSosmed.consumerSecret,
        "description": this.getSosmed.description,
        "email": this.getSosmed.email,
        "id": this.getSosmed.id,
        "password": this.getSosmed.password,
        "phone_no": this.getSosmed.phoneNo,
        "screen_name": this.getSosmed.screenName,
        "status": this.getSosmed.status,
        "type": this.getSosmed.select,
        "username": this.getSosmed.username
      })
          .then(res => {
            this.selectSosmed()
            this.keterangan = '',
                this.projectId = 0,
                this.dialogCreate = false,
                this.projectName = ''

            Swal.fire({
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 2000
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Sorry! Something went wrong',
            })
          })
    },
    getEditSosmed(dataSosmed) {
      this.dialogEdit = true
      this.editSosmed.editStatus = dataSosmed.status
      this.editSosmed.editConsumerKey = dataSosmed.consumer_key
      this.editSosmed.editDescription = dataSosmed.description
      this.editSosmed.editUsername = dataSosmed.username
      this.editSosmed.editEmail = dataSosmed.email
      this.editSosmed.editAccessToken = dataSosmed.access_token
      this.editSosmed.editAppName = dataSosmed.app_name
      this.editSosmed.editAccessTokenSecret = dataSosmed.access_token_secret
      this.editSosmed.editConsomerSecret = dataSosmed.consumer_secret
      this.editSosmed.editPassword = dataSosmed.password
      this.editSosmed.editPhoneNo = dataSosmed.phone_no
      this.editSosmed.editScreenName = dataSosmed.screen_name
    },
    updateSosmed() {
      axios.put('http://localhost:8080/account/update-account', {
        "id": 14,
        "screen_name": this.editSosmed.editScreenName,
        "email": this.editSosmed.editEmail,
        "phone_no": this.editSosmed.editPhoneNo,
        "password": this.editSosmed.editPassword,
        "status": this.editSosmed.editStatus,
        "type": this.editSosmed.editType,
        "app_name": this.editSosmed.editAppName,
        "consumer_key": this.editSosmed.editConsumerKey,
        "consumer_secret": this.editSosmed.editConsumerKey,
        "access_token": this.editSosmed.editAccessToken,
        "access_token_secret": this.editSosmed.editAccessTokenSecret,
        "username": this.editSosmed.editUsername,
        "description": this.editSosmed.editDescription
      })
          .then(res => {
            this.selectSosmed();
            this.dialogEdit = false
            Swal.fire({
              icon: 'success',
              title: 'Data Project has been updated',
              showConfirmButton: false,
              timer: 2000
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'The entered username is not available!',
            })
          })
    },
    getDelete(dataSosmed) {
      this.dialogDelete = true
      this.deleteScreenName = dataSosmed.screen_name
    },
    deleteSosmed() {
      const id = this.deleteScreenName;
      axios.delete(`http://localhost:8080/account/delete-account/${id}`, {
        data: {
          screen_name: this.deleteScreenName
        }
      })
          .then(res => {
            this.selectSosmed();
            this.dialogDelete = false
            Swal.fire({
              icon: 'success',
              title: 'Data Sosmed has been deleted',
              showConfirmButton: false,
              timer: 2000
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Sorry! Something went wrong',
            })
          })
    },
    getColor(dataStatus) {
      let status = dataStatus?.toLowerCase()

      if (status == 'active') return 'green'
      else if (status == 'non active') return 'red'
      else if (status == 'available') return 'warning'
      else return 'black'
    }

  }
}
</script>
<style>
a {
  text-decoration: none;
  color: #fff;
}
</style>