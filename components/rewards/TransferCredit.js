import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import styles1 from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopNav from '../PopNav';

const TransferCredit = props => {
  const {navigation} = props;
  const [rewards, setRewards] = useState(props.route.params);
  const phoneInput = useRef(<PhoneInput></PhoneInput>);
  const [formattedValue, setFormattedValue] = useState('');
  const [token, setToken] = useState('');
  const [customer, setCustomer] = useState('');
  const [friendReward, setFriendReward] = useState('');
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [id, setId] = useState('');
  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';
  useFocusEffect(
    React.useCallback(() => {
      async function getCustomer() {
        let cust = JSON.parse(await AsyncStorage.getItem('customer'));
        if (cust !== null) {
          setToken(cust.accessToken);
          console.log(cust.accessToken);
          setCustomer(cust.cust);
        }
      }
      getCustomer();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  const transfer = () => {
    var phoneno = /^\d{13}$/;
    var phoneno1 = /^\d{12}$/;
    let value = false;
    console.log(email);
    console.log(phone);
    console.log(formattedValue);
    if (
      (email === '' || email === undefined) &&
      (phone === '' || phone === undefined)
    ) {
      alert('Please enter contact no. or email.');
    } else {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        let data1;
        const promise1 = fetch(`${url}/get/customer/email/${email}`, {
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
                data1 = jsonRes;
                setId(jsonRes.id);
                setFriendReward(jsonRes.rewards);
                value = true;
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
        setTimeout(() => {
          Promise.all(promise1).then(function () {
            // setId(data1.id);
            // setFriendReward(data1.rewards);
            updateCredits();
          });
        }, 2000);
      }
      if (formattedValue.match(phoneno) || formattedValue.match(phoneno1)) {
        const promise2 = fetch(`${url}/get/customer/phone/${formattedValue}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(async res => {
            try {
              const jsonResp = await res.json();
              if (res.status === 200) {
                data1 = jsonResp;
                setId(jsonResp.id);
                setFriendReward(jsonResp.rewards);
                value = true;
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
        setTimeout(() => {
          Promise.all(promise2).then(function () {
            // setId(data1.id);
            // setFriendReward(data1.rewards);
            updateCredits();
          });
        }, 2000);
      }
    }
  };

  const updateCredits = () => {
    setRewards(35);
    console.log(Number(rewards - amount));
    if (amount > 0 && id !== '') {
      if (rewards >= amount) {
        console.log(rewards, amount, friendReward);
        let friend = {
          rewards: Number(friendReward) + Number(amount),
        };
        console.log('friend', friend);
        fetch(`${url}/update/customer/rewards/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(friend),
        })
          .then(async res => {
            try {
              const jsonResp = await res.json();
              if (res.status === 200) {
                console.log('Added to friend');
                //setId(jsonResp.id);
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
        let mine = {
          rewards: Number(rewards) - Number(amount),
        };
        console.log('mine', mine);
        fetch(`${url}/update/customer/rewards/${customer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(mine),
        })
          .then(async res => {
            try {
              const jsonResp = await res.json();
              if (res.status === 200) {
                console.log('Deducted');
                setRewards(mine.rewards);
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
        let addCredit = {
          customer: customer.id,
          amount: Number(amount),
          received: false,
          friendId: id,
        };
        console.log(addCredit);
        fetch(`${url}/add/credit/friend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addCredit),
        })
          .then(async res => {
            try {
              const jsonResp = await res.json();
              if (res.status === 200) {
                console.log('Added in history');
                //setId(jsonResp.id);
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
        //       customer: mongoose.Types.ObjectId(req.body.customer),
        // amount: req.body.amount,
        // received: req.body.received,
        // order: mongoose.Types.ObjectId(req.body.order),
      } else alert('You do not have enough credit points!');
    } else alert('Try again.');
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <PopNav heading="Transfer Credit" navigation={props.navigation} />
      <View style={{padding: 20}}>
        <Text>Credit Points</Text>
        <TextInput
          keyboardType="numeric"
          maxLength={5}
          style={[styles.outline, {marginBottom: 25}]}
          defaultValue={amount}
          onChangeText={newAmount => setAmount(newAmount)}
        />
        <Text>Email</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.outline}
          defaultValue={email}
          onChangeText={newEmail => setEmail(newEmail)}
        />
        <Text style={{fontWeight: '500', textAlign: 'center'}}>OR</Text>
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
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={transfer}>
            <Text style={styles1.continue}>TRANSFER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TransferCredit;

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
    marginBottom: 10,
    width: '100%',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#742013',
  },

  loc: {
    color: 'white',
    fontSize: 12,
  },
  textLoc: {
    color: 'white',
    fontSize: 14,
  },
  textLocation: {
    justifyContent: 'center',
    alignItems: 'center',
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
});
