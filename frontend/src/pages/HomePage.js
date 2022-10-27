import React, { useEffect } from 'react';
import { Pagination } from 'rsuite';
import { Carousel } from 'rsuite';
import Product from '../components/Product';
import { Message, Loader } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/rsuite
 * @reference https://github.com/basir/amazona/blob/master/frontend/src/screens/HomeScreen.js
 * @reference https://rsuitejs.com/zh/components/pagination/
 * @returns 
 */
export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [activePage, setActivePage] = React.useState(1)
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts({
      pageNumber: activePage
    }));
  }, [dispatch, activePage])
  return (
    <div>

      <Carousel autoplay className="custom-slider">
        <img
          src="https://img.freepik.com/premium-vector/drought-desert-scence_1308-18126.jpg?w=1480"
          height="250"
          alt="RenTool"
        />
        <img
          src="https://rentool-bucket.s3.eu-west-2.amazonaws.com/Hey%2C+August+Babies!+1.png"
          height="250"
          alt="What's RenTool"
        />
        <img
          src="https://rentool-bucket.s3.eu-west-2.amazonaws.com/2_covid.png"
          height="250"
          alt="Explain"
        />
      </Carousel>

      {loading ? (
        <div> <Loader speed="fast" content="Loading" /></div>
      ) : error ? (
        <div ><Message type="error" description={error} /></div>
      ) : (
        <>


          {products.length === 0 && <div>No Product Found</div>}
          <div className="row center">

            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
          <div className="pagination">
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
          </div>
        </>
      )}
    </div>
  );
}
