import React, { useEffect } from 'react'
import './ProductDetailMain.scss'
import ProductDetail from './ProductDetail'
import Header from '../Header'
import { useDispatch } from 'react-redux'
import { getSingleProduct } from '../../Redux/actions/productActions'
import { useParams } from 'react-router-dom'
const ProductDetailMain = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    dispatch(getSingleProduct(id));
  }, [id]);
  return (
    <div >
      <div>
        <Header />
      </div>
      <div className='product-detail-main'>
        <div>
          <ProductDetail />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailMain