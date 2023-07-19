import React, { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';

import {
	useAddCategoryMutation,
	useDeleteCategoryMutation,
	useEditCategoryMutation,
	useGetCategoryQuery,
} from '../../state/api';
import { useTheme } from '@emotion/react';
import { Box, Button, Fab, Modal, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Categories() {
	const theme = useTheme();
	const [categoryName, setCategoryName] = useState('');
	const [selected, setSelected] = useState();
	const [open, setOpen] = useState(false);
	const [addCategory] = useAddCategoryMutation();
	const { data, isLoading } = useGetCategoryQuery();
	const [deleteCategory] = useDeleteCategoryMutation();
	const [editCategory] = useEditCategoryMutation();

	if (!data) return;

	const handleCategoryName = () => {
		addCategory({ name: categoryName });
		setCategoryName('');
	};

	const handleDelete = (id) => {
		deleteCategory(id);
	};

	const handleEdit = () => {
		editCategory(selected);
		setOpen(false);
	};

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: theme.palette.secondary[700],
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
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
					<Box margin={5} key={index} border={1} padding={2} borderRadius={3}>
						<CategoryBox
							category={category}
							onDelete={handleDelete}
							onEdit={(category) => {
								setSelected(category);
								setOpen(true);
							}}
						/>
					</Box>
				))}
			</Box>

			{selected && (
				<Modal
					open={open}
					onClose={() => {
						setOpen(false);
						setSelected(null);
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Add the new name for the category
						</Typography>

						<Box display="flex" columnGap={2}>
							<TextField
								value={selected.name}
								onChange={(e) =>
									setSelected({ ...selected, name: e.target.value })
								}
							/>
							<Button onClick={handleEdit}>
								<Typography color="white">Edit</Typography>
							</Button>
						</Box>
					</Box>
				</Modal>
			)}
		</>
	);
}

const CategoryBox = ({ category, onDelete, onEdit }) => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			paddingLeft={2}
			paddingRight={2}
		>
			<Typography flex={0.8}>{category.name}</Typography>
			<Box display="flex" flex={0.2} columnGap="20%">
				<Fab size="small" aria-label="edit">
					<EditIcon onClick={() => onEdit(category)} />
				</Fab>
				<Fab
					size="small"
					aria-label="delete"
					onClick={() => onDelete(category._id)}
				>
					<DeleteIcon />
				</Fab>
			</Box>
		</Box>
	);
};

export default Categories;
