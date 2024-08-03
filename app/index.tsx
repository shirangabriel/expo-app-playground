import { ThemedText } from '@/components/ThemedText';
import { Link, Stack, router } from 'expo-router';
import { StyleSheet, SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native';
import { data } from './data/features'
export default function Features() {

    type ItemProps = { title: string, onPress: () => void };
    type data = { id: string, title: string }

    const handleOnPress = (item: data) => {
        switch (item.id) {
            case "1":
                router.navigate("features/OnboardingButtonAnimation")
                break;
            case "2":
                router.navigate("features/webviewsession")
                break;

            default:
                break;
        }

        // file base routing 
        // router.navigate("features/1")
    }

    const Item = ({ title, onPress }: ItemProps) => (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <ThemedText style={styles.title}>{title}</ThemedText>
        </TouchableOpacity>
    );

    return <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false, headerTitle: "" }} />
        <FlatList
            data={data}
            renderItem={({ item }) => <Item title={item.title} onPress={() => handleOnPress(item)} />}
            keyExtractor={item => item.id} />

        <View style={{ backgroundColor: 'white' }}>
            <Link href={"/list/1"}>List</Link>
        </View>

    </SafeAreaView>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 2,
        marginHorizontal: 16,
        borderRadius: 5
    },
    title: {
        fontSize: 16,
    },
});
