import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  registerUser,
  registerVendor,
} from "../../Redux/actions/userActions";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import FormSidebar from "./FormSidebar";

const VendorRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user._id);
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.vendor
  );
  const [vendor, setVendor] = useState({
    name: "",
    email: "",
    companyName: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
    password: "",
    cpassword: "",
    // I've added the gender field here
    gender: "",
  });

  const { name, email, companyName, address } = vendor;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("preview.png");

  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("companyName", companyName);
    formData.set("address", JSON.stringify(address));

    formData.set("user", user);

    dispatch(registerVendor(formData));
  };

  const handleDataChange = (e) => {
    if (e.target.name.startsWith("address.")) {
      const field = e.target.name.split(".")[1];
      setVendor({
        ...vendor,
        address: { ...address, [field]: e.target.value },
      });
    } else {
      setVendor({ ...vendor, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser(user));
      navigate("/vendor/dashboard");
    }
  }, [isAuthenticated]);
  return (
    <>
      <MetaData title="Register | Flipkart" />

      {/* {loading && <BackdropLoader />} */}
      <main className="w-full mt-12 sm:pt-20 sm:mt-0">
        <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
          <FormSidebar
            title="Become a Seller!"
            tag="Sign up with your mobile number to get started"
          />

          <div className="flex-1 overflow-hidden">
            <form
              onSubmit={handleRegister}
              encType="multipart/form-data"
              className="p-5 sm:p-10"
            >
              {/* .... your previous code here ... */}

              {/* <!-- input container column --> */}
              <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                  <TextField
                    fullWidth
                    id="full-name"
                    label="Full Name"
                    name="name"
                    value={name}
                    onChange={handleDataChange}
                    required
                  />
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleDataChange}
                    required
                  />
                </div>
                <TextField
                  fullWidth
                  id="companyName"
                  label="Company Name"
                  name="companyName"
                  value={companyName}
                  onChange={handleDataChange}
                  required
                />
              </div>
              {/* <!-- input container column --> */}
              {/* <!-- address input --> */}
              <div className="flex flex-col w-full gap-3">
                <TextField
                  fullWidth
                  id="street"
                  label="Street"
                  name="address.street"
                  value={address.street}
                  onChange={handleDataChange}
                  required
                />
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  name="address.city"
                  value={address.city}
                  onChange={handleDataChange}
                  required
                />
                <TextField
                  fullWidth
                  id="state"
                  label="State"
                  name="address.state"
                  value={address.state}
                  onChange={handleDataChange}
                  required
                />
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  name="address.country"
                  value={address.country}
                  onChange={handleDataChange}
                  required
                />
                <TextField
                  fullWidth
                  id="zip"
                  label="Zip Code"
                  name="address.zip"
                  value={address.zip}
                  onChange={handleDataChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
              >
                Submit
              </button>
              {/* <Link
                to="/login"
                className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
              >
                Existing User? Log in
              </Link> */}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default VendorRegister;
