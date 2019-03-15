import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Icon = ({ name, size, style, color }) => {
	return <Ionicons name={name} size={size} style={style} color={color} />;
};

export default Icon;
