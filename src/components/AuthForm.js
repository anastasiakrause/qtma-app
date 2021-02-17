import React from 'react';
import { Formik } from 'formik';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Container,
} from 'react-native';
import * as yup from 'yup';
import { styles } from '../styles/styles';
import {TextInput, Button} from 'react-native-paper';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import auth, { firebase } from '@react-native-firebase/auth';

export async function _signIn() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

const signUpValidationSchema = yup.object().shape({
  email: yup
  .string()
  .label('Email')
  .email('Invalid email')
  .required('Email required'),
  displayName: yup
  .string()
  .required('Name required.')
  .matches(/^[a-zA-Z]/, 'Valid letters only.'),
  password: yup
    .string()
    .required('Please enter valid password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Insecure password"
    ),
  confirmPassword: yup
    .string()
    .required('Please reenter password.')
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

const AuthForm = (props) => {
  let displayLogin = (
    <View>
      <Formik
        initialValues= {{email: '', password: ''}}
        onSubmit = { values =>  props.authMode === 'login' ? props.login(values) : props.signup(values) }
      >
        {({handleChange, handleSubmit, values, _signIn}) => (
          <View>
            <View style={styles.logo}>
              <Image
                source={require('../assets/Looplogo.png')}
                style={styles.image}
              />
            </View>

            <TextInput 
              style={styles.authInput}
              mode="outlined"
              label="Email"
              theme={{
                colors: {primary: '#1e90ff', underlineColor: 'transparent'},
              }}
              autoCapitalize="none"
              value = {values.email}
              onChangeText={handleChange('email')}
            />

            <TextInput
              style={styles.authInput}
              mode="outlined"
              label="Password"
              theme={{
                colors: {primary: '#1e90ff', underlineColor: 'transparent'},
              }}
              secureTextEntry={true}
              autoCapitalize="none"
              value = {values.password}
              onChangeText={handleChange('password')}
            />

            <Button
              style={styles.authButton}
              mode="outlined"
              onPress={handleSubmit}>
                Login
            </Button>       
            
            <TouchableOpacity
              onPress={() => props.switchAuthMode()}
              style={styles.authSwitch}>
              <Text style={styles.signUpButton}>
                New to Loop?{' '}
                <Text style={{color: '#1e90ff'}}>Sign Up</Text>
              </Text>
            </TouchableOpacity>   
          </View>  
        )}
      </Formik>

      <GoogleSigninButton 
            style={styles.googleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={_signIn}/>
    </View>
  );

  let displayRegister = (
      <Formik
        initialValues= {{displayName: '', email: '', password: '', confirmPassword: ''}}
        validationSchema = {signUpValidationSchema}
        onSubmit = { values =>  props.authMode === 'login' ? props.login(values) : props.signup(values) }
      >
        {({handleChange, handleSubmit, values, errors, setFieldTouched, touched, isValid}) => (
          <View>  
            <View style={styles.logo}>
              <Image
                source={require('../assets/Looplogo.png')}
                style={styles.image}
              />
            </View>

            <TextInput 
              style={styles.authInput}
              mode="outlined"
              label="User Handle"
              onChangeText={handleChange('displayName')}
              onBlur={() => setFieldTouched('displayName')}
              theme={{
                colors: {primary: '#1e90ff', underlineColor: 'transparent'},
              }}
              autoCapitalize="none"
              value = {values.displayName}
            />
            {touched.name && errors.name && 
              <Text style={{ fontSize: 12, color: '#FF0d10', paddingLeft : 10 }} > {errors.name} </Text>
            }
  
            <TextInput 
              style={styles.authInput}
              mode="outlined"
              label="Email"
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              theme={{
                colors: {primary: '#1e90ff', underlineColor: 'transparent'},
              }}
              autoCapitalize="none"
              value = {values.email}
            />

            {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft : 10}}>{errors.email}</Text>
            }
  
            <TextInput
              style={styles.authInput}
              mode="outlined"
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              theme={{
                colors: {primary: '#1e90ff', underlineColor: 'transparent'},
              }}
              secureTextEntry={true}
              autoCapitalize="none"
              value = {values.password}
            />

            {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft : 10  }}>{errors.password}</Text>
            }

            <TextInput
              style={styles.authInput}
              mode="outlined"
              label="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => setFieldTouched('confirmPassword')}
              theme={{
                colors: {primary: '#1e90ff', underlineColor: 'transparent'},
              }}
              secureTextEntry={true}
              autoCapitalize="none"
              value = {values.confirmPassword}
            />

            {touched.confirmPassword && errors.confirmPassword &&
              <Text style={{ fontSize: 12, color: '#FF0D10', paddingLeft : 10 }}>{errors.confirmPassword}</Text>
            }
          
            <Button
              style={styles.authButton}
              mode="outlined"
              onPress={handleSubmit}>
                Sign Up
            </Button>
  
            <TouchableOpacity
              onPress={() => props.switchAuthMode()}
              style={styles.authSwitch}>
              <Text style={styles.signUpButton}>
                Already Have an Account? <Text style={{color: '#1e90ff'}}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
  )

  return props.authMode === 'signup' ? displayRegister : displayLogin
}

export default AuthForm
