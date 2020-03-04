import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userClickAction, getUserListAction, nextUserListAction, prevUserListAction, filterUserListAction, deleteUserByIdAction } from './usersPanel.action';
import './usersPanel.scss';
import TextField from '@material-ui/core/TextField';
import UserList from './userList/userList';

function UsersPanel() {
    const props = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserListAction());
    }, []);

    const { statusMessage, displayList, selectedUser } = props;

    const contentBlock = statusMessage !== null ? getMessageBlock(statusMessage) : getUserListBlock(displayList, selectedUser, dispatch);

    return (
        <div>
            <h2>Users Panel</h2>
            {contentBlock}
        </div>
    );
}

function getMessageBlock(message) {
    return (
        <div>
            {message}
        </div>
    );
}

function getUserListBlock(displayList, selectedUser, dispatch) {
    return (
        <div>
            <TextField
                label="Search by name or email"
                type="search"
                variant="outlined"
                size="small"
                onChange={(expr) => dispatch(filterUserListAction(expr.target.value))} />
            <UserList
                users={displayList}
                userClick={(user) => dispatch(userClickAction(user))}
                prevUsersPage={() => dispatch(prevUserListAction())}
                nextUsersPage={() => dispatch(nextUserListAction())}
                deleteUserById={(id) => dispatch(deleteUserByIdAction(id))} />
        </div>
    );
}

UsersPanel.propTypes = {
    selectedUser: PropTypes.object,
    displayList: PropTypes.arrayOf(PropTypes.object),
    statusMessage: PropTypes.string,
};

export default UsersPanel;