import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

import PageView from "@/views/pages/PagesView.vue";
import MyPageView from "@/views/pages/MyPageView.vue";
import AddPageView from "@/views/pages/AddPageView.vue";

import FriendsView from "@/views/FriendsView";
import UserProfile from "@/views/profile/UserProfile.vue";
import PersonalProfile from "@/views/profile/PersonalProfile.vue";
import store from "@/store";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/pages",
    name: "pages",
    component: PageView,
  },
  {
    path: "/mypage/:id",
    name: "mypage",
    component: MyPageView,
  },
  {
    path: "/addpage",
    name: "addpage",
    component: AddPageView,
  },
   {
   path: "/friends",
    name: "friends",
    component: FriendsView,
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: UserProfile,
  },
  {
    path: "/personal-profile",
    name: "personal-profile",
    component: PersonalProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active_link",
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters["auth/isLogged"];
  // const loggedIn = store.state.CURRENT_TOKEN;

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
