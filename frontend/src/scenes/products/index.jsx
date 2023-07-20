import React, { useEffect, useState } from 'react';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Collapse,
	Button,
	Typography,
	Rating,
	useTheme,
	useMediaQuery,
	TextField,
	Autocomplete,
} from '@mui/material';
import { AddCircle, DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IosShareIcon from '@mui/icons-material/IosShare';
import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

import Header from '../../components/Header';
import {
	useGetProductsQuery,
	useDeleteProductMutation,
	useEditProductMutation,
	useGetCategoryQuery,
} from '../../state/api';
import FlexBetween from '../../components/FlexBetween';
import ImageSlider from '../../components/ImageSlider';

const Products = () => {
	const theme = useTheme();
	const { data, isLoading } = useGetProductsQuery();
	const categoryApi = useGetCategoryQuery();
	const isNonMobile = useMediaQuery('(min-width: 1000px)');
	const [selected, setSelected] = useState();
	const [finalData, setFinalData] = useState();
	const [categories, setCategories] = useState();

	useEffect(() => {
		setFinalData(data);
	}, [data]);

	useEffect(() => {
		setCategories(categoryApi.data);
	}, [categoryApi.data]);

	if (!finalData || !categories) return;

	const categoriesNames = categories.map((c) => c.name);

	const filterData = ({ field, value }) => {
		setFinalData(data.filter((p) => p[field].includes(value)));
	};

	if (selected) {
		return (
			<>
				<Button onClick={() => setSelected(null)} sx={{ marginTop: 2 }}>
					<ArrowBackIcon />
				</Button>
				<Typography variant="h3" component="div" sx={{ textAlign: 'center' }}>
					{selected.name}
				</Typography>
				<Typography
					sx={{ fontSize: 14, textAlign: 'center' }}
					color={theme.palette.secondary[700]}
					gutterBottom
				>
					{selected.category}
				</Typography>

				<EditForm selected={selected} onEdit={() => setSelected(null)} />
			</>
		);
	}

	return (
		<Box m="1.5rem 2.5rem">
			<Header title="PRODUCTS" subtitle="See your list of products." />
			<Box sx={{ marginTop: 1 }}>
				<Link to={'/addProduct'} style={{ textDecoration: 'none' }}>
					<Button type="submit" color="secondary" variant="contained">
						<Typography mr="0.7rem">Add Product</Typography>{' '}
						<AddCircle color="white" />
					</Button>
				</Link>
			</Box>

			<Box
				mt="20px"
				display="grid"
				gridTemplateColumns="repeat(4, minmax(0, 1fr))"
				justifyContent="space-between"
				rowGap="20px"
				columnGap="1.5%"
				flex={1}
				sx={{
					'& > div': { gridColumn: isNonMobile ? 'span 2' : 'span 4' },
				}}
			>
				{/* <Box
					borderBottom={1}
					borderColor={theme.palette.primary.light}
					alignItems="center"
				>
					<ButtonGroup variant="text" aria-label="text button group">
						<Button
							variant="primary"
							sx={{ opacity: 0.7 }}
							onClick={() => filterData('category')}
						>
							By Category
						</Button>
						<Button variant="primary" sx={{ opacity: 0.7 }}>
							By Price
						</Button>
						<Button variant="primary" sx={{ opacity: 0.7 }}>
							By Rating
						</Button>
					</ButtonGroup>
				</Box> */}

				<Box sx={{ gridColumn: 'span 4' }}>
					<FilterInput onSelect={filterData} />
				</Box>

				<Box>
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={['Category', 'Price', 'Supply']}
						onClose={(e) => {
							const text = e.target.outerText.toString();
							text &&
								setFinalData(
									_.sortBy(finalData, [
										(p) => p[text.toLowerCase()].toLowerCase(),
									])
								);
						}}
						renderInput={(params) => <TextField {...params} label="Sort By" />}
					/>
				</Box>
			</Box>

			{data || !isLoading ? (
				<Box
					mt="20px"
					display="grid"
					gridTemplateColumns="repeat(4, minmax(0, 1fr))"
					justifyContent="space-between"
					rowGap="20px"
					columnGap="1.33%"
					sx={{
						'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
					}}
				>
					{finalData.map((product) => (
						<Product
							key={product._id}
							item={product}
							onSelect={(item) => setSelected(item)}
							categoriesNames={categoriesNames}
						/>
					))}
				</Box>
			) : (
				<>Loading...</>
			)}
		</Box>
	);
};

const Product = ({ item, onSelect, categoriesNames }) => {
	const theme = useTheme();
	const [isExpanded, setIsExpanded] = useState(false);
	const navigate = useNavigate();
	const [deleteProduct] = useDeleteProductMutation();

	const handleDelete = (id) => {
		deleteProduct(id);
	};

	return (
		<Card
			sx={{
				backgroundImage: 'none',
				backgroundColor: theme.palette.background.alt,
				borderRadius: '0.55rem',
			}}
		>
			<CardContent>
				<ImageSlider />

				<Typography
					sx={{ fontSize: 14 }}
					color={theme.palette.secondary[700]}
					gutterBottom
				>
					{categoriesNames.includes(item.category)
						? item.category
						: 'Category removed'}
				</Typography>

				<Typography variant="h5" component="div">
					{item.name}
				</Typography>
				<Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
					${item.price}
				</Typography>
				<Rating value={item.rating} readOnly />

				<Typography variant="body2">{item.description}</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant="primary"
					size="small"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					See More
				</Button>
			</CardActions>
			<Collapse
				in={isExpanded}
				timeout="auto"
				unmountOnExit
				sx={{
					color: theme.palette.neutral[300],
				}}
			>
				<CardContent>
					<Typography>id: {item._id}</Typography>
					<Typography>Supply Left: {item.supply}</Typography>
					<Typography>
						Yearly Sales This Year: {item.stat.yearlySalesTotal}
					</Typography>
					<Typography>
						Yearly Units Sold This Year: {item.stat.yearlyTotalSoldUnits}
					</Typography>

					<Box sx={styles.couponBox}>
						<TextField
							label="Coupon"
							variant="filled"
							placeholder="promo code"
							// sx={{ width: '7 0%' }}
						/>
						<Button
							variant="primary"
							size="small"
							onClick={() => {}}
							fullWidth={true}
							sx={[styles.button, { marginLeft: 3 }]}
						>
							<IosShareIcon sx={{ margin: 0 }} />
						</Button>
					</Box>

					<Box sx={{ marginTop: 3 }}>
						<FlexBetween>
							<Button
								variant="primary"
								size="small"
								onClick={() => onSelect(item)}
							>
								<EditIcon />
							</Button>
							<Button
								sx={{ color: 'red' }}
								variant="primary"
								size="small"
								onClick={() => handleDelete(item._id)}
							>
								<DeleteOutline />
							</Button>
						</FlexBetween>
					</Box>
				</CardContent>
			</Collapse>
		</Card>
	);
};

const EditForm = ({ selected, onEdit }) => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const [editProduct] = useEditProductMutation();

	const handleFormSubmit = (values, { resetForm }) => {
		editProduct({ id: selected._id, ...values });
		onEdit();
		// resetForm();
	};

	return (
		<Box sx={{ padding: 3 }}>
			<Formik
				onSubmit={handleFormSubmit}
				initialValues={{
					name: selected.name,
					price: selected.price,
					description: selected.description,
					category: selected.category,
					supply: selected.supply,
				}}
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
							<TextField
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
							/>

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
						</Box>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button type="submit" color="secondary" variant="contained">
								Edit Product
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

const FilterInput = ({ onSelect }) => {
	const [filterField, setFilterField] = useState();
	const [filterValue, setFilterValue] = useState(' ');

	useEffect(() => {
		if (filterField)
			onSelect({
				field: filterField.toLowerCase(),
				value: filterValue.toLowerCase(),
			});
	}, [filterField, filterValue]);

	return (
		<Box
			display="grid"
			gridTemplateColumns="repeat(4, minmax(0, 1fr))"
			justifyContent="space-between"
			rowGap="20px"
			flex={1}
		>
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={['Category', 'Price', 'Supply']}
				onClose={(e) => {
					const text = e.target.outerText.toString();
					if (text) {
						setFilterField(text);
						setFilterValue('');
					}
				}}
				renderInput={(params) => <TextField {...params} label="Filter By" />}
				sx={{ gridColumn: 'span 2', borderRight: 2 }}
			/>
			<TextField
				value={filterValue}
				onChange={(e) => setFilterValue(e.target.value)}
				id="outlined-basic"
				label="Value"
				variant="outlined"
				sx={{ marginLeft: -0.5, borderLeft: 2 }}
			/>
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

export default Products;

const styles = {
	button: {
		width: 20,
		height: 60,
		borderRadius: '50%',
	},
	couponBox: {
		marginTop: 3,
		marginBottom: 7,
		display: 'flex',
	},
};
