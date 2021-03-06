import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StackNavigatorProp} from '../../router/StackNavigator';
import {ConnectUserAction} from './types/auth';
import {
  COLOR_WHITE,
  COLOR_GREY,
  COLOR_YELLOW,
} from '../../../static/misc/colors';
import {REGEX_EMAIL, REGEX_PASSWORD} from '../../../static/misc/constants';

interface LoginProps {
  navigation: StackNavigatorProp;
  connectUser: () => ConnectUserAction;
}

interface LoginState {
  login: string;
  password: string;
  userCanTry: boolean;
}

export class LoginView extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      login: '',
      password: '',
      userCanTry: false,
    };
  }

  componentDidUpdate() {
    const {login, password, userCanTry} = this.state;
    if (
      REGEX_EMAIL.test(login) &&
      REGEX_PASSWORD.test(password) &&
      !userCanTry
    ) {
      this.userCanTry(true);
    } else if (
      !REGEX_EMAIL.test(login) &&
      !REGEX_PASSWORD.test(password) &&
      userCanTry
    ) {
      this.userCanTry(false);
    }
  }

  userCanTry = (userCanTry: boolean) => this.setState({userCanTry});

  handleChange = (name: string) => (value: string) =>
    this.setState({[name]: value} as object);

  onLogin = () => {
    const {connectUser} = this.props;
    connectUser();
    this.goTo('MainFlow')();
  };

  goTo = (route: any) => () => {
    const {navigation} = this.props;
    navigation.navigate(route);
  };

  render() {
    const {userCanTry, login, password} = this.state;
    return (
      <SafeAreaView style={styles.appContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.avoidingView}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
          <View style={styles.form}>
            <TextInput
              placeholder="Identifiant"
              value={login}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              onChangeText={this.handleChange('login')}
            />
            <TextInput
              placeholder="Mot de passe"
              value={password}
              style={styles.input}
              secureTextEntry
              onChangeText={this.handleChange('password')}
            />
            <TouchableOpacity
              style={[styles.button, !userCanTry ? styles.isDisabled : null]}
              onPress={this.onLogin}
              disabled={!userCanTry}>
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={this.goTo('Signin')}>
              <Text>Créer votre compte</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR_WHITE,
  },
  avoidingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 50,
  },
  form: {
    width: '80%',
  },
  input: {
    fontSize: 14,
    zIndex: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_GREY,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    borderRadius: 5,
    backgroundColor: COLOR_YELLOW,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: COLOR_WHITE,
  },
  isDisabled: {
    opacity: 0.5,
  },
  link: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
