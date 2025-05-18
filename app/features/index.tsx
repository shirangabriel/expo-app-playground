import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack, router } from 'expo-router';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { features } from '../data/features';

export default function Features() {
    type ItemProps = { icon: string, title: string, onPress: () => void };

    const Item = ({ icon, title, onPress }: ItemProps) => (
        <TouchableOpacity style={[styles.item, { backgroundColor: useThemeColor({}, "background") }]} onPress={onPress}>
            <View style={styles.wrapper}>
                <ThemedText style={styles.heading}>{icon}</ThemedText>
                <ThemedText style={styles.title}>{title}</ThemedText>
            </View>
        </TouchableOpacity>
    );

    return <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false, headerTitle: "" }} />
        <FlatList
            contentContainerStyle={{ paddingHorizontal: 8 }}
            numColumns={2}
            data={Object.values(features)}
            renderItem={({ item }) => <Item icon={item.icon} title={item.title}
                onPress={() => router.navigate(item.slug)} />}
        />
    </SafeAreaView>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 8,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        margin: 8,
        borderRadius: 12,
        minWidth: '45%',
    },
    wrapper: {
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 8,
    },
    heading: {
        fontSize: 46,
        fontWeight: "bold",
        lineHeight: 56,
    }
});
