<template>
  <v-navigation-drawer app dark color="primary">
    <div class="text-center mt-5">
      <v-img
        class="mx-auto"
        src="@/assets/img/logo.png"
        height="60px"
        width="150px"
      ></v-img>
      <v-divider color="white" class="mt-4"></v-divider>
    </div>
    <v-list dense class="mt-5">
      <v-list-item-group v-model="selectedItem" color="white">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          v-slot="{ active }"
          class="text-sidebar"
        >
          <v-list-item-icon class="ml-6">
            <v-icon
              v-text="item.icon"
              :color="active ? 'black' : 'white'"
            ></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="item.text"
              :class="active ? 'black--text' : 'white--text'"
              font-size="24"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 0,
    items: [
      { icon: "mdi-home-outline", text: "Dashboard", link: "/Dashboard" },
      { icon: "mdi-web", text: "Site Management", link: "/Management" },
      { icon: "mdi-chart-pie", text: "Site Analyze", link: "/Analyze" },
      { icon: "mdi-cog-outline", text: "Settings", link: "/Settings" },
    ],
  }),
};
</script>

<style>
.text-sidebar {
  font-family: "Poppins", sans-serif;
}
</style>
