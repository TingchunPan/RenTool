import React, { useState } from 'react';
/**
 * @author Tingchun Pan
 * @reference https://github.com/basir/amazona/blob/master/frontend/src/components/SearchBox.js
 * @param {*} props 
 * @returns 
 */
export default function SearchBar(props) {
  const [searchField, setsearchField] = useState('');
  const clickButton = (event) => {
    event.preventDefault();
    props.history.push(`/search/name/${searchField}`);
  };
  return (
    <form onSubmit={clickButton}>
      <div className="row">
        <input
          id="?"
          name="?"
          type="text"
          placeholder="Search Products"

          onChange={(event) => setsearchField(event.target.value)}
        ></input>


      </div>
    </form>
  );
}


