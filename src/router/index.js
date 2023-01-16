import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Dashboard from "../views/dashboard/Dashboard";
import Analyze from "../views/dashboard/Analyze";
import Management from "../views/dashboard/Management";
import example from "../views/auth/example"

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
    path: "/Management",
    name: "ManagementPage",
    component: Management,
  },
  {
    path:"/example",
    name:"examplePage",
    component: example
  }
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

router.beforeEach((to, from, next)=>{
  const isAuthenticated = JSON.parse(sessionStorage.getItem(('token')))
  if(to.name !== 'LoginPage' && !isAuthenticated) next({name:'LoginPage'});
  if(to.name === 'LoginPage' && isAuthenticated) next({name:'Dashboard'});

  else next()
})

export default router;
