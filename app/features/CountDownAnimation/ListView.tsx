import { Animated, Dimensions, StyleSheet, View } from "react-native"
import React from "react";


type Props = {
    timerList: Array<number>,
    itemSize: number,
    onScrollEnd: (position: number) => void,
    textStyle: Object,
    listOpacity: Object
}
const { width } = Dimensions.get('window');

export default function ListView({ timerList, itemSize, onScrollEnd, textStyle, listOpacity }: Props) {
    const scrollX = React.useRef(new Animated.Value(0)).current

    return <Animated.FlatList
        style={{ flexGrow: 0, opacity: listOpacity }}
        data={timerList}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={ev => {
            const index = Math.round(ev.nativeEvent.contentOffset.x / itemSize)
            onScrollEnd(timerList[index])
        }}
        keyExtractor={item => item.toString()}
        snapToInterval={itemSize}
        decelerationRate={'fast'}
        contentContainerStyle={{
            paddingHorizontal: width / 3
        }}
        onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }

        )}
        renderItem={({ item, index }) => {
            const inputRange = [
                (index - 1) * itemSize,
                index * itemSize,
                (index + 1) * itemSize,
            ]

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4]
            })
            const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.7, 1, 0.7]
            })

            return <View style={[styles.timerListView, { width: itemSize, }]}>
                <Animated.Text
                    style={
                        [textStyle,
                            { opacity },
                            { transform: [{ scale }] }

                        ]}>
                    {item}</Animated.Text>
            </View>

        }} />
}

const styles = StyleSheet.create({
    timerListView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})