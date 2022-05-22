import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';

import BackNav from './BackNav';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressForm = ({navigation, route}) => {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const value = await AsyncStorage.getItem('customer');

        if (value !== null) {
            let data = JSON.parse(value);
            setName(data.cust.name);
            setContact(data.cust.phone)
        }
    }

    const onSavePressed = () => {
        AsyncStorage.setItem("address", JSON.stringify({
            name: name,
            contact: contact,
            address: address
        }));
        navigation.navigate('Payment', {
            items: route.params.items,
            branch: route.params.branch,
            customer: route.params.customer,
            instructions: route.params.instructions,
            total: route.params.total,
            delivery: route.params.delivery,
            totalPoints: route.params.totalPoints,
            address: {
                name: name,
                contact: contact,
                address: address
            }
        });
    }

    return (
        <View style={styles.box}>
            <BackNav
                navigation={navigation}
                login={true}
                innerText="Address"
            />
            <View style={styles.innerBox}>
                <Text>Name:</Text>
                <TextInput
                    value={name}
                    style={styles.input}
                    placeholder="Enter your full name"
                    onChangeText={(name) => setName(name)}
                />
                <Text>Contact:</Text>
                <TextInput
                    value={contact}
                    style={styles.input}
                    placeholder="Enter your contact number"
                    onChangeText={(contact) => setContact(contact)}
                />
                <Text>Address:</Text>
                <TextInput
                    value={address}
                    style={styles.input}
                    placeholder="Enter your address"
                    onChangeText={(address) => setAddress(address)}
                />
                <TouchableOpacity style={styles.button} onPress={() => onSavePressed()}>
                    <Text style={styles.continue}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddressForm;

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: 'white'
    },
    innerBox: {
        backgroundColor: "white",
        margin: 15
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
    button: {
        marginTop: 25,
        marginBottom: 10,
        width: '85%',
        borderRadius: 25,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#742013',
    },
    continue: {
        color: 'white',
        fontSize: 14,
    },
});
