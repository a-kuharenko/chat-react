import React from 'react';
import UserItem from './userItem'
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage';
import './users.css'
import { connect } from 'react-redux';
import * as actions from './actions';
import {verifyUser} from '../loginPage/actions'
class Users extends React.Component{

    constructor(props) {
		super(props);
		this.state = {
			role: '',
		};
	}

	componentDidMount() {
		const token = localStorage.getItem('jwt');
		this.props.fetchUsers();
		if(token){
			this.props.verifyUser(token);
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
		  nextProps.loginData.role !== prevState.role &&
		  nextProps.loginData.role !== "admin"
		)
		  nextProps.history.push("/chat");
		return null;
	}

	onEdit = id => {
		this.props.history.push(`/user/${id}`);
	}

	onDelete = id => {
		this.props.deleteUser(id);
	}

	onAdd = () => {
		this.props.history.push('/user');
	}

	displayComponent(error, loading){
		if(!error)
			return (
				<div className = "users">
                	<button onClick = {this.onAdd}>Add user</button>
                	{this.props.users.map(user => {
                    	return (
                       	 	<UserItem 
                            	key = { user.id }
                            	id = { user.id }
                            	login = { user.login }
                            	email = { user.email }
                           	 	onEdit = { this.onEdit }
                            	onDelete = { this.onDelete }
                        	/>
                    	)
					})}
					<Spinner loading = {loading} /> 
				</div>
			)
		return <ErrorMessage error = {error} />
	}
    render() {
		const {loading, error} = this.props;
        return this.displayComponent(error, loading)
    }
}

const mapStateToProps = (state) => {
	const { users } = state.usersReducer;
	const { loginData } = state.loginReducer;
	return {
		users,
		loginData,
		loading: state.usersReducer.loading 
			|| state.loginReducer.loading,
		error: state.usersReducer.error 
			|| state.loginReducer.error,
	}
};

const mapDispatchToProps = {
	...actions,
	verifyUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
  