import React, { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from '@mui/x-data-grid';

import Header from '../../components/Header';
import { ProductSalesData, productCategories } from '../../data';
import { useCheckOutMutation } from '../../state/api';
import commisionReport from '../../data/commisionReport';
import walletRecharge from '../../data/walletRecharge';
import wishlistDataset from '../../data/wishlistDataset';
import Text from '../../components/Text';

const categories = ['All', ...productCategories];

const Reports = () => {
	const theme = useTheme();
	const [page, setPage] = useState(0);
	const [data, setData] = useState(ProductSalesData);
	const [pageSize, setPageSize] = useState(20);
	const [category, setCategory] = useState('All');
	const [checkout] = useCheckOutMutation();

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

	const handleCheckOut = async () => {
		// checkout({
		// 	items: [
		// 		{
		// 			id: 'price_1Nb5g7FY0kg8jzx8uYJTT5a0',
		// 			quantity: 7,
		// 		},
		// 	],
		// });
		const { data } = await checkout({
			items: [
				{ id: 1, quantity: 3 },
				{ id: 2, quantity: 1 },
			],
		});
		window.open(data.url);
	};

	return (
		<Box m="1.5rem 2rem">
			<Header title="Reports" subtitle="All Sales Reports" />

			<Box sx={{ marginTop: 1 }}>
				<Button
					type="submit"
					color="secondary"
					variant="contained"
					onClick={handleCheckOut}
				>
					<Typography mr="0.7rem">CheckOut</Typography>
				</Button>
			</Box>

			<Box
				height="80vh"
				mt="40px"
				display="flex"
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

			<CommissionReport />
			<WalletRecharge />
			<WhishList />
		</Box>
	);
};

export default Reports;

const DataGridCustomToolbar = ({ category, onValueChange }) => {
	const isMobile = useMediaQuery('(max-width: 490px)');
	return (
		<Box marginBottom={2}>
			<ToolBarHead text="Products Report" />
			<GridToolbarContainer>
				<Box display="flex" flex={1} justifyContent="center">
					<Box width={isMobile ? '100%' : '30%'}>
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
					</Box>
				</Box>
			</GridToolbarContainer>
		</Box>
	);
};

const ToolBarHead = ({ text }) => {
	const theme = useTheme();
	return (
		<GridToolbarContainer>
			<Box
				display="flex"
				flex={1}
				justifyContent="space-between"
				alignItems="center"
				padding="2%"
				columnGap={3}
			>
				<Text
					variant="h5"
					color={theme.palette.secondary[100]}
					fontWeight="bold"
					sx={{ mb: '5px' }}
				>
					{text}
				</Text>
				<GridToolbarExport />
			</Box>
		</GridToolbarContainer>
	);
};

const CommissionReport = () => {
	const theme = useTheme();
	const [page, setPage] = useState(0);
	const [data, setData] = useState(commisionReport);
	const [pageSize, setPageSize] = useState(20);
	const [category, setCategory] = useState('All');

	const onValueChange = () => {};

	const columns = [
		{
			field: 'id',
			headerName: 'Customer Number',
			flex: 1,
		},
		{
			field: 'Date',
			headerName: 'Date',
			flex: 1,
		},
		{
			field: 'Sales',
			headerName: 'Amount',
			flex: 1,
		},
	];

	return (
		<Box
			marginTop={10}
			height="80vh"
			mt="40px"
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
				getRowId={(row) => Math.random()}
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
				components={{ Toolbar: () => <ToolBarHead text="Commission Report" /> }}
				componentsProps={{
					toolbar: { category, onValueChange },
				}}
			/>
		</Box>
	);
};

const WalletRecharge = () => {
	const theme = useTheme();
	const [page, setPage] = useState(0);
	const [data, setData] = useState(walletRecharge);
	const [pageSize, setPageSize] = useState(20);
	const [category, setCategory] = useState('All');

	const onValueChange = () => {};

	const columns = [
		{
			field: 'Attrition_Flag',
			headerName: 'Attrition Flag',
			flex: 1,
		},
		{
			field: 'Income_Category',
			headerName: 'Income Category',
			flex: 1,
		},
		{
			field: 'Card_Category',
			headerName: 'Card Category',
			flex: 1,
		},
		{
			field: 'Credit_Limit',
			headerName: 'Credit Limit',
			flex: 1,
		},
		{
			field: 'Total_Trans_Ct',
			headerName: 'Total Transaction Count',
			flex: 1,
		},
	];

	return (
		<Box
			marginTop={10}
			height="80vh"
			mt="40px"
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
				getRowId={(row) => row.CLIENTNUM}
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
				components={{ Toolbar: () => <ToolBarHead text="Wallet Recharge" /> }}
				componentsProps={{
					toolbar: { category, onValueChange },
				}}
			/>
		</Box>
	);
};

const WhishList = () => {
	const theme = useTheme();
	const [page, setPage] = useState(0);
	const [data, setData] = useState(wishlistDataset);
	const [pageSize, setPageSize] = useState(20);
	const [category, setCategory] = useState('All');

	const onValueChange = () => {};

	const columns = [
		{
			field: 'invoice_date',
			headerName: 'Date Added',
			flex: 1,
		},
		{
			field: 'payment_method',
			headerName: 'Desired Payment',
			flex: 1,
		},
		{
			field: 'category',
			headerName: 'Product Category',
			flex: 1,
		},
		{
			field: 'price',
			headerName: 'Price',
			flex: 1,
		},
		{
			field: 'quantity',
			headerName: 'Quantity',
			flex: 1,
		},
		{
			field: 'shopping_mall',
			headerName: 'Store Used',
			flex: 1,
		},
	];

	return (
		<Box
			marginTop={10}
			height="80vh"
			mt="40px"
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
				getRowId={(row) => row.invoice_no}
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
				components={{
					Toolbar: () => <ToolBarHead text="Customer WhishList" />,
				}}
				componentsProps={{
					toolbar: { category, onValueChange },
				}}
			/>
		</Box>
	);
};
