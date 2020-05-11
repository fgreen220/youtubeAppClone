import { useEffect } from 'react';


const selectedButtonHandler = (nodeListString:string, selectedClass:string) => {
  useEffect(() => {
    const selectedButtonClassRemover = () => {
      document.querySelectorAll(nodeListString)
      .forEach(item => {
        if(item.className.includes(selectedClass)){
          item.classList.remove(selectedClass);
        }
      });
    }
    document.querySelectorAll(nodeListString)
    .forEach(item => {
      if(item.textContent === 'Home') {
        selectedButtonClassRemover(),
        item.classList.add(selectedClass)
      } else {
          location.pathname.includes(`${item.textContent}`.toLowerCase()) ? (
            selectedButtonClassRemover(),
            item.classList.add(selectedClass)
          )
          : null
      }
    });
    return () => {
      document.querySelector(selectedClass)?.classList.remove();
    }
  }, [location.pathname]);
}


export default selectedButtonHandler;