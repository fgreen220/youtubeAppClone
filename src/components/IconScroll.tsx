import React, { useState, useEffect } from 'react';
import windowResizer from '../helpers/windowResize'
import {
  Avatar,
  IconButton
} from '@material-ui/core';
import {
  MusicNote,
  SportsEsports,
  Pets,
  DriveEta,
  Sports,
  Theaters,
  Videocam,
  Computer,
  EventSeat,
  EmojiEmotions,
  Hd,
  Language,
  ChildCare,
  SportsKabaddi,
  PlayCircleFilled,
  Style,
  Speed,
  Android,
  ColorLens,
  MenuBook,
  MoodBad
} from '@material-ui/icons';

let iconInitArray = [
  Theaters,
  DriveEta,
  MusicNote,
  Pets,
  Sports,
  SportsEsports,
  EmojiEmotions,
  EventSeat,
  Style,
  Computer
];

const IconScroll = (props:any) => {
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  const [categoryList, setCategoryList] = useState(props.categoryListObject);
  const [categoryArray, setCategoryArray]:any = useState();
  const [iconArray, setIconArray]:any = useState(iconInitArray);
  windowResizer(setWindowWidth);
  useEffect(() => {
    const categoryHandler = () => {
      let catArray = [];
      for(let key in categoryList) {
        catArray.push(categoryList[key]);
      }
      return catArray;
    }
    setCategoryArray(categoryHandler());
  }, [])
  return(
    props.page === 'trending' && windowWidth < 700 ?
    <div id='icon-scroll'>
      {categoryArray?.map((item:string, index:number) => {
        let CurrentIcon = iconArray[index];
    return <div key={`small-${index}`} className='small-icon-scroll' style={{display:'inline-grid', gridTemplateColumns:'1fr'}}><IconButton id={Object.keys(props.categoryListObject)[index]} onClick={(e:any) => !props.loading?props.trendingCategoryHandler(e):null}><CurrentIcon className='icon-small icon-small-toggle'></CurrentIcon></IconButton><p>{item}</p></div> 
    })}
    </div>
    :
    props.page === 'trending' && windowWidth >=700 ?
    <div id='icon-scroll'>
      {categoryArray?.map((item:string, index:number) => {
        let CurrentIcon = iconArray[index];
      return <div key={`large-${index}`} className='large-icon-scroll' style={{display:'inline-grid', gridTemplateColumns:'1fr'}}><IconButton id={Object.keys(props.categoryListObject)[index]} onClick={(e:any) => !props.loading?props.trendingCategoryHandler(e):null}><CurrentIcon className='icon-large icon-large-toggle'></CurrentIcon></IconButton><p>{item}</p></div>
      })}
    </div>
    : props.page === 'subscriptions' && windowWidth < 700 ?
    <div id='icon-scroll'>
      {[...new Array(30)].map((item, index) => <div key={`small-${index}`} style={{display:'inline-grid', gridTemplateColumns:'1fr'}}><IconButton><Avatar className='icon-small'></Avatar></IconButton><p>Icon Label</p></div>)}
    </div>
    :
    <div id='icon-scroll'>
      {[...new Array(30)].map((item, index) => <div key={`small-${index}`} style={{display:'inline-grid', gridTemplateColumns:'1fr'}}><IconButton><Avatar className='icon-small'></Avatar></IconButton><p>Icon Label</p></div>)}
    </div>
    // :
    // props.page === 'subscriptions' && windowWidth < 550?
    // <div id='icon-scroll-small'>
    //   {[...new Array(30)].map((item, index) => <div style={{display:'inline-grid', gridTemplateColumns:'1fr'}}><div className='account-circle-icon' key={`subscriptions-small-${index}`}></div></div>)}
    // </div>
    // :
    // props.page === 'subscriptions' && windowWidth >= 550?
    // <div id='icon-scroll-large'>
    //   {[...new Array(30)].map((item, index) => <div style={{display:'inline-grid', gridTemplateColumns:'1fr'}}><div className='account-circle-icon' key={`subscriptions-large-${index}`}></div></div>)}
    // </div>
    // :
    // <div id='icon-scroll-large'>
    //   {[...new Array(30)].map((item, index) => <div style={{display:'inline-grid', gridTemplateColumns:'1fr'}}><IconButton><Avatar className='account-circle-icon' key={`trending-large-${index}`}></Avatar></IconButton><p>Icon Label</p></div>)}
    // </div>
  );
}

export default IconScroll;