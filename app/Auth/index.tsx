import { ThemedText } from "@/components/ThemedText"
import Screen from "../components/Screen"
import { Button } from "react-native"
import { Account } from "react-native-appwrite"
import client from "@/config/appwriteClient"


const Auth = () => {
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