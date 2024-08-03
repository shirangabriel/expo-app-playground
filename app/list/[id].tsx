import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { StyleSheet } from "react-native"
import { Stack, useLocalSearchParams } from 'expo-router'

export const FeaturePage = () => {

    const { id } = useLocalSearchParams()

    return <ThemedView style={styles.container}>
        <Stack.Screen options={{ headerTitle: "Feature" }} />
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