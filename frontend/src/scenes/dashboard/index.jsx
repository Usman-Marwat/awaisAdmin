import React from 'react';

import {
	DownloadOutlined,
	Email,
	PersonAdd,
	PointOfSale,
	Traffic,
} from '@mui/icons-material';
import {
	Box,
	Button,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import BreakdownChart from '../../components/BreakdownChart';
import FlexBetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import OverviewChart from '../../components/OverviewChart';
import StatBox from '../../components/StatBox';
import { useGetDashboardQuery } from '../../state/api';
import Text from '../../components/Text';

const Dashboard = () => {
	const theme = useTheme();
	const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
	const isMobile = useMediaQuery('(max-width: 490px)');
	const { data, isLoading } = useGetDashboardQuery();

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

	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Header title="Dashboard" subtitle="Welcome to your dashboard" />

				{!isMobile && (
					<Box>
						<Button
							sx={{
								backgroundColor: theme.palette.secondary.light,
								color: theme.palette.background.alt,
								fontWeight: 'bold',
							}}
						>
							<DownloadOutlined />
							<Text>Download</Text>
						</Button>
					</Box>
				)}
			</FlexBetween>

			<Box
				mt="20px"
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="160px"
				gap="20px"
				sx={{
					'& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' },
				}}
			>
				{/* ROW 1 */}
				<StatBox
					title={<Text>Total Customers</Text>}
					value={data && data.totalCustomers}
					increase="+14%"
					description={<Text>Since last month</Text>}
					icon={
						<Email
							sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
						/>
					}
				/>
				<StatBox
					title={<Text>Sales Today</Text>}
					value={data && data.todayStats.totalSales}
					increase="+21%"
					description={<Text>Since last month</Text>}
					icon={
						<PointOfSale
							sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
						/>
					}
				/>
				<Box
					gridColumn="span 8"
					gridRow="span 2"
					backgroundColor={theme.palette.background.alt}
					p="1rem"
					borderRadius="0.55rem"
				>
					<OverviewChart view="sales" isDashboard={true} />
				</Box>
				<StatBox
					title={<Text>Monthly Sales</Text>}
					value={data && data.thisMonthStats.totalSales}
					increase="+5%"
					description={<Text>Since last month</Text>}
					icon={
						<PersonAdd
							sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
						/>
					}
				/>
				<StatBox
					title={<Text>Yearly Sales</Text>}
					value={data && data.yearlySalesTotal}
					increase="+43%"
					description={<Text>Since last month</Text>}
					icon={
						<Traffic
							sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
						/>
					}
				/>

				{/* ROW 2 */}
				<Box
					gridColumn="span 8"
					gridRow="span 3"
					sx={{
						'& .MuiDataGrid-root': {
							border: 'none',
							borderRadius: '5rem',
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
							backgroundColor: theme.palette.background.alt,
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
					/>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={theme.palette.background.alt}
					p="1.5rem"
					borderRadius="0.55rem"
				>
					<Text variant="h6" sx={{ color: theme.palette.secondary[100] }}>
						Sales By Category
					</Text>
					<BreakdownChart isDashboard={true} />
					<Text
						p="0 0.6rem"
						fontSize="0.8rem"
						sx={{ color: theme.palette.secondary[200] }}
					>
						Breakdown of real states and information via category for revenue
						made for this year and total sales.
					</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
