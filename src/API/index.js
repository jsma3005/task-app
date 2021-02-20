import { API } from "./api";
import { authRoutes, tasksRoutes } from "./routes";

// GET Tasks
export const getTasks = params => API.get({
    url: '',
    params
})

// Edit task
export const editTask = (id, postData) => API.post({
    url: `${tasksRoutes.edit}/${id}`,
    data: postData
})

// Post new task
export const createTask = postData => API.post({
    url: tasksRoutes.create,
    data: postData
})

// Auth
export const login = postData => API.post({
    url: authRoutes.login,
    data: postData
})