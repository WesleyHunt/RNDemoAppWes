import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity style={[styles.button, {marginTop: 25}]} onPress={() => navigation.navigate('QuestionOneScreen')}>
                <Text style={styles.buttonText}>Q1 - Async Function</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QuestionTwoScreen')}>
                <Text style={styles.buttonText}>Q2 - ROI Calculator</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        borderRadius: 4,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#87cefa"
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold'
    }
})

export default HomeScreen