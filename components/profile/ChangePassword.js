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
import BackNav from '../BackNav';

import styles1 from '../styles/styles';

const ChangePassword = props => {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState(customer.dob);
  const [token, setToken] = useState('');

  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [re_password, setRePassword] = useState('');
  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
    Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

  async function updateCustomer() {
    if (new_password !== '') {
      if (re_password !== '') {
        const value = await AsyncStorage.getItem('customer');
        let data = JSON.parse(value);
        fetch(`${url}/customer/update/password/${data.cust.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: new_password
          }),
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
                alert("Password changed successfully.");
                // console.log(jsonRes);
                //props.navigation.navigate('ViewProfile');
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else alert('Retype new password field is required!');
    } else alert('Password field is required!');
  }

  return (
    <View>
      <BackNav navigation={props.navigation} login={true} innerText="Change Password" />
      <View style={styles.box}>
        {/* <Text style={styles.labels}>Current Password</Text>
      <TextInput
        value={current_password}
        style={styles.input}
        placeholder="Enter your current password"
        onChangeText={(current_password) => setCurrentPassword(current_password)}
        //keyboardType="str"
      /> */}
        <Text style={styles.labels}>New Password</Text>
        <TextInput
          value={new_password}
          style={styles.input}
          placeholder="Enter new password"
          onChangeText={(new_password) => setNewPassword(new_password)}
        //keyboardType="str"
        />
        <Text style={styles.labels}>Retype New Password</Text>
        <TextInput
          value={re_password}
          style={styles.input}
          placeholder="Retype new password"
          onChangeText={(re_password) => setRePassword(re_password)}
        //keyboardType="str"
        />
        <TouchableOpacity style={styles1.button} onPress={() => updateCustomer()}>
          <Text style={styles1.continue}>SAVE</Text>
        </TouchableOpacity>
      </View>
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

export default ChangePassword;
