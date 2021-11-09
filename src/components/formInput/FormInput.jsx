import React, { useState } from 'react';

import './FormInput.css';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  const [isFocus, setFocus] = useState(false);

  return (
    <div className='group'>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className='form-input'
        onChange={handleChange}
        {...otherProps}
      />
      {label ? (
        <label
          className={`${
            isFocus || otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
