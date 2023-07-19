import React from 'react';
import { Box, useTheme, Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import { useDeleteAdminMutation, useGetAdminsQuery } from '../../state/api';
import Header from '../../components/Header';
import CustomColumnMenu from '../../components/DataGridCustomColumnMenu';

const Admin = () => {
	const theme = useTheme();
	const { data, isLoading } = useGetAdminsQuery();
	const [deleteAdmin] = useDeleteAdminMutation();

	const handleDelete = (admin) => {
		deleteAdmin(admin._id);
	};

	const columns = [
		{
			field: '_id',
			headerName: 'ID',
			flex: 1,
		},
		{
			field: 'name',
			headerName: 'Name',
			flex: 0.5,
		},
		{
			field: 'email',
			headerName: 'Email',
			flex: 1,
		},
		{
			field: 'phoneNumber',
			headerName: 'Phone Number',
			flex: 0.5,
			renderCell: (params) => {
				return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
			},
		},
		{
			field: 'country',
			headerName: 'Country',
			flex: 0.4,
		},
		{
			field: 'occupation',
			headerName: 'Occupation',
			flex: 1,
		},
		// {
		// 	field: 'role',
		// 	headerName: 'Role',
		// 	flex: 0.5,
		// },
		{
			field: 'delete',
			headerName: 'Delete',
			sortable: false,
			width: 140,
			disableClickEventBubbling: true,
			renderCell: (params) => {
				return (
					<Box
						display="flex"
						sx={{
							flex: 1,
						}}
					>
						<Fab
							size="small"
							aria-label="delete"
							onClick={() => handleDelete(params.row)}
						>
							<DeleteIcon />
						</Fab>
					</Box>
				);
			},
			flex: 0.5,
		},
		{
			field: 'disable',
			headerName: 'Disable',
			sortable: false,
			width: 140,
			disableClickEventBubbling: true,
			renderCell: (params) => {
				return (
					<Box
						display="flex"
						sx={{
							flex: 1,
						}}
					>
						<Fab size="small" aria-label="edit">
							<CloseIcon />
						</Fab>
					</Box>
				);
			},
			flex: 0.5,
		},
	];

	if (!data) return;

	return (
		<Box m="1.5rem 2.5rem">
			<Header title="SELLERS" subtitle="Managing admins and list of admins" />
			<Box
				mt="40px"
				height="75vh"
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
					rows={data || []}
					columns={columns}
					slots={{
						ColumnMenu: CustomColumnMenu,
					}}
				/>
			</Box>
		</Box>
	);
};

export default Admin;
