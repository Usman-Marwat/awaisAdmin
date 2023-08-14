import { Typography, Box, useTheme } from '@mui/material';
import React from 'react';

import Text from './Text';

const Header = ({ title, subtitle }) => {
	const theme = useTheme();
	return (
		<Box>
			<Text
				variant="h2"
				color={theme.palette.secondary[100]}
				fontWeight="bold"
				sx={{ mb: '5px', textTransform: 'capitalize' }}
			>
				{title}
			</Text>
			<Text variant="h5" color={theme.palette.secondary[300]}>
				{subtitle}
			</Text>
		</Box>
	);
};

export default Header;
