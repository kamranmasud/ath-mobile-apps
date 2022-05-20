import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import BackNav from '../BackNav';
import UpdateDetails from './UpdateDetails';

const EditProfile = props => {
  return (
    <View style={styles.box}>
      <BackNav
        navigation={props.navigation}
        login={true}
        innerText="Edit Account"
      />
      <View style={styles.imageBox}>
        <View style={styles.imageCircle}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.editPic}>Edit Photo</Text>
        </TouchableOpacity>
      </View>
      <View>
        <UpdateDetails navigation={props.navigation} />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageCircle: {
    width: 110,
    height: 110,
    backgroundColor: '#ddc16d',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageBox: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPic: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 18,
    color: '#742013',
  },
});
