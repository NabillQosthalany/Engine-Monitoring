<template>
  <v-app>
    <SideBar />
    <div class="content">
      <h1 class="header mb-2">Site Management</h1>
      <template>

          <v-toolbar
              color="#4f6499"
              dark
              flat
              prominent
              height="15rem"
              class="pt-1"
          >
            <template v-slot:extension>
              <v-tabs
                  v-model="tabs"
                  centered
                  class="mb-2"
              >
                <v-tab
                >
                  User Management
                </v-tab>
                <v-tab
                >
                  Server Management
                </v-tab>
                <v-tab
                >
                  Project Management
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card flat color="#efefef">
                <v-card-text>

<!--                  User Management Card-->

                  <v-container>
                    <v-row>
                      <v-col>
                        <v-card>
                          <v-data-table

                              :headers="headers"
                              :items="desserts"
                              :search="search"
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
                                  User Management
                                </v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-text-field class="px-10"
                                              v-model="search"
                                              append-icon="mdi-magnify"
                                              label="Search"
                                              single-line
                                              hide-details
                                ></v-text-field>

                                <v-dialog
                                    v-model="dialog"
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
                                                v-model="editedItem.username"
                                                label="Username"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                              cols="12"
                                              sm="6"
                                              md="4"
                                          >
                                            <v-text-field
                                                v-model="editedItem.project"
                                                label="Total Project Made "
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                              cols="12"
                                              sm="6"
                                              md="4"
                                          >
                                            <v-text-field
                                                v-model="editedItem.server"
                                                label="Total Server In Use"
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
                                          @click="close"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                          color="blue darken-1"
                                          text
                                          @click="save"
                                      >
                                        Save
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogDelete" max-width="500px">
                                  <v-card>
                                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
                                  @click="editItem(item)"
                              >
                                mdi-pencil
                              </v-icon>
                              <v-icon
                                  small
                                  @click="deleteItem(item)"
                              >
                                mdi-delete
                              </v-icon>
                            </template>
                            <template v-slot:no-data>
                              <v-btn
                                  color="primary"
                                  @click="initialize"
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
            </v-tab-item>
            <v-tab-item>
              <v-card flat  color="#efefef">
                <v-card-text>

<!--                  Server Management Card-->

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
            </v-tab-item>
            <v-tab-item>
              <v-card flat  color="#efefef">
                <v-card-text>

<!--                  Project Management Card-->

                  <v-container>
                    <v-row>
                      <v-col>
                        <v-card >
                          <v-data-table

                              :headers="headers3"
                              :items="desserts3"
                              :search="search3"
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
                                  Project Management
                                </v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-text-field class="px-10"
                                              v-model="search3"
                                              append-icon="mdi-magnify"
                                              label="Search"
                                              single-line
                                              hide-details
                                ></v-text-field>

                                <v-dialog
                                    v-model="dialog3"
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
                                                v-model="editedItem3.projectId"
                                                label="Project Id"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                              cols="12"
                                              sm="6"
                                              md="4"
                                          >
                                            <v-text-field
                                                v-model="editedItem3.projectName"
                                                label="Project Name"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                              cols="12"
                                              sm="6"
                                              md="4"
                                          >
                                            <v-text-field
                                                v-model="editedItem3.description"
                                                label="Description"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                              cols="12"
                                              sm="6"
                                              md="4"
                                          >
                                            <v-text-field
                                                v-model="editedItem3.username"
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
                                          @click="close3"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                          color="blue darken-1"
                                          text
                                          @click="save3"
                                      >
                                        Save
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogDelete3" max-width="500px">
                                  <v-card>
                                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" text @click="closeDelete3">Cancel</v-btn>
                                      <v-btn color="blue darken-1" text @click="deleteItemConfirm3">OK</v-btn>
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
                                  @click="editItem3(item)"
                              >
                                mdi-pencil
                              </v-icon>
                              <v-icon
                                  small
                                  @click="deleteItem3(item)"
                              >
                                mdi-delete
                              </v-icon>
                            </template>
                            <template v-slot:no-data>
                              <v-btn
                                  color="primary"
                                  @click="initialize3"
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
            </v-tab-item>
          </v-tabs-items>
      </template>








    </div>
  </v-app>
</template>
<script>
import SideBar from "@/components/SideBar";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialog2: false,
    dialogDelete2: false,
    dialog3: false,
    dialogDelete3: false,
    search: '',
    search2: '',
    search3: '',
    tabs: null,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    headers: [
      {
        text: 'Username',
        align: 'start',
        sortable: false,
        value: 'username',
      },
      { text: 'Total Project Made', value: 'project' },
      { text: 'Total servers in use', value: 'server' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    headers2: [
      {
        text: 'Server Id',
        align: 'start',
        sortable: false,
        value: 'serverId',
      },
      { text: 'Server Ip', value: 'serverIp' },
      { text: 'description', value: 'description' },
      { text: 'Project Id', value: 'projectId' },
      { text: 'Username', value: 'username' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    headers3: [
      {
        text: 'Project Id',
        align: 'start',
        sortable: false,
        value: 'projectId',
      },
      { text: 'Project Name', value: 'projectName' },
      { text: 'Description', value: 'description' },
      { text: 'Username', value: 'username' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      username: '',
      project: '',
      server: ''
    },
    defaultItem: {
      username: '',
      project: '',
      server: ''
    },

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

    desserts3: [],
    editedIndex3: -1,
    editedItem3: {
      projectId: '',
      projectName: '',
      description: '',
      username: '',
    },
    defaultItem3: {
      projectId: '',
      projectName: '',
      description: '',
      username: '',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },
  created2 () {
    this.initialize2()
  },
  created3 () {
    this.initialize3()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          username: 'KitKat',
          project: 518,
          server: 26.0,
        },
      ]
    },
    initialize2 () {
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
    initialize3 () {
      this.desserts3 = [
        {
          projectId: '',
          projectName: '',
          description: '',
          username: '',
        },
      ]
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    editItem2 (item) {
      this.editedIndex2 = this.desserts2.indexOf(item)
      this.editedItem2 = Object.assign({}, item)
      this.dialog2 = true
    },
    editItem3 (item) {
      this.editedIndex3 = this.desserts3.indexOf(item)
      this.editedItem3 = Object.assign({}, item)
      this.dialog3 = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItem2 (item) {
      this.editedIndex2 = this.desserts2.indexOf(item)
      this.editedItem2 = Object.assign({}, item)
      this.dialogDelete2 = true
    },
    deleteItem3 (item) {
      this.editedIndex3 = this.desserts3.indexOf(item)
      this.editedItem3 = Object.assign({}, item)
      this.dialogDelete3 = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    deleteItemConfirm2 () {
      this.desserts2.splice(this.editedIndex2, 1)
      this.closeDelete2()
    },
    deleteItemConfirm3 () {
      this.desserts3.splice(this.editedIndex3, 1)
      this.closeDelete2()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    close2 () {
      this.dialog2 = false
      this.$nextTick(() => {
        this.editedItem2 = Object.assign({}, this.defaultItem2)
        this.editedIndex2 = -2
      })
    },
    close3 () {
      this.dialog3 = false
      this.$nextTick(() => {
        this.editedItem3 = Object.assign({}, this.defaultItem3)
        this.editedIndex3 = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete2 () {
      this.dialogDelete2 = false
      this.$nextTick(() => {
        this.editedItem2 = Object.assign({}, this.defaultItem2)
        this.editedIndex2 = -1
      })
    },
    closeDelete3 () {
      this.dialogDelete3 = false
      this.$nextTick(() => {
        this.editedItem3 = Object.assign({}, this.defaultItem3)
        this.editedIndex3 = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    save2 () {
      if (this.editedIndex2 > -1) {
        Object.assign(this.desserts2[this.editedIndex2], this.editedItem2)
      } else {
        this.desserts2.push(this.editedItem2)
      }
      this.close2()
    },
    save3 () {
      if (this.editedIndex3 > -1) {
        Object.assign(this.desserts3[this.editedIndex3], this.editedItem3)
      } else {
        this.desserts3.push(this.editedItem3)
      }
      this.close3()
    },
  },
  components: {
    SideBar
  },
}
</script>
<style scoped>
.content{
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
.text-1{
  font-family: "Poppins", sans-serif;
}
v-data-table{
  font-family: "Poppins", sans-serif;

}
</style>
