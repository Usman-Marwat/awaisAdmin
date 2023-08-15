import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "../../Redux/actions/productActions";
import Rating from "@mui/material/Rating";
import { DELETE_PRODUCT_RESET } from "../../Redux/constants/productConstants";
import Actions from "./Actions";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";
import axiosa from "../../api/axiosa";
const ProductTable = () => {
  const [products, setProducts] = useState();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { isDeleted } = useSelector((state) => state.ProductDelete || {});

  const { user } = useSelector((state) => state.user);
  const fetchVendorProducts = async () => {
    try {
      const response = await axiosa.get(
        `/api/v1/vendor/${user.vendor._id}/products`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = response.data;
      setProducts(data.products);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchVendorProducts();
  }, [open]);
  useEffect(() => {
    fetchVendorProducts();
  }, []);
  //   useEffect(() => {
  //     if (error) {
  //       enqueueSnackbar(error, { variant: "error" });
  //       dispatch(clearErrors());
  //     }
  //     if (deleteError) {
  //       enqueueSnackbar(deleteError, { variant: "error" });
  //       dispatch(clearErrors());
  //     }
  //     if (isDeleted) {
  //       enqueueSnackbar("Product Deleted Successfully", { variant: "success" });
  //       dispatch({ type: DELETE_PRODUCT_RESET });
  //     }
  //     dispatch(getAdminProducts());
  //   }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    setOpen(false);
    navigate("/vendor/new_product");
  };

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full">
              <img
                draggable="false"
                src={params.row.image}
                alt={params.row.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 70,
      flex: 0.1,
      renderCell: (params) => {
        return (
          <>
            {params.row.stock < 10 ? (
              <span className="font-medium text-red-700 rounded-full bg-red-200 p-1 w-6 h-6 flex items-center justify-center">
                {params.row.stock}
              </span>
            ) : (
              <span className="">{params.row.stock}</span>
            )}
          </>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      headerAlign: "left",
      align: "left",
      flex: 0.2,
      renderCell: (params) => {
        return <span>₹{params.row.price.toLocaleString()}</span>;
      },
    },
    {
      field: "cprice",
      headerName: "Cutted Price",
      type: "number",
      minWidth: 100,
      headerAlign: "left",
      align: "left",
      flex: 0.2,
      renderCell: (params) => {
        return <span>₹{params.row.cprice.toLocaleString()}</span>;
      },
    },
    {
      field: "approved",
      headerName: "Status",
      type: "boolean",
      minWidth: 100,
      headerAlign: "left",
      align: "left",
      flex: 0.2,
      renderCell: (params) => {
        return <span>{params.row.approved ? "Approved" : "Not Approved"}</span>;
      },
    },
    // {
    //   field: "rating",
    //   headerName: "Rating",
    //   type: "number",
    //   minWidth: 100,
    //   flex: 0.1,
    //   align: "left",
    //   headerAlign: "left",
    //   renderCell: (params) => {
    //     return (
    //       <Rating
    //         readOnly
    //         value={params.row.rating}
    //         size="small"
    //         precision={0.5}
    //       />
    //     );
    //   },
    // },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions
            editRoute={"product"}
            deleteHandler={deleteProductHandler}
            id={params.row.id}
            open={open}
            setOpen={setOpen}
          />
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.unshift({
        id: item._id,
        name: item.name,
        image: item.image.url,
        category: item.category,
        stock: item.stock,
        price: item.price,
        cprice: item.cuttedPrice,
        approved: item.approved,
      });
    });

  return (
    <>
      <MetaData title="Admin Products | Flipkart" />

      {/* {loading && <BackdropLoader />} */}

      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium uppercase">products</h1>
        <Link
          to="/vendor/new_product"
          className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg"
        >
          New Product
        </Link>
      </div>
      <div
        className="bg-white rounded-xl shadow-lg w-full"
        style={{ height: 470 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectIconOnClick
          sx={{
            boxShadow: 0,
            border: 0,
          }}
        />
      </div>
    </>
  );
};

export default ProductTable;
