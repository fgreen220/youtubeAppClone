import React, { Fragment, useState } from 'react';
import {   
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
  IconButton,
  Popper,
  Paper,
  Avatar,
  TextField,
  Tooltip
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
  MoreVert
} from '@material-ui/icons'


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

  const convertEntities = (html:string) => {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  return(
    <div className='modal-bg' >
    <div className='modal'>
      <div className={'modal-video-wrapper modal-wrapper'}>
        <iframe width="480px" height="270px" src={props.currentVideoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore id="accordion-expansion-icon"/>}
          >
          <p>{props.isSearchResult ? 
          convertEntities(props.searchResultsArray[props.searchResultsArray.length-1]['items'][props.searchResultIndex]['snippet']['title'])
          : props.videoTitle[props.urlObject.indexOf(props.currentVideoUrl)]}
          </p>
          <p>{
          // props.isSearchResult?
          // props.searchResultsArray[props.searchResultsArray.length-1]['items'][props.searchResultIndex]['snippet'][]:
          props.videoStatistics?props.videoStatistics[`${props.urlObject.indexOf(props.currentVideoUrl)}`]?.viewCount:null}</p>
          <div>
          <Tooltip title='Feature not supported' open={likeTooltipOpen} onOpen={() => null}
            onClick={() => setLikeTooltipOpen(() => true)}
            onClose={() => {
              setLikeTooltipOpen(() => false);
          }}
          >
            <Button
                variant='contained'
                startIcon={<ThumbUp />}
            >
              <p>{props.videoStatistics?props.videoStatistics[`${props.urlObject.indexOf(props.currentVideoUrl)}`]?.likeCount:null}</p>
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={dislikeTooltipOpen} onOpen={() => null}
            onClick={() => setDislikeTooltipOpen(() => true)}
            onClose={() => {
              setDislikeTooltipOpen(() => false);
          }}
          >
            <Button
              variant='contained'
              startIcon={<ThumbDown />}
            >
              <p>{props.videoStatistics?props.videoStatistics[`${props.urlObject.indexOf(props.currentVideoUrl)}`]?.dislikeCount:null}</p>
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={shareTooltipOpen} onOpen={() => null}
            onClick={() => setShareTooltipOpen(() => true)}
            onClose={() => {
              setShareTooltipOpen(() => false);
          }}
          >
            <Button
              variant='contained'
              startIcon={<Share />}
            >
              <p>Share</p>
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={downloadTooltipOpen} onOpen={() => null}
            onClick={() => setDownloadTooltipOpen(() => true)}
            onClose={() => {
              setDownloadTooltipOpen(() => false);
          }}
          >
            <Button
              variant='contained'
              startIcon={<GetApp />}
            >
              <p>Download</p>
            </Button>
          </Tooltip>
          <Tooltip title='Feature not supported' open={saveTooltipOpen} onOpen={() => null}
            onClick={() => setSaveTooltipOpen(() => true)}
            onClose={() => {
              setSaveTooltipOpen(() => false);
          }}
          >
            <Button
              variant='contained'
              startIcon={<LibraryAdd />}
            >
              <p>Save</p>
            </Button> 
          </Tooltip>                                                                           
          </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <p>
              {props.videoDescription?props.videoDescription[props.urlObject.indexOf(props.currentVideoUrl)]:null}
            </p>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Divider />
        <div id='comment-controls'>
          <h1>Comments <span>{props.videoStatistics?props.videoStatistics[`${props.urlObject.indexOf(props.currentVideoUrl)}`]?.commentCount:null}</span></h1>
          <IconButton onClick={props.handleClick}>
            <Tune />
          </IconButton>
          <Popper id={props.popperId} open={props.popperOpen} anchorEl={props.popperAnchorEl} placement='top-end' modifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: false,
              boundariesElement: 'scrollParent',
            }
          }}>
            <Paper elevation={3}>
              <Button><p>Top Comments</p></Button>
              <Button><p>Most Relevant</p></Button>
            </Paper>
          </Popper>
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
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                  <div id='comment-info'> 
                    <p>{`${comment.topLevelComment.snippet.authorDisplayName} • `}
                    {comment.topLevelComment.snippet.publishedAt.localeCompare(
                      comment.topLevelComment.snippet.updatedAt
                    ) === 0?comment.topLevelComment.snippet.publishedAt.match(/[\d\d\d\d-\d\d-\d\d]+/):
                    `${comment.topLevelComment.snippet.updatedAt.match(/[\d\d\d\d-\d\d-\d\d]+/)} (edited)`}</p>                   
                    <p>{comment.topLevelComment.snippet.textOriginal}</p>
                    <div id='comment-actions'>
                    <Tooltip title='Feature not supported' open={commentLikeId === index ? commentLikeTooltipOpen: false} onOpen={() => null}
                      onClick={() => {
                        setCommentLikeId(() => index);
                        setCommentLikeTooltipOpen(() => true);
                      }}
                      onClose={() => {
                        setCommentLikeTooltipOpen(() => false);
                    }}
                    >
                      <IconButton>
                          <ThumbUp />
                      </IconButton>
                    </Tooltip>
                      <span className='comment-data-count'>{comment.topLevelComment.snippet.likeCount}</span>
                    <Tooltip title='Feature not supported' open={commentDislikeId === index ? commentDislikeTooltipOpen : false} onOpen={() => null}
                      onClick={() => {
                        setCommentDislikeId(() => index);
                        setCommentDislikeTooltipOpen(() => true);
                      }}
                      onClose={() => {
                        setCommentDislikeTooltipOpen(() => false);
                    }}
                    >
                      <IconButton>
                        <ThumbDown />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Feature not supported' open={commentId === index ? commentTooltipOpen: false} onOpen={() => null}
                      onClick={() => {
                        setCommentId(() => index);
                        setCommentTooltipOpen(() => true);
                      }}
                      onClose={() => {
                        setCommentTooltipOpen(() => false);
                    }}
                    >
                      <IconButton>
                        <Comment />
                      </IconButton>
                    </Tooltip>
                      <span className='comment-data-count'>{comment.totalReplyCount!==0?comment.totalReplyCount:null}</span>
                    <Tooltip title='Feature not supported' open={commentReportId === index ? commentReportTooltipOpen : false} onOpen={() => null}
                      onClick={() => {
                        setCommentReportId(() => index);
                        setCommentReportTooltipOpen(() => true);
                      }}
                      onClose={() => {
                        setCommentReportTooltipOpen(() => false);
                    }}
                    >
                      <IconButton id='comment-report'>
                        <MoreVert />
                      </IconButton>
                    </Tooltip>
                    </div>
                    <div id='view-replies'>
                        {comment.totalReplyCount!==0 ? 
                        <Tooltip title='Feature not supported' open={repliesId === index ? repliesTooltipOpen : false} onOpen={() => null}
                          onClick={() => {
                            setRepliesId(() => index);
                            setRepliesTooltipOpen(() => true);
                          }}
                          onClose={() => {
                            setRepliesTooltipOpen(() => false);
                        }}
                        >
                          <Button>{`VIEW ${comment.totalReplyCount} REPLIES`}</Button>
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
      <span className='modal-close'>X</span>
    </div>
  </div>
  );
}

export default ModalOverlay;