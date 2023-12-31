import React, { useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useCheckOutMutation, useGetTransactionsQuery } from '../../state/api';
import Header from '../../components/Header';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';
import Text from '../../components/Text';

const Transactions = () => {
	const theme = useTheme();

	// values to be sent to the backend
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(20);
	const [sort, setSort] = useState({});
	const [search, setSearch] = useState('');

	const [searchInput, setSearchInput] = useState('');
	const { data, isLoading } = useGetTransactionsQuery({
		page,
		pageSize,
		sort: JSON.stringify(sort),
		search,
	});
	const [checkout] = useCheckOutMutation();

	const columns = [
		{
			field: '_id',
			headerName: 'ID',
			flex: 1,
		},
		{
			field: 'userId',
			headerName: 'User ID',
			flex: 1,
		},
		{
			field: 'createdAt',
			headerName: 'CreatedAt',
			flex: 1,
		},
		{
			field: 'products',
			headerName: '# of Products',
			flex: 0.5,
			sortable: false,
			renderCell: (params) => params.value.length,
		},
		{
			field: 'cost',
			headerName: 'Cost',
			flex: 1,
			renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
		},
	];

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
		<Box m="1.5rem 2.5rem">
			<Header title="Transactions" subtitle="Entire list of transactions" />

			<Box sx={{ marginTop: 1 }}>
				<Button
					type="submit"
					color="secondary"
					variant="contained"
					onClick={handleCheckOut}
				>
					<Text mr="0.7rem">CheckOut</Text>
				</Button>
			</Box>
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
					loading={isLoading || !data}
					getRowId={(row) => row._id}
					rows={(data && data.transactions) || []}
					columns={columns}
					rowCount={(data && data.total) || 0}
					rowsPerPageOptions={[20, 50, 100]}
					pagination
					page={page}
					pageSize={pageSize}
					paginationMode="server"
					sortingMode="server"
					onPageChange={(newPage) => setPage(newPage)}
					onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
					onSortModelChange={(newSortModel) => setSort(...newSortModel)}
					components={{ Toolbar: DataGridCustomToolbar }}
					componentsProps={{
						toolbar: { searchInput, setSearchInput, setSearch },
					}}
				/>
			</Box>
		</Box>
	);
};

export default Transactions;
