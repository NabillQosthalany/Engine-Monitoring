<template>
    <v-app>
      <v-app-bar app flat>
        <h4>Site Management</h4>
      </v-app-bar>
  
      <SideBar />
     <div class="content pa-6">
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
            <v-card-title>
              User Management
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers1"
              :items="user"
              :search="search1"
            ></v-data-table>
            </v-card>
              </v-col>
            </v-row>
        
            <v-row>
              <v-col>
                <v-card v-if="showTable2">
            <v-card-title>
              Server Management
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers2"
              :items="server"
              :search="search2"
            ></v-data-table>
            </v-card>
              </v-col>
            </v-row>
        
            <v-row>
              <v-col>
                <v-card v-if="showTable3">
            <v-card-title>
              Project Management
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers3"
              :items="project"
              :search="search3"
            ></v-data-table>
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
    name: 'Home',
    data: () => ({

       
        showTable1 : true,
        showTable2 : true,
        showTable3 : true

    }),
    components: {
      SideBar
    },
    
  };
  </script>
  <style scoped>
  .content{
    background-color: #efefef;
  }
  </style>
  