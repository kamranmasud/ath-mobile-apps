import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');
const widthImg = width - 30;
const height = width * 0.5;

const PurchaseOptions = () => {
  return (
    <View style={styles.optionsBox}>
      <Text style={styles.text}>How would you like to get your purchase?</Text>
      <View style={styles.optionsView}>
        <View style={styles.optionsIcons}>
          <View style={styles.options}>
            <Icon2
              style={styles.iconStyles}
              name="local-dining"
              size={38}></Icon2>
          </View>
          <Text style={styles.optionsText}>Dine In</Text>
        </View>
        <View style={styles.optionsIcons}>
          <View style={styles.options}>
            <Icon2
              style={styles.iconStyles}
              name="delivery-dining"
              size={38}></Icon2>
          </View>
          <Text style={styles.optionsText}>Delivery</Text>
        </View>
        <View style={styles.optionsIcons}>
          <View style={styles.options}>
            <Icon2
              style={styles.iconStyles}
              name="takeout-dining"
              size={38}></Icon2>
          </View>
          <Text style={styles.optionsText}>Pickup</Text>
        </View>
        <View style={styles.optionsIcons}>
          <View style={styles.options}>
            <Icon2
              style={styles.iconStyles}
              name="book-online"
              size={38}></Icon2>
          </View>
          <Text style={styles.optionsText}>Reservation</Text>
        </View>
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
    justifyContent: 'space-evenly',
  },
  optionsIcons: {
    marginTop: 30,
    marginBottom: 10,
    margin: 7,
    width: 65,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  iconStyles: {
    color: 'white',
  },
});

export default PurchaseOptions;
