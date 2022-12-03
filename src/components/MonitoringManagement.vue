<template>
  <v-data-table
      :headers="headers"
      :items="resultData"
      sort-by="calories"
      class="elevation-1"
      @click:row="(item) => handleClick(item)"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title class="mr-15"
        >Monitoring Management
        </v-toolbar-title>
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
            label="Search"
            single-line
            hide-details
        ></v-text-field>

        <!--        View All Data-->
          <v-dialog v-model="dialogViewData" persistant max-width="700px">
            <v-card>
              <v-card-title>
            <span class="headline">
              All Data
            </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field  label="Monitoring Id" v-model="allData.viewMonitoringId" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Username" v-model="allData.viewUsername" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Name" v-model="allData.viewName" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Path" v-model="allData.viewPath" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Type" v-model="allData.viewType" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Port" v-model="allData.viewPort" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Project Id" v-model="allData.viewProjectId" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Server Id" v-model="allData.viewServerId" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Running Command" v-model="allData.viewRunningCommand" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Running On" v-model="allData.viewRunningOn" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Last Update" v-model="allData.viewLastUpdate" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Git Url" v-model="allData.viewGitUrl" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Haproxy" v-model="allData.viewHaproxy" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Haproxy Port" v-model="allData.viewHaproxy_port" required>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue-draken-1" text @click="dialogViewData = false">Back</v-btn>
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
                    <v-col cols="4">
                      <v-text-field label="Username" v-model="username" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field  :rules="[rules.required]" label="Name" v-model="name" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field  :rules="[rules.required]" label="Path" v-model="path" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                          v-model="selectType"
                          :items="listType"
                          label="Type"
                          :rules="[rules.required]"
                          required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field  :rules="[rules.required,rules.number]" label="Port" v-model="port" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                          v-model="selectProjectName"
                          :items="listproject"
                          item-value="project_name"
                          item-text="project_name"
                          label="Project Name"
                          :rules="[rules.required]"
                          required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                          v-model="select"
                          :items="listproject"
                          item-value="project_id"
                          item-text="project_id"
                          label="Project Id"
                          :rules="[rules.required]"
                          required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                          v-model="selectServer"
                          :items="listServer"
                          item-value="server_id"
                          item-text="server_id"
                          label="Server Id"
                          :rules="[rules.required]"
                          required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field  :rules="[rules.required]" label="Running Command" v-model="runningCommand" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field  :rules="[rules.required,rules.number]" label="Running On" v-model="runningOn" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field  :rules="[rules.required]" label="Git Url" v-model="gitUrl" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field  :rules="[rules.required,rules.number]" label="Haproxy Ip" v-model="haproxy" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field  :rules="[rules.required,rules.number]"label="Haproxy Port" v-model="haproxyPort" required>
                      </v-text-field>
                    </v-col>
                  </v-row>

                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-draken-1" text @click="closeDialogCreate">Batal</v-btn>
              <v-btn color="blue-draken-1" text :disabled="!valid" @click="createMonitoring">Tambah</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--        Dialog Edit-->
        <v-dialog v-model="dialogEdit" persistant max-width="700px">
          <v-card>
            <v-card-title>
            <span class="headline">
              Update Data
            </span>
            </v-card-title>
            <v-card-text v-model="valid">
              <v-container>
                <v-form
                    ref="form"
                v-model="valid">
                  <v-row>
                    <v-col cols="4">
                      <v-text-field label="Username" v-model="monitoringEdit.editUsername" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Name" v-model="monitoringEdit.editName" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Path" v-model="monitoringEdit.editPath" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                          v-model="monitoringEdit.editType"
                          :items="listType"
                          label="Type"
                          required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Port" v-model="monitoringEdit.editPort" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                          v-model="monitoringEdit.editProjectId"
                          :items="listServer"
                          item-value="server_id"
                          item-text="server_id"
                          label="Server Id"
                          required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                          v-model="monitoringEdit.editServerId"
                          :items="listServer"
                          item-value="server_id"
                          item-text="server_id"
                          label="Server Id"
                          required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Running Command" v-model="monitoringEdit.editRunningCommand" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Running On" v-model="monitoringEdit.editRunningOn" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Last Update" v-model="monitoringEdit.editLastUpdate" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Git Url" v-model="monitoringEdit.editGitUrl" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Haproxy Ip" v-model="monitoringEdit.editHaproxy" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field label="Haproxy Port" v-model="monitoringEdit.editHaproxyPort" required>
                      </v-text-field>
                    </v-col>
                  </v-row>

                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-draken-1" text @click="closeDialogEdit">Batal</v-btn>
              <v-btn color="blue-draken-1" text @click="updateMonitoring">Tambah</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--        Dialog Delete-->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-draken-1" text @click="closeDialogDelete">Batal</v-btn>
              <v-btn color="blue-draken-1" text @click="deleteMonitoring()">Delete</v-btn>
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
          @click.stop="editMonitoring(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click.stop="getDelete(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import Swal from "sweetalert2";

import axios from "axios";
import {mapActions, mapState} from "vuex";

export default {
  data: () => ({
    monitoringData: [],
    dialogCreate: false,
    dialogEdit: false,
    dialogDelete: false,
    dialogViewData: false,
    projectId: '',
    port: 0,
    path: 0,
    gitUrl: '',
    haproxy: 0,
    haproxyPort: 0,
    monitoringId: 0,
    runningOn: 0,
    runningCommand: '',
    projectName:'',
    lastUpdate: '',
    name: '',
    username: '',
    search: '',
    delete_monitoringId: '',
    valid: false,
    select: ' ',
    selectServer: null,
    selectProjectName:null,
    allData: {
      viewProjectId: 0,
      viewProjectName:'',
      viewPort: '',
      viewPath: '',
      viewGitUrl: '',
      viewHaproxy: '',
      viewHaproxy_port: '',
      viewMonitoringId: '',
      viewRunningOn: '',
      viewRunningCommand: '',
      viewLastUpdate: '',
      viewName: '',
      viewServerId: '',
      viwType: '',
      viewUsername: '',
    },
    monitoringEdit: {
      editProjectId: 0,
      editProjectName: '',
      editPort: 0,
      editPath: 0,
      editGitUrl: '',
      editHaproxy: 0,
      editHaproxyPort: 0,
      editMonitoringId: 0,
      editRunningOn: 0,
      editRunningCommand: '',
      editLastUpdate: '',
      editName: '',
      editServerId: 0,
      editType: 0,
      editUsername: ''
    },
    selectType: '',
    headers: [
      {text: 'Username', value: 'username'},
      {text: 'Name', value: 'name'},
      {text: 'Path', value: 'path'},
      {text: 'Type', value: 'type'},
      {text: 'Port', value: 'port'},
      {text: 'Actions', value: 'actions', sortable: false},

      // {text: 'Haproxy', value: 'haproxy'},
      // {text: 'Haproxy Port', value: 'haproxy_port'},
      // {text: 'Git_url', value: 'git_url'},
      // {text: 'Running On', value: 'running_on'},
      // {text: 'Running Command', value: 'running_command'},
      // {text: 'Last Update', value: 'last_update'},
    ],


    rules: {
      required: value => !!value || 'Required.',
      number: value => {
        const pattern =  /^[0-9]+$/
        return pattern.test(value) || 'Number Only.'
      },
    },
    listType: [
      1,
     2
    ],
  }),
  created() {
    this.getMonitoring()
    this.getDataProject()
    this.getDataServer()
  },
  computed: {
    ...mapState(["listproject"]),
    ...mapState(["listServer"]),

    resultData() {
      if (this.search) {
        return this.monitoringData.filter(i => i.name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        return this.monitoringData
      }
    }
  },
  methods: {
    closeDialogCreate() {
      this.$refs.form.reset()
      this.dialogCreate = false
    },
    closeDialogEdit() {
      this.$refs.form.reset()
      this.dialogEdit = false
      this.dialogViewData = false
    },
    closeDialogDelete() {
      this.dialogDelete = false
      this.dialogViewData = false
    },

    handleClick(monitoringData) {

      this.dialogViewData = true
      this.allData.viewGitUrl = monitoringData.git_url
      this.allData.viewHaproxy = monitoringData.haproxy
      this.allData.viewHaproxy_port = monitoringData.haproxy_port
      this.allData.viewName = monitoringData.name
      this.allData.viewPath = monitoringData.path
      this.allData.viewPort = monitoringData.port
      this.allData.viewProjectName = monitoringData.project_name
      this.allData.viewServerId = monitoringData.server_id
      this.allData.viewMonitoringId = monitoringData.monitoring_id
      this.allData.viewRunningCommand = monitoringData.running_command
      this.allData.viewProjectId = monitoringData.project_id
      this.allData.viewRunningOn = monitoringData.running_on
      this.allData.viewProjectId = monitoringData.project_id
      this.allData.viewUsername = monitoringData.username
      this.allData.viewLastUpdate = monitoringData.last_update
      this.allData.viewType = monitoringData.type
    },

    ...mapActions(["getProject"]),
    async getDataProject() {
      try {
        const resp = await this.getProject();
      } catch (e) {
        console.log(e)
      }
    },
    ...mapActions(["getServer"]),
    async getDataServer() {
      try {
        const resp = await this.getServer();
      } catch (e) {
        console.log(e)
      }
    },
    getMonitoring() {
      axios.get('http://localhost:8080/monitoring/')
          .then(res => {
            this.monitoringData = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    createMonitoring() {
      axios.post('http://localhost:8080/monitoring/save-monitoring', {
        "git_url": this.gitUrl,
        "haproxy": this.haproxy,
        "haproxy_port": this.haproxyPort,
        "last_update": this.lastUpdate,
        "monitoring_id": this.monitoringId,
        "name": this.name,
        "path": this.path,
        "port": this.port,
        "project_name":this.projectName,
        "project_id": this.select,
        "running_command": this.runningCommand,
        "running_on": this.runningOn,
        "server_id": this.selectServer,
        "type": this.selectType,
        "username": this.username
      })
          .then(res => {
            this.getMonitoring()
            this.dialogCreate = false,
                this.gitUrl = '',
                this.haproxy = 0,
                this.haproxy_port = 0,
                this.lastUpdate = 0,
                this.monitoringId = 0,
                this.name = '',
                this.path = '',
                this.port = 0,
                this.select = 0,
                this.runningCommand = '',
                this.runningOn = 0,
                this.selectServer = 0,
                this.selectType = 0,
                this.username = ''
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
              text: 'The entered username is not available!',
            })
          })
    },

    editMonitoring(monitoringData) {
      this.dialogViewData = true
      this.dialogEdit = true
      this.monitoringEdit.editGitUrl = monitoringData.git_url
      this.monitoringEdit.editPort = monitoringData.port
      this.monitoringEdit.editHaproxy = monitoringData.haproxy
      this.monitoringEdit.editHaproxyPort = monitoringData.haproxy_port
      this.monitoringEdit.editName = monitoringData.name
      this.monitoringEdit.editPath = monitoringData.path
      this.monitoringEdit.editServerId = monitoringData.server_id
      this.monitoringEdit.editMonitoringId = monitoringData.monitoring_id
      this.monitoringEdit.editRunningCommand = monitoringData.running_command
      this.monitoringEdit.editProjectId = monitoringData.project_id
      this.monitoringEdit.editRunningOn = monitoringData.running_on
      this.monitoringEdit.editProjectId = monitoringData.project_id
      this.monitoringEdit.editProjectId = monitoringData.project_id
      this.monitoringEdit.editUsername = monitoringData.username
      this.monitoringEdit.editLastUpdate = monitoringData.last_update
      this.monitoringEdit.editType = monitoringData.type
      this.monitoringEdit.editUsername = monitoringData.username
    },
    updateMonitoring() {
      axios.put('http://localhost:8080/monitoring/update-monitoring', {
        "git_url": this.monitoringEdit.editGitUrl,
        "haproxy": this.monitoringEdit.editHaproxy,
        "haproxy_port": this.monitoringEdit.editHaproxyPort,
        "last_update": this.monitoringEdit.editLastUpdate,
        "monitoring_id": this.monitoringEdit.editMonitoringId,
        "name": this.monitoringEdit.editName,
        "path": this.monitoringEdit.editPath,
        "port": this.monitoringEdit.editPort,
        "project_id": this.monitoringEdit.editProjectId,
        "running_command": this.monitoringEdit.editRunningCommand,
        "running_on": this.monitoringEdit.editRunningOn,
        "server_id": this.monitoringEdit.editServerId,
        "type": this.monitoringEdit.editType,
        "username": this.monitoringEdit.editUsername

      })
          .then(res => {
            this.getMonitoring();
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
    getDelete(monitoringData) {
       this.dialogViewData = false
        this.dialogDelete = true
        this.delete_monitoringId = monitoringData.monitoring_id

    },
    deleteMonitoring() {
      const id = this.delete_monitoringId;
      axios.delete(`http://localhost:8080/monitoring/delete-monitoring/${id}`, {
        data: {
          monitoring_id: this.delete_monitoringId
        }
      })
          .then(res => {
            this.getMonitoring();
            this.dialogDelete = false
            Swal.fire({
              icon: 'success',
              title: 'Data Project has been deleted',
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

  },
}
</script>