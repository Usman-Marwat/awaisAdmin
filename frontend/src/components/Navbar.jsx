import React, { useState } from 'react';
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	Language,
	ArrowDropDownOutlined,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {
	AppBar,
	Button,
	Box,
	Typography,
	IconButton,
	InputBase,
	Toolbar,
	Menu,
	MenuItem,
	useTheme,
	useMediaQuery,
} from '@mui/material';

import FlexBetween from './FlexBetween';
import { setMode } from '../state';
import profileImage from '../assets/profile.jpeg';
import { useSearchParams } from 'react-router-dom';
import Text from './Text';

const languages = [
	{ name: 'English', locale: 'en' },
	{ name: 'French', locale: 'fr' },
	{ name: 'Korean', locale: 'ko' },
	{ name: 'Turkish', locale: 'tr' },
	{ name: 'Persian', locale: 'fa' },
	{ name: 'Arabic', locale: 'ar' },
	{ name: 'Chinese', locale: 'zh' },
	{ name: 'German', locale: 'de' },
	{ name: 'Hindi', locale: 'hi' },
	{ name: 'Italian', locale: 'it' },
	{ name: 'Bengali', locale: 'bn' },
	{ name: 'Malay', locale: 'ms' },
	{ name: 'Swedish', locale: 'sv' },
	{ name: 'Urdu', locale: 'ur' },
];

function Navbar({ user, isSidebarOpen, setIsSidebarOpen }) {
	const isMobile = useMediaQuery('(max-width: 490px)');
	const dispatch = useDispatch();
	const theme = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();

	const [anchorEl, setAnchorEl] = useState(null);
	const isOpen = Boolean(anchorEl);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	// const handleClose = () => setAnchorEl(null);
	const handleClose = (locale) => {
		const lcoales = languages.map((lang) => lang.locale);
		if (!lcoales.includes(locale)) return;

		setSearchParams({ lng: locale });
		window.location.reload();
	};

	const navigateToClientApp = () => {
		window.open('https://ase-ecommerce-cleint-portal.vercel.app/');
	};

	return (
		<AppBar
			sx={{
				position: 'static',
				background: 'none',
				boxShadow: 'none',
				width: '100%',
			}}
		>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				{/* LEFT SIDE */}

				<FlexBetween>
					<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
						<MenuIcon />
					</IconButton>
					{!isMobile && (
						<FlexBetween
							backgroundColor={theme.palette.background.alt}
							borderRadius="9px"
							gap="3rem"
							p="0.1rem 1.5rem"
						>
							<InputBase placeholder="Search..." />
							<IconButton>
								<Search />
							</IconButton>
						</FlexBetween>
					)}
				</FlexBetween>

				<FlexBetween gap="1 rem">
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === 'dark' ? (
							<DarkModeOutlined sx={{ fontSize: '25px' }} />
						) : (
							<LightModeOutlined sx={{ fontSize: '25px' }} />
						)}
					</IconButton>

					<FlexBetween>
						<Button
							onClick={handleClick}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								textTransform: 'none',
								// gap: '1rem',
							}}
						>
							{/* <Box
								component="img"
								alt="profile"
								src={profileImage}
								height="32px"
								width="32px"
								borderRadius="50%"
								sx={{ objectFit: 'cover' }}
							/> */}
							<Language
								sx={{ fontSize: '25px', color: theme.palette.secondary[50] }}
							/>
							{/* <Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.85rem"
									sx={{ color: theme.palette.secondary[100] }}
								>
									{user.name}
								</Typography>
								<Typography
									fontSize="0.75rem"
									sx={{ color: theme.palette.secondary[200] }}
								>
									{user.occupation}
								</Typography>
							</Box> */}
							<ArrowDropDownOutlined
								sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
							/>
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={isOpen}
							onClose={handleClose}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						>
							{languages.map((lang) => (
								<MenuItem
									key={lang.locale}
									onClick={() => handleClose(lang.locale)}
								>
									{lang.name}
								</MenuItem>
							))}
						</Menu>
					</FlexBetween>
					<Button onClick={navigateToClientApp} color="primary">
						<Text sx={{ color: theme.palette.secondary[50] }}>
							Client Portal
						</Text>
					</Button>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
