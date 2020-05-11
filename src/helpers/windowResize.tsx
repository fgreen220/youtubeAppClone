import { useEffect } from 'react';

const windowResizer = (setWindowWidth: React.Dispatch<React.SetStateAction<number>>) => {

  useEffect(() => {
    const windowWidthHandler = () => {
      setWindowWidth(window.outerWidth);
    }
    window.addEventListener('resize', windowWidthHandler);
    return () => window.removeEventListener('resize', windowWidthHandler);
  }, [window.outerWidth]);
}

export default windowResizer;