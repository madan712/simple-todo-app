import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import {Header, Icon } from 'react-native-elements';

const todoList = [
  {
    id: '1',
    title: 'First Item',
  },
  {
    id: '2',
    title: 'Second Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
	<View style={styles.text}>
		<Text style={styles.title}>{title}</Text>
	</View>
	<View style={styles.icons}>
		<Icon name='edit' onPress={() => console.log('edit')} />
	</View>
	<View style={styles.icons}>
		<Icon name='delete' onPress={() => console.log('delete')} />
	</View>
  </View>
);

const renderItem = ({ item }) => (
    <Item title={item.title} />
);

export default function App() {
  return (
    <View style={styles.container}>
      <Header
		  centerComponent={{ text: 'TODO', style: { color: '#fff' } }}
		/>
		<FlatList
			data={todoList}
			renderItem={renderItem}
			keyExtractor={item => item.id}
		  />
		  <ActionButton onPress={() => { console.log("Add")}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: { 
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
	flexDirection: 'row',
	justifyContent: 'space-between',
	borderColor: '#000',
	borderWidth: 1,
	borderRadius: 10
  },
  text: {
	  flex: 3,
  },
  title: {
	color: '#000',
    fontSize: 20,
  },
  icons: {
	flexDirection: 'row',
	flex: 1,
	justifyContent: 'flex-end',
  }
});
