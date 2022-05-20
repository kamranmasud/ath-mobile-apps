import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';

import BackNav from '../BackNav';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = props => {
  const [cash, setCash] = useState(false);
  const [card, setCard] = useState(false);
  const [points, setPoints] = useState(false);
  const [pay, setPay] = useState(false);
  const [order, setOrder] = useState('');
  const [orderData, setOrderData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [paymentData, setPaymentData] = useState('');
  const [location, setLocation] = useState('');
  const [rewards, setRewards] = useState(0);
  const [currency, setCurrency] = useState(0);
  const [token, setToken] = useState('');
  const {customer, branch, items, instructions, total, delivery, totalPoints} =
    props.route.params;
  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

  useFocusEffect(
    React.useCallback(() => {
      async function fetchSearchLocation() {
        var location = JSON.parse(await AsyncStorage.getItem('location'));
        if (location !== null) {
          setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setLocation(location.location);
        }
        // Do something when the screen is focused
      }
      // let customer = JSON.parse(AsyncStorage.getItem('customer'));
      // console.log(AsyncStorage.getItem('customer'));
      async function getCustomerRewards() {
        let cust = JSON.parse(await AsyncStorage.getItem('customer'));
        setToken(cust.accessToken);
        //console.log(customer);
        fetch(`${url}/get/customer/${cust.cust.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(async res => {
            try {
              const jsonRes = await res.json();
              if (res.status === 200) {
                console.log(jsonRes);
                setRewards(jsonRes.rewards);
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      async function getExportPoints() {
        fetch(`${url}/get/points`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(async res => {
            try {
              const jsonRes = await res.json();
              if (res.status === 200) {
                console.log(jsonRes);
                setCurrency(jsonRes[0].currency);
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }

      fetchSearchLocation();
      getCustomerRewards();
      getExportPoints();

      return () => {
        //AsyncStorage.removeItem('location');
        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  const isCash = () => {
    setCash(true);
    setCard(false);
    setPoints(false);
    setPay('cash');
  };
  const isCard = () => {
    setCash(false);
    setCard(true);
    setPoints(false);
    setPay('card');
  };
  const isPoints = () => {
    setCash(false);
    setCard(false);
    setPoints(true);
    setPay('points');
  };

  const orderRequests = () => {
    let orderId;
    let orderD, itemD;
    let order1 = {
      type: branch.type,
      date: Date(),
      branch: branch.branchId,
      customer: customer.id,
      location: location,
      instructions: instructions,
      status: 'active',
    };
    console.log(order1);
    fetch(`${url}/add/order/customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order1),
    })
      .then(async resp => {
        try {
          const jsonResp = await resp.json();
          if (resp.status !== 200) {
            //console.log(jsonResp);
            console.log('order created error');
            Alert.alert('Error', 'Unable to perform action', [
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
            console.log('order created');
            setOrder(jsonResp.id);
            orderId = jsonResp.id;
            orderD = jsonResp;
            setOrderData(jsonResp);
            // items to be added in the cart
            let cart;
            const promise = items.map((i, j) => {
              cart = {
                order: jsonResp.id,
                customer: customer.id,
                item: {
                  id: i.id,
                  quantity: i.quantity,
                  size: i.size,
                },
              };
              fetch(`${url}/add/cart`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  //Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(cart),
              })
                .then(async res => {
                  try {
                    const jsonRes = await res.json();
                    if (res.status !== 200) {
                      //console.log(jsonResp);
                      console.log('Order could not be placed!');
                      Alert.alert('Error', 'Order could not be placed!', [
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
                      itemD = jsonRes;
                      console.log(jsonRes);
                      setItemsData(jsonRes);
                      console.log('items added');
                    }
                  } catch (err) {
                    console.log(err);
                    console.log('items not added! error');
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            });
            //items added in the cart
            //after completion payment added
            setTimeout(() => {
              Promise.all(promise).then(function () {
                let paymentData = {
                  order: orderId,
                  totalBill: total,
                  redeem: 0,
                  offer: 0,
                  totalPoints: totalPoints,
                  method: pay,
                  status: false,
                  deliveryFee: delivery,
                  netAmount: total + delivery,
                };
                fetch(`${url}/add/payment`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    //Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(paymentData),
                })
                  .then(async resp => {
                    try {
                      const jsonResp = await resp.json();
                      if (resp.status !== 200) {
                        //console.log(jsonResp);
                        console.log('Order could not be placed!');
                        Alert.alert('Error', 'Order could not be placed!', [
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
                        setPaymentData(jsonResp);
                        AsyncStorage.removeItem('location');
                        AsyncStorage.removeItem('cart');
                        console.log('payment');
                        props.navigation.navigate('OrderDetails', {
                          order: orderD,
                          payment: jsonResp,
                          items: itemD,
                        });
                      }
                    } catch (err) {
                      console.log(err);
                      console.log('order error');
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            }, 1500);
          }
        } catch (err) {
          console.log(err);
          console.log('order error');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const placeOrder = () => {
    let pointsPayable = false;

    if (pay === 'points') {
      let net = total + delivery;
      let pointEq = net * currency;
      if (rewards >= pointEq) {
        pointsPayable = true;
        orderRequests();
        let red = {
          rewards: rewards - pointEq,
        };
        fetch(`${url}/update/customer/rewards/${customer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(red),
        })
          .then(async res => {
            try {
              const jsonRes = await res.json();
              if (res.status === 200) {
                console.log(jsonRes);
                //setCurrency(jsonRes.currency);
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Alert.alert('Error', 'You do not have enough reward points!', [
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
      }
    } else {
      orderRequests();
    }
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackNav login={true} navigation={props.navigation} innerText="Payment" />
      <View style={{margin: 20}}>
        <Text
          style={{
            color: '#742013',
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 15,
          }}>
          Choose Payment Method
        </Text>
        <View style={{flexDirection: 'row', margin: 10}}>
          <TouchableOpacity style={styles.outer} onPress={() => isCash()}>
            {cash ? <View style={styles.inner} /> : null}
          </TouchableOpacity>
          <Text> Cash</Text>
        </View>
        {/* <View style={{flexDirection: 'row', margin: 10}}>
          <TouchableOpacity style={styles.outer} onPress={() => isCard()}>
            {card ? <View style={styles.inner} /> : null}
          </TouchableOpacity>
          <Text> Card</Text>
        </View> */}
        <View style={{flexDirection: 'row', margin: 10}}>
          <TouchableOpacity style={styles.outer} onPress={() => isPoints()}>
            {points ? <View style={styles.inner} /> : null}
          </TouchableOpacity>
          <Text> Points</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => placeOrder()}>
        <Text style={styles.locText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  outer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#742013',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  inner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#742013',
  },
  button: {
    marginTop: 25,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
    width: '95%',
    borderRadius: 25,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#742013',
  },
  locText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 12,
    textAlign: 'center',
  },
});
