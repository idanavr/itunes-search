export const creatingUserMsg = 'creatingUserMsg';
import axios from 'axios';
// import { LoginFunc } from '../login/login.action';

export function createUserAction(data) {
    return (dispatch) => {

        if (data.error)
            dispatch({ type: creatingUserMsg, msg: data.error });
        else {
            dispatch({ type: creatingUserMsg, msg: 'Creating user..' });

            axios.post('/api/users', data)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        dispatch({ type: creatingUserMsg, msg: '' });
                    } else
                        dispatch({ type: creatingUserMsg, msg: res.data });

                })
                .catch((err) => {
                    const errMsg = err.response.data;
                    console.log(errMsg);
                    if (errMsg && typeof(errMsg) === 'string')
                        dispatch({ type: creatingUserMsg, msg: errMsg });
                    else
                        dispatch({ type: creatingUserMsg, msg: 'User creation failed' });
                });
        }
    };
}