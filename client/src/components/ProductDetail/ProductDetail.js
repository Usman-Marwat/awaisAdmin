import React, { useEffect } from "react";
import "./ProductDetail.scss";
import Header from "../Header";
import Box from "@mui/material/Box";
import iphone from "../../assets/iphone.jpg";
import Rating from "@mui/material/Rating";
import { CiDeliveryTruck, CiDiscount1 } from "react-icons/ci";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import Footer from "../Reuseable/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../Redux/actions/productActions";

const ProductDetail = () => {
  const [value, setValue] = React.useState(2);

  const { loading, product } = useSelector((state) => state.ProductDetails);
  const { image, name, description, price, cuttedPrice, stock } =
    product.product || {};


  return (
    <div>
      {!loading ? (
        <div className="calssname-detail-parent">
          <div className="flext-first-classname">
            <div className="detail-img-parent">
              <div className="detail-img">
                <img src={image?.url} alt="" />
              </div>
              <div className="share-product-class">
                <h3>SHARE THIS PRODUCT</h3>
              </div>
              <div className="icons-flex">
                <span>
                  <BsFacebook />
                </span>
                <span>
                  <BsInstagram />
                </span>
              </div>
            </div>
            <div className="detail-text">
              <div>
                <button className="officalstore">Offical Store</button>
              </div>
              <div className="product-title">
                <h1>{name}</h1>
              </div>
              <div>
                <p className="brand">
                  Brand: Fresh Fri | Similar products from Fresh Fri
                </p>
              </div>
              <div>
                <div className="rating">
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                </div>
                <div className="class-free-del">
                  <button className="">Free Delivery</button>
                </div>
                <div className="class-price">
                  <h1>KSh {price}</h1>
                </div>
                <div className="class-stock">
                  <span>In stock({stock})</span>
                  <p>
                    + delivery from KSh 92 (free delivery if order above KSh
                    1,999) to CBD - UON/Globe/Koja/River Road
                  </p>
                </div>
                <div className="cart-button-class">
                  <button>ADD TO CART</button>
                </div>
                <div className="prmotion-class">
                  <h1>PROMOTIONS</h1>
                  <div className="class-deliv">
                    <span>
                      <CiDeliveryTruck className="icon" />
                    </span>
                    <p>
                      Free delivery for orders above Ksh 1999 in selected major
                      cities.
                    </p>
                  </div>
                  <div className="class-deliv">
                    <span>
                      <CiDiscount1 className="icon" />
                    </span>
                    <p>This product is limited to 2 unit per customer</p>
                  </div>
                  <div className="class-deliv">
                    <span>
                      <AiTwotoneSafetyCertificate className="icon" />
                    </span>
                    <p>Easy and safer payments via the JumiaPay App.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION DESCRIPTION START HERE */}

          <div className="description-product">
            <div>
              <h1>Product details</h1>
              <p>{description}</p>
            </div>
            {/* <div>
              <h3>Features</h3>
              <li>
                Has the unique blue non-drip sprout top which ensures no spillage
              </li>
              <li>
                Has a measuring cap which ensures exact measurement of required
                oil.
              </li>
              <li>
                Is fortified with vitamins A & D, good for your vision, immune
                system, skin, bones and heart
              </li>
            </div> */}
          </div>
        </div>
      ) : (
        <p>Loading....</p>
      )}

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
