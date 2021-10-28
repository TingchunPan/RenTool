import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import SigninPage from './pages/SigninPage';
import RegisterPage from './pages/RegisterPage';
import { signout } from './actions/userActions';
import AdminProductPage from './pages/AdminProductPage';
import PrivateRouter from './components/PrivateRouter';
import SearchBar from './SearchBar';
import SearchPage from './pages/SearchPage';
import UploadPage from './pages/UploadPage';
/**
 * @author Ting-chun Pan
 * @reference https://github.com/basir/amazona/blob/master/frontend/src/App.js
 * @returns 
 */




function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const dispatch = useDispatch();
  const signoutBtn = () => {
    dispatch(signout());


  };


  return (
    <BrowserRouter>
      <div className="abc">
        <header className="row">

          <div >
            <Link className="brand" to="/">
              RenTool
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBar history={history}></SearchBar>
              )}
            ></Route>

          </div>



          <div >
            <Link to="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin
                </Link>

                <ul className="dropdown-content">

                  <li>
                    <Link to="/adminProduct">Products</Link>
                  </li>

                </ul>
              </div>

            )}


            {userInfo ? (
              <div className="dropdown">

                <Link to="#signout" onClick={signoutBtn}>
                  Hi {userInfo.name}, Sign Out
                </Link>

              </div>


            ) : (
              <Link to="/signin">Sign In</Link>

            )}



          </div>
        </header>
        <main>
          <Route path="/signin" component={SigninPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/cart/:id?" component={CartPage}></Route>
          <Route path="/product/:id" component={ProductPage} exact></Route>
          <PrivateRouter path="/adminProduct" component={AdminProductPage}></PrivateRouter>
          <Route path="/" component={HomePage} exact></Route>
          <Route path="/search/name/:name?" component={SearchPage} exact></Route>
          <PrivateRouter path="/upload" component={UploadPage}></PrivateRouter>
        </main>
        <footer className="row justfy-center"><div className="row center">Copyright © 2021 Tingchun Pan. All right reserved.</div></footer>
      </div>

    </BrowserRouter>
  );
}

export default App;
