import React from 'react';

function PersonForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input onChange={props.onNameChange} />
      </div>
      <div>
        number: <input onChange={props.onNumberChange} />
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  );
}

export default PersonForm;
