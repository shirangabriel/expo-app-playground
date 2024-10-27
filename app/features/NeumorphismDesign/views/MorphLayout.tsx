import { generateNeumorphismColors } from "@/util/NeumorphismShadows"
import { StyleSheet, View } from "react-native"


type Props = {
    mainColor: string
    children: React.ReactNode
    width: number
    height: number
    radius: number
    isActive: boolean
}

const MorphLayout = ({ mainColor, children, width, height, radius, isActive }: Props) => {

    const { darkShadow, lightShadow, backgroundColor
    } = generateNeumorphismColors(mainColor)


    const styles = StyleSheet.create({
        top: {
            shadowOffset: { width: -6, height: -6 },
            shadowOpacity: 1,
            shadowColor: lightShadow, // lighter
            shadowRadius: 4,
        },
        topRevert: {
            shadowColor: darkShadow, //darker
        },
        bottomRevert: {
            shadowColor: lightShadow, //darker
        },
        center: {
            width: width,
            height: height,
            backgroundColor: mainColor,
            borderRadius: radius,
            // borderWidth: 1,
            // borderColor: lightShadow,
            justifyContent: 'center',
            alignItems: 'center',
        },
        bottom: {
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 1,
            shadowRadius: 6,
            elevation: 10,
            shadowColor: darkShadow, //darker
        }
    })


    return (
        <View style={styles.top}>
            <View style={styles.bottom}>
                <View style={styles.center}>
                    {children}
                </View>
            </View>
        </View>
    )


}


export default MorphLayout