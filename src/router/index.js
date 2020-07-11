import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Image from "../views/image.vue";
import Ckeditor from "../components/ckeditor.vue";
import Signin from "../views/Signin.vue";
import Dashboard from "../views/Dashboard.vue";
import store from "@/store";
import About from "../views/About.vue";


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
    component: About,
    beforeEnter: (to, from, next)=>{
      if(!store.getters['auth/authenticated']){
        return next({
          name: 'Signin'
        });
      }
      next();
    }
  },
  {
    path: "/img",
    name: "Image",
    component: Image,
    beforeEnter: (to, from, next)=>{
      if(!store.getters['auth/authenticated']){
        return next({
          name: 'Signin'
        });
      }
      next();
    }
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
    component: Dashboard,
    beforeEnter: (to, from, next)=>{
      if(!store.getters['auth/authenticated']){
        return next({
          name: 'Signin'
        });
      }
      next();
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
