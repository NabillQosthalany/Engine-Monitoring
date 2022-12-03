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
        {{ item.status }}
      </v-chip>
    </template>
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title class="mr-15">Project Monitoring</v-toolbar-title>
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
            label="Search By Project"
            single-line
            hide-details
        ></v-text-field>

        <!--        Dialog Create-->
        <v-dialog v-model="dialogCreate" persistant max-width="500px">
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

                    <v-col cols="6">
                      <v-text-field :rules="[rules.required]" label="Project Name" v-model="projectName" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field  :rules="[rules.required]" label="Username" v-model="username" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field label="Keterangan" v-model="keterangan">
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                          v-model="select"
                          :items="dataStatus"
                          label="Status"
                          required
                      ></v-select>
                    </v-col>


                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-draken-1" text @click="closeDialogCreate">Batal</v-btn>
              <v-btn color="blue-draken-1" :disabled="!valid" text @click="createProject">Tambah</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--        Dialog Edit-->
        <v-dialog v-model="dialogEdit" persistant max-width="500px">
          <v-card>
            <v-card-title>
            <span class="headline">
              Update Data Project
            </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field :rules="Text2" label="Project Name" v-model="editProjectName" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field :rules="Text3" label="Keterangan" v-model="editKeterangan" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field disabled label="Username" v-model="editUsername" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                        v-model="editStatus"
                        :items="dataStatus"
                        label="Select"
                        required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-draken-1" text @click="dialogEdit = false">Batal</v-btn>
              <v-btn color="blue-draken-1" text @click="updateProject">Ubah</v-btn>
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
              <v-btn color="blue-draken-1" text @click="deleteProject()">Delete</v-btn>
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
          @click="editProject(item)"
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

export default {
  data: () => ({
    dataProject: [],
    dialogCreate: false,
    dialogEdit: false,
    dialogDelete: false,
    projectId: 0,
    search: '',
    projectName: '',
    keterangan: '',
    username: '',
    editProjectId: 0,
    editProjectName: '',
    editKeterangan: '',
    editUsername: '',
    editStatus: '',
    delete_projectId: '',
    delete_projectName: '',
    valid: false,
    select: '',

    rules: {
      required: value => !!value || 'Required.',
    },


    headers: [
      {text: 'Project Name', value: 'project_name'},
      {text: 'Keterangan', value: 'keterangan'},
      {text: 'Username', value: 'username'},
      {text: 'Status', value: 'status'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    Text2: [
      v => !!v || 'Project Name is required',
    ],
    Text3: [
      v => !!v || 'Keterangan is required',
    ],
    Text4: [
      v => !!v || 'Username is required',
    ],
    dataStatus: [
      'Active',
      'Available',
      'Non Active',
      'Blocked'
    ],
  }),
  created() {
    this.selectProject()
  },
  computed: {
    resultData() {
      if (this.search) {
        return this.dataProject.filter(i => i.project_name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        return this.dataProject
      }
    }
  },
  methods: {
    closeDialogCreate() {
      this.$refs.form.reset()
      this.dialogCreate = false
    },
    selectProject() {
      axios.get('http://localhost:8080/project/')
          .then(res => {
            this.dataProject = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },

    createProject() {
      axios.post('http://localhost:8080/project/save-project', {
        "keterangan": this.keterangan,
        "project_id": this.projectId,
        "project_name": this.projectName,
        "username": this.username,
        "status": this.select
      })
          .then(res => {
            this.selectProject()
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
              text: 'The entered username is not available!',
            })
          })
    },
    editProject(dataProject) {
      this.dialogEdit = true
      this.editProjectId = dataProject.project_id
      this.editProjectName = dataProject.project_name
      this.editKeterangan = dataProject.keterangan
      this.editUsername = dataProject.username
      this.editStatus = dataProject.status
    },
    updateProject() {
      axios.put('http://localhost:8080/project/update-project', {
        "keterangan": this.editKeterangan,
        "project_id": this.editProjectId,
        "project_name": this.editProjectName,
        "username": this.editUsername,
        "status": this.editStatus

      })
          .then(res => {
            this.selectProject();
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
    getDelete(dataProject) {
      this.dialogDelete = true
      this.delete_projectId = dataProject.project_id
      this.delete_projectName = dataProject.project_name
    },
    deleteProject() {
      const id = this.delete_projectId;
      console.log(this.delete_projectId)
      axios.delete(`http://localhost:8080/project/delete-project/${id}`, {
        data: {
          project_id: this.delete_projectId
        }
      })
          .then(res => {
            this.selectProject();
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
    getColor(dataStatus) {
      let status = dataStatus?.toLowerCase()

      if (status == 'active') return 'green'
      else if (status == 'non active') return 'red'
      else if (status == 'available') return 'warning'
      else return 'blocked'
    }

  },
}
</script>