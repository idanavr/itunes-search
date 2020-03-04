export const showSelectedUser = 'showSelectedUser';
export const getUserList = 'getUserList';
export const updateUsersPanelStatusMessage = 'updateUsersPanelStatusMessage';
export const nextUserList = 'nextUserList';
export const prevUserList = 'prevUserList';
export const filterUserList = 'filterUserList';
export const removeUser = 'removeUser';
import axios from 'axios';

export function getUserListAction() {
    return (dispatch) => {
        console.log('loading list..');
        dispatch({ type: updateUsersPanelStatusMessage, msg: 'loading...' });

        return axios.get('/api/users')
            .then((res) => dispatch({ type: getUserList, originalList: res.data }))
            .then(() => dispatch({ type: filterUserList, payload: '' }))
            .catch(() => dispatch({ type: updateUsersPanelStatusMessage, msg: 'loading failed' }));
    };
}

export function nextUserListAction() {
    return { type: nextUserList };
}

export function prevUserListAction() {
    return { type: prevUserList };
}

export function filterUserListAction(expr) {
    return { type: filterUserList, payload: expr };
}

export function userClickAction(user) {
    return { type: showSelectedUser, payload: user };
}

export function deleteUserByIdAction(id) {

    return (dispatch) => {
        if (!id) {
            console.log('Deleting user without id: ', id);
            return new Promise((resolve) => resolve());
        }
        return axios.delete('/api/users', { data: { id } })
            .then(() => {
                dispatch({ type: showSelectedUser, payload: {} });
                dispatch({ type: removeUser, payload: id });
            });
    };
}