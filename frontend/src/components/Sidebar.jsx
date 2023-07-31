import React from 'react';
import {
	Box,
	Collapse,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';
import {
	SettingsOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	HomeOutlined,
	ShoppingCartOutlined,
	Groups2Outlined,
	ReceiptLongOutlined,
	PublicOutlined,
	PointOfSaleOutlined,
	TodayOutlined,
	CalendarMonthOutlined,
	AdminPanelSettingsOutlined,
	TrendingUpOutlined,
	PieChartOutlined,
	ExpandMore,
	ExpandLess,
	AddCircle,
	Category,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import '../i18n';
import FlexBetween from './FlexBetween';
import profileImage from '../assets/profile.jpeg';

const navItems = [
	{
		text: 'Dashboard',
		icon: <HomeOutlined />,
	},
	{
		text: 'Client Facing',
		icon: null,
	},
	{
		text: 'Products',
		icon: <ShoppingCartOutlined />,
	},
	{
		text: 'Customers',
		icon: <Groups2Outlined />,
	},
	{
		text: 'Transactions',
		icon: <ReceiptLongOutlined />,
	},
	{
		text: 'Reports',
		icon: <ReceiptLongOutlined />,
	},
	{
		text: 'Geography',
		icon: <PublicOutlined />,
	},
	{
		text: 'Sales Graphs',
		icon: null,
	},
	{
		text: 'Overview',
		icon: <PointOfSaleOutlined />,
	},
	{
		text: 'Daily',
		icon: <TodayOutlined />,
	},
	{
		text: 'Monthly',
		icon: <CalendarMonthOutlined />,
	},
	{
		text: 'Breakdown',
		icon: <PieChartOutlined />,
	},
	{
		text: 'Management',
		icon: null,
	},
	{
		text: 'Sellers',
		icon: <AdminPanelSettingsOutlined />,
	},
	{
		text: 'Performance',
		icon: <TrendingUpOutlined />,
	},
];

const Sidebar = ({
	user,
	drawerWidth,
	isSidebarOpen,
	setIsSidebarOpen,
	isNonMobile,
}) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();
	const { t, values } = useTranslation();

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	return (
		<Box component="nav">
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					variant="persistent"
					anchor="left"
					sx={{
						width: drawerWidth,
						'& .MuiDrawer-paper': {
							color: theme.palette.secondary[200],
							backgroundColor: theme.palette.background.alt,
							boxSixing: 'border-box',
							borderWidth: isNonMobile ? 0 : '2px',
							width: drawerWidth,
						},
					}}
				>
					<Box width="100%">
						<Box m="1.5rem 0rem 2rem 1rem">
							<FlexBetween color={theme.palette.secondary.main}>
								<Box display="flex" alignItems="center">
									<Typography variant="h4" fontWeight="bold">
										{t('panel')}
									</Typography>
								</Box>
								{!isNonMobile && (
									<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
										<ChevronLeft />
									</IconButton>
								)}
							</FlexBetween>
						</Box>
						<List>
							{navItems.map(({ text, icon }) => {
								if (!icon) {
									return (
										<Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
											{text}
										</Typography>
									);
								}

								const lcText = text.toLowerCase();

								if (text === 'Products')
									return (
										<ProductListItem
											key={text}
											onActive={() => setActive(lcText)}
											onAddProductNavigate={() => navigate(`/addproduct`)}
											onListNavigate={() => navigate('/products')}
											onCategoriesNavigate={() => navigate('/categories')}
											sxButton={{
												backgroundColor:
													active === lcText
														? theme.palette.secondary[300]
														: 'transparent',
												color:
													active === lcText
														? theme.palette.primary[600]
														: theme.palette.secondary[100],
											}}
											sxIcon={{
												ml: '2rem',
												color:
													active === lcText
														? theme.palette.primary[600]
														: theme.palette.secondary[200],
											}}
										/>
									);

								return (
									<ListItem key={text} disablePadding>
										<ListItemButton
											onClick={() => {
												navigate(`/${lcText}`);
												setActive(lcText);
											}}
											sx={{
												backgroundColor:
													active === lcText
														? theme.palette.secondary[300]
														: 'transparent',
												color:
													active === lcText
														? theme.palette.primary[600]
														: theme.palette.secondary[100],
											}}
										>
											<ListItemIcon
												sx={{
													ml: '2rem',
													color:
														active === lcText
															? theme.palette.primary[600]
															: theme.palette.secondary[200],
												}}
											>
												{icon}
											</ListItemIcon>
											<ListItemText primary={text} />
											{active === lcText && (
												<ChevronRightOutlined sx={{ ml: 'auto' }} />
											)}
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>

					<Box bottom="4rem">
						<Divider />
						<FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="40px"
								width="40px"
								borderRadius="50%"
								sx={{ objectFit: 'cover' }}
							/>
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.9rem"
									sx={{ color: theme.palette.secondary[100] }}
								>
									{user.name}
								</Typography>
								<Typography
									fontSize="0.8rem"
									sx={{ color: theme.palette.secondary[200] }}
								>
									{user.occupation}
								</Typography>
							</Box>
							<SettingsOutlined
								sx={{
									color: theme.palette.secondary[300],
									fontSize: '25px ',
								}}
							/>
						</FlexBetween>
					</Box>
				</Drawer>
			)}
		</Box>
	);
};

const ProductListItem = ({
	sxButton,
	sxIcon,
	onActive,
	onAddProductNavigate,
	onListNavigate,
	onCategoriesNavigate,
}) => {
	const [open, setOpen] = useState(true);

	return (
		<>
			<ListItemButton
				onClick={() => {
					setOpen(!open);
					onActive();
				}}
				sx={sxButton}
			>
				<ListItemIcon sx={sxIcon}>
					<ShoppingCartOutlined />
				</ListItemIcon>
				<ListItemText primary="Products" />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>

			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItemButton sx={sxButton} onClick={onListNavigate}>
						<ListItemIcon sx={sxIcon}>
							<TodayOutlined />
						</ListItemIcon>
						<ListItemText primary="Product List" />
					</ListItemButton>

					<ListItemButton sx={sxButton} onClick={onAddProductNavigate}>
						<ListItemIcon sx={sxIcon}>
							<AddCircle />
						</ListItemIcon>
						<ListItemText primary="Add Product" />
					</ListItemButton>

					<ListItemButton sx={sxButton} onClick={onCategoriesNavigate}>
						<ListItemIcon sx={sxIcon}>
							<Category />
						</ListItemIcon>
						<ListItemText primary="Categories" />
					</ListItemButton>
				</List>
			</Collapse>
		</>
	);
};

export default Sidebar;
