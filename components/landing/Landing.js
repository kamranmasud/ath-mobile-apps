import React, {Component, useState} from 'react';
import {
  Image,
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';

const axios = require('axios');

import Header from '../Header';
import PurchaseOptions from './PurchaseOptions';
import Menu from './Menu';
import Navigations from '../Navigations';
//import {url, headerConfig} from '../../routes/url';
//import SyncStorage from 'sync-storage';

const {width} = Dimensions.get('window');
const widthImg = width - 40;
const height = width * 0.5;
//const url = 'http://localhost:5000';
const token = 'AAAA-BBBB-CCCC-DDDD';
// const url =
//   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

const headerConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`,
  },
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('customer');
    if (value !== null) {
      console.log(value);
      return value;
      // value previously stored
    }
  } catch (e) {
    return false;
    // error reading value
  }
};
function Page() {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getData();
      console.log('Focused');
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('Unfocused');
      };
    }, []),
  );
}

export class Landing extends Component {
  //const [message, setMessage] = useState('');
  constructor(props) {
    super(props);
    const {navigation} = props;
    //console.log(props);
    this.state = {
      images: [
        'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      showLoginButton: true, //reads local storage for account id. Changes showLoginButton accordingly.
      message: '',
      customer: [],
    };
  }

  isLoggedIn() {
    if (this.props.route.params.customer) {
      //console.log()
      this.setState({
        customer: this.props.route.params.customer,
        showLoginButton: false,
      });
    }
    // SyncStorage.set('foo', 'bar');
    // const result = SyncStorage.get('foo');
    console.log(this.props.route.params);
  }

  componentDidMount() {
    let arr = [];
    fetch(`${url}/get/slider/image`, {
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
            //console.log(jsonRes);

            jsonRes.map((images, i) => {
              arr.push(images.image);
            });
            //console.log(arr);
            this.setState({
              images: arr,
            });
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Header
          login={this.state.showLoginButton}
          navigation={this.props.navigation}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.sliderView}>
            <SliderBox
              style={styles.image}
              autoplay
              circleLoop
              images={this.state.images}
              autoplayInterval={4000}
              dotStyle={{width: 0, height: 0}}
            />
          </View>
          <PurchaseOptions navigation={this.props.navigation} />
          <Menu navigation={this.props.navigation} />
        </ScrollView>
        <Navigations navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 15,
    width: widthImg,
    height,
    resizeMode: 'cover',
  },
  sliderView: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Landing;
