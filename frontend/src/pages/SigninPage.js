import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import { Message, Loader } from 'rsuite';
/**
 * @author Ting-chun Pan
 * @reference https://tachyons.io/components/forms/sign-in/index.html
 * @reference https://www.npmjs.com/package/rsuite
 * @refernce https://github.com/basir/amazona/blob/master/frontend/src/screens/SigninScreen.js
 * @param {*} props 
 * @returns 
 */



export default function SigninPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitBtn = (e) => {

    e.preventDefault();
    dispatch(signin(email, password));

  };


  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);




  return (


    <div>
      <main className="pa4 black-80">
        <form className="measure center" onSubmit={submitBtn}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>

            {loading && <div> <Loader speed="fast" content="Loading" /></div>}
            {error && <div className="red"> <Message type="error" description="Oops! your email or password is wrong. Please try again." />
            </div>}



            <div className="mt3">
              <label className="db fw6 lh-copy f4" htmlFor="email">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email" id="email"
                onChange={(event) => setEmail(event.target.value)}></input>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"
                onChange={(event) => setPassword(event.target.value)}></input>
            </div>
          </fieldset>
          <div>
            <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Signin">Signin</button>
          </div>
          <div className="lh-copy mt3">I don't have an account. {' '}

            <Link to={`/register?redirect=${redirect}`}>Register</Link>
          </div>
        </form>
      </main>
    </div>

  );
}

