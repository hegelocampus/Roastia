import { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useOnOutsideClick from '../../util/useOnOutsideClick';
import usePreventScrollWhenOpen from '../../util/usePreventScrollWhenOpen';

export default () => {
  const history = useHistory();
  const location = useLocation();
  const modalContent = useRef(null);
  const formType = location.pathname.match(/([^/]+)\/?$/)[0];

  usePreventScrollWhenOpen();

  useOnOutsideClick(modalContent, e => {
    e.stopPropagation();
    history.goBack();
  });

  return { location, modalContent, formType };
}

