import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList
} from 'react-native';
import React, { Component } from 'react';

import BackNav from '../BackNav';

const { width } = Dimensions.get('window');
const widthBox = width / 2 - 20;
const token = 'AAAA-BBBB-CCCC-DDDD';
// const url =
//   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branchId: props.route.params.branchId,
      type: props.route.params.type,
      categories: [],
      name: props.route.params.name
    };
  }
  componentDidMount() {
    let arr = [];
    console.log(this.props.route.params.type);
    fetch(`${url}/get/category/branch/${this.props.route.params.branchId}`, {
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
            jsonRes.map((categories, i) => {
              let data = {
                id: categories.id,
                image: categories.image,
                name: categories.name,
              };
              arr.push(data);
            });
            //console.log(arr);
            this.setState({
              categories: arr,
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
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <BackNav navigation={this.props.navigation} login={false} />
        <FlatList
          data={this.state.categories}
          renderItem={({ item }) => <Category
            category={item} 
            name={this.state.name}
            branchId={this.state.branchId}
            type={this.state.type}
            navigation={this.props.navigation} />}
          removeClippedSubviews={true} // Unmount components when outside of window 
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          numColumns={2}
        />
      </View>
    );
  }
}

const Category = (props) => {
  return (
    <TouchableOpacity
      key={props.category.id}
      style={styles.menuBox}
      onPress={() =>
        props.navigation.navigate(props.name, {
          category: props.category.id,
          categoryName: props.category.name,
          branchId: props.branchId,
          type: props.type,
        })
      }>
      <Image
        style={styles.images}
        source={{
          uri: props.category.image,
        }}></Image>
      <Text style={styles.menuText}>{props.category.name}</Text>
    </TouchableOpacity>
  )
}

export default Categories;

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
    flex: 0.5,
    borderWidth: 0.7,
    borderRadius: 8,
    borderColor: '#e5e4e2',
    margin: 10,
    height: 110,
  },
  images: {
    width: "100%",
    height: 80,
    marginBottom: 5,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  menuText: {
    color: '#742013',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
});

