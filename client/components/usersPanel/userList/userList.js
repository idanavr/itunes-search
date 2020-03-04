/* eslint react/display-name:0 */
import React, { forwardRef } from 'react';
import { PropTypes } from 'prop-types';
import './userList.scss';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
};

function UserList(props) {
    const { users, deleteUserById, prevUsersPage, nextUsersPage } = props;
    const columns = [
        { title: 'First name', field: 'firstName' },
        { title: 'Last name', field: 'lastName' },
        { title: 'Email', field: 'email' },
        { title: 'Gender', field: 'gender' },
    ];
    
    let userListBlock = '';
    if (users && users.length) {
        userListBlock = (
            <MaterialTable
                icons={tableIcons}
                columns={columns}
                data={users}
                editable={{
                    onRowDelete: (user) =>
                        new Promise((resolve) => {
                            deleteUserById(user.id);
                            resolve();
                        })
                }}
                localization={{
                    header: {
                        actions: ''
                    },
                }}
                components={{
                    Toolbar: () => (
                        <div></div>)
                }}
                options={{
                    search: false,
                    showTitle: false,
                    paging: false,

                }}
            />);
    }

    return (
        <div id="userList">
            <ul>
                {userListBlock}
            </ul>
            <div className="list-navigation">
                <div><Button variant="contained" onClick={prevUsersPage}>Back</Button></div>
                <div><Button variant="contained" onClick={nextUsersPage}>Next</Button></div>
            </div>
        </div>
    );
}

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteUserById: PropTypes.func.isRequired,
    prevUsersPage: PropTypes.func.isRequired,
    nextUsersPage: PropTypes.func.isRequired
};

export default UserList;