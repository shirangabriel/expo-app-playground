import { ThemedText } from "@/components/ThemedText"
import Screen from "../components/Screen"
import { Button, Text, View } from "react-native"
import { Account } from "react-native-appwrite"
import client from "@/config/appwriteClient"
import { useEffect, useState } from "react"
import auth from "@react-native-firebase/auth"

const Auth = () => {
     // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    if (initializing) return null;

    // if (!user) {
    //     return (
    //     <View>
    //         <Text>Login</Text>
    //     </View>
    //     );
    // }
    


    const handleLogin = () => {
        const account = new Account(client)
        const promise = account.createEmailPasswordSession('john.doe@widgetcorps.com', 'admin123')

        // promise.then(function (response) {
        //     console.log(response); // Success
        // }, function (error) {
        //     console.log(error); // Failure
        // });
    }

    return (
        <Screen title="Auth" headerShown={false}>
            <ThemedText>Auth</ThemedText>
            <Button title="Login" onPress={handleLogin} />
        </Screen>
    )
}


export default Auth