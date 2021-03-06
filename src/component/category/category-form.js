import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, TextInput, Button, Alert, Picker } from 'react-native';
import { Toolbar, Icon } from 'react-native-material-ui';
import { SliderHuePicker } from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as categoryAction from '../../action/category-action';

import { styles } from '../../app-css';

const { width } = Dimensions.get('window');

class CategoryForm extends React.Component {
	
	constructor(props) {
        super(props);
		this.state = {'bgColor': '#FF0000','name':''};
		this.changeColor = this.changeColor.bind( this );
		this.createCategory = this.createCategory.bind( this );
		
		this.isAdd = this.props.navigation.state.params.type === 'ADD';
    }
	
	componentDidMount() {
		if(!this.isAdd) {
			this.setState({ 'bgColor': this.props.navigation.state.params.cat.color });
			this.setState({ 'name': this.props.navigation.state.params.cat.catName });
		}
	}
	
	changeColor(colorHsvOrRgb, resType) {
		if (resType === 'end') {
            this.setState({ 'bgColor': tinycolor(colorHsvOrRgb).toHexString() });
        }
	};
	
	createCategory() {
		if(this.state.name && this.state.name.trim()) {
			
			if(this.isAdd) {
				this.props.categoryAction.insetCategory(this.state.name.trim(), this.state.bgColor);
			} else {
				this.props.categoryAction.updateCategory(this.props.navigation.state.params.cat.catId, this.state.name.trim(), this.state.bgColor);
			}
			
			
			this.props.navigation.navigate('CategoryScreen');
		} else {
			Alert.alert('Error','Please enter category name',[],{ cancelable: true});
		}
	}
	
	getCenterElement(text) {
		return (
			<Text style={{paddingTop: 20, color:'#fff', fontSize: 20,}}>{text}</Text>
		);
	}
	
	render() {
		const header = this.isAdd ? 'Create new category' : 'Edit category';
		
		return (
			<View style={styles.formContainer}>
				<Toolbar 
					style={{container:{height: 60}, leftElementContainer:{paddingTop: 20}}}
					leftElement='arrow-back' 
					onLeftElementPress={() => this.props.navigation.goBack()} 
					centerElement={this.getCenterElement(header)} />
				
				<View style={styles.inputView}>
					<Text style={{paddingBottom:10}}>Category name</Text>
					<TextInput
						style={styles.inputText}
						placeholder="Category name"
						maxLength={20}
						value={this.state.name}
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
						title={this.isAdd ? 'Create' : 'Edit'}
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