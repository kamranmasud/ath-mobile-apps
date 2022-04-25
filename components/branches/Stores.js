import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';

const Stores = props => {
  const branch = props.branch;
  return (
    <View style={styles.stores}>
      <Image source={{uri: branch.image}} style={styles.images} />
      <View style={styles.infoBox}>
        <View style={{paddingRight: 80}}>
          <Text style={styles.storeName}>{branch.name.toUpperCase()}</Text>
        </View>
        <Text style={styles.floor}>{branch.floor.toUpperCase()} FLOOR</Text>
        <Text style={styles.distance}>{branch.distance}</Text>
      </View>
    </View>
  );
};

export default Stores;

const styles = StyleSheet.create({
  stores: {
    padding: 10,
    flexDirection: 'row',
    height: 110,
    marginBottom: 10,
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: '#e5e4e2',
  },
  images: {
    width: 85,
    height: 85,
  },
  infoBox: {
    marginLeft: 15,
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#742013',
  },
  floor: {
    fontSize: 12,
    marginBottom: 7,
    color: 'black',
  },
  distance: {
    margin: 2,
    width: 55,
    height: 22,
    borderRadius: 12,
    backgroundColor: '#e5e4e2',
    textAlign: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});
