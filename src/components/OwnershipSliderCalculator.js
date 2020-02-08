import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Slider, TouchableOpacity } from 'react-native';
import currency from 'currency.js';
import {Feather} from '@expo/vector-icons';

export const CalculateOwnership = (initialInvestment, monthlyInvestment, yearsRenting) => {
    return (parseInt(initialInvestment, 10) + parseInt(monthlyInvestment, 10) * parseInt(yearsRenting, 10) * 12) ?? "error"
}

export const RoundToNearestMultiplier = (value, multiplier) => {
    return (Math.round(value / multiplier) * multiplier)
}

export const FormatToCurrency = (value) =>{
    return currency(value, {precision: '0'}).format()
}
const multiplier_25 = 25
const multiplier_5 = 5

const OwnershipSliderCalculator = ({ rent, initialMin, initialMax, monthlyMax, yearsMax }) => {
    const [initialInvestment, setInitialInvestment] = useState(0)
    const [initialSlider, setInitialSlider] = useState(0)
    const [monthlyInvestment, setMonthlyInvestment] = useState(0)
    const [monthlySlider, setMonthlySlider] = useState(0)
    const [yearsWithCompany, setYearsWithCompany] = useState(1)
    const [ownershipValue, setOwnershipValue] = useState(0)
    useEffect(() => {
        setOwnershipValue(CalculateOwnership(initialInvestment, monthlyInvestment, yearsWithCompany))
    });

    
    return (
        <View>
            <Text style={[styles.greyBoldText, { marginTop: 15, marginLeft: 20 }]}>MONTHLY PAYMENT</Text>
            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 7 }}>
                <Text style={styles.blackText}>${FormatToCurrency(rent)} rent +</Text>
                <Text style={[styles.blueText, { marginLeft: 5 }]}>${FormatToCurrency(initialInvestment)} investment</Text>
            </View>
            <View style={{ backgroundColor: "#d3d3d3", height: 1, marginTop: 3 }} />
            <View style={{ backgroundColor: "#d3d3d3", height: 1, marginTop: 2 }} />
            <View style={{ marginTop: 35, marginLeft: 30, flexDirection: 'row' }}>
                <Text style={[styles.greyBoldText, styles.strikeThrough]}>SECURITY DEPOSIT</Text>
                <Text style={styles.greyBoldText}> &#x2192; INITIAL INVESTMENT</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() =>{ 
                ((initialInvestment-multiplier_25) < initialMin) ? setInitialInvestment(initialMin) : setInitialInvestment(initialInvestment-multiplier_25)
                setInitialSlider(initialInvestment)}
                }>
                <Feather name="minus" style={styles.iconStyle}/>
                </TouchableOpacity>
                <Text style={styles.blackText}>${FormatToCurrency(initialInvestment)}</Text>
                <TouchableOpacity onPress={() => { 
                ((initialInvestment+multiplier_25) > initialMax) ? setInitialInvestment(initialMax) : setInitialInvestment(initialInvestment+multiplier_25)
                setInitialSlider(initialInvestment)}
                }>
                <Feather name="plus" style={styles.iconStyle}/>
                </TouchableOpacity>
            </View>
            
            <Slider
                style={{ alignSelf: 'stretch', marginLeft: 25, marginRight: 25, height: 40 }}
                value={initialSlider}
                minimumValue={initialMin ?? 0}
                maximumValue={initialMax ?? 12000}
                minimumTrackTintColor="#00CFCC"
                maximumTrackTintColor="#919191"
                thumbTintColor="#00008b"
                onValueChange={value => {
                    setInitialInvestment(RoundToNearestMultiplier(value, multiplier_25))
                }
                }
            />

            <Text style={[styles.greyBoldText, { marginLeft: 30, marginTop: 15 }]}>MONTHLY INVESTMENT</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() =>{ 
                ((monthlyInvestment-multiplier_5) < 0) ? setMonthlyInvestment(0) : setMonthlyInvestment(monthlyInvestment-multiplier_5)
                setMonthlySlider(monthlyInvestment)}
                }>
                <Feather name="minus" style={styles.iconStyle}/>
                </TouchableOpacity>
                <Text style={styles.blackText}>${monthlyInvestment}</Text>
                <TouchableOpacity onPress={() => { 
                ((monthlyInvestment+multiplier_5) > monthlyMax) ? setMonthlyInvestment(monthlyMax) : setMonthlyInvestment(monthlyInvestment+multiplier_5)
                setMonthlySlider(monthlyInvestment)}
                }>
                <Feather name="plus" style={styles.iconStyle}/>
                </TouchableOpacity>
            </View>

            <Slider
                style={{ alignSelf: 'stretch', marginLeft: 25, marginRight: 25, height: 40 }}
                value={monthlySlider}
                minimumValue={0}
                maximumValue={monthlyMax ?? 7000}
                minimumTrackTintColor="#00CFCC"
                maximumTrackTintColor="#919191"
                thumbTintColor="#00008b"
                onValueChange={value => {
                    setMonthlyInvestment(RoundToNearestMultiplier(value, multiplier_5))
                }
                }
            />

            <Text style={[styles.greyBoldText, { marginLeft: 30, marginTop: 15 }]}>YEARS WITH UP&UP</Text>
            <Text style={[styles.blackText, { alignSelf: 'center', paddingTop: 10 }]}>{yearsWithCompany} years</Text>
            <Slider
                style={{ alignSelf: 'stretch', marginLeft: 25, marginRight: 25, height: 40 }}
                value={yearsWithCompany}
                minimumValue={1}
                maximumValue={yearsMax ?? 5}
                minimumTrackTintColor="#00CFCC"
                maximumTrackTintColor="#919191"
                thumbTintColor="#00008b"
                onSlidingComplete={value => {
                    var whole = Math.round(value)
                    setYearsWithCompany(whole)
                }
                }
            />
            <Text style={[styles.greyBoldText, { marginLeft: 30, marginTop: 15 }]}>OWNERSHIP VALUE</Text>
            <Text style={[styles.blueText, { marginTop: 15, fontSize: 28, alignSelf: 'center' }]}>${FormatToCurrency(ownershipValue)}</Text>
            <Text style={[styles.greyText, { marginLeft: 30, marginRight: 30, textAlign: 'center' }]}>
                Use your ${FormatToCurrency(ownershipValue)} ownership stake as a down payment on any home, transfer it to your next up&up rental, or cash out.</Text>

        </View>
    )
}


const styles = StyleSheet.create({
    greyBoldText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#949494'
    },
    greyText: {
        fontSize: 12,
        color: '#949494'
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    blackText: {
        fontSize: 21,
        color: '#000000'
    },
    blueText: {
        fontSize: 21,
        color: '#00CFCC'
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems: 'flex-end', 
        marginTop: 15,
        marginLeft: 40,
        marginRight: 40
    }
})

export default OwnershipSliderCalculator