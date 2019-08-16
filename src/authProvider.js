import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
import config from './config';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request(config.djangoServerURL +'/login/', {
            method: 'POST',
            body: JSON.stringify({ email: username, password: password}),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }else{
                    throw new Error("Incorrect Email or password");
                }
            }).then((res) => {
                const {token, user} = res;
                if(token !== undefined){
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('res', JSON.stringify(res));
                }
            })
    }
    if (type === AUTH_LOGOUT) {
        localStorage.clear();
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        let role = JSON.parse(localStorage.getItem('user')).type;
        return role ? Promise.resolve(role) : Promise.reject();
    }
    return Promise.resolve();
}
