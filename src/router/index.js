import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Dashboard from "../views/dashboard/Dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "LoginPage",
    component: Login,
  },
  {
    path: "/Register",
    name: "RegisterPage",
    component: Register,
  },
  {
    path: "/Dashboard",
    name: "Home",
    component: Dashboard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
