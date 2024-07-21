import { StyleSheet, SafeAreaView, Text } from 'react-native';

export default function Explore() {

    return (
        <SafeAreaView style={styles.container}>
            <Text>Explore</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
