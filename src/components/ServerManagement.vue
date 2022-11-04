<template>

  <v-card flat color="#efefef">
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-data-table

                  :headers="headers2"
                  :items="desserts2"
                  :search="search2"
                  sort-by="calories"
                  class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar
                      flat
                  >
                    <v-toolbar-title
                        class="text-1"

                    >
                      Server Management
                    </v-toolbar-title>
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="px-10"
                                  v-model="search2"
                                  append-icon="mdi-magnify"
                                  label="Search"
                                  single-line
                                  hide-details
                    ></v-text-field>

                    <v-dialog
                        v-model="dialog2"
                        max-width="500px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                          New Item
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem2.serverId"
                                    label="Server Id"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem2.serverIp"
                                    label="Server Ip"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem2.description"
                                    label="description"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem2.projectId"
                                    label="Project Id"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem2.username"
                                    label="Username"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              color="blue darken-1"
                              text
                              @click="close2"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                              color="blue darken-1"
                              text
                              @click="save2"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete2" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete2">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="deleteItemConfirm2">OK</v-btn>
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
                      @click="editItem2(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                      small
                      @click="deleteItem2(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <template v-slot:no-data>
                  <v-btn
                      color="primary"
                      @click="initialize2"
                  >
                    Reset
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>

</template>
<script>
export default {
  name:"ServerManagement",
  data: () => ({
    dialog2: false,
    dialogDelete2: false,
    search2: '',
    tabs: null,
    headers2: [
      {
        text: 'Server Id',
        align: 'start',
        sortable: false,
        value: 'serverId',
      },
      {text: 'Server Ip', value: 'serverIp'},
      {text: 'description', value: 'description'},
      {text: 'Project Id', value: 'projectId'},
      {text: 'Username', value: 'username'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],

    desserts2: [],
    editedIndex2: -1,
    editedItem2: {
      serverId: '',
      serverIp: '',
      description: '',
      projectId: '',
      username: '',
    },
    defaultItem2: {
      serverId: '',
      serverIp: '',
      description: '',
      projectId: '',
      username: '',
    },


  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created2() {
    this.initialize2()
  },
  methods: {
    initialize2() {
      this.desserts2 = [
        {
          serverId: '',
          serverIp: '',
          description: '',
          projectId: '',
          username: '',
        },
      ]
    },
    editItem2(item) {
      this.editedIndex2 = this.desserts2.indexOf(item)
      this.editedItem2 = Object.assign({}, item)
      this.dialog2 = true
    },
    deleteItem2(item) {
      this.editedIndex2 = this.desserts2.indexOf(item)
      this.editedItem2 = Object.assign({}, item)
      this.dialogDelete2 = true
    },
    deleteItemConfirm2() {
      this.desserts2.splice(this.editedIndex2, 1)
      this.closeDelete2()
    },
    close2() {
      this.dialog2 = false
      this.$nextTick(() => {
        this.editedItem2 = Object.assign({}, this.defaultItem2)
        this.editedIndex2 = -2
      })
    },
    closeDelete2() {
      this.dialogDelete2 = false
      this.$nextTick(() => {
        this.editedItem2 = Object.assign({}, this.defaultItem2)
        this.editedIndex2 = -1
      })
    },
    save2() {
      if (this.editedIndex2 > -1) {
        Object.assign(this.desserts2[this.editedIndex2], this.editedItem2)
      } else {
        this.desserts2.push(this.editedItem2)
      }
      this.close2()
    }
  }
}
</script>