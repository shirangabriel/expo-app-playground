import Screen from "@/app/components/Screen"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, StyleSheet, TouchableHighlight } from "react-native"
import { create } from 'zustand'

const Zustand = () => {
    const useStore = create((set) => ({
        bear: 1,
        addBear: () => set((state) => ({ bear: state.bear + 1 })),
        removeBears: () => set({ bear: 0 }),
        updateBears: (newBear) => set({ bear: newBear })
    }))


    const populatedBears = () => {
        const bearCount = useStore((state) => state.bear)
        const bears = []

        for (let index = 0; index < bearCount; index++) {
            bears.push(<ThemedText key={index} type="title">🧸</ThemedText>)
        }

        return bears;

    }

    const increaseBears = useStore((state) => state.addBear())

    return (
        <Screen title="Zustand">
            <ThemedView style={styles.container}>
                {populatedBears().map((item, index) => item)}
            </ThemedView>

            <ThemedView style={styles.footer}>
                <TouchableHighlight onPress={() => { console.log("add"); increaseBears }} style={{ borderRadius: 16 }} >
                    <Ionicons name="add-circle" size={32} color={"gray"} />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => { }} style={{ borderRadius: 16 }} >
                    <Ionicons name="remove-circle" size={32} color={"gray"} />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => { }} style={{ borderRadius: 16 }} >
                    <Ionicons name="close-circle" size={32} color={"gray"} />
                </TouchableHighlight>
            </ThemedView>
        </Screen>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20
    },
    footer: {
        width: '100%',
        position: 'absolute',
        bottom: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});

export default Zustand