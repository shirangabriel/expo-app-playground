import { ThemedText } from '@/components/ThemedText';
import { Link, Stack, router } from 'expo-router';
import { StyleSheet, SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native';
import { features } from './data/features'
import { useThemeColor } from '@/hooks/useThemeColor';
import OnboardingButtonAnimation from './features/OnboardingButtonAnimation';
export default function Features() {

    type ItemProps = { title: string, onPress: () => void };

    const Item = ({ title, onPress }: ItemProps) => (
        <TouchableOpacity style={[styles.item, { backgroundColor: useThemeColor({}, "background") }]} onPress={onPress}>
            <ThemedText style={styles.title}>{title}</ThemedText>
        </TouchableOpacity>
    );

    return <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false, headerTitle: "" }} />
        <FlatList
            data={Object.values(features)}
            renderItem={({ item }) => <Item title={item.title}
                onPress={() => router.navigate(item.slug)} />}
        />
    </SafeAreaView>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
    },
    item: {
        padding: 20,
        marginVertical: 2,
        marginHorizontal: 16,
        borderRadius: 5
    },
    title: {
        fontSize: 16,
    },
});
