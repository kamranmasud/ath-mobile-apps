import React from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');
const widthImg = width - 30;
const height = width * 0.5;

const PurchaseOptions = props => {
  return (
    <View style={styles.optionsBox}>
      <Text style={styles.text}>How would you like to get your purchase?</Text>
      <View style={styles.optionsView}>
        <TouchableOpacity
          onPress={() => {
            global.DELIVERY_OPTION = "Dine in";
            props.navigation.navigate('Branches', {name: 'DineIn'})
          }
          }
          style={styles.optionsIcons}>
          <View style={styles.options}>
            <Icon2
              style={styles.iconStyles}
              name="local-dining"
              size={38}></Icon2>
          </View>
          <Text style={styles.optionsText}>Dine In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsIcons}
          onPress={() => {
            global.DELIVERY_OPTION = "Delivery";
            props.navigation.navigate('Branches', {
              name: 'Categories',
              type: 'Delivery',
            })
          }
          }>
          <View style={styles.options}>
            <Icon2
              style={styles.iconStyles}
              name="delivery-dining"
              size={38}></Icon2>
          </View>
          <Text style={styles.optionsText}>Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionsIcons}
          onPress={() => {
            global.DELIVERY_OPTION = "Pickup";
            props.navigation.navigate('Branches', {
              name: 'Categories',
              type: 'Pickup',
            });
          }
          }>
          <View style={styles.options}>
            <Icon2
              style={styles.iconStyles}
              name="takeout-dining"
              size={38}></Icon2>
          </View>
          <Text style={styles.optionsText}>Pickup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            global.DELIVERY_OPTION = "Reservation";
            props.navigation.navigate('Branches', {name: 'Reservation'})
          }
          }
          style={styles.optionsIcons}>
          <View style={styles.options}>
            <Icon2
              style={styles.iconStyles}
              name="book-online"
              size={38}></Icon2>
          </View>
          <Text style={styles.optionsText}>Reservation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsBox: {
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
    width: widthImg,
    height: 170,
    margin: 15,
    marginTop: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#742013',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionsView: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
  },
  optionsIcons: {
    marginTop: 20,
    marginBottom: 10,
    // margin: 7,
    // width: 65,
    // height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  options: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#ddc16d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsText: {
    marginTop: 7,
    color: '#742013',
    fontSize: 12,
    width: 70,
    textAlign: 'center'
  },
  iconStyles: {
    color: 'white',
  },
});

export default PurchaseOptions;
