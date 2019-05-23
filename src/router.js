import Vue from "vue";
import Router from "vue-router";
import Tasks from "@/views/Tasks";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            redirect: '/tasks/'
        },
        {
            path: "/tasks/:type?",
            name: "tasks",
            component: Tasks
        }
    ]
});
