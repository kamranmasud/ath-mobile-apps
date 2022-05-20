import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BackNav from '../BackNav';
import Ratings from './Ratings';
import detailStyles from '../styles/detailStyles';
import {useFocusEffect} from '@react-navigation/native';

const OrderDetails = props => {
  const {order, payment} = props.route.params;
  const [orderDate, setOrderDate] = useState(Date());
  //const [payment, setPayment] = useState(props.route.params.payment);
  const [token, setToken] = useState('');
  const [branch, setBranch] = useState([]);
  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

  useFocusEffect(
    React.useCallback(() => {
      getData();
      let d = new Date(order.time);
      let fullDate = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
      setOrderDate(fullDate);
      order.branch = order.branch._id;
      getBranchDetails(order.branch);
      console.log('Focused');
      return () => {
        console.log('Unfocused');
      };
    }, []),
  );

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('customer');
      //console.log(value);
      if (value !== null) {
        let data = JSON.parse(value);
        setToken(data.accessToken);
        //return value;
        // value previously stored
      } else {
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };

  const getBranchDetails = branch => {
    //console.log(token);
    fetch(`${url}/get/branches/${branch}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async resp => {
        try {
          const jsonResp = await resp.json();
          if (resp.status !== 200) {
            //console.log(jsonResp);
            console.log('Order could not be placed!');
            Alert.alert('Error', 'Data could not be fetched!', [
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
            setBranch(jsonResp);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.box}>
      <BackNav
        navigation={props.navigation}
        login={true}
        innerText="Order Details"
      />
      <View style={styles.detailBox}>
        <View style={styles.boxesRow}>
          <View style={styles.mainRow}>
            <Icon name="delivery-dining" size={20} />
            <View style={{width: '100%'}}>
              <Text style={detailStyles.delivery}>{order.type}</Text>
              <View style={styles.rows}>
                <Text style={detailStyles.date}>{orderDate}</Text>
                <Text style={detailStyles.orderNum}>{order.orderNumber}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.boxesRow} height={30}>
          <View style={styles.rows}>
            <Text style={detailStyles.headings}>Status</Text>
            <Text style={detailStyles.prices}>{order.status}</Text>
          </View>
        </View>
        <View style={styles.boxesRow}>
          <View style={styles.rows}>
            <Text style={detailStyles.bill}>Total Bill Value</Text>
            <Text style={detailStyles.bill}>AED {payment.totalBill}</Text>
          </View>
        </View>

        <View style={styles.boxesRow} height={60}>
          <View style={styles.rows}>
            <Text style={detailStyles.headings}>Product Redeemed Value</Text>
            <Text style={detailStyles.prices}>AED {payment.redeem}</Text>
          </View>
          <View style={styles.rows}>
            <Text style={detailStyles.headings}>Offer Availed</Text>
            <Text style={detailStyles.prices}>AED {payment.offer}</Text>
          </View>
        </View>

        <View style={styles.boxesRow} height={60}>
          <View style={styles.rows}>
            <Text style={detailStyles.headings}>Card Payment</Text>
            <Text style={detailStyles.prices}>
              AED {payment.method === 'card' ? payment.netAmount : '00.00'}
            </Text>
          </View>
          <View style={styles.rows}>
            <Text style={detailStyles.headings}>Points Worth Redeemed</Text>
            <Text style={detailStyles.prices}>AED {payment.totalPoints}</Text>
          </View>
        </View>
        <View style={styles.boxesRow}>
          <View style={styles.rows}>
            <Text style={detailStyles.net}>Net Amount Paid</Text>
            <Text style={detailStyles.net}>AED {payment.netAmount}</Text>
          </View>
        </View>
        <View style={styles.boxesRow}>
          <View style={styles.order}>
            <Text style={detailStyles.delivery}>Order Type({order.type})</Text>
            <Text style={detailStyles.headings}>{branch.name},</Text>
            <Text style={detailStyles.headings}>Floor {branch.floor}</Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.feedback}>
        <Text style={detailStyles.feedback}>Feedback</Text>
        <Ratings />
      </View> */}
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'white',
  },
  detailBox: {
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between',
    width: '90%',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
  },
  rows: {
    marginLeft: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxesRow: {
    paddingBottom: 12,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  order: {
    marginLeft: 20,
  },
  feedback: {
    margin: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
