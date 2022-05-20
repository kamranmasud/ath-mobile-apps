import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

import BackNav from '../BackNav';
//import PhoneNumber from './PhoneNumber';
import styles1 from '../styles/styles';
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const dimHeight = dimensions.height;
const height = width * 0.7;
const token = 'AAAA-BBBB-CCCC-DDDD';
// const url =
//   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

export class Login extends Component {
  constructor(props) {
    super(props);
    //const {navigation} = props;
    this.state = {
      checked: false,
      email: '',
      customer: [],
    };
    //sessionStorage.setItem('token', '');
  }
  setEmail(email) {
    this.setState({
      email: email,
    });
  }

  continue() {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      if (this.state.checked) {
        fetch(`${url}/get/customer/email/${this.state.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(async res => {
            try {
              const jsonRes = await res.json();
              console.log(res);
              if (res.status === 200) {
                if (this.state.email === jsonRes.email) {
                  this.state.customer = jsonRes;
                  this.props.navigation.navigate('Password', {
                    customer: jsonRes,
                  });
                } else {
                  this.props.navigation.navigate('Forget');
                }
              } else {
                this.props.navigation.navigate('Signup', {
                  email: this.state.email,
                });
              }
            } catch (err) {
              console.log(err);
              this.props.navigation.navigate('Signup', {
                email: this.state.email,
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert('Agree Terms and Conditions to proceed');
      }
    } else alert('Invalid Email!');
    //() => this.props.navigation.navigate('Password')
  }
  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <BackNav
          login={true}
          navigation={this.props.navigation}
          innerText="Login"
        />
        <View style={styles.loginText}>
          <Text style={styles.rewards}>Start Earning Rewards</Text>
          <Text style={styles.welcome}>Welcome</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            defaultValue={this.state.email}
            onChangeText={email => this.setState({email: email})}
            //keyboardType="str"
          />
          <View style={styles.checkView}>
            {/* <View style={styles.checkBox}> */}
            <TouchableOpacity
              style={this.state.checked ? styles.checkBox : styles.unChecked}
              onPress={() =>
                this.state.checked
                  ? this.setState({checked: false})
                  : this.setState({checked: true})
              }>
              <Icon size={15} name="check" style={styles.icon} />
            </TouchableOpacity>
            {/* </View> */}
            <Text style={styles.text}> I agree to the following</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.policy}>Privacy Policy</Text>
            <Text>,</Text>
            <Text style={styles.policy}>Terms and Condition</Text>
          </View>
          <TouchableOpacity
            style={styles1.button}
            onPress={e => this.continue()}>
            <Text style={styles1.continue}>CONTINUE</Text>
          </TouchableOpacity>
          <Text>OR</Text>
          <TouchableOpacity
            style={styles.facebook}
            onPress={() => Alert.alert('Button Pressed')}>
            <Icon2 style={styles.iconSocial} size={25} name="facebook"></Icon2>
            <Text style={styles1.continue}> Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.google}
            onPress={() => Alert.alert('Button Pressed')}>
            <Icon2 style={styles.iconSocial} name="google" size={25}></Icon2>
            <Text style={styles.continue}> Continue with Google</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{flex: 1}}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.pexels.com/photos/3596194/pexels-photo-3596194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
          />
        </View> */}
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
    position: 'absolute',
    bottom: 0,
  },
  loginText: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewards: {
    paddingBottom: 5,
    color: '#742013', //'#D22B2B',
    fontSize: 22,
    transform: [{rotate: '-5deg'}],
  },
  welcome: {
    fontSize: 30,
    color: '#742013',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  checkView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 10,
  },
  text: {
    color: '#742013',
    fontSize: 12,
  },
  icon: {
    color: 'white',
  },
  checkBox: {
    backgroundColor: '#742013',
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  },
  unChecked: {
    backgroundColor: 'white',
    borderColor: '#742013',
    borderWidth: 1.2,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  },
  policy: {
    color: '#742013',
    fontSize: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: '#742013',
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  facebook: {
    marginTop: 10,
    width: '85%',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4267B2',
    flexDirection: 'row',
  },
  google: {
    marginTop: 10,
    width: '85%',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    flexDirection: 'row',
  },
  iconSocial: {
    color: 'white',
    alignContent: 'space-around',
  },
  input: {
    width: '85%',
    borderRadius: 25,
    height: 40,
    borderWidth: 1,
    borderColor: '#e5e4e2',
    paddingLeft: 15,
  },
});
