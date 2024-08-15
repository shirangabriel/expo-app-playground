import { StyleSheet, View } from "react-native"

type Props = {
    paginationCount: number,
    currentSelected: number
}
export const Indicator: React.FC<Props> = ({ paginationCount, currentSelected }) => {
    const renderDotIndicator = (count: number, selected: number) => {
        let items = []
        for (let index = 0; index <= count; index++) {
            items.push(<View style={[
                styles.dotIndicator,
                selected === index ? styles.dotIndicatorActive : styles.dotIndicatorInActive
            ]}
            />)
        }

        return items;
    }

    return (
        <View style={styles.dotIndicatorWrapper}>
            {renderDotIndicator(paginationCount, currentSelected).map(item => item)}
        </View>
    )
}


const styles = StyleSheet.create({
    dotIndicatorWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 26,
        gap: 10

    },
    dotIndicator: {
        height: 15,
        width: 15,
        borderRadius: 10,
    },

    dotIndicatorInActive: {
        backgroundColor: '#DDDDDD',
    },
    dotIndicatorActive: {
        borderColor: '#5EC269',
        borderWidth: 5,
    }
});