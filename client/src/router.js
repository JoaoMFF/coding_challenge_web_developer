import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        name: "All questions",
        component: () => import("./components/QuestionsList"),
        meta: {
            title: 'All questions',
        }
    },
    {
        path: "/questions",
        name: "Add question",
        component: () => import("./components/AddQuestion"),
        meta: {
            title: 'Add questions',
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;