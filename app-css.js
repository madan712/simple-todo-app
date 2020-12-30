import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: { 
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 5,
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