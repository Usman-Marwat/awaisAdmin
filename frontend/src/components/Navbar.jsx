import React, { useEffect, useState } from 'react';
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
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

const languages = [
	'en',
	'fr',
	'ko',
	'tr',
	'fa',
	'ar',
	'zh',
	'de',
	'hi',
	'it',
	'bn',
	'ms',
	'sv',
	'ur',
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
		setSearchParams({ lng: locale });
		window.location.reload();
	};

	// useEffect(() => {
	// 	window.location.reload();
	// }, [searchParams]);

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
					<IconButton>
						<SettingsOutlined sx={{ fontSize: '25px' }} />
					</IconButton>

					<FlexBetween>
						<Button
							onClick={handleClick}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								textTransform: 'none',
								gap: '1rem',
							}}
						>
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="32px"
								width="32px"
								borderRadius="50%"
								sx={{ objectFit: 'cover' }}
							/>
							<Box textAlign="left">
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
							</Box>
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
							{languages.map((locale) => (
								<MenuItem key={locale} onClick={() => handleClose(locale)}>
									{locale.toUpperCase()}
								</MenuItem>
							))}
						</Menu>
					</FlexBetween>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
