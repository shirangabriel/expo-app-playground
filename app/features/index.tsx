import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
export default function Features() {

    const DATA = [
        {
            title: 'First Item',
        },
        {
            title: 'Second Item',
        },
        {
            title: 'Third Item',
        },
    ];
    type ItemProps = { title: string };
    const Item = ({ title }: ItemProps) => (
        <ThemedView style={styles.item}>
            <ThemedText style={styles.title}>{title}</ThemedText>
        </ThemedView>
    );

    return <SafeAreaView style={styles.container}>
        <FlatList data={DATA} renderItem={({ item }) => <Item title={item.title} />} />
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
