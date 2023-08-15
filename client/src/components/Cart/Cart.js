import React, { Fragment } from 'react'
import './Cart.scss'
import Header from '../Header'
import { BsFillTrashFill } from 'react-icons/bs'
import phone from '../../assets/iphone.jpg'
import { MdOutlineMinimize } from 'react-icons/md'
import { GrFormAdd } from 'react-icons/gr'
import Footer from '../Reuseable/Footer'
import { Link } from 'react-router-dom'
const Cart = () => {
    return (
        <Fragment>
            <Header />
            <div className='cart-parent-class'>
                <div className='cart-grid-class'>
                    <div className='cart-title'>
                     <div className='cart-items-title'>
                     <h1>
                            CART ITEMS
                        </h1>
                     </div>
                        <div className='full-img-flex'>
                        <div className='img'>
                           <img src={phone} alt="" />
                            <div>
                                <h1>Freeyond M5,8GB+128GB,6.52", 50MP,4G Smartphone 5000mAh Dual</h1>
                                <p>Price : 0</p>
                                <span className='delete'><BsFillTrashFill className='delete-icon'/></span>
                            </div>
                        </div>
                        <div className='increase'>
                            <span><MdOutlineMinimize /></span>
                            <span>0</span>
                            <span className='add'><GrFormAdd /></span>
                        </div>
                        </div>
                       
                    </div>
                    <div className="summa-detail">
                        <div className='summary-title'>
                            <h1>Summary</h1>
                        </div>
                        <div className='quantity'>
                            <p>Total Quantity</p>
                            <p>0</p>
                        </div>
                        <div className='title'>
                            <p>Total amount</p>
                            <p>600</p>
                        </div>
                       
                       <div className='padding-bootom'>
                       <Link to='/order'>
                       <button>Check Out</button>
                       </Link>
                       </div>
                      
                    </div>
                </div>
            </div>
            <Footer/>
        </Fragment>
    )
}

export default Cart