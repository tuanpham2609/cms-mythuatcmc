import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Image from "../views/image.vue";
import Ckeditor from "../components/ckeditor.vue";
import Signin from "../views/Signin.vue";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/img",
    name: "Image",
    component: Image
  },
  {
    path: "/ckeditor",
    name: "Ckeditor",
    component: Ckeditor
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
