import React, { useState } from 'react';
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	useTheme,
} from '@mui/material';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from '@mui/x-data-grid';

import Header from '../../components/Header';
import { ProductSalesData, productCategories } from '../../data';

// const data = ProductSalesData;
const categories = ['All', ...productCategories];

const Reports = () => {
	const theme = useTheme();
	const [page, setPage] = useState(0);
	const [data, setData] = useState(ProductSalesData);
	const [pageSize, setPageSize] = useState(20);
	const [category, setCategory] = useState('All');

	const columns = [
		{
			field: 'Order_ID',
			headerName: 'Order_ID',
			flex: 1,
		},
		{
			field: 'Sales',
			headerName: 'Sales',
			flex: 1,
		},
		{
			field: 'Product_Name',
			headerName: 'Product_Name',
			flex: 1,
		},
		{
			field: 'Product_Category',
			headerName: 'Product_Category',
			flex: 1,
		},
		// {
		// 	field: 'products',
		// 	headerName: '# of Products',
		// 	flex: 0.5,
		// 	sortable: false,
		// 	renderCell: (params) => params.value.length,
		// },
		// {
		// 	field: 'cost',
		// 	headerName: 'Cost',
		// 	flex: 1,
		// 	renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
		// },
	];

	const onValueChange = (val) => {
		setCategory(val);

		if (val === 'All') return setData(ProductSalesData);

		setData(ProductSalesData.filter((p) => p.Product_Category === val));
	};

	return (
		<Box m="1.5rem 2.5rem">
			<Header title="REPORTS" subtitle="All Sales Reports" />

			<Box
				height="80vh"
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none',
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none',
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderBottom: 'none',
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: theme.palette.primary.light,
					},
					'& .MuiDataGrid-footerContainer': {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderTop: 'none',
					},
					'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
						color: `${theme.palette.secondary[200]} !important`,
					},
				}}
			>
				<DataGrid
					loading={false}
					getRowId={(row) => row.Order_ID}
					rows={data}
					columns={columns}
					rowCount={(data && data.length) || 0}
					rowsPerPageOptions={[20, 50, 100]}
					pagination
					page={page}
					pageSize={pageSize}
					sortingMode="server"
					onPageChange={(newPage) => setPage(newPage)}
					onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
					components={{ Toolbar: DataGridCustomToolbar }}
					componentsProps={{
						toolbar: { category, onValueChange },
					}}
				/>
			</Box>
		</Box>
	);
};

export default Reports;

const DataGridCustomToolbar = ({ category, onValueChange }) => {
	return (
		<GridToolbarContainer>
			<Box display="flex" flex={1} padding="2% 30%" columnGap={3}>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Category</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						variant="filled"
						value={category}
						onChange={(e) => onValueChange(e.target.value)}
						name="category"
						label="category"
					>
						{categories.map((category, i) => (
							<MenuItem value={category} key={i}>
								{category}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<GridToolbarExport />
			</Box>
		</GridToolbarContainer>
	);
};
