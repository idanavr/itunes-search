import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './main.scss';
import '../assets/css/animate.css';
import { checkTokenAction } from './login/login.action';

import Navbar from './nav/nav';
import ItunesSearch from './itunes/itunesSearch/itunesSearch';
import ItunesContentProfile from './itunes/itunesContentProfile/itunesContentProfile';
import AuthCheck from './authCheck';
import UsersPanel from './usersPanel/usersPanel';
import Register from './register/register';
import Login from './login/login';

class Main extends React.Component {

    componentDidMount() {
        this.props.checkToken();
    }

    render() {
        const Container = (props) =>
            <div>
                <Navbar />
                <div className="container">{props.children}</div>
            </div>;

        const NoMatch = () =>
            <div>
                <h2>No page was found 404!</h2>
            </div>;

        return (
            <BrowserRouter>
                <Container>
                    <Switch>
                        <Route exact path="/" component={ItunesSearch} />
                        <Route path="/itunes/content" component={ItunesContentProfile} />
                        <Route exact path="/admin/users" component={AuthCheck(UsersPanel, ['admin'])} />
                        <Route exact path="/login" component={AuthCheck(Login)} />
                        <Route exact path="/register" component={AuthCheck(Register)} />
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </Container>
            </BrowserRouter>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.loginReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkToken: (token) => dispatch(checkTokenAction(token)),
    };
}

Main.propTypes = {
    user: PropTypes.object,
    checkToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);