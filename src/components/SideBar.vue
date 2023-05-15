<template>
  <v-navigation-drawer app dark color="primary">
    <div class="text-center mt-5">
      <v-img
        class="mx-auto"
        src="@/assets/img/Logo.png"
        height="60px"
        width="150px"
      ></v-img>
      <v-divider color="white" class="mt-4"></v-divider>
    </div>

    <v-list dense class="mt-5 list-card">
      <v-list-item-group v-model="selectedItem" color="white">
        <v-list-item
          v-if="!item.items"
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          v-slot="{ active }"
          class="text-sidebar"
          rounded="shaped"
        >
          <v-list-item-icon class="ml-6">
            <v-icon
              v-text="item.icon"
              :color="active ? 'white' : 'white'"
            ></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="item.text"
              :class="active ? 'white--text' : 'white--text'"
              font-size="24"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group v-if="item.items" v-for="item in items" :key="item.title">
          <template v-slot:activator>
            <v-list-item-icon class="ml-6">
              <v-icon v-text="item.icon" color="white"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="color: white">{{
                item.text
              }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.link"
            sub-group
            style="position: nudge-right; padding-left: 75px"
          >
            <v-list-item-content class="pl-5">
              <v-list-item-title style="color: white">{{
                child.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list-item-group>
    </v-list>

    <v-list-item
      @click="logOut"
      style="
        position: absolute;
        bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
      "
    >
      <v-list-item-icon>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title> Log Out</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 0,
    items: [
      { icon: "mdi-home-outline", text: "Dashboard", link: "/Dashboard" },
      {
        icon: "mdi-web",
        text: "Management",
        items: [
          { title: "Server", link: "/ServerManagement" },
          { title: "Sosmed", link: "/SosmedManagement" },
          { title: "Project", link: "/ProjectManagement" },
        ],
      },
      { icon: "mdi-chart-pie", text: "Statistic", link: "/Analyze" },
      { icon: "mdi-cogs", text: "Maintenance", link: "/Maintenance" },
      { icon: "mdi-tools", text: "Recovery", link: "/Recovery" },
    ],
  }),
  methods: {
    logOut() {
      sessionStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style>
.text-sidebar {
  font-family: "Poppins", sans-serif;
}
.list-card {
  margin-bottom: 35vh;
}
</style>
