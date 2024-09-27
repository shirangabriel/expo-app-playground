import React from "react"
import { Pressable, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";

type Props = {
    color?: string
}
const GoBackButton: React.FC<Props> = ({ color }) => {
    return <Pressable onPress={() => { router.back() }} style={styles.container}>
        <Ionicons name="arrow-back-circle" size={32} color={color ? color : "gray"} />
    </Pressable>
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        top: 50,
        left: 16
    }
});


export { GoBackButton };
