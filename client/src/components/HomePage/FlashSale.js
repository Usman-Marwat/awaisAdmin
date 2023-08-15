import React, { useRef, useState } from "react";
import Clock from "../Reuseable/Countdown/Clock";
import { MdExpandLess } from "react-icons/md";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import { IoIosFlash } from "react-icons/io";
import "./Scss/FlashSale.scss";
import { FlashSlae } from "../../Data";
import { useSelector } from "react-redux";
const FlashSale = ({ data }) => {
    const { products } = useSelector(state => state.Products)
    // const products = [
    //     {
    //         brand: {
    //             logo: {
    //                 public_id: "1",
    //                 url: "http://localhost:3000/static/media/home.eb7132924aab6919441b.png"
    //             },
    //             name: "Flipa"
    //         },
    //         _id: "6460333a7a3603ab9b8e94da",
    //         name: "Office Study Tables",
    //         description: "Find the perfect study table for your home office or workspace. Made with high-quality materials and stylish designs, these study tables offer a comfortable and efficient work environment.",
    //         highlights: [
    //             "Made with high-quality materials",
    //             "Stylish designs",
    //             "Comfortable and efficient work environment",
    //             "Ideal for home office or workspace"
    //         ],
    //         specifications: [
    //             {
    //                 title: "title 1",
    //                 description: "this is the description",
    //                 _id: "6460333a7a3603ab9b8e94db"
    //             }
    //         ],
    //         price: 290,
    //         cuttedPrice: 400,
    //         images: [
    //             {
    //                 public_id: "1",
    //                 url: "https://rukminim1.flixcart.com/image/150/150/jqgy3rk0/computer-table/j/2/v/particle-board-dkl-comp-tb-09-delite-kom-brown-original-imafcheqbgers37z.jpeg",
    //                 _id: "6460333a7a3603ab9b8e94dc"
    //             }
    //         ],
    //         category: "Electronics",
    //         stock: 1,
    //         warranty: 1,
    //         ratings: 4.75,
    //         numOfReviews: 2,
    //         user: "646032a018539556759371a3",
    //         reviews: [
    //             {
    //                 user: "646032a018539556759371a3",
    //                 name: "Nigtmare Burger",
    //                 rating: 5,
    //                 comment: "nice",
    //                 _id: "646033567a3603ab9b8e9503"
    //             },
    //             {
    //                 user: "646045e8bb526f4df89aaff1",
    //                 name: "Muhammad Ali",
    //                 rating: 4.5,
    //                 comment: "nice",
    //                 _id: "64604611bb526f4df89ab025"
    //             }
    //         ],
    //         createdAt: "2023-05-14T01:02:50.549Z",
    //         __v: 2
    //     },
    //     {
    //         brand: {
    //             logo: {
    //                 public_id: "1",
    //                 url: "http://localhost:3000/static/media/home.eb7132924aab6919441b.png"
    //             },
    //             name: "Flipa"
    //         },
    //         _id: "646033f87a3603ab9b8e9523",
    //         name: "Mobiles & Accessories",
    //         description: "Stay connected and up-to-date with the latest mobile phones and accessories. With a wide range of options to choose from, you'll find everything you need to stay connected on-the-go.",
    //         highlights: [
    //             "Made with high-quality materials",
    //             "Stylish designs",
    //             "Comfortable and efficient work environment",
    //             "Ideal for home office or workspace"
    //         ],
    //         specifications: [
    //             {
    //                 title: "title 1",
    //                 description: "this is the description",
    //                 _id: "646033f87a3603ab9b8e9524"
    //             }
    //         ],
    //         price: 595,
    //         cuttedPrice: 700,
    //         images: [
    //             {
    //                 public_id: "1",
    //                 url: "https://rukminim1.flixcart.com/image/150/150/ksoz53k0/data-cable/micro-usb-cable/o/w/a/d4-lava-original-imag67jpby4fehga.jpeg",
    //                 _id: "646033f87a3603ab9b8e9525"
    //             }
    //         ],
    //         category: "Electronics",
    //         stock: 1,
    //         warranty: 1,
    //         ratings: 4,
    //         numOfReviews: 1,
    //         user: "646032a018539556759371a3",
    //         reviews: [
    //             {
    //                 user: "646032a018539556759371a3",
    //                 name: "Nigtmare Burger",
    //                 rating: 4,
    //                 comment: "nice",
    //                 _id: "646037df7a3603ab9b8e9b0f"
    //             }
    //         ],
    //         createdAt: "2023-05-14T01:06:00.654Z",
    //         __v: 1
    //     },
    //     {
    //         brand: {
    //             logo: {
    //                 public_id: "1",
    //                 url: "http://localhost:3000/static/media/home.eb7132924aab6919441b.png"
    //             },
    //             name: "Flipa"
    //         },
    //         _id: "6460346c7a3603ab9b8e9541",
    //         name: "Calculators",
    //         description: "Solve complex equations and calculations with ease using our collection of calculators. From basic to advanced functions, these calculators are perfect for students, professionals, and anyone who needs to perform calculations quickly and accurately.",
    //         highlights: [
    //             "Made with high-quality materials",
    //             "Stylish designs",
    //             "Comfortable and efficient work environment",
    //             "Ideal for home office or workspace"
    //         ],
    //         specifications: [
    //             {
    //                 title: "title 1",
    //                 description: "this is the description",
    //                 _id: "6460346c7a3603ab9b8e9542"
    //             }
    //         ],
    //         price: 200,
    //         cuttedPrice: 250,
    //         images: [
    //             {
    //                 public_id: "1",
    //                 url: "https://rukminim1.flixcart.com/image/150/150/kffq2kw0/calculator/p/m/a/orpat-gt-ot-512-gt-calaculatot-original-imafvwdmnzpzufbb.jpeg",
    //                 _id: "6460346c7a3603ab9b8e9543"
    //             }
    //         ],
    //         category: "Mobiles",
    //         stock: 1,
    //         warranty: 1,
    //         ratings: 0,
    //         numOfReviews: 0,
    //         user: "646032a018539556759371a3",
    //         reviews: [],
    //         createdAt: "2023-05-14T01:07:56.875Z",
    //         __v: 0
    //     },
    //     {
    //         brand: {
    //             logo: {
    //                 public_id: "1",
    //                 url: "http://localhost:3000/static/media/home.eb7132924aab6919441b.png"
    //             },
    //             name: "Flipa"
    //         },
    //         _id: "6460353e7a3603ab9b8e95c2",
    //         name: "Office Study Chairs",
    //         description: "Stay comfortable and productive with our collection of office study chairs. These chairs are designed to offer maximum comfort and support, allowing you to work for longer periods without experiencing discomfort or fatigue.",
    //         highlights: [
    //             "Maximum comfort and support",
    //             "Designed for long work periods",
    //             "Stay comfortable and productive",
    //             "Reduce discomfort and fatigue"
    //         ],
    //         specifications: [
    //             {
    //                 title: "title 1",
    //                 description: "this is the description",
    //                 _id: "6460353e7a3603ab9b8e95c3"
    //             }
    //         ],
    //         price: 2000,
    //         cuttedPrice: 2500,
    //         images: [
    //             {
    //                 public_id: "1",
    //                 url: "https://rukminim1.flixcart.com/image/150/150/krkyt8w0/office-study-chair/v/l/1/pp-polypropylene-shdelta-1001-savya-home-original-imag5ccydueur3es.jpeg",
    //                 _id: "6460353e7a3603ab9b8e95c4"
    //             }
    //         ],
    //         category: "Home",
    //         stock: 1,
    //         warranty: 1,
    //         ratings: 0,
    //         numOfReviews: 0,
    //         user: "646032a018539556759371a3",
    //         reviews: [],
    //         createdAt: "2023-05-14T01:11:26.094Z",
    //         __v: 0
    //     }
    // ]
    const navigate = useNavigate()
    return (
        <div className="flash-sale-parent">
            <div className="sub-flash-grid">
                <div className="timer-parent">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* <span>
                            <IoIosFlash />
                        </span> */}
                        <span style={{ fontSize: "30px" }}>Products</span>
                    </div>
                    <div>
                        {/* <Clock /> */}
                    </div>
                    <div className="see-all">
                        <button onClick={() => navigate('/products')}>VIEW ALL</button>
                    </div>
                </div>

                <div className="cards-flashsale-parent">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={true}
                        // autoplay={{
                        //     delay: 2500,
                        //     disableOnInteraction: false,
                        // }}

                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                        }}
                        modules={[Pagination, Navigation, Autoplay]}
                        className="mySwiper"
                    >
                        {products?.map((item) => {
                            return (
                                <SwiperSlide>
                                    <Link to={`/detail/${item._id}`} style={{ textDecoration: "none" }}>
                                        <div className="single-product">
                                            <img src={item.image.url} alt="" />
                                            <h5>
                                                {item.description.slice(0, 65)}...
                                            </h5>
                                            <span>
                                                {item.name}
                                            </span>
                                            <br />
                                            <span className="price">{item.price}</span>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
            <div style={{ marginTop: "30px" }}>
                <img
                    src="./images/15.png"
                    alt=""
                    width={"100%"}
                    style={{ boxShadow: "0px 0px 5px 2px #70707024" }}
                />
            </div>
        </div>
    );
};

export default FlashSale;
