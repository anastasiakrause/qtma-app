import React, { Component } from 'react';
import AuthForm from '../components/AuthForm';
import { login, signup, subscribeToAuthChanges } from '../firebase/functions';


class AuthScreen extends Component {

  state = {
    authMode: 'login'
  }

  componentDidMount() {
    subscribeToAuthChanges(this.onAuthStateChanged)
  }

  onAuthStateChanged = (user) => {
    if (user !== null) {
      console.log(user);
    }
  }

  switchAuthMode = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login'
    }));
  }

  render() {
    return (
      <AuthForm
        login={login}
        signup={signup}
        authMode={this.state.authMode}
        switchAuthMode={this.switchAuthMode}
      />
    );
  }
}

export default AuthScreen