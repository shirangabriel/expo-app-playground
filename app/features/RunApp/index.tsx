import Screen from "@/app/components/Screen";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Images } from "@/config/images"

const RunApp = () => {
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
            footSteps: 15,
            top: {
                justifyContent: 'space-around',
                assets: [
                    {
                        name: 'mountain',
                    }
                ]
            }


        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
            footSteps: 20,
            top: {
                justifyContent: 'space-around',
                assets: [
                    {
                        name: 'mountain',
                    }
                ]
            }
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
            footSteps: 10,
            top: {
                justifyContent: 'space-between',
                assets: [
                    {
                        name: 'winterhouse',
                    },
                    {
                        name: 'snowfall',
                    }
                ]
            }
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
            footSteps: 10,
            top: {
                justifyContent: 'space-around',
                assets: [
                    {
                        name: 'snowman',
                    },
                    {
                        name: 'winter-tree',
                    }
                ]
            }
        },
    ];

    // console.log(Images);


    const Item = ({ item, onPress, backgroundColor, textColor }: any) => (
        <Image source={require('../../../assets/images/runapp/track-bg/track.png')} />
    );



    return (
        <Screen title="RunApp" showCustomBackButton={true} style={{ backgroundColor: 'white', }}>
            <View style={styles.container}>
                {/* <FlatList
                    data={DATA}
                    renderItem={Item}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    keyExtractor={(item, index) => index.toString()} /> */}

                <View>
                    <View style={styles.topArea}>

                    </View>
                    <Image source={require('../../../assets/images/runapp/track-bg/track.png')} />
                    <View style={styles.bottomArea}>
                        <Image style={{ marginLeft: 100 }} source={require('../../../assets/images/runapp/footsteps/footsteps.png')} />
                    </View>
                </View>

            </View>
        </Screen>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {

    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    bottomArea: {
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    topArea: {
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
    }
});

export default RunApp