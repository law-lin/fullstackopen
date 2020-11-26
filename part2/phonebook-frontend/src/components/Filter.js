import React from 'react';

function Filter(props) {
  return (
    <>
      <p>filter shown with</p>
      <input type='text' onChange={props.onChange} />
    </>
  );
}

export default Filter;
