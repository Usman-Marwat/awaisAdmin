import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAddProductMutation } from '../../state/api';
import Header from '../../components/Header';

const AddProduct = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const [addProduct] = useAddProductMutation();

	const handleFormSubmit = (values, { resetForm }) => {
		addProduct({ ...values });
		resetForm();
	};

	return (
		<Box m="20px">
			<Header
				title="Add Product"
				subtitle="Create a new Product in your Inventory"
			/>

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
	price: yup.number().required('required'),
	description: yup.string().required('required'),
	category: yup.string().required('required'),
	supply: yup.number().required('required'),
});
const initialValues = {
	name: '',
	price: '',
	description: '',
	category: '',
	supply: '',
};

export default AddProduct;
