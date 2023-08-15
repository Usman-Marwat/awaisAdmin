import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./Home.scss";
import Megamenu from "./Megamenu";
import BannerSlider from "../Reuseable/BannerSlider";
import TopProduct from "./TopProducts";
import FlashSale from "./FlashSale";
import LapTop from "./LapTop";
import Footer from "../Reuseable/Footer";
import { listCategories } from '../../Redux/actions/categoryActions';
import { getProducts } from '../../Redux/actions/productActions';
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories())
    dispatch(getProducts())
  }, [])
  return (
    <div className="home-background">
      <div>
        <div className="home-parent">
          <div className="banner-section">
            <div>
              <Megamenu />
            </div>
            <div>
              <BannerSlider />
            </div>
          </div>
          <div>
            <TopProduct />
          </div>
          <div>
            <FlashSale />
          </div>
          <div>
            <LapTop />
          </div>

        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
