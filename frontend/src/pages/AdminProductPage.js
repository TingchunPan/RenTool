import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Message, Loader } from 'rsuite';

import {

  RESET_PROD_DELE,
} from '../constants/productConstants';


import {
  productDeleted,
  listProducts,
} from '../actions/productActions';
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/rsuite
 * @reference https://github.com/basir/amazona/blob/master/frontend/src/screens/ProductListScreen.js
 * @param {*} props 
 * @returns 
 */
export default function AdminProductPage(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error, pages } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: RESET_PROD_DELE });
    }

    dispatch(listProducts({}));
  }, [dispatch, props.history, successDelete]);

  const deleteBtn = (product) => {
    if (window.confirm('Do you want to delete?')) {
      dispatch(productDeleted(product._id));
    }
  };
  const [activePage, setActivePage] = React.useState(1)
  useEffect(() => {
    dispatch(listProducts({
      pageNumber: activePage
    }));
  }, [dispatch, activePage])
  return (
    <div className="adminPage">
      <div className='top'>
        <h1>Product List</h1>

        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Register">
          <a href="/upload">Upload</a></button>
      </div>
      {loading ? (
        <div> <Loader speed="fast" content="Fast" /></div>
      ) : error ? (
        <div> <Message type="error" description={error} />
        </div>
      ) : (
        <div  >
          <br />
          <br />
          <br />
          <br />


          <Pagination
            prev
            last
            next
            first
            size="lg"
            pages={pages}
            activePage={activePage}
            onSelect={page => setActivePage(page)}
          />
          <table className="table">

            <thead>
              <tr>
                <th className="col-1">ID</th>
                <th className="col-2">Name</th>
                <th className="col-2">Price</th>
                <th className="col-1">Surface</th>
                <th className="col-1">Brand</th>
                <th className="col-1">Change</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="col-1">{product._id}</td>
                  <td className="col-2">{product.name}</td>
                  <td className="col-2">{product.price}</td>
                  <td className="col-1">{product.surface}</td>
                  <td className="col-1">{product.brand}</td>
                  <td className="col-1">

                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteBtn(product)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )
      }
    </div>
  );
}