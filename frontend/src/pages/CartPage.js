import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addCart, removeFromCart } from '../actions/cartActions';
import Paypal from '../components/Paypal';
import Mailgun from 'mailgun-js';
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/mailgun-js
 * @reference https://github.com/basir/amazona/blob/master/frontend/src/screens/CartScreen.js
 * @param {*} props 
 * @returns 
 */

export default function CartPage(props) {
  const history = useHistory()
  const productId = props.match.params.id;
  const params = new URLSearchParams(props.location.search)
  const qty = Number(params.get('qty'))
  const deposit = Number(params.get('deposit'))
  const startDate = Number(params.get('startDate'))
  const endDate = Number(params.get('endDate'))
  const rangeDate = ((endDate - startDate) / (1000 * 60 * 60 * 24));
  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector(state => state.userSignin.userInfo) //加入userInfo
  const { cartItems } = cart; //mailgun use
  const api_key = 'c29dc6ac20a81ed05062172a4c20417d-9ad3eb61-f2cdb65a'
  const DOMAIN = 'sandbox49f5163eebb1456e9c1defd77bd2a097.mailgun.org';
  const mg = Mailgun({ apiKey: api_key, domain: DOMAIN });
  const data = {
    from: 'Rentool <wendy7748@gmail.com>',
    to: `${userInfo?.email}`,
    subject: 'New Lease from RenTool',
    html: `Dear ${userInfo?.name},
  <p>Thank you for renting things with us.
  <br/>Here is your receipt:</p>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Qty</strong></td>
  <td><strong >Price</strong></td>
  <td><strong >Rent from</strong></td>
  <td><strong >Return date</strong></td>


  </thead>
  <tbody>
    ${cart.cartItems
        .map(
          (cartItems) => `
      <tr>
      <td>${cartItems.name}</td>
      <td>${cartItems.qty}</td>
      <td>${cartItems.price}/day</td>
      <td>${new Date(cartItems.startDate).toLocaleDateString('en-GB')}</td>
      <td>${new Date(cartItems.endDate).toLocaleDateString('en-GB')}</td>
    
    `
        )}
        </tr>
    </tbody>
    </table>
   <p><strong> Your total rent is: £${cartItems.reduce((a, c) => a + c.price * c.qty * c.rangeDate + c.deposit, 0)}</strong>
   <br/>Please remember to return our products on the return date, 
    <br/>and we will refund you your deposit.
    <br/>Thank you for your cooperation. Enjoy! </p>

    Best regards,
    <br/>RenTool`
  };


  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addCart(productId, qty, startDate, endDate, rangeDate, deposit));
    }
  }, [dispatch, productId, qty, rangeDate, endDate, startDate, deposit]);

  const removeBtn = (id) => {

    dispatch(removeFromCart(id));
  };

  const transactionSuccess = () => {
    localStorage.setItem("cartItems", []);
    dispatch({
      type: "RESET_ITEM"
    });


    window.alert(`Dear ${userInfo.name}, your payment is successful!`);

    mg.messages().send(data, function (error, body) {

      console.log(body);
      console.log(error);

    })
    history.push("/");

    ;

  }
  const transactionError = () => { console.log('Paypal error'); }
  const transactionCancelled = () => { console.log('Paypal cancelled'); }


  cart.itemsPrice = (
    cart.cartItems.reduce((a, c) => a + c.qty * c.price * c.rangeDate + c.deposit, 0)
  );

  return (
    <div className="row top">
      <div className="col-2">
        <h2>Your Leasing Cart</h2>
        {cartItems.length === 0 ? (
          <div >
            The cart is empty. <Link to="/">Go renting something</Link>
          </div>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>Qty: {item.qty}</div>

                  <div>Rent: £{item.price}/day</div>
                  <div>Deposit: £{item.deposit}</div>

                  <div>From: {new Date(item.startDate).toLocaleDateString('en-GB')}</div>
                  <div>To: {new Date(item.endDate).toLocaleDateString('en-GB')}</div>
                  <div>Days: {(item.endDate - item.startDate) / (1000 * 60 * 60 * 24)}</div>


                  <div>
                    <button
                      type="button"
                      onClick={() => removeBtn(item.product)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card-1">
        <ul>
          <li>
            <h3>
              <p> Products Chosen for {cartItems.reduce((a, c) => a + c.qty, 0)} </p>
              <p> Total Rent: £
                {cartItems.reduce((a, c) => a + c.price * c.qty * c.rangeDate + c.deposit, 0)}</p>
            </h3>
          </li>
          <li>

            <div>

              {/*Paypal Button*/}
              {userInfo == null ?
                (
                  <button
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                    onClick={() => {
                      history.push("/signin")
                    }}
                    type='button'
                    value='Click me Signin to pay'
                  >Click me Sign-in here to pay
                  </button>

                ) : (
                  <Paypal
                    toPay={cart.itemsPrice.toFixed(2)}
                    onSuccess={transactionSuccess}
                    transactionError={transactionError}
                    transactionCancelled={transactionCancelled}
                  />
                )
              }
            </div>
          </li>
        </ul>
      </div>

    </div>


  );




}
