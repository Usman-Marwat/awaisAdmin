import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import MultiSelect from 'react-select';
import makeAnimated from 'react-select/animated';

import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
	useAddCategoryMutation,
	useAddProductMutation,
	useGetCategoryQuery,
} from '../../state/api';
import Header from '../../components/Header';
import FlexBetween from '../../components/FlexBetween';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';

const animatedComponents = makeAnimated();
const colourOptions = [
	{ value: 'red', label: 'Red' },
	{ value: 'green', label: 'Green' },
	{ value: 'blue', label: 'Blue' },
	{ value: 'purple', label: 'Purple' },
	{ value: 'coral', label: 'Coral' },
	{ value: 'yellow', label: 'Yellow' },
];

const AddProduct = () => {
	const theme = useTheme();
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const [categoryName, setCategoryName] = useState('');
	const [addProduct] = useAddProductMutation();
	const [addCategory] = useAddCategoryMutation();
	const { data, isLoading } = useGetCategoryQuery();

	const handleFormSubmit = (values, { resetForm }) => {
		addProduct({ ...values });
		resetForm();
	};

	const handleCategoryName = () => {
		addCategory({ name: categoryName });
		setCategoryName('');
	};

	return (
		<Box m="20px">
			<FlexBetween>
				<Header
					title="Add Product"
					subtitle="Create a new Product in your Inventory"
				/>

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
			</FlexBetween>

			<Formik
				onSubmit={handleFormSubmit}
				initialValues={initialValues}
				validationSchema={checkoutSchema}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
				}) => (
					<form onSubmit={handleSubmit}>
						<Box
							display="grid"
							gap="30px"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							marginTop={5}
							sx={{
								'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
							}}
						>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Name"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.name}
								name="name"
								error={!!touched.name && !!errors.name}
								helperText={touched.name && errors.name}
								sx={{ gridColumn: 'span 2' }}
							/>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Category</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									variant="filled"
									name="category"
									onBlur={handleBlur}
									error={!!touched.category && !!errors.category}
									label="category"
									onChange={handleChange}
									value={values.category}
									sx={{ gridColumn: 'span 2' }}
								>
									{data?.map((category, i) => (
										<MenuItem value={category.name} key={i}>
											{category.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							{/* <TextField
								fullWidth
								variant="filled"
								type="text"
								label="Category"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.category}
								name="category"
								error={!!touched.category && !!errors.category}
								helperText={touched.category && errors.category}
								sx={{ gridColumn: 'span 2' }}
							/> */}

							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Description"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.description}
								name="description"
								error={!!touched.description && !!errors.description}
								helperText={touched.description && errors.description}
								sx={{ gridColumn: 'span 4' }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Price"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.price}
								name="price"
								error={!!touched.price && !!errors.price}
								helperText={touched.price && errors.price}
								sx={{ gridColumn: 'span 2' }}
							/>

							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Supply"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.supply}
								name="supply"
								error={!!touched.supply && !!errors.supply}
								helperText={touched.supply && errors.supply}
								sx={{ gridColumn: 'span 2' }}
							/>

							<Typography
								variant="h5"
								color={theme.palette.secondary[300]}
								sx={{ gridColumn: 'span 4', marginTop: 2 }}
							>
								Attributes
							</Typography>

							<Box sx={{ gridColumn: 'span 2' }}>
								<MultiSelect
									styles={{
										menu: (baseStyles, state) => ({
											...baseStyles,
											color: state.isFocused ? 'grey' : 'black',
										}),
									}}
									closeMenuOnSelect={false}
									components={animatedComponents}
									defaultValue={[colourOptions[1], colourOptions[2]]}
									isMulti
									options={colourOptions}
									placeholder="choose colors"
								/>
							</Box>
							<Box sx={{ gridColumn: 'span 2' }}>
								<MultiSelect
									styles={{
										menu: (baseStyles, state) => ({
											...baseStyles,
											color: state.isFocused ? 'grey' : 'black',
										}),
									}}
									closeMenuOnSelect={false}
									components={animatedComponents}
									isMulti
									options={[
										{ value: 'S', label: 'Small' },
										{ value: 'M', label: 'Medium' },
										{ value: 'L', label: 'Large' },
									]}
									placeholder="choose sizes"
								/>
							</Box>
						</Box>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button type="submit" color="secondary" variant="contained">
								Add Product
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

const checkoutSchema = yup.object().shape({
	name: yup.string().required('required'),
	price: yup.string().required('required'),
	description: yup.string().required('required'),
	category: yup.string().required('required'),
	supply: yup.string().required('required'),
});
const initialValues = {
	name: '',
	price: '',
	description: '',
	category: '',
	supply: '',
};

export default AddProduct;
