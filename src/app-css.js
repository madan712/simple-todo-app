import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	item: { 
		padding: 10,
		marginVertical: 5,
		marginHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 10,
	},
	text: {
		flex: 3,
	},
	title: {
		color: '#000',
		fontSize: 20,
	},
	subtitle: {
		color: '#000',
		fontSize: 10,
	},
	icons: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'flex-end',
	},
	empty: {
		marginVertical: 50,
		alignSelf: 'center',
		fontSize: 20,
	},
	thumb: {
		width: 20,
		height: 20,
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		shadowOpacity: 0.35,
	},
	formContainer:{
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	inputView:{
		alignItems:"flex-start",
		paddingTop:20,
		paddingLeft:20,
		paddingRight:20,
		alignSelf: 'stretch',
	},
	inputText:{
		height:50,
		backgroundColor:"#d3d3d3",
		borderRadius:10,
		alignSelf: 'stretch',
		paddingLeft:20,
		},
		colorView:{
		height: 50,
	},
	itemBg: { 
		padding: 10,
		marginVertical: 5,
		marginHorizontal: 10,
		flexDirection: 'row',
		borderRadius: 10,
		backgroundColor:"#d3d3d3"
	},
});