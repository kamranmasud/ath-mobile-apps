import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';

import BackNav from '../BackNav';
import PhoneNumber from './PhoneNumber';
import styles from '../styles/styles';
import PhoneInput from 'react-native-phone-number-input';

const Signup = props => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const phoneInput = useRef(<PhoneInput></PhoneInput>);
  const [formattedValue, setFormattedValue] = useState('');
  const [token, setToken] = useState('');
  const {email} = props.route.params;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('00:00');
  const [dateTime, setDateTime] = useState(new Date());
  const [match, setMatch] = useState(true);

  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [num3, setNum3] = useState();
  const [num4, setNum4] = useState();
  const [val1, setVal1] = useState();
  const [val2, setVal2] = useState();
  const [val3, setVal3] = useState();
  const [val4, setVal4] = useState();

  const [num5, setNum5] = useState();
  const [num6, setNum6] = useState();
  const [num7, setNum7] = useState();
  const [num8, setNum8] = useState();
  const [pin1, setPin1] = useState();
  const [pin2, setPin2] = useState();
  const [pin3, setPin3] = useState();
  const [pin4, setPin4] = useState();

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setText(fDate);
    console.log(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  function setValue1(val) {
    //setVal1(null);
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
    num5.focus();
  }

  function confir1(val) {
    setPin1(val);

    if (val !== val1) {
      setMatch(false);
    } else {
      setMatch(true);
      num6.focus();
    }
    console.log(val1, 'hello');
  }
  function confir2(val) {
    setPin2(val);
    if (val !== val2) {
      setMatch(false);
    } else {
      setMatch(true);
      num7.focus();
    }
  }
  function confir3(val) {
    setPin3(val);
    if (val !== val3) {
      setMatch(false);
    } else {
      setMatch(true);
      num8.focus();
    }
  }
  function confir4(val) {
    setPin4(val);
    if (val !== val4) {
      setMatch(false);
    } else setMatch(true);
  }

  function register() {
    let password1 = val1 + val2 + val3 + val4;
    let password2 = pin1 + pin2 + pin3 + pin4;
    var phoneno = /^\d{13}$/;
    var phoneno1 = /^\d{12}$/;

    if (password1 === password2) {
      setMatch(true);
      console.log(password1, password2);
      if (date !== null) {
        console.log(formattedValue);
        if (formattedValue.match(phoneno) || formattedValue.match(phoneno1)) {
          let cust = {
            email: email,
            phoneNumber: formattedValue,
            password: password1,
            dob: date,
          };
          fetch(`${url}/signup/customer`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cust),
          })
            .then(async res => {
              try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                  Alert.alert('Error', 'Unable to register', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
                } else {
                  console.log(jsonRes);
                  storeData(jsonRes);
                  props.navigation.navigate('Landing');
                }
              } catch (err) {
                console.log(err);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          alert('Invalid Phone Number!');
        }
      } else alert('Invalid Date of Birth!');
    } else setMatch(false);
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackNav login={true} navigation={props.navigation} innerText="Signup" />
      <View style={signupStyles.signupText}>
        <Text style={styles.pswdText}>Set Password</Text>
        <Text style={styles.text}>Secure your account with a new password</Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phone}
          layout="first"
          placeholder="Mobile number"
          defaultCode="AE"
          autoFocus={false}
          onChangeText={text => {
            setPhone(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text.replace(/[^\d]/g, ''));
          }}
          containerStyle={signupStyles.number}
          countryPickerButtonStyle={signupStyles.country}
          codeTextStyle={signupStyles.input}
          textContainerStyle={signupStyles.picker}
          textInputStyle={signupStyles.numText}
          //autoFocus
        />
        <TouchableOpacity
          style={signupStyles.inputBox}
          onPress={() => showMode('date')}>
          <TextInput
            style={signupStyles.dateBox}
            //onChangeText={onChangePin1}
            editable={false}
            value={text}
            placeholder="Select Date of Birth"
            keyboardType="numeric"
          />
          <TouchableOpacity title="DatePicker" onPress={() => showMode('date')}>
            <Icon style={signupStyles.icon} name="date-range" size={20}></Icon>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* <Datepicker /> */}
        <Text style={styles.password}>New Password*</Text>
        <View style={signupStyles.pin}>
          <TextInput
            maxLength={1}
            style={styles.pin}
            keyboardType="numeric"
            //autoFocus
            placeholder="*"
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
        <Text style={styles.password}>Confirm Password*</Text>
        <View style={signupStyles.pin}>
          <TextInput
            maxLength={1}
            style={styles.pin}
            placeholder="*"
            keyboardType="numeric"
            defaultValue={num5}
            onChangeText={text => confir1(text)}
            ref={text => setNum5(text)}
          />
          <TextInput
            maxLength={1}
            style={styles.pin}
            placeholder="*"
            keyboardType="numeric"
            defaultValue={num6}
            onChangeText={text => confir2(text)}
            ref={text => setNum6(text)}
          />
          <TextInput
            maxLength={1}
            style={styles.pin}
            placeholder="*"
            keyboardType="numeric"
            defaultValue={num7}
            onChangeText={text => confir3(text)}
            ref={text => setNum7(text)}
          />
          <TextInput
            maxLength={1}
            style={styles.pin}
            placeholder="*"
            keyboardType="numeric"
            defaultValue={num8}
            onChangeText={text => confir4(text)}
            ref={text => setNum8(text)}
          />
        </View>
        {match ? (
          <></>
        ) : (
          <Text style={{color: 'red'}}>Password does not match</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={() => register()}>
          <Text style={styles.continue}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default Signup;

const signupStyles = StyleSheet.create({
  pin: {
    flexDirection: 'row',
  },
  signupText: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#742013',
    paddingRight: 15,
  },
  dateBox: {
    width: '90%',
  },
  inputBox: {
    flexDirection: 'row',
    marginTop: 20,
    width: '85%',
    borderRadius: 25,
    height: 42,
    borderWidth: 1,
    borderColor: '#e5e4e2',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  number: {
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#e5e4e2',
    height: 42,
    width: '85%',
    marginTop: 5,
    marginBottom: 10,
  },
  country: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderWidth: 0.5,
    borderColor: '#e5e4e2',
  },
  input: {
    marginTop: -5,
    fontSize: 14,
    color: 'grey',
  },
  picker: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 0.5,
    borderColor: '#e5e4e2',
    backgroundColor: 'white',
  },
  numText: {
    margin: -15,
    height: 60,
    fontSize: 14,
    color: 'grey',
  },
});
