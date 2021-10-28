import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { Message, Loader } from 'rsuite';
/**
 * @author Ting-chun Pan
 * @refernce https://www.npmjs.com/package/rsuite
 * @reference https://github.com/basir/amazona/blob/master/frontend/src/screens/ProductScreen.js
 * @param {*} props 
 * @returns 
 */


export default function ProductPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [days, setDays] = useState([]);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;



  let disabledDays;
  switch (product?.surface) {
    case 'Metal':
      disabledDays = 5
      break;
    case 'Glass':
      disabledDays = 5
      break;
    case 'Ceramic':
      disabledDays = 5
      break;
    case 'Paper':
      disabledDays = 5
      break;
    case 'Wood':
      disabledDays = 4
      break;
    case 'Plastic':
      disabledDays = 3
      break;
    case 'Stainless Steel':
      disabledDays = 3
      break;

    default:
      disabledDays = 1;
  }

  const { before } = DateRangePicker;
  const daysAfterToday = new Date(Date.now() + disabledDays * 24 * 60 * 60 * 1000);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}&startDate=${+days[0]}&endDate=${+days[1]}`);
  };




  return (
    <div>
      {loading ? (
        <div>  <Loader speed="fast" content="Loading" /></div>
      ) : error ? (
        <div > <Message type="error" description={error} />
        </div>
      ) : (
        <div>

          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>

            <div className="col-1">
              <ul>
                <li>
                  <h3>{product.name}</h3>
                </li>
                <li><h5>Brand: {product.brand}</h5></li>
                <li><h5>Pirce: £{product.price}</h5></li>
                <li><h5>Deposit: £{product.deposit}</h5></li>
                <li><h5>Surface: {product.surface}</h5> </li>
                <li><h5>Quarantine Period: {disabledDays} day(s)</h5></li>
                <li><h5>Description: {product.description} </h5></li>


              </ul>
              <Message
                closable
                type="info"
                title="What is 'Quarantine Period'?"
                description="According to the different surfaces, 
                this is the period we may  
                block different dates since today for 
                you to get this product, 
                so you would not contact Covid-19 from others. "
              />

            </div>
            <div className="col-2">
              <div className="product-card-card body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">£{product.price}/day</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.inStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="warn">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.inStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qantity</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.inStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="row">   DateRange to rent
                          <div className='datePicker'>

                            <DateRangePicker onChange={(dates) => {
                              setDays(dates)
                            }} disabledDate={before(daysAfterToday)} />
                          </div>
                        </div>
                        <li>

                        </li>
                        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="submit"
                          onClick={addCart} >
                          Add to Cart
                        </button>
                      </li>

                    </>
                  )}
                </ul>
              </div>

            </div>
          </div>

        </div>
      )}


    </div>
  );
}
