import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { StyleSheet } from "react-native"
import { useLocalSearchParams } from 'expo-router'

export const index = () => {

    const { id } = useLocalSearchParams()

    return <ThemedView style={styles.container}>
        <ThemedText>{`Feature ${id}`}</ThemedText>
    </ThemedView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});