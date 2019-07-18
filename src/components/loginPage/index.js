import React from 'react';
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage';
import * as actions from './actions';
import { connect } from 'react-redux';
import './login.css'

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        auth: false,
        login: '',
        password: '',
        role: '',
        token: '',
      };
      const token = localStorage.getItem("jwt");
      if (token) {
        this.props.verifyUser(token);
      }
    }
  
    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.loginData.auth !== prevState.auth) {
        localStorage.setItem("jwt", nextProps.loginData.token);
        const { role } = nextProps.loginData;
        if (role === "admin") nextProps.history.push("/users");
        else if (role === "user") nextProps.history.push("/chat");
        return {
          ...nextProps.loginData
        };
      } else {
        return null;
      }
    }
  
    onChangeData = (e, keyword) => {
      const value = e.target.value;
      this.setState({
        ...this.state,
        [keyword]: value
      });
    };
  
    onLogin = () => {
      this.props.loginUser(this.state.login, this.state.password);
    };
  
    displayComponent(error, loading) {
      if (!error)
        return (
          <form className="login-form">
            <input
              id="email-input"
              type="text"
              placeholder="Email"
              onChange={e => this.onChangeData(e, "login")}
            />
            <input
              id="password-input"
              type="text"
              placeholder=" Password"
              onChange={e => this.onChangeData(e, "password")}
            />
            <button id="login-btn" type="button" onClick={this.onLogin}>
              Login
            </button>
            <Spinner loading={loading} />
          </form>
        );
      return <ErrorMessage error={error} />;
    }
    render() {
      const { loading, error } = this.props;
      return this.displayComponent(error, loading);
    }
  }

const mapStateToProps = state => {
    const {loginData, loading, error} = state.loginReducer;
    return {
        loginData,
        loading,
        error,
    }
}

const matDispatchToProps = {
    ...actions,
}

export default connect(mapStateToProps, matDispatchToProps)(Login);
  