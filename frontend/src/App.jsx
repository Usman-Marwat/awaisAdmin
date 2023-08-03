import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { themeSettings } from './theme';
import Layout from './scenes/layout';
import Dashboard from './scenes/dashboard';
import Products from './scenes/products';
import Customers from './scenes/customers';
import Transactions from './scenes/transactions';
import Geography from './scenes/geography';
import Overview from './scenes/overview';
import Daily from './scenes/daily';
import Monthly from './scenes/monthly';
import Breakdown from './scenes/breakdown';
import Admin from './scenes/admin';
import Performance from './scenes/performance';
import AddProduct from './scenes/addProduct';
import Categories from './scenes/categories';
import Reports from './scenes/reports';

function App() {
	const mode = useSelector((state) => state.global.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return (
		<div className="app">
			{/* <h1>Vite + React</h1> */}
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route element={<Layout />}>
							<Route path="/" element={<Navigate to="/dashboard" replace />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/products" element={<Products />} />
							<Route path="/customers" element={<Customers />} />
							<Route path="/transactions" element={<Transactions />} />
							<Route path="/reports" element={<Reports />} />
							<Route path="/geography" element={<Geography />} />
							<Route path="/overview" element={<Overview />} />
							<Route path="/daily" element={<Daily />} />
							<Route path="/monthly" element={<Monthly />} />
							<Route path="/breakdown" element={<Breakdown />} />
							<Route path="/sellers" element={<Admin />} />
							<Route path="/performance" element={<Performance />} />
							<Route path="/addproduct" element={<AddProduct />} />
							<Route path="/categories" element={<Categories />} />
							<Route
								path="/success"
								element={
									<Box
										display="flex"
										flexDirection="column"
										justifyContent="center"
										alignItems="center"
										border={1}
										borderRadius={5}
									>
										<Typography fontSize={43}>Success </Typography>
										<Typography fontSize={22}>
											Congradulation! Your payment was successfully made, and
											your payment-card-secret was directly send to stripe.
										</Typography>
										<Typography fontSize={22}>
											Only the settlement history was saved to the backend
											database as shown below as well.
										</Typography>
									</Box>
								}
							/>
							<Route
								path="/cancel"
								element={
									<Box
										display="flex"
										flexDirection="column"
										justifyContent="center"
										alignItems="center"
										border={1}
										borderRadius={5}
									>
										<Typography fontSize={43}>Cancel </Typography>
										<Typography fontSize={22}>
											Sorry! Your payment was unsucssesfull
										</Typography>
									</Box>
								}
							/>
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
