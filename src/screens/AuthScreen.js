import { Component } from 'react';
import AuthForm from './AuthForm';
import { login, signup, subscribeToAuthChanges, _signIn} from '../firebase/functions';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect, createContext } from 'react';


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
        signup={signup} //handleSubmit
        authMode={this.state.authMode}
        switchAuthMode={this.switchAuthMode}
        _signIn={_signIn}
      />
    );
  }
}

export default AuthScreen