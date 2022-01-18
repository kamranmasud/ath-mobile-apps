import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

const Menu = () => {
  return (
    <View style={styles.menu}>
      <Text style={styles.text}>Our Menu</Text>
      <View style={styles.menuOptions}>
        <View style={styles.menuBox}>
          <Image
            style={styles.images}
            source={{
              uri: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            }}></Image>
          <Text style={styles.menuText}>Menu</Text>
        </View>
        <View style={styles.menuBox}>
          <Image
            style={styles.images}
            source={{
              uri: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            }}></Image>
          <Text style={styles.menuText}>Menu</Text>
        </View>
      </View>

      <Text style={styles.giftHeading}>Gifts</Text>
      <ScrollView horizontal>
        <View style={(styles.menuBox, styles.giftBox)}>
          <Image
            style={styles.giftImages}
            width={180}
            source={{
              uri: 'https://images.pexels.com/photos/10828671/pexels-photo-10828671.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}></Image>
          <Text style={styles.menuText}>Gift 1</Text>
        </View>
        <View style={(styles.menuBox, styles.giftBox)}>
          <Image
            style={styles.giftImages}
            width={250}
            source={{
              uri: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}></Image>
          <Text style={styles.menuText}>Gift 2</Text>
        </View>
        <View style={(styles.menuBox, styles.giftBox)}>
          <Image
            style={styles.giftImages}
            width={100}
            source={{
              uri: 'https://images.pexels.com/photos/10828672/pexels-photo-10828672.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}></Image>
          <Text style={styles.menuText}>Gift 3</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menu: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  menuOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuBox: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#e5e4e2',
  },
  text: {
    color: '#742013',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  images: {
    width: 160,
    height: 80,
    marginBottom: 5,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  menuText: {
    fontSize: 12,
    margin: 5,
  },
  giftHeading: {
    marginTop: 15,
    color: '#742013',
    fontWeight: 'bold',
    fontSize: 16,
  },
  giftBox: {
    margin: 5,
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#e5e4e2',
  },
  giftImages: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    height: 100,
  },
});
