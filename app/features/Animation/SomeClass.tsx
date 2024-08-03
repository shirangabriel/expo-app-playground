import { Component, ReactNode } from "react";
import { Text, View } from "react-native";

export default class SomeComponent extends Component<{ counter: number }> {
    render() {
        const { counter } = this.props;
        return <View style={{ width: 50, height: 50, borderRadius: 5, backgroundColor: 'yellow' }}>
            <Text>{counter}</Text>
        </View>
    }
}