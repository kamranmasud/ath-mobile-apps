import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Password from './components/login/Password';
import Forget from './components/login/Forget';
import Location from './components/Location';
import Branches from './components/branches/Branches';
import Categories from './components/menu/Categories';
import AddToCart from './components/cart/AddToCart';
import Rewards from './components/rewards/Rewards';
import DineIn from './components/dineIn/DineIn';
import Reservation from './components/reservation/Reservation';
import More from './components/more/More';
import Orders from './components/orders/Orders';
import OrderDetails from './components/orders/OrderDetails';
import ViewProfile from './components/profile/ViewProfile';
import EditProfile from './components/profile/EditProfile';
import Payment from './components/cart/Payment';
import GoogleMap from './components/GoogleMap';
import SearchLocationAutocomplete from './components/SearchLocationAutocomplete';
import Working from './components/rewards/Working';
import HistoryCredit from './components/rewards/HistoryCredit';
import TransferCredit from './components/rewards/TransferCredit';
import Customization from './components/cart/Customization';
import StoresList from './components/branches/StoresList';
import ChangePassword from './components/profile/ChangePassword';
import AddressForm from './components/AddressForm';

const Stack = createNativeStackNavigator();
export class App extends Component {
  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{headerShown: false}}
              // options={{
              //   headerTitle: props => <Header login={false} {...props} />,
              // }}
              customer={({params}) => params.customer}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Password"
              component={Password}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Forget"
              component={Forget}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Change Password"
              component={ChangePassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Branches"
              component={Branches}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Stores"
              component={StoresList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Categories"
              component={Categories}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddToCart"
              component={AddToCart}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Rewards"
              component={Rewards}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DineIn"
              component={DineIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Reservation"
              component={Reservation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="More"
              component={More}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Orders"
              component={Orders}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrderDetails"
              component={OrderDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ViewProfile"
              component={ViewProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddAddress"
              component={AddressForm}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="GoogleMap"
              component={GoogleMap}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Search Location"
              component={SearchLocationAutocomplete}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="How it works"
              component={Working}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Transfer"
              component={TransferCredit}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="History"
              component={HistoryCredit}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Customization"
              component={Customization}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}
export default App;
