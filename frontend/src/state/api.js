import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
	}),
	reducerPath: 'adminApi',
	tagTypes: [
		'User',
		'Products',
		'Customers',
		'Transactions',
		'Geography',
		'Sales',
		'Admins',
		'Performance',
		'Dashboard',
		'Categories',
	],
	endpoints: (build) => ({
		getUser: build.query({
			query: (id) => `general/user/${id}`,
			providesTags: ['User'],
		}),
		getProducts: build.query({
			query: () => 'client/products',
			providesTags: ['Products'],
		}),
		getCustomers: build.query({
			query: () => 'client/customers',
			providesTags: ['Customers'],
		}),
		getTransactions: build.query({
			query: ({ page, pageSize, sort, search }) => ({
				url: 'client/transactions',
				method: 'GET',
				params: { page, pageSize, sort, search },
			}),
			providesTags: ['Transactions'],
		}),
		getGeography: build.query({
			query: () => 'client/geography',
			providesTags: ['Geography'],
		}),
		getSales: build.query({
			query: () => 'sales/sales',
			providesTags: ['Sales'],
		}),
		getAdmins: build.query({
			query: () => 'management/admins',
			providesTags: ['Admins'],
		}),
		deleteAdmin: build.mutation({
			query: (id) => ({
				url: `/management/admins/${id}`,
				method: 'Delete',
			}),
			invalidatesTags: ['Admins'],
		}),
		getUserPerformance: build.query({
			query: (id) => `management/performance/${id}`,
			providesTags: ['Performance'],
		}),
		getDashboard: build.query({
			query: () => 'general/dashboard',
			providesTags: ['Dashboard'],
		}),
		addProduct: build.mutation({
			query: (product) => ({
				url: '/product',
				method: 'POST',
				body: product,
			}),
			invalidatesTags: ['Products'],
		}),
		deleteProduct: build.mutation({
			query: (id) => ({
				url: `/product/${id}`,
				method: 'Delete',
			}),
			invalidatesTags: ['Products'],
		}),
		editProduct: build.mutation({
			query: (product) => ({
				url: '/product/edit',
				method: 'POST',
				body: product,
			}),
			invalidatesTags: ['Products'],
		}),
		addCategory: build.mutation({
			query: (product) => ({
				url: '/product/category',
				method: 'POST',
				body: product,
			}),
			invalidatesTags: ['Categories'],
		}),
		getCategory: build.query({
			query: () => 'product/category',
			providesTags: ['Categories'],
		}),
		deleteCategory: build.mutation({
			query: (id) => ({
				url: `/product/category/${id}`,
				method: 'Delete',
			}),
			invalidatesTags: ['Categories'],
		}),
		editCategory: build.mutation({
			query: (product) => ({
				url: '/product/category/edit',
				method: 'POST',
				body: product,
			}),
			invalidatesTags: ['Categories'],
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetProductsQuery,
	useGetCustomersQuery,
	useGetTransactionsQuery,
	useGetGeographyQuery,
	useGetSalesQuery,
	useGetAdminsQuery,
	useGetUserPerformanceQuery,
	useGetDashboardQuery,

	useEditProductMutation,
	useAddProductMutation,
	useDeleteProductMutation,
	useAddCategoryMutation,
	useGetCategoryQuery,
	useDeleteCategoryMutation,
	useEditCategoryMutation,
	useDeleteAdminMutation,
} = api;
