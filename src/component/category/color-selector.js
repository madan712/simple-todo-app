import React from 'react'
import { Pressable, View } from 'react-native'

import _ from 'lodash'

export const ColorSelector = props => {

	const row = 2
	const column = 6

	return (
		<View style={{ flexDirection: 'column' }}>
			{
				_.times(row, (r) => {
					return <View key={r} style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20 }}>
						{
							_.times(column, (c) => {
								const index = c + (r * column);
								const co = props.colors[index];
								if (co) {
									if (props.color === co)
										return <View style={{ width: 20, height: 20, backgroundColor: co, borderRadius: 5, borderWidth: 1 }} key={index} />
									else
										return <Pressable onPress={() => props.setColor(co)} key={index}><View style={{ width: 20, height: 20, backgroundColor: co, borderRadius: 5, elevation: 3 }} /></Pressable>
								}
								else
									return <></>
							})
						}
					</View>
				})
			}

		</View>
	)
}