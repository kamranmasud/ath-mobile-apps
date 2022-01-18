import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import PurchaseOptions from './PurchaseOptions';
import Menu from './Menu';

const {width} = Dimensions.get('window');
const widthImg = width - 40;
const height = width * 0.5;

export class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
    };
  }
  render() {
    return (
      <View>
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
        <PurchaseOptions />
        <Menu />
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
