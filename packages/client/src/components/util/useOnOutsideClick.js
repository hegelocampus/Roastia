import { useEffect } from 'react';

export default (ref, action) => useEffect(() => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      action(event);
    }
  }

  document.addEventListener("click", handleClickOutside);
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
},
  [ref, action]
);

