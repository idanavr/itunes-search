import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import './nav.scss';
import { LogoutAction } from '../login/login.action';
import { isAllowedToUserRole } from '../../utils';

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = { showMenu: false };
	}

	render() {
		const nav = this.getNavBar();
		const mobileMenuIcon = this.getMobileMenuIcon();

		return (
			<nav className="header">
				{mobileMenuIcon}
				{nav}
			</nav>
		);
	}

	toggleMenu() {
		this.setState({ showMenu: !this.state.showMenu });
	}

	getNavBar() {
		const { user, Logout } = this.props;

		if (user) {
			const getRightNav = () => (
				<div className="rightNav">
					<div>
						{user.firstName}, <NavLink to="#" onClick={() => Logout()}>Sign out</NavLink>
					</div>
				</div>);

			if (isAllowedToUserRole(user, ['admin'])) {
				return (
					<div className={`navbar ${(this.state.showMenu ? 'open' : '')}`}>
						<NavLink activeClassName="activeLink" exact to="/">iTunes</NavLink>
						<NavLink activeClassName="activeLink" exact to="/admin/users">Users</NavLink>
						{getRightNav()}
					</div>);
			}
			return (
				<div className={`navbar ${(this.state.showMenu ? 'open' : '')}`}>
					<NavLink activeClassName="activeLink" exact to="/">iTunes</NavLink>
					{getRightNav()}
				</div>);
		}

		return (
			<div className={`navbar ${(this.state.showMenu ? 'open' : '')}`}>
				<NavLink activeClassName="activeLink" exact to="/">iTunes</NavLink>
				<div className="rightNav">
					<NavLink activeClassName="activeLink" exact to="/login">Sign in</NavLink>
					<NavLink activeClassName="activeLink" exact to="/register">Register</NavLink>
				</div>
			</div>);
	}

	getMobileMenuIcon() {
		return (
			this.state.showMenu
				? <span className="small-menu" onClick={() => this.toggleMenu()}>
					X
				</span>
				: <span className="small-menu" onClick={() => this.toggleMenu()}>
					O
				</span>);
	}
}

function mapStateToProps(state) {
	return {
		user: state.loginReducer.user,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		Logout: () => dispatch(LogoutAction())
	};
}

Navbar.propTypes = {
	user: PropTypes.object,
	Logout: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));