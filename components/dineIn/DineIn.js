import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackNav from '../BackNav';
import styles1 from '../styles/styles';
import PhoneInput from 'react-native-phone-number-input';

const DineIn = props => {
  const [date, setDate] = useState(new Date());
  const {branchId} = props.route.params;
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');
  const phoneInput = useRef(<PhoneInput></PhoneInput>);
  const [formattedValue, setFormattedValue] = useState('');
  const [token, setToken] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('00:00');
  const [seats, setSeats] = useState(null);
  const [customer, setCustomer] = useState(null);

  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('customer');
      console.log(value);
      if (value !== null) {
        let data = JSON.parse(value);
        //console.log(data.cust.id);
        setCustomer(data.cust.id);
        setToken(data.accessToken);
        // value previously stored
      } else {
      }
    } catch (e) {
      // error reading value
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getData();
      console.log('Focused');
      //console.log(AsyncStorage.getItem('customer'));

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('Unfocused');
      };
    }, []),
  );

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
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setText(fDate);
    setTime(fTime);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const createButtonAlert = () => {
    var phoneno = /^\d{13}$/;
    var phoneno1 = /^\d{12}$/;
    if (name !== '') {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        if (formattedValue.match(phoneno) || formattedValue.match(phoneno1)) {
          if (time !== '') {
            if (/^\d{1,2}$/.test(seats)) {
              let order = {
                type: 'DineIn',
                date: Date(),
                branch: branchId,
                customer: customer,
                location: '',
                instructions: '',
                status: 'active',
              };

              //console.log(order, dine);
              fetch(`${url}/add/order/customer`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(order),
              })
                .then(async res => {
                  try {
                    const jsonRes = await res.json();
                    if (res.status !== 200) {
                      Alert.alert('Error', 'Unable to place order', [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ]);
                    } else {
                      let dine = {
                        name: name,
                        email: email,
                        seats: seats,
                        phone: phone,
                        time: time,
                        date: Date(),
                        branch: branchId,
                        customer: customer,
                        order: jsonRes.id,
                      };
                      //console.log(jsonRes);
                      fetch(`${url}/add/dine`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(dine),
                      })
                        .then(async resp => {
                          try {
                            const jsonResp = await resp.json();
                            if (resp.status !== 200) {
                              console.log(jsonResp);
                              Alert.alert('Error', 'Unable to place order', [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK',
                                  onPress: () => console.log('OK Pressed'),
                                },
                              ]);
                            } else {
                              console.log(jsonResp);
                              props.navigation.navigate('Landing');
                              // onLoggedIn(jsonResp.token);
                              // setIsError(false);
                              // setMessage(jsonResp.message);
                            }
                          } catch (err) {
                            console.log(err);
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                      //console.log(jsonRes);
                      // onLoggedIn(jsonRes.token);
                      // setIsError(false);
                      // setMessage(jsonRes.message);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              alert('Invalid seats');
            }
          } else {
            alert('Invalid Time!');
          }
        } else {
          alert('Invalid Phone Number!');
        }
      } else alert('Invalid Email Address!');
    } else alert('Invalid Name!');
    //return (false)
    // Alert.alert('Request Received', 'You will be updated shortly.', [
    //   {text: 'OK', onPress: () => props.navigation.navigate('Landing')},
    // ]);
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackNav navigation={props.navigation} login={true} innerText="Dine In" />
      <View style={styles.main}>
        <Text style={styles.heading}>Your Personal Details</Text>
        <Text>Name</Text>
        <TextInput
          style={styles.outline}
          defaultValue={name}
          onChangeText={newName => setName(newName)}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.outline}
          defaultValue={email}
          onChangeText={newEmail => setEmail(newEmail)}
        />
        <Text>Phone</Text>
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
        />
        {/* <TextInput style={styles.outline} /> */}
        <Text>Select Time</Text>
        <TouchableOpacity
          style={styles.outline}
          onPress={() => showMode('time')}>
          <Text style={{padding: 8}}>{time}</Text>
        </TouchableOpacity>
        <Text>Seats Reserved</Text>
        <TextInput
          style={styles.outline}
          defaultValue={seats}
          onChangeText={text => setSeats(text)}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.button} onPress={createButtonAlert}>
          <Text style={styles1.continue}>SEND</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
//name email phone date select time slot send
export default DineIn;

const styles = StyleSheet.create({
  main: {
    margin: 20,
  },
  button: {
    marginTop: 25,
    marginBottom: 10,
    width: '90%',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#742013',
  },
  heading: {
    color: '#742013',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 15,
  },
  outline: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    width: '100%',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 25,
    paddingLeft: 15,
    height: 40,
  },
  number: {
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#e5e4e2',
    height: 42,
    width: '100%',
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
