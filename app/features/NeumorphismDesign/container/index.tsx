import { StyleSheet, View, Dimensions } from "react-native";
import { ToggleButton } from "../views/ToggleButton";
import { useState } from "react";
import { SwitchesData } from "@/app/data/switches";

const { width, height } = Dimensions.get('window');
const BACKGROUND_COLOR = "#eeeeee"

const NeumorphismDesignContainer = () => {

    const [switches, setSwitches] = useState(SwitchesData);




    const handleOnPress = (item, index) => {
        setSwitches((prevSwitches) => {
            const updatedSwitches = [...prevSwitches];
            updatedSwitches[index] = { ...item, isActive: !item.isActive };
            return updatedSwitches;
        })
    }

    const ACTIVE_COLOR = "#FF5154"

    console.log(width, height);


    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>

                {switches.map((item, index) => (
                    <ToggleButton
                        key={index}
                        title={item.name}
                        icon={item.icon}
                        mainColor={BACKGROUND_COLOR}
                        textColor={ACTIVE_COLOR}
                        isActive={item.isActive}
                        onPress={() => handleOnPress(item, index)} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        backgroundColor: BACKGROUND_COLOR

    },
    wrapper: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20
    }
})

export default NeumorphismDesignContainer