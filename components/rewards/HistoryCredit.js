import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import PopNav from '../PopNav';

const HistoryCredit = props => {
  const {navigation} = props;
  const [sent, setSent] = useState([]);
  const [received, setRecieved] = useState([]);
  const [token, setToken] = useState('');
  const [customer, setCustomer] = useState('');
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
          getRecordAsCustomer(cust.cust.id);
          getRecordAsFriend(cust.cust.id);
        }
      }
      async function getRecordAsCustomer(id) {
        fetch(`${url}/get/credit/customer/${id}`, {
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
                setSent(jsonRes);
                console.log('customer', jsonRes[0]);
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      async function getRecordAsFriend(id) {
        fetch(`${url}/get/credit/friend/${id}`, {
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
                setRecieved(jsonRes);
                console.log('friend', jsonRes);
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      getCustomer();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  const renderItem = ({item}) => (
    <View style={styles.item}>
      {item.friendId ? (
        <Text style={styles.title}>To: {item.friendId.name}</Text>
      ) : (
        <Text style={styles.title}>Order#: {item.order.orderNumber}</Text>
      )}
      <Text style={[styles.title, {paddingLeft: '20%'}]}>
        Amount {item.amount}
      </Text>
    </View>
  );
  const renderRecieved = ({item}) => (
    <View style={styles.item}>
      {item.friendId ? (
        <Text style={styles.title}>From: {item.friendId.name}</Text>
      ) : (
        <Text style={styles.title}>Order#: {item.order.orderNumber}</Text>
      )}
      <Text style={[styles.title, {paddingLeft: '20%'}]}>
        Amount {item.amount}
      </Text>
    </View>
  );
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <PopNav heading="History" navigation={props.navigation} />
      <View style={{padding: 20}}>
        <FlatList
          data={sent}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <FlatList
          data={received}
          renderItem={renderRecieved}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default HistoryCredit;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    margin: 5,
  },
  title: {
    fontSize: 14,
    color: 'black',
  },
  header: {
    padding: 5,
    height: 50,
    flexDirection: 'row',
    //backgroundColor: '#D22B2B',
    backgroundColor: '#742013',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //left: '40%',
  },
});
