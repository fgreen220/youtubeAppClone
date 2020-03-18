import React, { useState, Fragment, useEffect, useRef } from 'react';
import AppBar from './AppBar';
import BottomNav from './BottomNav';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ModalOverlay from './ModalOverlay';

const App = () => {
  
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [videoId, setVideoId] = useState<string[]>([]);
  const [urlObject, setUrlObject] = useState<string[]>([]);
  const [commentData, setCommentData] = useState<{}[]>([]);
  const [videoStatistics, setVideoStatistics] = useState<{[string:string]:{
    viewCount:string,
    likeCount:string,
    dislikeCount:string,
    favoriteCount:string,
    commentCount:string
  }}>();
  const [videoDescription, setVideoDescription] = useState<string[]>([]);
  const [videoTitle, setVideoTitle] = useState([]);
  const [popperAnchorEl, setPopperAnchorEl] = useState<null | HTMLElement>(null);
  const popperOpen = Boolean(popperAnchorEl);
  const popperId = popperOpen ? 'simple-popper' : undefined;
  const [currentVideoId, setCurrentVideoId] = useState<string>('');
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearchResult, setIsSearchResult] = useState<boolean>(false);
  const [searchResultsArray, setSearchResultsArray] = useState<{[key:string]:any}[]>([{}]);
  const [searchResultIndex, setSearchResultIndex] = useState<number>(-1);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const [loadingResults, setLoadingResults] = useState<boolean>(false);
  

  const passEmbedUrl = async (urlString:string) => {
    await setCurrentVideoUrl(() => urlString);
  }

  const handleClick = (event:React.MouseEvent<HTMLElement>) => {
    setPopperAnchorEl(popperAnchorEl ? null : event.currentTarget);
  }

  const modalLoadingHandler = (booleanVal:boolean) => {
    setLoadingModal(() => booleanVal);
  }

  const loadingResultsHandler = (toggleBetween:boolean) => {
    setLoadingResults(() => toggleBetween);
  }

  useEffect(() => {
    const modalVideoLink = document.querySelectorAll('.modal-link');
    const searchResults = document.querySelectorAll('#searchResultsDrawer');
    const modalClose = document.querySelector('.modal-close');
    const modalBg = document.querySelector('.modal-bg');
    const hideEllipsis = document.querySelectorAll('.video-tiles .video-tiles-3 .video-tile-info-container .ellipsis-menu-placeholder');
    const hideAccountCircle = document.querySelectorAll('.video-tile-account-circle');
    const topAppBar = document.querySelector('.top-app-bar');
    const bottomNavBar = document.querySelector('.bottom-nav-bar');
    const hideIconSmall = document.querySelectorAll('icon-small-toggle');
    const hideIconLarge = document.querySelectorAll('.icon-large-toggle');
    const bgActive = document.querySelector('.bg-active');

    const addBg = (event:any) => {
        console.log(currentVideoId, loadingModal, loadingResults);
        console.log(event);
        if((event.target.tagName === 'P' || event.target.tagName === 'DIV' || event.target.tagName === 'IMG')){
          setLoadingResults(() => false);
          setLoadingModal(() => true);
          console.log(currentVideoId, loadingModal, loadingResults)
          modalBg?.classList.add('bg-active');
          modalBg?disableBodyScroll(modalBg):null;
          topAppBar?.classList.add('hidden-app-bar');
          bottomNavBar?.classList.add('hidden-nav-bar');
          Array(hideIconSmall)[0].forEach(icon => {
            icon.classList.replace('icon-small', 'hidden-icon-small');
          }
          )
          Array(hideIconLarge)[0].forEach(icon => {
            icon.classList.replace('icon-large', 'hidden-icon-large');
          }
          )
          Array(hideEllipsis)[0].forEach(node => {
            node.classList.replace('ellipsis-menu', 'hidden-ellipsis');
          }
          )
          Array(hideAccountCircle)[0].forEach(node => {
            node.classList.add('hidden-account-circle');
          }
          )
        }
    }

    Array(modalVideoLink)[0].forEach(video => {
      video.addEventListener('click', addBg);
    })
    console.log('addBg UseEffect triggered')
    Array(searchResults)[0].forEach(result => {
      result.addEventListener('click', addBg);
    })
    return(() => {
      Array(modalVideoLink)[0].forEach(video => {
        video.removeEventListener('click', addBg);
      })
      Array(searchResults)[0].forEach(result => {
        result.removeEventListener('click', addBg);
      })
    })
  })

  useEffect(() => {
    const modalClose = document.querySelector('#modal-close');
    const modalBg = document.querySelector('.modal-bg');
    const hideEllipsis = document.querySelectorAll('.video-tiles .video-tiles-3 .video-tile-info-container .ellipsis-menu-placeholder');
    const hideAccountCircle = document.querySelectorAll('.video-tile-account-circle');
    const topAppBar = document.querySelector('.top-app-bar');
    const bottomNavBar = document.querySelector('.bottom-nav-bar');
    const hideIconSmall = document.querySelectorAll('icon-small-toggle');
    const hideIconLarge = document.querySelectorAll('.icon-large-toggle');
    const bgActive = document.querySelector('.bg-active');

  
    const removeBg = () => {
      // setLoadingModal(() => false);
      setLoadingModal(() => false);
      modalBg?.classList.remove('bg-active');
      modalBg?enableBodyScroll(modalBg):null;
      topAppBar?.classList.remove('hidden-app-bar');
      bottomNavBar?.classList.remove('hidden-nav-bar');
      Array(hideIconSmall)[0].forEach(icon => {
        icon.classList.replace('hidden-icon-small','icon-small');
      }
      )
      Array(hideIconLarge)[0].forEach(icon => {
        icon.classList.replace('hidden-icon-large','icon-large');
      }
      )
      Array(hideEllipsis)[0].forEach(node => {
        node.classList.replace('hidden-ellipsis','ellipsis-menu');
      }
      )
      Array(hideAccountCircle)[0].forEach(node => {
        node.classList.remove('hidden-account-circle');
      }
      )
    }

    modalClose?.addEventListener('click', removeBg)

    return(() => {
      modalClose?.removeEventListener('click', removeBg);
      modalBg? modalBg.scrollTop = 0:null;
    })
  }, [currentVideoUrl, currentVideoId, loadingModal])

  useEffect(() => {
    if(currentVideoId.length >= 1 && loadingModal) {
      setCommentLoading(() => true);
      fetch('http://localhost:3000/comments', {
        method:'get',
        headers: {
          'Content-Type': 'application/json',
          'videoid': `${currentVideoId}`
        }
      })
      .then(response => response.json())
      .then(data => {
        data = JSON.parse(data);
        console.log(data);
        setCommentData((prevComments:[{}]) => [...data.items.map((comment:{[string:string]:{}}) => {
          return comment.snippet;
        })])
        setTimeout(() => setCommentLoading(() => false), 3000);
      })
    }
  }, [currentVideoId])

  useEffect(() => {
    currentVideoUrl.length >= 1 &&
    videoId[urlObject.indexOf(currentVideoUrl)] && loadingModal?
    fetch('http://localhost:3000/comments', {
      method:'get',
      headers: {
        'Content-Type': 'application/json',
        'videoid': `${videoId[urlObject.indexOf(currentVideoUrl)]}`
      }
    })
    .then(response => response.json())
    .then(data => {
      data = JSON.parse(data);
      console.log(data);
      setCommentData(() => [...data.items.map((comment:{[string:string]:{}}) => {
        return comment.snippet;
      })])
    })
    :null
  }, [currentVideoUrl])


  return (
    <Fragment>
      <AppBar 
        passEmbedUrl={passEmbedUrl}
        setCurrentVideoId={setCurrentVideoId}
        setLoading={setLoading}
        setIsSearchResult={setIsSearchResult}
        isSearchResult={isSearchResult}
        setSearchResultsArray={setSearchResultsArray}
        searchResultsArray={searchResultsArray}
        searchResultIndex={searchResultIndex}
        setSearchResultIndex={setSearchResultIndex}
        modalLoadingHandler={modalLoadingHandler}
        loadingResultsHandler={loadingResultsHandler}
        currentVideoId={currentVideoId}
        loadingModal={loadingModal}
      />
      <BottomNav 
        setVideoId={setVideoId}
        setUrlObject={setUrlObject}
        setCommentData={setCommentData}
        urlObject={urlObject}
        currentVideoUrl={currentVideoUrl}
        commentData={commentData}
        passEmbedUrl={passEmbedUrl}
        setVideoStatistics={setVideoStatistics}
        setVideoDescription={setVideoDescription}
        videoStatistics={videoStatistics}
        setVideoTitle={setVideoTitle}
        videoTitle={videoTitle}
        videoDescription={videoDescription}
        handleClick={handleClick}
        popperId={popperId}
        popperOpen={popperOpen}
        popperAnchorEl={popperAnchorEl}
        setIsSearchResult={setIsSearchResult}
        isSearchResult={isSearchResult}
        setSearchResultsArray={setSearchResultsArray}
        searchResultsArray={searchResultsArray}
        searchResultIndex={searchResultIndex}
        setSearchResultIndex={setSearchResultIndex}
      />

    </Fragment>
  );
}

export default App;