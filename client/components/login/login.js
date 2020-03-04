import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginAction } from './login.action';
import './login.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login() {
    const errorMsg = useSelector((state) => state.loginReducer.msg);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [submitting, setSubmitting] = useState(false);

    return (
        <div>
            <div>
                <h2>Login</h2>
            </div>
            <form id="loginForm" onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                    disabled={submitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Log In
                </Button>
                <div>
                    {errorMsg}
                </div>
            </form>
        </div>
    );

    function handleSubmit(e) {
        setSubmitting(true);
        const { email, password } = formData;
        const userCredential = {
            email,
            password
        };

        const removeSpacesRegex = /\s/g;
        if (!userCredential.email.replace(removeSpacesRegex, '').length)
            userCredential.error = 'Email is required';
        else if (!userCredential.password.replace(removeSpacesRegex, '').length)
            userCredential.error = 'Password is required';

        dispatch(LoginAction(userCredential));
        e.preventDefault();
        setSubmitting(false);
    }
}

export default Login;