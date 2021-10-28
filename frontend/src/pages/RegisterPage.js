import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import { Message } from 'rsuite';
import { Alert } from 'rsuite';
/**
 * @author Ting-chun Pan
 * @refernce https://www.npmjs.com/package/rsuite
 * @reference https://tachyons.io/components/forms/sign-in/index.html
 * @refernce https://github.com/basir/amazona/blob/master/frontend/src/screens/RegisterScreen.js
 * @param {*} props 
 * @returns 
 */
export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [postCode, setPostCode] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(name, email, password, postCode));
    } else {
      Alert.error('Password and confirm password do not match.')
    }

  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);




  return (
    <div>
      {loading && <div> <Message type="warning" description=" It seems you've already registered with the existing email." />
      </div>}
      {error && <div><Message type="warning" description={error} /></div>}

      <div>
        <main className="pa4 black-80">
          <form className="measure center" onSubmit={submitHandler}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>




              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" required
                  onChange={(event) => setName(event.target.value)}></input>

              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="email">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email" id="email"
                  onChange={(event) => setEmail(event.target.value)}></input>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f4" htmlFor="postCode">Postcode</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="postCode" name="postCode" id="postCode"
                  onChange={(event) => setPostCode(event.target.value)}></input>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"
                  onChange={(event) => setPassword(event.target.value)}></input>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f4" htmlFor="password">Confirm Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"
                  onChange={(event) => setConfirmPassword(event.target.value)}></input>
              </div>
            </fieldset>
            <div>
              <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Register">Register</button>
            </div>
            <div>
              <label />
              <div>
                I have an account.{' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );

}

