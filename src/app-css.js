import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	const: {
		backgroundColor: '#3b5998'
	},
	center: {
		flex: 1, alignSelf: 'center', justifyContent: 'center'
	},
	container: {
		flex: 1, paddingBottom: 60
	},
	appbar: {
		backgroundColor: '#3b5998', bottom: 0
	},
	emptytext: {
		marginTop: 50
	},
	textbox: {
		width: 200, height: 40
	},
	inputpannel: {
		flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'
	},
	modal: {
		marginHorizontal: 10, backgroundColor: 'white', padding: 10, borderRadius: 5
	},
	button: {
		marginTop: 5, height: 40, justifyContent: 'center', backgroundColor: '#3b5998'
	},
	fab: {
		position: 'absolute', margin: 10, bottom: 0, alignSelf: 'center', backgroundColor: '#3b5998'
	},
	underlayright: {
		marginTop: 10, marginHorizontal: 10, height: 50, borderRadius: 5, flexDirection: 'row', backgroundColor: '#d3d3d3', alignItems: 'center', justifyContent: 'flex-start'
	},
	underlayleft: {
		marginTop: 10, marginHorizontal: 10, height: 50, borderRadius: 5, flexDirection: 'row', backgroundColor: '#d3d3d3', alignItems: 'center', justifyContent: 'flex-end'
	},
	paddingleft10: {
		paddingLeft: 10
	},
	paddingright10: {
		paddingRight: 10
	},
	catfont: {
		paddingLeft: 10, fontSize: 20
	},
	taskfont: {
		paddingLeft: 10, fontSize: 20, alignSelf: 'center'
	},
	list: {
		marginTop: 10, marginHorizontal: 10, height: 50, borderRadius: 5, borderWidth: 1
	}
});