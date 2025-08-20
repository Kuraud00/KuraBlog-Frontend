import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Blog from "@/views/Blog.vue";
import Project from "@/views/Project.vue";
import Profile from "@/views/Profile.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/blog",
      component: Blog,
    },
    {
      path: "/project",
      component: Project,
    },
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});

export default router;
