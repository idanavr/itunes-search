export const loginStatusMessage = 'loginStatusMessage';
export const setLoginCredentials = 'setLoginCredentials';
import axios from 'axios';

export function LoginAction(data) {
    return (dispatch) => {
        if (data.error) {
            dispatch({ type: loginStatusMessage, payload: data.error });
        } else {
            axios.post('/api/login', data)
                .then((result) => {
                    if (result.status === 200) {
                        dispatch({ type: setLoginCredentials, user: result.data });
                    } else
                        throw Error('Connection failed');
                })
                .catch((err) => {
                    if (err.response.status === 404)
                        dispatch({ type: loginStatusMessage, payload: 'Wrong credentials' });
                    else
                        dispatch({ type: loginStatusMessage, payload: err.message });
                });
        }
    };
}

export function LogoutAction() {
    return (dispatch) => {
        axios.post('/api/logout')
            .then((result) => {
                if (result.status === 200) {
                    dispatch({ type: setLoginCredentials, user: null });
                } else
                    throw Error('Couldn\'t log out');
            });
    };
}

export function checkTokenAction() {
    return (dispatch) => {
        axios.get('/api/login/me')
            .then((result) => {
                if (result.status === 200)
                    dispatch({ type: setLoginCredentials, user: result.data });
                else
                    dispatch({ type: setLoginCredentials, user: null });
            })
            .catch(() => {
                dispatch({ type: setLoginCredentials, user: null });
            });
    };
}