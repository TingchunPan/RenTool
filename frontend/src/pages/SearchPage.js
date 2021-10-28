import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { Message, Loader } from 'rsuite';
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/rsuite
 * @refernce https://github.com/basir/amazona/blob/master/frontend/src/screens/SearchScreen.js
 * @param {*} props 
 * @returns 
 */
export default function SearchPage(props) {
  const { name = 'all', pageNumber = 1 } = useParams();


  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts({ pageNumber, name: name !== 'all' ? name : '' }));
  }, [dispatch, name, pageNumber]);
  return (
    <div>
      <div className="row">
        {loading ? (
          <div>  <Loader speed="fast" content="Loading" /></div>
        ) : error ? (
          <div font-variant="warn">  <Message type="error" description={error} />
          </div>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>

      <div className="col-3">
        {loading ? (
          <div>  <Loader speed="fast" content="Loading" /></div>
        ) : error ? (
          <div font-variant="warn"><Message type="error" description={error} /></div>
        ) : (
          <>
            {products.length === 0 && (
              <div font-variant="warn"><Message type="error" description={error} /></div>
            )}
            <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}

            </div>

          </>
        )}
      </div>

    </div>
  );
}
