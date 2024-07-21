import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function OnboardingButtonAnimation() {


  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => (
    <ThemedView style={styles.item}>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </ThemedView>
  );

  {/* <FlatList data={DATA} renderItem={({ item }) => <Item title={item.title} />} /> */ }
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.wrapper}>
        <View style={styles.dotIndicatorWrapper}>
          <View style={styles.dotIndicator} />
          <View style={[styles.dotIndicator, styles.dotIndicatorActive]} />
          <View style={styles.dotIndicator} />
        </View>
        <ThemedView style={styles.buttonWrapper}>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <ThemedText type='defaultSemiBold'>Back</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.primaryButton]}>
            <ThemedText style={styles.buttonText} type='defaultSemiBold'>Continue</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  dotIndicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100

  },
  dotIndicator: {
    height: 15,
    width: 15,
    backgroundColor: 'gray',
    borderRadius: 10
  },
  dotIndicatorActive: {
    borderColor: 'red',
    borderWidth: 2
  },
  buttonWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    width: 300,
    backgroundColor: '#Efefef',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16

  },
  primaryButton: {
    backgroundColor: "#0a7ea4",
    width: '100%',
    flex: 2,
  },
  secondaryButton: {
    flex: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 16

  },
  buttonText: {
    color: 'white'
  }
});
