import React from 'react'

const CartSummary = () => {
  return (
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
  )
}

export default CartSummary