<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
* {
  background: var(--v-secondary-base);
}

.v-main{
  min-height: 100vh;
}
</style>
