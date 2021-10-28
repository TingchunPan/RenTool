import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/react-router-dom
 * @reference https://github.com/basir/amazona/blob/master/frontend/src/components/PrivateRoute.js
 * @param {*} param0 
 * @returns 
 */
export default function PrivateRouter({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}

