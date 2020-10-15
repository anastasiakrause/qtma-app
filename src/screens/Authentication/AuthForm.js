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
import {styles} from '../../styles/styles';
import {TextInput, Button} from 'react-native-paper';

const signUpValidationSchema = yup.object().shape({
  email: yup
  .string()
  .label('Email')
  .email()
  .required(),
  password: yup
  .string()
  .label('Password')
  .required()
  .min(2, 'seems a bit short...')
  .max(15, 'alright lets calm down')
});

const AuthForm = (props) => {
  displayLogin = (
    <Formik
      initialValues= {{email: '', password: ''}}
      onSubmit = { () => props.handleSubmit() }
    >
      {({handleChange, handleSubmit, values}) => (
        <View>
          <Text style={styles.greeting}>{'QTMA Boiler Plate.'}</Text>

          <View style={styles.logo}>
            <Image
              source={require('../../assets/QTMA_SB.png')}
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
            onPress={handleSubmit} 
            title = "Login" />

          <TouchableOpacity
            onPress={() => props.switchAuthMode()}
            style={styles.authSwitch}>
            <Text style={styles.signUpButton}>
              New to the boiler plate?{' '}
              <Text style={{color: '#1e90ff'}}>SignUp</Text>
            </Text>
          </TouchableOpacity>          
        </View>
      )}
    </Formik>
  )

  displayRegister = (
      <Formik
        initialValues= {{displayName: '', email: '', password: '', confirmPassword: ''}}
        validationSchema = {signUpValidationSchema}
        onSubmit = { values =>  props.authMode === 'login' ? props.login(values) : props.signup(values) }
      >
        {({handleChange, handleSubmit, values}) => (
          <View>
            <Text style={styles.greeting}>{'QTMA Boiler Plate.'}</Text>
  
            <View style={styles.logo}>
              <Image
                source={require('../../assets/QTMA_SB.png')}
                style={styles.image}
              />
            </View>

            <TextInput 
              style={styles.authInput}
              mode="outlined"
              label="Name"
              theme={{
                colors: {primary: '#1e90ff', underlineColor: 'transparent'},
              }}
              autoCapitalize="none"
              value = {values.displayName}
              onChangeText={handleChange('displayName')}
            />
  
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

            <TextInput
              style={styles.authInput}
              mode="outlined"
              label="Confirm Password"
              theme={{
                colors: {primary: '#1e90ff', underlineColor: 'transparent'},
              }}
              secureTextEntry={true}
              autoCapitalize="none"
              value = {values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
            />
          
            <Button
              style={styles.authButton}
              mode="outlined"
              onPress={handleSubmit}
              title = "Login" />
  
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