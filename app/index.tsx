import { ThemedText } from '@/components/ThemedText';
import { Stack } from 'expo-router';
import { StyleSheet, SafeAreaView } from 'react-native';
import Auth from './Auth';
import Features from './features';

export default function EntryPoint() {

    const renderView = () => {

        let isAuthenticated = true

        if (!isAuthenticated)
            return <Features />
        else
            return <Auth />
    }


    return renderView()

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
    },
});
