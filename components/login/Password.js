import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/styles';
import BackNav from '../BackNav';

const Password = props => {
  const {customer} = props.route.params;
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [num3, setNum3] = useState();
  const [num4, setNum4] = useState();
  const [val1, setVal1] = useState();
  const [val2, setVal2] = useState();
  const [val3, setVal3] = useState();
  const [val4, setVal4] = useState();
  const token = 'AAAA-BBBB-CCCC-DDDD';
  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('customer', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    //console.log(customer);
    //getOrders();
    return () => console.log('unmounting...');
  }, []);
  function setValue1(val) {
    setVal1(val);
    num2.focus();
    console.log(val1, 'hello');
  }
  function setValue2(val) {
    setVal2(val);
    num3.focus();
  }
  function setValue3(val) {
    setVal3(val);
    num4.focus();
  }
  function setValue4(val) {
    setVal4(val);
  }

  function confirm() {
    let password = val1 + val2 + val3 + val4;
    console.log(password.length, customer.email);
    if (password.length === 4) {
      fetch(`${url}/login/customer/${customer.email}/${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async res => {
          try {
            const jsonRes = await res.json();
            if (res.status === 200) {
              //console.log(jsonRes);
              if (jsonRes.code === 'success') {
                storeData(jsonRes);
                props.navigation.navigate('Landing');
              }
            }
            else {
              alert(JSON.stringify(jsonRes.message));
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert('Invalid Password!');
    }
  }
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackNav login={true} navigation={props.navigation} innerText="Login" />
      <View style={pswdStyles.pswdText}>
        <Text style={styles.pswdText}>Enter your password</Text>
        <Text style={styles.text}>Please enter your 4-digit password</Text>
        <View style={pswdStyles.pin}>
          <TextInput
            maxLength={1}
            style={styles.pin}
            placeholder="*"
            keyboardType="numeric"
            autoFocus
            defaultValue={num1}
            onChangeText={text => setValue1(text)}
            ref={input => {
              setNum1(input);
            }}
          />
          <TextInput
            maxLength={1}
            style={styles.pin}
            placeholder="*"
            keyboardType="numeric"
            defaultValue={num2}
            onChangeText={text => setValue2(text)}
            ref={text => setNum2(text)}
          />
          <TextInput
            maxLength={1}
            style={styles.pin}
            placeholder="*"
            keyboardType="numeric"
            defaultValue={num3}
            onChangeText={text => setValue3(text)}
            ref={text => setNum3(text)}
          />
          <TextInput
            maxLength={1}
            style={styles.pin}
            placeholder="*"
            keyboardType="numeric"
            defaultValue={num4}
            onChangeText={text => setValue4(text)}
            ref={text => setNum4(text)}
          />
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Forget')}>
          <Text style={pswdStyles.forgot}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => confirm()}>
          <Text style={styles.continue}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// Confirm button on press to be updated
export default Password;

const pswdStyles = StyleSheet.create({
  pin: {
    flexDirection: 'row',
  },
  pswdText: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgot: {
    color: 'grey',
    marginTop: 25,
  },
});
