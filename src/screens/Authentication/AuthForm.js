import React from 'react';
import {withFormik} from 'formik';
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

const AuthForm = (props) => {
  displayLogin = (
    <View style={styles.form}>
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
        onChangeText={(text) => props.setFieldValue('email', text)}></TextInput>

      <TextInput
        style={styles.authInput}
        mode="outlined"
        label="Password"
        theme={{
          colors: {primary: '#1e90ff', underlineColor: 'transparent'},
        }}
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(text) =>
          props.setFieldValue('password', text)
        }></TextInput>

      <Button
        style={styles.authButton}
        mode="outlined"
        onPress={() => props.handleSubmit()}
        color="#1e90ff">
        Login
      </Button>
      <TouchableOpacity
        onPress={() => props.switchAuthMode()}
        style={styles.authSwitch}>
        <Text style={styles.signUpButton}>
          New to the boiler plate?{' '}
          <Text style={{color: '#1e90ff'}}>SignUp</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );

  displayRegister = (
    <View style={styles.form}>
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
        onChangeText={(text) =>
          props.setFieldValue('displayName', text)
        }></TextInput>
      <TextInput
        style={styles.authInput}
        mode="outlined"
        label="Email"
        theme={{
          colors: {primary: '#1e90ff', underlineColor: 'transparent'},
        }}
        autoCapitalize="none"
        onChangeText={(text) => props.setFieldValue('email', text)}></TextInput>
      <TextInput
        style={styles.authInput}
        mode="outlined"
        label="Password"
        secureTextEntry={true}
        theme={{
          colors: {primary: '#1e90ff', underlineColor: 'transparent'},
        }}
        autoCapitalize="none"
        onChangeText={(text) =>
          props.setFieldValue('password', text)
        }></TextInput>
      <TextInput
        style={styles.authInput}
        mode="outlined"
        label=" Re-Enter Password"
        secureTextEntry={true}
        theme={{
          colors: {primary: '#1e90ff', underlineColor: 'transparent'},
        }}
        autoCapitalize="none"
        onChangeText={(text) => props.setFieldValue('rePWD', text)}></TextInput>
      <Button
        style={styles.authButton}
        mode="outlined"
        onPress={() => props.handleSubmit()}
        color="#1e90ff">
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
  );

  return (
    <ScrollView>
      {props.authMode === 'signup' ? displayRegister : displayLogin}
    </ScrollView>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
    rePWD: '',
    displayName: '',
  }),
  validate: (values, props) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be longer than 8 characters';
    }
    return errors;
  },

  handleSubmit: (values, {props}) => {
    props.authMode === 'login' ? props.login(values) : props.signup(values);
  },
})(AuthForm);

// validationSchema: (props) => yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().min(10).required(),
//   displayName: props.authMode === 'signup' ?
//     yup.string().min(4).required() : null
// }),
