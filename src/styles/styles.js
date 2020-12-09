import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  greeting: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 50,
  },
  logo: {
    alignItems: 'center',
    marginTop: 120,
    marginBottom: 60
  },

  form: {
    flex: 1,
    margin: 25,
  },
  authInput: {marginTop: 10, marginLeft: 15, marginRight:15},
  authButton: {color : "#1e90ff", marginTop: 20, marginLeft: 15, marginRight:15},
  authSwitch: {
    marginTop: 15,
    alignItems: 'center',
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'left',
    marginTop: 20,
  },
  card: {
    marginTop: 20,
  },
  avatar: {
    color: 'blue',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 30,
  },
  image: {
    width: 250,
    height: 100,
    marginTop: 30,
    marginBottom: 30
  },
  loading: {
    marginTop: 300,
  },
  profileButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
  }
});
