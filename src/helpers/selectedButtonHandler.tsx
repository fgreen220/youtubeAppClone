import { useEffect } from 'react';


const selectedButtonHandler = (nodeListString:string, selectedClass:string) => {
  useEffect(() => {
    const homeButtonClassRemover = () => {
      document.querySelectorAll(nodeListString)
      .forEach(item => {
        if(item.className.includes(selectedClass)){
          item.classList.remove(selectedClass);
        }
      });
    }
    document.querySelectorAll(nodeListString)
    .forEach(item => {
      location.pathname.includes(`${item.textContent}`.toLowerCase()) ? (
          homeButtonClassRemover(),
          item.classList.add(selectedClass)
      )
      : null
    });
    return () => {
      document.querySelector(selectedClass)?.classList.remove();
    }
  });
}

export default selectedButtonHandler;