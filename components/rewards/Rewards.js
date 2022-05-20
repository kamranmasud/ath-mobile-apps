import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome5';

const boxHeight = 40;
const Rewards = props => {
  const {navigation} = props;
  const [rewards, setRewards] = useState(0);
  const [currency, setCurrency] = useState(1);
  const [points, setPoints] = useState(0);
  const [token, setToken] = useState('');
  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

  useFocusEffect(
    React.useCallback(() => {
      async function getCustomerRewards() {
        let cust = JSON.parse(await AsyncStorage.getItem('customer'));
        if (cust !== null) {
          setToken(cust.accessToken);
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
                  setRewards(jsonRes.rewards);
                  setPoints(jsonRes.rewards / currency);
                }
              } catch (err) {
                console.log(err);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
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
              const jsonResp = await res.json();
              if (res.status === 200) {
                setCurrency(jsonResp[0].currency);
                setPoints(rewards / jsonResp[0].currency);
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      getCustomerRewards();
      getExportPoints();
      setPoints(rewards / currency);
      //console.log(rewards, currency);
      return () => {
        //AsyncStorage.removeItem('location');
        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  return (
    <ImageBackground
      style={styles.background}
      source={{
        uri: 'https://images.pexels.com/photos/10803604/pexels-photo-10803604.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={styles.navToggle}
          onPress={() => navigation.navigate('More')}>
          <Icon size={25} style={styles.imageBars} name="bars" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navCross}
          onPress={() => navigation.pop()}>
          <Icon size={25} style={styles.imageBars} name="times" />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}} />
      <View style={styles.giftOp}>
        <View style={styles.giftBox}>
          <Text style={styles.giftText}>
            You have{' '}
            <Text style={styles.giftPrice}>{rewards / currency} AED</Text>.
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.giftOptions}>
          <TouchableOpacity
            style={styles.optionBox}
            onPress={() => navigation.navigate('How it works')}>
            <Text style={styles.giftText}>How It Works</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox}>
            <Text style={styles.giftText}>My Rewards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox}>
            <Text style={styles.giftText}>Refer a Friend</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.giftOptions}>
          <TouchableOpacity
            style={styles.optionBox}
            onPress={() =>
              navigation.navigate('Transfer', {
                rewards: rewards,
              })
            }>
            <Text style={styles.giftText}>Transfer Credit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox}>
            <Text style={styles.giftText}>Credits Calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox}>
            <Text
              style={styles.giftText}
              onPress={() => navigation.navigate('History')}>
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  navToggle: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navCross: {
    width: 50,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageBars: {
    width: 40,
    height: 35,
    color: 'white',
  },
  giftBox: {
    width: '85%',
    height: boxHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'silver',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    ///opacity: 1,
  },
  giftOp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  giftText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  giftPrice: {
    color: '#ddc16d',
    fontSize: 12,
  },
  giftOptions: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  optionBox: {
    width: '27%',
    height: boxHeight,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
});
