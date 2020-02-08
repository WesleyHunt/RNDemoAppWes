import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import  OwnershipSliderCalculator from '../components/OwnershipSliderCalculator'

const QuestionTwoScreen = ({initialMin, initialMax, monthlyMax, yearsMax}) => {
    const [initialInvestment, setInitialInvestment] = useState('0')
    const [monthlyInvestment, setMonthlyInvestment] = useState('0')
    const [yearsWithCompany, setYearsWithCompany] = useState('0')
    const [ownershipValue, setOwnershipValue] = useState('0')

    return (
        <View style={{flex: 1}}>
            <Text style={{marginBottom: 10, marginLeft: 10}}>
            Component called with:: rent: 2000, Initial min investment: 1200, initial max: 12000, 
            monthly max investment: 600, years max: 5
            </Text>
            <View style={{ backgroundColor: "#d3d3d3", height: 7, marginTop: 1 }} />
            <ScrollView>
                 <OwnershipSliderCalculator rent={2000} initialMin={1200} initialMax={12000} monthlyMax={600} yearsMax={5}/>
            </ScrollView>
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
    }
})

export default QuestionTwoScreen