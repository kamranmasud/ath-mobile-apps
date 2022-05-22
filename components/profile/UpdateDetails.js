import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PhoneNumber from '../login/PhoneNumber';
import styles1 from '../styles/styles';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';

const UpdateDetails = props => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState(customer?.dob);
  const [token, setToken] = useState('');

  const phoneInput = useRef(<PhoneInput></PhoneInput>);
  const [formattedValue, setFormattedValue] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('00:00');
  const [dateTime, setDateTime] = useState(new Date());
  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
    Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getData();
      //console.log(AsyncStorage.getItem('customer'));

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('Unfocused');
      };
    }, []),
  );
  const getData = async () => {
    try {
      var url = "https://ath-restapi.herokuapp.com";

      const value = await AsyncStorage.getItem('customer');

      if (value !== null) {
        let data = JSON.parse(value);

        axios
          .get(url + "/get/customer/" + data.cust.id)
          .then(response => {
            setCustomer(response.data);
            setName(response.data.name);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setText(response.data.phone);
            let dob = new Date(response.data.dob);
            let fullDate = dob.getDate() + '/' + dob.getMonth() + '/' + dob.getFullYear();
            setDate(fullDate);
          })
          .catch(error => {
            console.log(error);
          });
        // value previously stored
      }

      // const value = await AsyncStorage.getItem('customer');
      // console.log(value);
      // if (value !== null) {
      //   let data = JSON.parse(value);
      //   console.log(data);
      //   setCustomer(data.cust);
      //   setToken(data.accessToken);
      //   setName(data.cust?.name);
      //   setEmail(data.cust?.email);
      //   setPhone(data.cust?.phone);
      //   setText(data.cust?.phone);
      //   console.log(phone);
      //   let dob = new Date(data.cust?.dob);
      //   let fullDate =
      //     dob.getDate() + '/' + dob.getMonth() + '/' + dob.getFullYear();
      //   console.log(fullDate);
      //   setDate(fullDate);
      //   console.log(date);
      //   //return value;
      //   // value previously stored
      // } else {
      // }
    } catch (e) {
      console.log(e);
      //return false;
      // error reading value
    }
  };

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

  function updateCustomer() {
    var phoneno = /^\d{13}$/;
    var phoneno1 = /^\d{12}$/;
    if (name !== '') {
      if (date !== null) {
        console.log(formattedValue);
        // if (formattedValue.match(phoneno) || formattedValue.match(phoneno1)) {
        let cust = {
          // email: email,
          // phoneNumber: formattedValue,
          name: name,
          // dob: date,
        };
        fetch(`${url}/customer/update/${customer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cust),
        })
          .then(async res => {
            try {
              const jsonRes = await res.json();
              if (res.status !== 200) {
                Alert.alert('Error', 'Unable to update', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
              } else {
                console.log(jsonRes);
                storeData(jsonRes);
                alert("User updated successfully.");
                //props.navigation.navigate('ViewProfile');
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
        // } else {
        //   alert('Invalid Phone Number!');
        // }
      } else alert('Invalid Date of Birth!');
    } else alert('Enter you name!');
  }

  return (
    <View style={styles.box}>
      <Text style={styles.labels}>Full Name</Text>
      <TextInput
        value={name}
        style={styles.input}
        placeholder="Enter your full Name"
        onChangeText={(name) => setName(name)}
      //keyboardType="str"
      />
      {/* <Text style={styles.labels}>Email Address</Text>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Enter your email address"
        //keyboardType="str"
      /> */}
      {/* <Text style={styles.labels}>Phone Number</Text>
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
        containerStyle={styles.number}
        countryPickerButtonStyle={styles.country}
        codeTextStyle={styles.input}
        textContainerStyle={styles.picker}
        textInputStyle={styles.numText}
        //autoFocus
      /> */}
      {/* <Text style={styles.labels}>Date of Birth</Text> */}
      {/* <View style={styles.inputBox}>
        <TextInput
          style={styles.dateBox}
          //onChangeText={onChangePin1}
          value={date}
          placeholder="Select Date of Birth"
          keyboardType="numeric"
          onChangeText={(date) => setDate(date)}
        />
        <TouchableOpacity title="DatePicker" onPress={() => showMode('date')}>
          <Icon style={styles.icon} name="date-range" size={20}></Icon>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity style={styles1.button} onPress={() => updateCustomer()}>
        <Text style={styles1.continue}>SAVE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.password}
        onPress={() => props.navigation.navigate("Change Password")}>
        <Text style={styles.textPswd}>Change Password</Text>
        <Icon name="arrow-right" size={30} color={'#742013'} />
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  box: {
    marginLeft: '7%',
    marginRight: '7%',
    width: '100%',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  inputBox: {
    flexDirection: 'row',
    width: '86%',
    borderRadius: 25,
    height: 42,
    borderWidth: 1,
    borderColor: '#e5e4e2',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dateBox: {
    width: '90%',
  },
  input: {
    width: '86%',
    borderRadius: 25,
    height: 40,
    borderWidth: 1,
    borderColor: '#e5e4e2',
    paddingLeft: 15
  },
  labels: {
    marginTop: 15,
    marginBottom: 5,
    //textAlign: 'left',
  },
  password: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPswd: {
    color: '#742013',
    fontSize: 16,
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

export default UpdateDetails;
