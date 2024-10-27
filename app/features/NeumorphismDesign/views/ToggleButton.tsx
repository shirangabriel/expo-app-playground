import { ThemedText } from "@/components/ThemedText"

import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet } from "react-native";
import MorphLayout from "./MorphLayout";
import { generateNeumorphismColors } from "@/util/NeumorphismShadows";

type ToggleButtonProps = {
    onPress: () => void
    title: string
    isActive: boolean
    mainColor: string
    icon: string
    textColor: string
}

const ToggleButton = ({ onPress, title, isActive, mainColor, icon, textColor, }: ToggleButtonProps) => {
    const BACKGROUND_COLOR = mainColor ? mainColor : "#EEEEEE"
    const BUTTON_SIZE = 100
    const BORDER_RADIUS = BUTTON_SIZE / 6

    const  { textColor: normalTextColor } = generateNeumorphismColors(BACKGROUND_COLOR)

    const styles = StyleSheet.create({
        buttonContainer: {
            justifyContent: "center",
            alignItems: "center",
        },
        buttonText: {
            margin: 6,
            fontSize: 14
        },

    })

    const iconColor: string = isActive ? textColor : normalTextColor

    return <Pressable onPress={onPress}>
        <MorphLayout mainColor={BACKGROUND_COLOR} width={BUTTON_SIZE} height={BUTTON_SIZE} radius={BORDER_RADIUS} isActive={isActive}>
            <Feather name={icon} size={26} color={iconColor} />
            <ThemedText style={[styles.buttonText, { color: iconColor }]} darkColor={iconColor} type="subtitle">{title}</ThemedText>
        </MorphLayout>
    </Pressable>


}


export { ToggleButton }