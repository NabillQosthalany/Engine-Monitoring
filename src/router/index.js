import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login";
import Dashboard from "../views/dashboard/Dashboard";
import Management from "../views/dashboard/Management.vue";
import Analyze from "../views/dashboard/Analyze";
import ProjectManagement from "../views/Management/ProjectManagement";
import ServerManagement from "../views/Management/ServerManagement";
import SosmedManagement from "../views/Management/SosmedManagement";
import Maintenance from "../views/dashboard/Maintenance";
import Recovery from "../views/dashboard/Recovery";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: Login,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
    props: {},
  },
  {
    path: "/Management",
    name: "ManagementPage",
    component: Management,
  },
  {
    path: "/Analyze",
    name: "AnalyzePage",
    component: Analyze,
  },
  {
    path: "/ProjectManagement",
    name: "Project",
    component: ProjectManagement,
  },
  {
    path: "/SosmedManagement",
    name: "Sosmed",
    component: SosmedManagement,
  },
  {
    path: "/ServerManagement",
    name: "Server",
    component: ServerManagement,
  },
  {
    path: "/Maintenance",
    name: "Maintenance",
    component: Maintenance,
  },
  {
    path: "/Recovery",
    name: "Recovery",
    component: Recovery,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
