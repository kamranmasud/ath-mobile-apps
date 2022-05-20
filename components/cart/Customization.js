import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';

import BackNav from '../BackNav';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PopNav from '../PopNav';

const Customization = props => {
  //states
  const {items} = props.route.params;
  const [standard, setStandard] = useState(0);
  const [small, setSmall] = useState(0);
  const [large, setLarge] = useState(0);
  const [customer, setCustomer] = useState('');
  //const [item, setItem] = useState('');
  const [token, setToken] = useState('');
  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

  //on component focus
  useFocusEffect(
    React.useCallback(() => {
      console.log(props.branch);
      // Do something when the screen is focused
      //getData();
      getCart();
      console.log('Focused');
      //console.log(AsyncStorage.getItem('customer'));

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('Unfocused');
      };
    }, []),
  );

  //methods

  const getCart = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
      //console.log(value);
      if (value !== null) {
        let data = JSON.parse(value);
        //let c = 0;
        data.forEach(element => {
          if (items.id === element.item) {
            setSmall(element.cart[1].count);
            setStandard(element.cart[0].count);
            setLarge(element.cart[2].count);
            // c =
            //   element.cart[0].count +
            //   element.cart[1].count +
            //   element.cart[2].count;
          } else {
          }
        });
        //setCount(c);
        // value previously stored
      } else {
        setCount(0);
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };

  const deleteCart = async () => {
    try {
      //const jsonValue = JSON.stringify(value);
      await AsyncStorage.removeItem('cart');
      //setIsOrder(false);
    } catch (e) {
      // saving error
    }
  };

  const addCart = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('cart', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const addCounter = async size => {
    try {
      const value = await AsyncStorage.getItem('cart');
      //console.log(value);
      if (value !== null) {
        let data = JSON.parse(value);
        let c = 0;
        data.map((element, i) => {
          if (items.id === element.item) {
            if (size === 'standard') {
              data[i].cart[0].count = element.cart[0].count + 1;
            } else if (size === 'small') {
              data[i].cart[1].count = element.cart[1].count + 1;
            } else {
              data[i].cart[2].count = element.cart[2].count + 1;
            }
            c =
              element.cart[0].count +
              element.cart[1].count +
              element.cart[2].count;
          } else {
          }
          //console.log(data[i].cart);
        });
        if (size === 'standard') {
          setStandard(standard + 1);
        } else if (size === 'small') {
          setSmall(small + 1);
        } else {
          setLarge(large + 1);
        }
        if (c === 0) {
          let save = {
            item: items.id,
            cart: [
              {count: standard, size: 'standard'},
              {count: small, size: 'small'},
              {count: large, size: 'large'},
            ],
          };
          data.push(save);
        }
        deleteCart();
        addCart(data);
        // value previously stored
      } else {
        if (size === 'standard') {
          setStandard(1);
        } else if (size === 'small') {
          setSmall(1);
        } else {
          setLarge(1);
        }
        let save = {
          item: items.id,
          cart: [
            {count: standard, size: 'standard'},
            {count: small, size: 'small'},
            {count: large, size: 'large'},
          ],
        };

        addCart(save);
        //setCount(1);
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };

  const subtractCounter = async size => {
    try {
      const value = await AsyncStorage.getItem('cart');
      //console.log(value);
      if (value !== null) {
        let data = JSON.parse(value);
        //console.log(data);
        let c = 0;
        let arr = [];
        data.map((element, i) => {
          if (items.id === element.item) {
            if (size === 'standard') {
              data[i].cart[0].count = element.cart[0].count - 1;
              setStandard(standard - 1);
            } else if (size === 'small') {
              data[i].cart[1].count = element.cart[1].count - 1;
              setSmall(small - 1);
            } else {
              data[i].cart[2].count = element.cart[2].count - 1;
              setLarge(large - 1);
            }
            //data[i].cart[0].count = element.cart[0].count - 1;
            c =
              element.cart[0].count +
              element.cart[1].count +
              element.cart[2].count;
            if (c !== 0) {
              arr.push(element);
            }
          } else {
            arr.push(element);
          }
        });
        //setCount(c);
        deleteCart();
        addCart(arr);
        // value previously stored
      } else {
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };

  //View
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <PopNav heading="Customization" navigation={props.navigation} />
      <View style={{margin: 20}}>
        <Text
          style={{
            color: '#742013',
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 15,
          }}>
          Customize your order
        </Text>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={styles.infoBox}>
            <Text> Standard Size</Text>
          </View>
          <View style={styles.cart}>
            {standard === 0 ? (
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => addCounter('standard')}>
                <Icon color={'#742013'} name="add" size={20} />
              </TouchableOpacity>
            ) : (
              <View style={styles.quantity}>
                <TouchableOpacity
                  style={styles.valuesBtn1}
                  onPress={() => subtractCounter('standard')}>
                  <Icon style={{color: '#742013'}} size={15} name="remove" />
                </TouchableOpacity>
                <View style={styles.numberBox}>
                  <Text style={styles.numbers}>{standard}</Text>
                </View>
                <TouchableOpacity
                  style={styles.valuesBtn2}
                  onPress={() => addCounter('standard')}>
                  <Icon style={{color: '#742013'}} size={15} name="add" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={styles.infoBox}>
            <Text> Small Size</Text>
          </View>
          <View style={styles.cart}>
            {small === 0 ? (
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => addCounter('small')}>
                <Icon color={'#742013'} name="add" size={20} />
              </TouchableOpacity>
            ) : (
              <View style={styles.quantity}>
                <TouchableOpacity
                  style={styles.valuesBtn1}
                  onPress={() => subtractCounter('small')}>
                  <Icon style={{color: '#742013'}} size={15} name="remove" />
                </TouchableOpacity>
                <View style={styles.numberBox}>
                  <Text style={styles.numbers}>{small}</Text>
                </View>
                <TouchableOpacity
                  style={styles.valuesBtn2}
                  onPress={() => addCounter('small')}>
                  <Icon style={{color: '#742013'}} size={15} name="add" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={styles.infoBox}>
            <Text> Large Size</Text>
          </View>
          <View style={styles.cart}>
            {large === 0 ? (
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => addCounter('large')}>
                <Icon color={'#742013'} name="add" size={20} />
              </TouchableOpacity>
            ) : (
              <View style={styles.quantity}>
                <TouchableOpacity
                  style={styles.valuesBtn1}
                  onPress={() => subtractCounter('large')}>
                  <Icon style={{color: '#742013'}} size={15} name="remove" />
                </TouchableOpacity>
                <View style={styles.numberBox}>
                  <Text style={styles.numbers}>{large}</Text>
                </View>
                <TouchableOpacity
                  style={styles.valuesBtn2}
                  onPress={() => addCounter('large')}>
                  <Icon style={{color: '#742013'}} size={15} name="add" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Customization;

const styles = StyleSheet.create({
  infoBox: {
    width: '80%',
  },
  cart: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  iconStyle: {
    borderRadius: 8,
    borderColor: '#742013',
    height: 35,
    width: 35,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valuesBtn1: {
    height: 25,
    width: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valuesBtn2: {
    height: 25,
    width: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    width: 70,
    height: 25,
    borderRadius: 8,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
