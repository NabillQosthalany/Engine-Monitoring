<template>
  <v-app>
    <SideBar />
    <div class="content">
      <h1 class="header">Site Management</h1>
      <v-container>
        <v-row>
          <v-col>
            <v-card color="primary">
              <v-btn
                  text
                  x-large
                  color="white"
                  dark
                  @click="showTable1 = !showTable1 "
              >
                User Management
              </v-btn>
              <v-divider color="#ffffff"></v-divider>
              <v-card-text  class="white--text"> 100</v-card-text>
            </v-card>
          </v-col>


          <v-col>
            <v-card color="primary">
              <v-btn
                  text
                  x-large
                  color="white"
                  dark
                  @click="showTable2 = !showTable2 "
              >
                Server Management
              </v-btn>
              <v-divider color="#ffffff"></v-divider>
              <v-card-text  class="white--text"> 100</v-card-text>
            </v-card>
          </v-col>

          <v-col>
            <v-card color="primary">
              <v-btn
                  text
                  x-large
                  color="white"
                  dark
                  @click="showTable3 = !showTable3 "
              >
                Project Managemnt
              </v-btn>
              <v-divider color="#ffffff"></v-divider>
              <v-card-text class="white--text"> 100</v-card-text>
            </v-card>
          </v-col>

        </v-row>
      </v-container>

      <v-container>
      <v-row>
        <v-col>
        <v-card v-if="showTable1">
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
                <v-toolbar-title>User Management</v-toolbar-title>
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
                                v-model="editedItem.name"
                                label="Dessert name"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                v-model="editedItem.calories"
                                label="Calories"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                v-model="editedItem.fat"
                                label="Fat (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                v-model="editedItem.carbs"
                                label="Carbs (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-text-field
                                v-model="editedItem.protein"
                                label="Protein (g)"
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
      <v-container>
        <v-row>
          <v-col>
            <v-card v-if="showTable2">
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
                    <v-toolbar-title>Server Management</v-toolbar-title>
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
                                    v-model="editedItem2.name"
                                    label="Dessert name"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem.calories"
                                    label="Calories"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem2.fat"
                                    label="Fat (g)"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem2.carbs"
                                    label="Carbs (g)"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem2.protein"
                                    label="Protein (g)"
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
      <v-container>
        <v-row>
          <v-col>
            <v-card v-if="showTable3">
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
                    <v-toolbar-title>Project Management</v-toolbar-title>
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
                                    v-model="editedItem3.name"
                                    label="Dessert name"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem3.calories"
                                    label="Calories"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem3.fat"
                                    label="Fat (g)"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem3.carbs"
                                    label="Carbs (g)"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  sm="6"
                                  md="4"
                              >
                                <v-text-field
                                    v-model="editedItem3.protein"
                                    label="Protein (g)"
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
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    headers2: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    headers3: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    showTable1 : false,
    showTable2 : false,
    showTable3 : false,

    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },

    desserts2: [],
    editedIndex2: -1,
    editedItem2: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem2: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },

    desserts3: [],
    editedIndex3: -1,
    editedItem3: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem3: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
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
    Toogle(){
    },
    initialize () {
      this.desserts = [
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ]
    },
    initialize2 () {
      this.desserts2 = [
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ]
    },
    initialize3 () {
      this.desserts3 = [
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
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
}
.header {
  color: #000000;
  font-weight: 300;
  padding: 10px 10px 0 25px;
}

</style>
