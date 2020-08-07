import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/home/home.vue";
import Image from "../components/image-manage/image.vue";
import Ckeditor from "../components/ckeditor.vue";
import Signin from "../components/signin/signin";
import store from "@/store";
import About from "../views/About.vue";
import Category from "../components/category/category.vue";
import Post from "../components/post/post.vue";
import CreatePost  from "../components/post/create.vue";
import EditPost  from "../components/post/edit.vue";
import User from "../components/user/user.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/category",
    name: "Category",
    component: Category,
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
    path: "/post",
    name: "Post",
    component: Post,
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
    path: "/post/create",
    name: "CreatePost",
    component: CreatePost,
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
    path: "/post/:id/edit",
    name: "EditPost",
    component: EditPost,
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
    path: "/user",
    name: "User",
    component: User,
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
