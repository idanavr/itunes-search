import { combineReducers } from 'redux';
import usersReducer from './components/usersPanel/usersPanel.reducer';
import registerReducer from './components/register/register.reducer';
import loginReducer from './components/login/login.reducer';
import itunesSearchReducer from './components/itunes/itunesSearch/itunesSearch.reducer';

const allReducers = combineReducers({
usersReducer,
registerReducer,
loginReducer,
itunesSearchReducer
});
export default allReducers;