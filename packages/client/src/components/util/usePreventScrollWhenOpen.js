import { useLayoutEffect } from 'react';

export default props => useLayoutEffect(() => {
  document.body.style.position = 'fixed';
  document.body.style.top = `-${window.scrollY}px`;
  return () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
});

