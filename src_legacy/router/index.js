import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/resume",
    name: "Resume",
    component: () => import("../views/Resume.vue")
  },
  {
    path: "/ezsalt",
    name: "EZsalt",
    component: () => import("../views/projects/EZsalt.vue")
  },
  {
    path: "/CS_5620",
    name: "CS_5620",
    component: () => import("../views/projects/CS_5620/CS_5620.vue")
  },
  {
    path: "/report/:school/:class",
    name: "ClassReport",
    component: () => import("../views/ClassReport.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.name + ` - Portfolio`;
  next();
});

export default router;
