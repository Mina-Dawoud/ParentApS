import { environment } from './../../../environments/environment';
export const API_URLs = {
    'User': {
        'getAllUsers': environment.middlewareBaseUrl + 'users?page={page_number}',
        'addUser': environment.middlewareBaseUrl + 'users',
        'updateUser': environment.middlewareBaseUrl + 'users/{user_id}',
        'deleteUser': environment.middlewareBaseUrl + 'users/{user_id}'
    },
}