import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        name: "All questions",
        component: () => import("./components/QuestionsList")
    },
    {
        path: "/questions",
        name: "Add question",
        component: () => import("./components/AddQuestion")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;