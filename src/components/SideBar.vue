<template>
    <nav>
      <v-navigation-drawer      
          app
          dark
          color="primary"
        >
           <div class="text-center mt-5">
               <v-img class="mx-auto" src="@/assets/logo.png" height="80px" width="200px" ></v-img>
               <v-divider color="white" class="mt-4"></v-divider>
            </div>
            <v-list dense class="mt-5" >
                <v-list-item-group v-model="selectedItem" color="white" >

                    <v-list-item v-for="(item, i) in items" :key="i" v-slot="{ active }">
                        <v-list-item-icon class="ml-6">
                            <v-icon v-text="item.icon"  :color="active ? 'black' : 'white'" ></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.text" :class="active ? 'black--text' : 'white--text'" ></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>  
                </v-list-item-group>
            </v-list>
            
        </v-navigation-drawer>
    </nav>
    </template>
    
    <script>
    export default {
        data: () =>({
            selectedItem: 0,
            items: [
                {icon: 'mdi-home-outline', text: 'Dashboard'},
                {icon: 'mdi-web', text: 'Site Management'},
                {icon: 'mdi-chart-pie', text: 'Site Analyze'},
                {icon: 'mdi-cog-outline', text: 'Settings'},
            ],
        })
    }
    </script>
    
    <style>
    
    </style>