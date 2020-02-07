import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthLink from '../../util/AuthLink';
import { AddIcon } from '../../util/icons';
import useOnOutsideClick from '../../util/useOnOutsideClick';

export default props => {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => setOpen(false),
    [location]
  );

  const modalContent = useRef(null);
  useOnOutsideClick(modalContent, e => {
    e.stopPropagation();
    setOpen(false)
  });

  return (
    <div className="dropdown" ref={modalContent}>
      <button onClick={() => setOpen(!isOpen)}>
        <AddIcon className="add-icon" />
        <p>Add</p>
      </button>
      {isOpen && <div>
        <AuthLink
          content='Add Shop'
          to={{
            pathname: '/new/shop',
            state: {
              background: location
            }
          }}
        />
        <AuthLink
          content='Add Coffee'
          to={{
            pathname: '/new/coffee',
            state: {
              background: location
            }
          }}
        />
      </div>}
    </div>
  )
}

