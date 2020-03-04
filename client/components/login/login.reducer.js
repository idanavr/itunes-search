import { loginStatusMessage, setLoginCredentials } from './login.action';
const defaultState = { msg : '', user: null };

export default function (state = defaultState, action) {
    switch (action.type) {
        case loginStatusMessage:
            return { ...state, msg: action.payload };

        case setLoginCredentials:
            return { ...state, msg: '', user: action.user };

        default:
            return state;
    }
}