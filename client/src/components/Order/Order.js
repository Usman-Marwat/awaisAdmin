import React from 'react'
import Header from '../Header'
import './Order.scss'
const Order = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <div>
          <form className="row g-3" >
            <div className="col-md-4">
              <label htmlFor="validationDefault01" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="validationDefault01"
                defaultValue=""
                required=""
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationDefault02" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="validationDefault02"
                defaultValue=""
                required=""
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationDefault02" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="validationDefault03"
                defaultValue=""
                required=""
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="validationDefault03" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="validationDefault04"
                required=""
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="validationDefault04" className="form-label">
                State
              </label>
              <select className="form-select" id="validationDefault05" required="">
                <option selected="" disabled="" value="">
                  Choose...
                </option>
                <option>...</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="validationDefault06" className="form-label">
                Zip
              </label>
              <input
                type="text"
                className="form-control"
                id="validationDefault06"
                required=""
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="invalidCheck2"
                  required=""
                />
                <label className="form-check-label" htmlFor="invalidCheck2">
                  Agree to terms and conditions
                </label>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>


        <div>
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
              
                <button>Check Out</button>
           
            </div>

          </div>
        </div>
      </div>


    </div>

  )
}

export default Order