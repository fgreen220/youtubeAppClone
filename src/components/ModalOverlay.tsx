import React, { Fragment, useState, useEffect } from 'react';
import {   
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
  IconButton,
  Avatar,
  TextField,
  Tooltip,
  makeStyles
} from '@material-ui/core'

import {
  ExpandMore,
  ThumbUp,
  ThumbDown,
  Share,
  GetApp,
  LibraryAdd,
  Tune,
  AccountCircle,
  Comment,
  MoreVert,
  Clear
} from '@material-ui/icons'

import { Skeleton } from '@material-ui/lab';


const tooltipStyles = makeStyles({
  popper: {
    zIndex:10000
  }
});

const expansionPanelStyles = makeStyles({
  root: {
    '& .Mui-expanded': {
      margin:0
    }
  }
})

const ModalOverlay = (props:any) => {

  const [likeTooltipOpen, setLikeTooltipOpen] = useState<boolean>(false);
  const [dislikeTooltipOpen, setDislikeTooltipOpen] = useState<boolean>(false);
  const [shareTooltipOpen, setShareTooltipOpen] = useState<boolean>(false);
  const [downloadTooltipOpen, setDownloadTooltipOpen] = useState<boolean>(false);
  const [saveTooltipOpen, setSaveTooltipOpen] = useState<boolean>(false);
  const [commentLikeTooltipOpen, setCommentLikeTooltipOpen] = useState<boolean>(false);
  const [commentDislikeTooltipOpen, setCommentDislikeTooltipOpen] = useState<boolean>(false);
  const [commentTooltipOpen, setCommentTooltipOpen] = useState<boolean>(false);
  const [commentReportTooltipOpen, setCommentReportTooltipOpen] = useState<boolean>(false);
  const [repliesTooltipOpen, setRepliesTooltipOpen] = useState<boolean>(false);

  const [commentLikeId, setCommentLikeId] = useState<number>(-1);
  const [commentDislikeId, setCommentDislikeId] = useState<number>(-1);
  const [commentId, setCommentId] = useState<number>(-1);
  const [commentReportId, setCommentReportId] = useState<number>(-1);
  const [repliesId, setRepliesId] = useState<number>(-1);
  const [commentFilterTooltipOpen, setCommentFilterTooltipOpen] = useState<boolean>(false);
  const [commentProfileTooltipOpen, setCommentProfileTooltipOpen] = useState<boolean>(false);
  const [commentProfileId, setCommentProfileId] = useState<number>(-1);
  const [expansionPanelOpen, setExpansionPanelOpen] = useState<boolean>(false);

  const convertEntities = (html:string) => {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  const tooltipClasses = tooltipStyles();
  const expansionPanelClasses = expansionPanelStyles();

  return(
    <div className='modal-bg' >
    <div className='modal'>
      <div className={'modal-video-wrapper modal-wrapper'}>
        {
        !props.isIframeLoaded ?
          // <Skeleton variant='rect' className='modal-video'/>
          // <img src={props.currentVideoImage} className='modal-video' />
          <div style={{backgroundImage:`url(${props.currentVideoImage})`, backgroundSize:'cover', display:'flex'}} id='modal-video'>
            <div style={{alignSelf:'center'}} className='spinner5'></div>
          </div>
        :
        <iframe 
          style={{backgroundImage:`url(${props.currentVideoImage})`, backgroundSize:'cover'}}
          id='modal-video' width="480px" height="270px" src={`${props.currentVideoUrl}`} frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        </iframe>
        }
        {
          !props.isIframeLoaded ?
            <iframe style={{visibility:'hidden'}} onLoad={() => props.currentVideoUrl !== ''? props.setIsIframeLoaded(() => true): null}
              width="0px" height="0px" src={props.currentVideoUrl} frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
            </iframe>
          :
          null
        }
      
        <ExpansionPanel defaultExpanded={false} expanded={expansionPanelOpen} classes={{root:expansionPanelClasses.root}} 
        onChange={(event:any, expanded:boolean) => {
          event.persist();
          if(event.nativeEvent.path.filter((element:any) => {
            return element.className === 'MuiExpansionPanelSummary-content';
          }).length === 0){
            expansionPanelOpen?setExpansionPanelOpen(() => false):setExpansionPanelOpen(() => true);
          }
        }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore id="accordion-expansion-icon"/>}
          >
          <p>{props.isSearchResult ? 
          convertEntities(props.searchResultsArray[props.searchResultsArray.length-1]['items'][props.searchResultIndex]['snippet']['title'])
          : props.isTrending ? convertEntities(props.trendingVideoCollection[props.trendingCategoryPage][props.trendingLinkIndex]['snippet']['title'])
          : convertEntities(props.videoTitle[props.urlObject.indexOf(props.currentVideoUrl)])}
          </p>
          <div>
          <Tooltip title='Feature not supported' open={likeTooltipOpen} onOpen={() => null}
            classes={{popper:tooltipClasses.popper}}
            onClick={() => setLikeTooltipOpen(() => true)}
            onClose={() => setLikeTooltipOpen(() => false)}
          >
            <Button
                variant='contained'
                startIcon={<ThumbUp />}
            >
              <p>Like</p>
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={dislikeTooltipOpen} onOpen={() => null}
            classes={{popper:tooltipClasses.popper}}
            onClick={() => setDislikeTooltipOpen(() => true)}
            onClose={() => setDislikeTooltipOpen(() => false)}
          >
            <Button
              variant='contained'
              startIcon={<ThumbDown />}
            >
              <p>Dislike</p>
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={shareTooltipOpen} onOpen={() => null}
            classes={{popper:tooltipClasses.popper}}
            onClick={() => setShareTooltipOpen(() => true)}
            onClose={() => setShareTooltipOpen(() => false)}
          >
            <Button
              variant='contained'
              startIcon={<Share />}
            >
              <p>Share</p>
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={downloadTooltipOpen} onOpen={() => null}
            classes={{popper:tooltipClasses.popper}}
            onClick={() => setDownloadTooltipOpen(() => true)}
            onClose={() => setDownloadTooltipOpen(() => false)}
          >
            <Button
              variant='contained'
              startIcon={<GetApp />}
            >
              <p>Download</p>
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={saveTooltipOpen} onOpen={() => null}
            classes={{popper:tooltipClasses.popper}}
            onClick={() => setSaveTooltipOpen(() => true)}
            onClose={() => setSaveTooltipOpen(() => false)}
          >
            <Button
              variant='contained'
              startIcon={<LibraryAdd />}
            >
              <p>Save</p>
            </Button> 
          </Tooltip> 
          <Button
            id='modal-close'
            variant='contained'
            startIcon={<Clear />}
            onClick={() => {
              if(props.isTrending) {
                props.setIsTrending(() => false);
              }
            }}
          >
            <p>Close</p>
          </Button>                                                                          
          </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <p>
              {props.isSearchResult ? 
              convertEntities(props.searchResultsArray[props.searchResultsArray.length-1]['items'][props.searchResultIndex]['snippet']['description'])
              : props.isTrending ? convertEntities(props.trendingVideoCollection[props.trendingCategoryPage][props.trendingLinkIndex]['snippet']['description'])
              : props.videoDescription ? convertEntities(props.videoDescription[props.urlObject.indexOf(props.currentVideoUrl)]):null}
            </p>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Divider />
        <div id='comment-controls'>
          <h1>Comments <span>{props.videoStatistics?props.videoStatistics[`${props.urlObject.indexOf(props.currentVideoUrl)}`]?.commentCount:null}</span></h1>
          
          <Tooltip title='Feature not supported' open={commentFilterTooltipOpen} onOpen={() => null}
            classes={{popper:tooltipClasses.popper}}
            onClose={() => setCommentFilterTooltipOpen(() => false)}
          >
          <IconButton onClick={() => setCommentFilterTooltipOpen(() => true)}>
            <Tune />
          </IconButton>
          </Tooltip>
        </div>
        <div id='comment-add'>
          <Avatar>
            <AccountCircle />
          </Avatar>
          <TextField placeholder="Feature not supported" />
        </div>
        <div id='comment-data'>
          {props.commentData?.map((comment:{[string:string]:any}, index:number) => {
            return (
              <Fragment key={`${comment.topLevelComment.id}`}>
                {index === 0?<Divider />:null}
                <div id='comment-main'> 
                  <Tooltip title='Feature not supported' open={commentProfileId === index ? commentProfileTooltipOpen: false}
                    onOpen={() => null}
                    classes={{popper:tooltipClasses.popper}}
                    onClose={() => setCommentProfileTooltipOpen(() => false)}
                  >
                    <IconButton onClick={() => {
                      setCommentProfileId(() => index);
                      setCommentProfileTooltipOpen(() => true);
                    }}>
                      <Avatar>
                        <AccountCircle />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <div id='comment-info'> 
                    <p>{`${comment.topLevelComment.snippet.authorDisplayName} • `}
                    {comment.topLevelComment.snippet.publishedAt.localeCompare(
                      comment.topLevelComment.snippet.updatedAt
                    ) === 0?comment.topLevelComment.snippet.publishedAt.match(/[\d\d\d\d-\d\d-\d\d]+/):
                    `${comment.topLevelComment.snippet.updatedAt.match(/[\d\d\d\d-\d\d-\d\d]+/)} (edited)`}</p>                   
                    <p>{convertEntities(comment.topLevelComment.snippet.textOriginal)}</p>
                    <div id='comment-actions'>
                    <Tooltip title='Feature not supported' open={commentLikeId === index ? commentLikeTooltipOpen: false}
                      onOpen={() => null}
                      classes={{popper:tooltipClasses.popper}}
                      onClose={() => setCommentLikeTooltipOpen(() => false)}
                    >
                      <IconButton onClick={() => {
                        setCommentLikeId(() => index);
                        setCommentLikeTooltipOpen(() => true);
                      }}>
                          <ThumbUp />
                      </IconButton>
                    </Tooltip>
                      <span className='comment-data-count'>{comment.topLevelComment.snippet.likeCount}</span>
                    <Tooltip title='Feature not supported' open={commentDislikeId === index ? commentDislikeTooltipOpen : false}
                      onOpen={() => null}
                      classes={{popper:tooltipClasses.popper}}
                      onClose={() => setCommentDislikeTooltipOpen(() => false)}
                    >
                      <IconButton onClick={() => {
                        setCommentDislikeId(() => index);
                        setCommentDislikeTooltipOpen(() => true);
                      }}>
                        <ThumbDown />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Feature not supported' open={commentId === index ? commentTooltipOpen: false}
                      onOpen={() => null}
                      classes={{popper:tooltipClasses.popper}}
                      onClose={() => setCommentTooltipOpen(() => false)}
                    >
                      <IconButton onClick={() => {
                        setCommentId(() => index);
                        setCommentTooltipOpen(() => true);
                      }}>
                        <Comment />
                      </IconButton>
                    </Tooltip>
                      <span className='comment-data-count'>{comment.totalReplyCount!==0?comment.totalReplyCount:null}</span>
                    <Tooltip title='Feature not supported' open={commentReportId === index ? commentReportTooltipOpen : false}
                      onOpen={() => null}
                      classes={{popper:tooltipClasses.popper}}
                      onClose={() => setCommentReportTooltipOpen(() => false)}
                    >
                      <IconButton id='comment-report' onClick={() => {
                        setCommentReportId(() => index);
                        setCommentReportTooltipOpen(() => true);
                      }}>
                        <MoreVert />
                      </IconButton>
                    </Tooltip>
                    </div>
                    <div id='view-replies'>
                        {comment.totalReplyCount!==0 ? 
                        <Tooltip title='Feature not supported' open={repliesId === index ? repliesTooltipOpen : false}
                          onOpen={() => null}
                          classes={{popper:tooltipClasses.popper}}  
                          onClose={() => setRepliesTooltipOpen(() => false)}
                        >
                          <Button onClick={() => {
                            setRepliesId(() => index);
                            setRepliesTooltipOpen(() => true);
                          }}>
                            {`VIEW ${comment.totalReplyCount} REPLIES`}
                          </Button>
                        </Tooltip>
                        : null
                        }
                    </div>
                  </div>
                </div>
                <Divider />
                </Fragment>
            );
          }
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default ModalOverlay;