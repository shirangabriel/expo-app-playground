import Screen from '@/app/components/Screen'
import { ThemedText } from '@/components/ThemedText'
import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import * as Progress from 'react-native-progress'
import * as Clipboard from 'expo-clipboard';

export default function CreditCardRevealAnimation() {

    const [showCopy, setShowCopy] = useState(false)
    const [showProgress, setShowProgress] = useState(false)
    const [progress, setProgress] = useState(1)
    const [copiedText, setCopiedText] = useState('');
    const cardNumber = '4917 48458989 7107'

    const handleOnPress = () => {

        if (showCopy) {
            console.log('copied');
            copyToClipboard();
            return
        }


        setShowCopy(!showCopy)
        // countdown 1 to 0 for 3 seconds
        if (!showCopy) {
            setShowProgress(true)
            let count = 1
            const interval = setInterval(() => {
                count = count - 0.01
                setProgress(count)
                console.log(count);

                if (count < 0) {
                    clearInterval(interval)
                    setShowProgress(false)
                    setShowCopy(false)
                    setProgress(1)
                }
            }, 100)
        }
    }

    const getCardNumber = (showPadded: boolean = false) => {
        if (showPadded) {
            return cardNumber
        }

        return makePaddedCardNumber(cardNumber);

    }

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(cardNumber);
    };

    const makePaddedCardNumber = (cardNumber: string) => {
        const paddedCardNumber = cardNumber.split('').map((char, index) => {
            if (index > 4 && index < 13) {
                char = 'X'
            }
            return char;
        }).join('')
        return paddedCardNumber
    }




    return (
        <Screen showCustomBackButton={true}>
            <View style={styles.container}>
                <Feather name="credit-card" size={24} color="blue" style={{ marginRight: 10 }} />
                <ThemedText style={{ width: 170, textAlign: 'center' }} type='defaultSemiBold'>{getCardNumber(showCopy)}</ThemedText>
                <View style={styles.wrapper}>
                    {showProgress &&
                        <Progress.Circle
                            progress={progress}
                            thickness={3}
                            size={40}
                            color='rgba(128, 0, 128, 0.2)'
                            fill='rgba(128, 0, 128, 0.1)'
                            indeterminateAnimationDuration={1} />}
                    <TouchableOpacity style={styles.pressableIcon} hitSlop={10} onPress={handleOnPress}>
                        <Feather name={showCopy ? "copy" : "eye"} size={22} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressableIcon: {
        position: 'absolute',
        top: 8,
        left: 10,
    },
    wrapper: {
        width: 40,
        height: 40,
        justifyContent: 'space-around'
        // display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    }
})