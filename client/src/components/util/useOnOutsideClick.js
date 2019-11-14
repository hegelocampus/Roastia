import { useEffect } from 'react';

export default (ref, action) => {
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      action(event);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
};
