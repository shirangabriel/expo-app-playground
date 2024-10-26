import { ThemedText } from "@/components/ThemedText"
import { generateNeumorphismColors } from "@/util/NeumorphismShadows";
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, View } from "react-native";


const BACKGROUND_COLOR = "#EEEEEE"
const  { darkShadow, lightShadow, textColor } = generateNeumorphismColors(BACKGROUND_COLOR)

const ToggleButton = () => {


    return <View style={styles.container}>
        <View style={styles.rotatedBox}>
            <View style={[styles.buttonContainer, styles.innerBox]}>
                <Feather name="bell" size={26} color={textColor} />
                <ThemedText style={styles.buttonText} darkColor={textColor} type="subtitle">Alarm</ThemedText>
            </View>
        </View>
    </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BACKGROUND_COLOR,
    },
    rotatedBox: {
        width: 200,
        height: 200,
        margin: 5,
        borderRadius: 40,
        backgroundColor: BACKGROUND_COLOR,
        shadowColor: darkShadow,
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 20,
    },
    innerBox: {
        width: 200,
        height: 200,
        margin: 5,
        borderRadius: 40,
        // borderWidth: 5,
        // borderColor: borderColor,
        backgroundColor: BACKGROUND_COLOR,
        shadowColor: lightShadow,
        shadowOffset: { width: -12, height: -12 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 20,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        marginTop: 10,
    }



})

export { ToggleButton }