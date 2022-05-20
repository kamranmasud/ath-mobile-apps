import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackNav from '../BackNav';
import Items from './Items';
import ViewCart from './ViewCart';

const {height} = Dimensions.get('window');
const heightScr = height * 0.8;
const token = 'AAAA-BBBB-CCCC-DDDD';
var length = 0;
// const url =
//   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';
const getCart = async () => {
  try {
    const value = await AsyncStorage.getItem('cart');
    //console.log(value);
    if (value !== null) {
      let data = JSON.parse(value);
      length = data.length;
      // data.forEach(element => {
      //   console.log(element);
      // });
      return data.length;
      // value previously stored
    } else {
    }
  } catch (e) {
    //return false;
    // error reading value
  }
};

export class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: props.route.params.category,
      bundles: [],
      items: [],
      categoryName: props.route.params.categoryName,
      cart: {
        id: '',
        count: 0,
      },
      totalPrice: '',
      selectedItems: 0,
      branchId: props.route.params.branchId,
      type: props.route.params.type,
    };
  }

  componentDidMount() {
    let count = getCart();
    console.log('Count', count);
    let arr = [];
    console.log(this.state.type);
    //console.log(this.props.route.params.category);
    fetch(`${url}/get/menu/category/${this.props.route.params.category}`, {
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
            jsonRes.map((item, i) => {
              console.log(item.discount);
              if (item.discount > 0) {
                item.count = 0;
                //jsonRes[i].count = 0;
                arr.push(item);
              }
            });
            //console.log(arr);
            this.setState({
              items: jsonRes,
              bundles: arr,
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
        <BackNav navigation={this.props.navigation} login={false} />
        <View style={{flex: 7}}>
          <View style={styles.menuOptions}>
            <Icon style={styles.iconColor} size={25} name="grip-lines" />
            <TouchableOpacity style={styles.selectedBtn}>
              <Text style={styles.selectedColor}>Bundles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.unselectedBtn}>
              <Text style={styles.unselectedColor}>
                {this.state.categoryName}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.mainText}>Bundles</Text>
            {this.state.bundles.map(item => (
              <View key={item.id}>
                <Items
                  items={item}
                  bundles={true}
                  branch={this.props.route.params}
                />
              </View>
            ))}
            <Text style={styles.mainText}>{this.state.categoryName}</Text>
            {this.state.items.map(item => (
              <View key={item.id}>
                <Items
                  items={item}
                  bundles={false}
                  branch={this.props.route.params}
                  navigation={this.props.navigation}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.bottom}>
          <View style={styles.itemsCart}>
            {/* <Text style={styles.priceColor}>{length} Items Selected</Text> */}
            {/* <Text style={styles.selectedColor}>AED 00.00</Text> */}
          </View>
          <TouchableOpacity
            style={styles.viewCartBtn}
            title="OPEN BOTTOM SHEET"
            onPress={() => this.RBSheet.open()}>
            <Text style={styles.viewCart}> View Cart</Text>
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={heightScr}
          openDuration={250}>
          <ViewCart props={this.props} />
        </RBSheet>
      </View>
    );
  }
}
// customStyles={{
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// }}
export default AddToCart;

const styles = StyleSheet.create({
  selectedColor: {
    color: 'white',
    fontSize: 12,
  },
  priceColor: {
    color: 'white',
    fontSize: 11,
  },
  unselectedColor: {
    fontSize: 12,
  },
  iconColor: {
    color: '#742013',
  },
  selectedBtn: {
    backgroundColor: '#742013',
    width: 70,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselectedBtn: {},
  menuOptions: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#742013',
    paddingLeft: 15,
  },
  bottom: {
    flex: 0.6,
    backgroundColor: '#742013',
    width: '100%',
    flexDirection: 'row',
  },
  itemsCart: {
    flex: 1,
    marginTop: 7,
    marginLeft: 15,
  },
  viewCart: {
    flex: 1,
    textAlign: 'right',
    marginRight: 15,
    color: 'white',
    fontSize: 14,
  },
  viewCartBtn: {
    width: 90,
    height: 60,
    marginTop: 15,
    alignItems: 'center',
  },
});
