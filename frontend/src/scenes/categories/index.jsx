import React, { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';

import { useAddCategoryMutation, useGetCategoryQuery } from '../../state/api';
import { useTheme } from '@emotion/react';
import { Box, Button, TextField, Typography } from '@mui/material';

function Categories() {
	const theme = useTheme();
	const [categoryName, setCategoryName] = useState('');
	const [addCategory] = useAddCategoryMutation();
	const { data, isLoading } = useGetCategoryQuery();

	if (!data) return;

	const handleCategoryName = () => {
		addCategory({ name: categoryName });
		setCategoryName('');
	};

	return (
		<>
			<Box display="flex" justifyContent="center">
				<Accordion sx={{ backgroundColor: theme.palette.secondary[700] }}>
					<AccordionSummary>
						<Box>
							<Typography>Add A New Product Category</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<TextField
							value={categoryName}
							fullWidth
							variant="filled"
							type="text"
							label="Category Name"
							sx={{ gridColumn: 'span 2' }}
							onChange={(e) => setCategoryName(e.target.value)}
						/>
					</AccordionDetails>
					<AccordionActions>
						<Button
							variant="primary"
							size="small"
							onClick={() => handleCategoryName()}
							fullWidth={true}
						>
							<AddCircleIcon />
						</Button>
					</AccordionActions>
				</Accordion>
			</Box>

			<Box>
				<Typography
					variant="h5"
					color={theme.palette.secondary[300]}
					sx={{ gridColumn: 'span 4', marginTop: 2 }}
				>
					Below is the list of Categories in your Shop/Inventory
				</Typography>

				{data.map((category, index) => (
					<p key={index}> {category.name}</p>
				))}
			</Box>
		</>
	);
}

export default Categories;
