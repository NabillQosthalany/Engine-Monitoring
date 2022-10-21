import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Dashboard from "../views/dashboard/Dashboard";
import Analyze from "../views/dashboard/Analyze";
import Settings from "../views/dashboard/Settings";
import Management from "../views/dashboard/Management";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "LoginPage",
    component: Login,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/Register",
    name: "RegisterPage",
    component: Register,
  },
  {
    path: "/Analyze",
    name: "AnalyzePage",
    component: Analyze,
  },
  {
    path: "/Settings",
    name: "SettingsPage",
    component: Settings,
  },
  {
    path: "/Management",
    name: "ManagementPage",
    component: Management,
  },
];
// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
// }
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
