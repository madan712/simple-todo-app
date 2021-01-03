import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, TextInput, Button, Alert, Picker } from 'react-native';
import { Toolbar, Icon } from 'react-native-material-ui';
import { SliderHuePicker } from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as categoryAction from '../../action/category-action';

import { styles } from "../../app-css";

const { width } = Dimensions.get('window');

class CategoryForm extends React.Component {
	
	constructor(props) {
        super(props);
		this.state = {'bgColor': '#FF0000','name':''};
		this.changeColor = this.changeColor.bind( this );
		this.createCategory = this.createCategory.bind( this );
    }
	
	changeColor(colorHsvOrRgb, resType) {
		if (resType === 'end') {
			console.log(tinycolor(colorHsvOrRgb).toHexString());
            this.setState({ 'bgColor': tinycolor(colorHsvOrRgb).toHexString() });
        }
	};
	
	createCategory() {
		if(this.state.name && this.state.name.trim()) {
			console.log('----------------------');
			console.log(this.state.bgColor);
			console.log(this.state.name);
			this.props.categoryAction.insetCategory(this.state.name.trim(), this.state.bgColor);
			this.props.navigation.navigate('CategoryScreen');
		} else {
			Alert.alert('Error','Please enter category name',[],{ cancelable: true});
		}
	}
	
	render() {
		const header = this.props.navigation.state.params.type === 'ADD' ? 'Create new category' : 'Edit category';
		
		return (
			<View style={styles.formContainer}>
				<Toolbar leftElement='arrow-back' onLeftElementPress={() => this.props.navigation.goBack()} centerElement={header} />
				
				<View style={styles.inputView}>
					<Text style={{paddingBottom:10}}>Category name</Text>
					<TextInput
						style={styles.inputText}
						placeholder="Category name"
						maxLength={20}
						autoFocus
						onChangeText={(name) => this.setState({'name':name})}
					/>
				</View>
				<View style={styles.inputView}>
					<View style={{flexDirection: 'row'}}>
						<Text>Color</Text>
						<View style={{width: 40, height: 20, marginHorizontal: 20, backgroundColor: this.state.bgColor}} />
						<Text>{this.state.bgColor}</Text>
					</View>
						<View style={styles.colorView}>
						<SliderHuePicker
							ref={view => {this.sliderHuePicker = view;}}
							oldColor={this.state.bgColor}
							trackStyle={[{height: 20, width: width - 40}]}
							thumbStyle={styles.thumb}
							useNativeDriver={true}
							onColorChange={this.changeColor}
						/>
						</View>
					
				</View>
				<View style={styles.inputView} style={{alignItems:"center"}}>
					<Button
						title="Create"
						onPress={this.createCategory}
					  />
				</View>
			</View>
		);
	}
}

function mapDispatchToProps( dispatch ) {
    return {
        categoryAction: bindActionCreators( categoryAction, dispatch )
    };
}

export default connect( null, mapDispatchToProps )( CategoryForm );