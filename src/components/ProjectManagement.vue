<template>
    <v-card flat color="#efefef">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-card>
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
                          <v-card-title class="text-h5">Are you sure you want to delete this item?
                          </v-card-title>
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
</template>
<script>
export default {
  data: () => ({
    dialog3: false,
    dialogDelete3: false,
    search3: '',
    tabs: null,
    headers3: [
      {
        text: 'Project Id',
        align: 'start',
        sortable: false,
        value: 'projectId',
      },
      {text: 'Project Name', value: 'projectName'},
      {text: 'Description', value: 'description'},
      {text: 'Username', value: 'username'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
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
  created3() {
    this.initialize3()
  },

  methods:{
    initialize3() {
      this.desserts3 = [
        {
          projectId: '',
          projectName: '',
          description: '',
          username: '',
        },
      ]
    },

    editItem3(item) {
      this.editedIndex3 = this.desserts3.indexOf(item)
      this.editedItem3 = Object.assign({}, item)
      this.dialog3 = true
    },


    deleteItem3(item) {
      this.editedIndex3 = this.desserts3.indexOf(item)
      this.editedItem3 = Object.assign({}, item)
      this.dialogDelete3 = true
    },

    deleteItemConfirm3() {
      this.desserts3.splice(this.editedIndex3, 1)
      this.closeDelete3 ()
    },


    close3() {
      this.dialog3 = false
      this.$nextTick(() => {
        this.editedItem3 = Object.assign({}, this.defaultItem3)
        this.editedIndex3 = -1
      })
    },

    closeDelete3() {
      this.dialogDelete3 = false
      this.$nextTick(() => {
        this.editedItem3 = Object.assign({}, this.defaultItem3)
        this.editedIndex3 = -1
      })
    },

    save3() {
      if (this.editedIndex3 > -1) {
        Object.assign(this.desserts3[this.editedIndex3], this.editedItem3)
      } else {
        this.desserts3.push(this.editedItem3)
      }
      this.close3()
    },
  }

}

</script>