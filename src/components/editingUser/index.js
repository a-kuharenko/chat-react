import React from 'react';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { connect } from 'react-redux'
import {verifyUser} from '../loginPage/actions'
import * as actions from './actions';
import { addUser, updateUser } from '../usersPage/actions'
import defaultUserConfig from '../../shared/config/defaultUserConfig'
import './editingUser.css'
import InputPassword from './InputPassword'

class EditUser extends React.Component{
    
    constructor(props){
        super(props);
        this.state = this.getDefaultUserData();
    }

    componentDidMount(){
        const token = localStorage.getItem('jwt');
		if(token){
			this.props.verifyUser(token);
		}
        const id = this.props.match.params.id;
        if(id) this.props.fetchUser(id);

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
          nextProps.loginData.role !== prevState.role &&
          nextProps.loginData.role !== "admin"
        ) {
          nextProps.history.push("/chat");
        }
        if (nextProps.userData.id !== prevState.id && nextProps.match.params.id) {
          return {
            ...nextProps.userData
          };
        } else {
          return null;
        }
    }

    onChangeData = (e, keyword) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [keyword]: value,
        });
    }

    onSave = () => {
        if (this.state.id) {
            this.props.updateUser(this.state.id, this.state);
        } else {
            this.props.addUser(this.state);
        }
        this.setState(this.getDefaultUserData());
        this.props.history.push('/users');
    }

    getDefaultUserData(){
        return {
            ...defaultUserConfig
        }
    }

    onCancel = () => {
        this.setState(this.getDefaultUserData());
        this.props.history.push('/users');
    }

    displayComponent(error, loading) {
        if (!error)
          return (
            <form className="login-form">
              <input
                id="email-input"
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.onChangeData(e, "email")}
              />
              <input
                id="login-input"
                type="text"
                placeholder="Login"
                value={this.state.login}
                onChange={e => this.onChangeData(e, "login")}
              />
              <InputPassword
                value={this.state.password}
                onChange={this.onChangeData}
              />
              <button className="login-btn" type="button" onClick={this.onSave}>
                Save
              </button>
              <button className="login-btn" type="button" onClick={this.onCancel}>
                Cancel
              </button>
              <Spinner loading={loading} />
            </form>
          );
        return <ErrorMessage error={error} />;
    }

    render() {
        const {loading, error} = this.props;
        return this.displayComponent(error, loading)
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.editReducer.userData,
        loginData: state.loginReducer.loginData,
        loading: state.editReducer.loading 
            || state.loginReducer.loading,
        error: state.editReducer.error 
            || state.loginReducer.error,
    }
};

const mapDispatchToProps = {
    ...actions,
    addUser,
    updateUser,
    verifyUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);