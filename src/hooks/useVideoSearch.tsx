import { useEffect, useState } from 'react';

interface ResponseObject {
  kind: string;
  etag: string;
  nextPageToken:string;
  pageInfo: {};
  items: {kind:string, etag:string, id:string, snippet:{thumbnails:{maxres:{url:string}}}, contentDetails:{},player:{embedHtml:string}}[];
}

const useVideoSearch = (
  nextVideoPage:any,
  setTokens:any,
  pgTokens:any,
  stateFunction:any,
  pageName:string,
  trendingCategoryPage:string,
  urlObjectSetter:any,
  videoTitleSetter:any,
  videoStatSetter: React.Dispatch<React.SetStateAction<{
    [string: string]: {
        viewCount: string;
        likeCount: string;
        dislikeCount: string;
        favoriteCount: string;
        commentCount: string;
    };
} | undefined>>,
  videoDescSetter: React.Dispatch<React.SetStateAction<string[]>>,
  videoIdSetter: React.Dispatch<React.SetStateAction<string[]>>,
  trendingObjectSetter:React.Dispatch<React.SetStateAction<{}[]>>
  ) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    if(pageName === '/'){
      setLoading(true);
      setError(false)
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/home-videos`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage === '' ?0:nextVideoPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        stateFunction((prevVideos:any) => {
          return [...new Set([...prevVideos, ...data.items.map((video:any) => {
            return(video['snippet']['thumbnails']['maxres'] ?
            video['snippet']['thumbnails']['maxres']['url']
            :
            video['snippet']['thumbnails']['standard']?
            video['snippet']['thumbnails']['standard']['url']
            :
            video['snippet']['thumbnails']['high']?
            video['snippet']['thumbnails']['high']['url']
            :
            video['snippet']['thumbnails']['medium']?
            video['snippet']['thumbnails']['medium']['url']
            :
            video['snippet']['thumbnails']['default']?
            video['snippet']['thumbnails']['default']['url']
            :'../assets/no_thumbnail.jpg'
            );
        })])]
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            [...prevUrls, ...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })
            ]
          );
        });
        videoTitleSetter((prevTitles:any) => {
          return [...prevTitles, ...data.items.map((video:any) => video.snippet.title?video.snippet.title:'Youtube Video')]
        })
        videoStatSetter((prevStat:{
          [string: string]: {
              viewCount: string;
              likeCount: string;
              dislikeCount: string;
              favoriteCount: string;
              commentCount: string;
          };
      } | undefined) => {
          return {...prevStat, ...data.items.map((item:any) => {
            return {...item.statistics};
          })}
        });
        videoDescSetter((prevDesc:string[]) => {
          return [...prevDesc, ...data.items.map((item:{[string:string]:{[string:string]:string}}) => item.snippet.description)]
        });
        videoIdSetter((prevIds:string[]) => {
          return [...prevIds, ...data.items.map((item:{[string:string]:string}) => item.id)]
        })
        setTokens(() => [...pgTokens, data.nextPageToken])
        setHasMore(data.nextPageToken);
        setLoading(false);
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage,pageName]);
  

  useEffect(() => {
      if((pageName === '/trending' && trendingCategoryPage === '1') &&
         (!pgTokens[trendingCategoryPage] ||
         (pgTokens[trendingCategoryPage].length ===
          nextVideoPage[trendingCategoryPage]?.length))){
        // && Boolean(pgTokens[trendingCategoryPage].length === nextVideoPage[trendingCategoryPage]?.length))
      setLoading(true);
      setError(false);
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/trending`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage[trendingCategoryPage] === undefined ?
             0:nextVideoPage[trendingCategoryPage][nextVideoPage[trendingCategoryPage].length-1]}`,
          'trendingpage': `${trendingCategoryPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        trendingObjectSetter((prevCollection:any) => {
          return(
            prevCollection[trendingCategoryPage] ?
            {...prevCollection, [trendingCategoryPage]: [
              ...prevCollection[trendingCategoryPage], ...data.items
            ]}
            :
            {...prevCollection, [trendingCategoryPage]: [...data.items]}
          );
        });
        stateFunction((prevVideos:any) => {
          return (
            prevVideos[trendingCategoryPage] ?
            {...prevVideos, [trendingCategoryPage]:
            [...prevVideos[trendingCategoryPage], ...data.items.map((video:any) => {
              return(video['snippet']['thumbnails']['maxres'] ?
              video['snippet']['thumbnails']['maxres']['url']
              :
              video['snippet']['thumbnails']['standard']?
              video['snippet']['thumbnails']['standard']['url']
              :
              video['snippet']['thumbnails']['high']?
              video['snippet']['thumbnails']['high']['url']
              :
              video['snippet']['thumbnails']['medium']?
              video['snippet']['thumbnails']['medium']['url']
              :
              video['snippet']['thumbnails']['default']?
              video['snippet']['thumbnails']['default']['url']
              :'../assets/no_thumbnail.jpg'
              );
            })]}
          :
            {...prevVideos, [trendingCategoryPage]:
              [...data.items.map((video:any) => {
                return(video['snippet']['thumbnails']['maxres'] ?
                video['snippet']['thumbnails']['maxres']['url']
                :
                video['snippet']['thumbnails']['standard']?
                video['snippet']['thumbnails']['standard']['url']
                :
                video['snippet']['thumbnails']['high']?
                video['snippet']['thumbnails']['high']['url']
                :
                video['snippet']['thumbnails']['medium']?
                video['snippet']['thumbnails']['medium']['url']
                :
                video['snippet']['thumbnails']['default']?
                video['snippet']['thumbnails']['default']['url']
                :'../assets/no_thumbnail.jpg'
              );
            })]
            }
          );
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            prevUrls[trendingCategoryPage]? (
            {...prevUrls, [trendingCategoryPage]:[...prevUrls[trendingCategoryPage], ...data.items.map((playerItem:any) => {
            return(playerItem['player'] ?
            playerItem['player']['embedHtml'].match(
              /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
            )[0]
            :'//www.youtube.com'
            );
        })]}
            )
            :
            (

            {...prevUrls, [trendingCategoryPage]:[...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })]}
            )
            );
        });
        setTokens((prevTokens:any) => {
          return (
            prevTokens[trendingCategoryPage] ?
            {...prevTokens, [trendingCategoryPage]:[...prevTokens[trendingCategoryPage], data.nextPageToken]}
            :
            {...prevTokens, [trendingCategoryPage]:[data.nextPageToken]}
            );
        });
        setHasMore((prevHasMore:any) => {
          return {...prevHasMore, [trendingCategoryPage]:Boolean(data.nextPageToken)};
        });
        setLoading(false);
        // stateFunction(():any => [data])
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage[trendingCategoryPage],pageName,trendingCategoryPage]);

  useEffect(() => {
    if((pageName === '/trending' && trendingCategoryPage === '2') &&
    (!pgTokens[trendingCategoryPage] ||
    (pgTokens[trendingCategoryPage].length ===
     nextVideoPage[trendingCategoryPage]?.length))) {
         
      setLoading(true);
      setError(false);
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/trending`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage[trendingCategoryPage] === undefined ?
             0:nextVideoPage[trendingCategoryPage][nextVideoPage[trendingCategoryPage].length-1]}`,
          'trendingpage': `${trendingCategoryPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        trendingObjectSetter((prevCollection:any) => {
          return(
            prevCollection[trendingCategoryPage] ?
            {...prevCollection, [trendingCategoryPage]: [
              ...prevCollection[trendingCategoryPage], ...data.items
            ]}
            :
            {...prevCollection, [trendingCategoryPage]: [...data.items]}
          );
        });
        stateFunction((prevVideos:any) => {
          return (
            prevVideos[trendingCategoryPage] ?
            {...prevVideos, [trendingCategoryPage]:
            [...prevVideos[trendingCategoryPage],...data.items.map((video:any) => {
              return(video['snippet']['thumbnails']['maxres'] ?
              video['snippet']['thumbnails']['maxres']['url']
              :
              video['snippet']['thumbnails']['standard']?
              video['snippet']['thumbnails']['standard']['url']
              :
              video['snippet']['thumbnails']['high']?
              video['snippet']['thumbnails']['high']['url']
              :
              video['snippet']['thumbnails']['medium']?
              video['snippet']['thumbnails']['medium']['url']
              :
              video['snippet']['thumbnails']['default']?
              video['snippet']['thumbnails']['default']['url']
              :'../assets/no_thumbnail.jpg'
              );
            })]}
          :
            {...prevVideos, [trendingCategoryPage]:
              [...data.items.map((video:any) => {
                return(video['snippet']['thumbnails']['maxres'] ?
                video['snippet']['thumbnails']['maxres']['url']
                :
                video['snippet']['thumbnails']['standard']?
                video['snippet']['thumbnails']['standard']['url']
                :
                video['snippet']['thumbnails']['high']?
                video['snippet']['thumbnails']['high']['url']
                :
                video['snippet']['thumbnails']['medium']?
                video['snippet']['thumbnails']['medium']['url']
                :
                video['snippet']['thumbnails']['default']?
                video['snippet']['thumbnails']['default']['url']
                :'../assets/no_thumbnail.jpg'
              );
            })]
            }
          );
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            prevUrls[trendingCategoryPage]? (
            {...prevUrls, [trendingCategoryPage]:[...prevUrls[trendingCategoryPage], ...data.items.map((playerItem:any) => {
            return(playerItem['player'] ?
            playerItem['player']['embedHtml'].match(
              /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
            )[0]
            :'//www.youtube.com'
            );
        })]}
            )
            :
            (

            {...prevUrls, [trendingCategoryPage]:[...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })]}
            )
            );
        });
        setTokens((prevTokens:any) => {
          return (
            prevTokens[trendingCategoryPage]?
            {...prevTokens, [trendingCategoryPage]:[...prevTokens[trendingCategoryPage], data.nextPageToken]}
            :
            {...prevTokens, [trendingCategoryPage]:[data.nextPageToken]}
            );
        });
        setHasMore((prevHasMore:any) => {
          return {...prevHasMore, [trendingCategoryPage]:Boolean(data.nextPageToken)};
        });
        setLoading(false);
        // stateFunction(():any => [data])
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage[trendingCategoryPage],pageName,trendingCategoryPage]);
  useEffect(() => {
    if((pageName === '/trending' && trendingCategoryPage === '10') &&
    (!pgTokens[trendingCategoryPage] ||
    (pgTokens[trendingCategoryPage].length ===
     nextVideoPage[trendingCategoryPage]?.length))){
      setLoading(true);
      setError(false);
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/trending`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage[trendingCategoryPage] === undefined ?
             0:nextVideoPage[trendingCategoryPage][nextVideoPage[trendingCategoryPage].length-1]}`,
          'trendingpage': `${trendingCategoryPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        trendingObjectSetter((prevCollection:any) => {
          return(
            prevCollection[trendingCategoryPage] ?
            {...prevCollection, [trendingCategoryPage]: [
              ...prevCollection[trendingCategoryPage], ...data.items
            ]}
            :
            {...prevCollection, [trendingCategoryPage]: [...data.items]}
          );
        });
        stateFunction((prevVideos:any) => {
          return (
            prevVideos[trendingCategoryPage] ?
            {...prevVideos, [trendingCategoryPage]:
            [...prevVideos[trendingCategoryPage], ...data.items.map((video:any) => {
              return(video['snippet']['thumbnails']['maxres'] ?
              video['snippet']['thumbnails']['maxres']['url']
              :
              video['snippet']['thumbnails']['standard']?
              video['snippet']['thumbnails']['standard']['url']
              :
              video['snippet']['thumbnails']['high']?
              video['snippet']['thumbnails']['high']['url']
              :
              video['snippet']['thumbnails']['medium']?
              video['snippet']['thumbnails']['medium']['url']
              :
              video['snippet']['thumbnails']['default']?
              video['snippet']['thumbnails']['default']['url']
              :'../assets/no_thumbnail.jpg'
              );
            })]}
          :
            {...prevVideos, [trendingCategoryPage]:
              [...data.items.map((video:any) => {
                return(video['snippet']['thumbnails']['maxres'] ?
                video['snippet']['thumbnails']['maxres']['url']
                :
                video['snippet']['thumbnails']['standard']?
                video['snippet']['thumbnails']['standard']['url']
                :
                video['snippet']['thumbnails']['high']?
                video['snippet']['thumbnails']['high']['url']
                :
                video['snippet']['thumbnails']['medium']?
                video['snippet']['thumbnails']['medium']['url']
                :
                video['snippet']['thumbnails']['default']?
                video['snippet']['thumbnails']['default']['url']
                :'../assets/no_thumbnail.jpg'
              );
            })]
            }
          );
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            prevUrls[trendingCategoryPage]? (
            {...prevUrls, [trendingCategoryPage]:[...prevUrls[trendingCategoryPage], ...data.items.map((playerItem:any) => {
            return(playerItem['player'] ?
            playerItem['player']['embedHtml'].match(
              /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
            )[0]
            :'//www.youtube.com'
            );
        })]}
            )
            :
            (

            {...prevUrls, [trendingCategoryPage]:[...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })]}
            )
            );
        });
        setTokens((prevTokens:any) => {
          return (
            prevTokens[trendingCategoryPage]?
            {...prevTokens, [trendingCategoryPage]:[...prevTokens[trendingCategoryPage], data.nextPageToken]}
            :
            {...prevTokens, [trendingCategoryPage]:[data.nextPageToken]}
            );
        });
        setHasMore((prevHasMore:any) => {
          return {...prevHasMore, [trendingCategoryPage]:Boolean(data.nextPageToken)};
        });
        setLoading(false);
        // stateFunction(():any => [data])
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage[trendingCategoryPage],pageName,trendingCategoryPage]);
  useEffect(() => {
    if((pageName === '/trending' && trendingCategoryPage === '15') &&
         (!pgTokens[trendingCategoryPage] ||
         (pgTokens[trendingCategoryPage].length ===
          nextVideoPage[trendingCategoryPage]?.length))){
      setLoading(true);
      setError(false);
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/trending`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage[trendingCategoryPage] === undefined ?
             0:nextVideoPage[trendingCategoryPage][nextVideoPage[trendingCategoryPage].length-1]}`,
          'trendingpage': `${trendingCategoryPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        trendingObjectSetter((prevCollection:any) => {
          return(
            prevCollection[trendingCategoryPage] ?
            {...prevCollection, [trendingCategoryPage]: [
              ...prevCollection[trendingCategoryPage], ...data.items
            ]}
            :
            {...prevCollection, [trendingCategoryPage]: [...data.items]}
          );
        });
        stateFunction((prevVideos:any) => {
          return (
            prevVideos[trendingCategoryPage] ?
            {...prevVideos, [trendingCategoryPage]:
            [...prevVideos[trendingCategoryPage], ...data.items.map((video:any) => {
              return(video['snippet']['thumbnails']['maxres'] ?
              video['snippet']['thumbnails']['maxres']['url']
              :
              video['snippet']['thumbnails']['standard']?
              video['snippet']['thumbnails']['standard']['url']
              :
              video['snippet']['thumbnails']['high']?
              video['snippet']['thumbnails']['high']['url']
              :
              video['snippet']['thumbnails']['medium']?
              video['snippet']['thumbnails']['medium']['url']
              :
              video['snippet']['thumbnails']['default']?
              video['snippet']['thumbnails']['default']['url']
              :'../assets/no_thumbnail.jpg'
              );
            })]}
          :
            {...prevVideos, [trendingCategoryPage]:
              [...data.items.map((video:any) => {
                return(video['snippet']['thumbnails']['maxres'] ?
                video['snippet']['thumbnails']['maxres']['url']
                :
                video['snippet']['thumbnails']['standard']?
                video['snippet']['thumbnails']['standard']['url']
                :
                video['snippet']['thumbnails']['high']?
                video['snippet']['thumbnails']['high']['url']
                :
                video['snippet']['thumbnails']['medium']?
                video['snippet']['thumbnails']['medium']['url']
                :
                video['snippet']['thumbnails']['default']?
                video['snippet']['thumbnails']['default']['url']
                :'../assets/no_thumbnail.jpg'
              );
            })]
            }
          );
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            prevUrls[trendingCategoryPage]? (
            {...prevUrls, [trendingCategoryPage]:[...prevUrls[trendingCategoryPage], ...data.items.map((playerItem:any) => {
            return(playerItem['player'] ?
            playerItem['player']['embedHtml'].match(
              /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
            )[0]
            :'//www.youtube.com'
            );
        })]}
            )
            :
            (

            {...prevUrls, [trendingCategoryPage]:[...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })]}
            )
            );
        });
        setTokens((prevTokens:any) => {
          return (
            prevTokens[trendingCategoryPage]?
            {...prevTokens, [trendingCategoryPage]:[...prevTokens[trendingCategoryPage], data.nextPageToken]}
            :
            {...prevTokens, [trendingCategoryPage]:[data.nextPageToken]}
            );
        });
        setHasMore((prevHasMore:any) => {
          return {...prevHasMore, [trendingCategoryPage]:Boolean(data.nextPageToken)};
        });
        setLoading(false);
        // stateFunction(():any => [data])
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage[trendingCategoryPage],pageName,trendingCategoryPage]);
  useEffect(() => {
    if((pageName === '/trending' && trendingCategoryPage === '17') &&
    (!pgTokens[trendingCategoryPage] ||
    (pgTokens[trendingCategoryPage].length ===
     nextVideoPage[trendingCategoryPage]?.length))){
      setLoading(true);
      setError(false);
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/trending`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage[trendingCategoryPage] === undefined ?
             0:nextVideoPage[trendingCategoryPage][nextVideoPage[trendingCategoryPage].length-1]}`,
          'trendingpage': `${trendingCategoryPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        trendingObjectSetter((prevCollection:any) => {
          return(
            prevCollection[trendingCategoryPage] ?
            {...prevCollection, [trendingCategoryPage]: [
              ...prevCollection[trendingCategoryPage], ...data.items
            ]}
            :
            {...prevCollection, [trendingCategoryPage]: [...data.items]}
          );
        });
        stateFunction((prevVideos:any) => {
          return (
            prevVideos[trendingCategoryPage] ?
            {...prevVideos, [trendingCategoryPage]:
            [...prevVideos[trendingCategoryPage], ...data.items.map((video:any) => {
              return(video['snippet']['thumbnails']['maxres'] ?
              video['snippet']['thumbnails']['maxres']['url']
              :
              video['snippet']['thumbnails']['standard']?
              video['snippet']['thumbnails']['standard']['url']
              :
              video['snippet']['thumbnails']['high']?
              video['snippet']['thumbnails']['high']['url']
              :
              video['snippet']['thumbnails']['medium']?
              video['snippet']['thumbnails']['medium']['url']
              :
              video['snippet']['thumbnails']['default']?
              video['snippet']['thumbnails']['default']['url']
              :'../assets/no_thumbnail.jpg'
              );
            })]}
          :
            {...prevVideos, [trendingCategoryPage]:
              [...data.items.map((video:any) => {
                return(video['snippet']['thumbnails']['maxres'] ?
                video['snippet']['thumbnails']['maxres']['url']
                :
                video['snippet']['thumbnails']['standard']?
                video['snippet']['thumbnails']['standard']['url']
                :
                video['snippet']['thumbnails']['high']?
                video['snippet']['thumbnails']['high']['url']
                :
                video['snippet']['thumbnails']['medium']?
                video['snippet']['thumbnails']['medium']['url']
                :
                video['snippet']['thumbnails']['default']?
                video['snippet']['thumbnails']['default']['url']
                :'../assets/no_thumbnail.jpg'
              );
            })]
            }
          );
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            prevUrls[trendingCategoryPage]? (
            {...prevUrls, [trendingCategoryPage]:[...prevUrls[trendingCategoryPage], ...data.items.map((playerItem:any) => {
            return(playerItem['player'] ?
            playerItem['player']['embedHtml'].match(
              /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
            )[0]
            :'//www.youtube.com'
            );
        })]}
            )
            :
            (

            {...prevUrls, [trendingCategoryPage]:[...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })]}
            )
            );
        });
        setTokens((prevTokens:any) => {
          return (
            prevTokens[trendingCategoryPage]?
            {...prevTokens, [trendingCategoryPage]:[...prevTokens[trendingCategoryPage], data.nextPageToken]}
            :
            {...prevTokens, [trendingCategoryPage]:[data.nextPageToken]}
            );
        });
        setHasMore((prevHasMore:any) => {
          return {...prevHasMore, [trendingCategoryPage]:Boolean(data.nextPageToken)};
        });
        setLoading(false);
        // stateFunction(():any => [data])
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage[trendingCategoryPage],pageName,trendingCategoryPage]);
  useEffect(() => {
    if((pageName === '/trending' && trendingCategoryPage === '20') &&
    (!pgTokens[trendingCategoryPage] ||
    (pgTokens[trendingCategoryPage].length ===
     nextVideoPage[trendingCategoryPage]?.length))){
      setLoading(true);
      setError(false);
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/trending`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage[trendingCategoryPage] === undefined ?
             0:nextVideoPage[trendingCategoryPage][nextVideoPage[trendingCategoryPage].length-1]}`,
          'trendingpage': `${trendingCategoryPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        trendingObjectSetter((prevCollection:any) => {
          return(
            prevCollection[trendingCategoryPage] ?
            {...prevCollection, [trendingCategoryPage]: [
              ...prevCollection[trendingCategoryPage], ...data.items
            ]}
            :
            {...prevCollection, [trendingCategoryPage]: [...data.items]}
          );
        });
        stateFunction((prevVideos:any) => {
          return (
            prevVideos[trendingCategoryPage] ?
            {...prevVideos, [trendingCategoryPage]:
            [...prevVideos[trendingCategoryPage], ...data.items.map((video:any) => {
              return(video['snippet']['thumbnails']['maxres'] ?
              video['snippet']['thumbnails']['maxres']['url']
              :
              video['snippet']['thumbnails']['standard']?
              video['snippet']['thumbnails']['standard']['url']
              :
              video['snippet']['thumbnails']['high']?
              video['snippet']['thumbnails']['high']['url']
              :
              video['snippet']['thumbnails']['medium']?
              video['snippet']['thumbnails']['medium']['url']
              :
              video['snippet']['thumbnails']['default']?
              video['snippet']['thumbnails']['default']['url']
              :'../assets/no_thumbnail.jpg'
              );
            })]}
          :
            {...prevVideos, [trendingCategoryPage]:
              [...data.items.map((video:any) => {
                return(video['snippet']['thumbnails']['maxres'] ?
                video['snippet']['thumbnails']['maxres']['url']
                :
                video['snippet']['thumbnails']['standard']?
                video['snippet']['thumbnails']['standard']['url']
                :
                video['snippet']['thumbnails']['high']?
                video['snippet']['thumbnails']['high']['url']
                :
                video['snippet']['thumbnails']['medium']?
                video['snippet']['thumbnails']['medium']['url']
                :
                video['snippet']['thumbnails']['default']?
                video['snippet']['thumbnails']['default']['url']
                :'../assets/no_thumbnail.jpg'
              );
            })]
            }
          );
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            prevUrls[trendingCategoryPage]? (
            {...prevUrls, [trendingCategoryPage]:[...prevUrls[trendingCategoryPage], ...data.items.map((playerItem:any) => {
            return(playerItem['player'] ?
            playerItem['player']['embedHtml'].match(
              /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
            )[0]
            :'//www.youtube.com'
            );
        })]}
            )
            :
            (

            {...prevUrls, [trendingCategoryPage]:[...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })]}
            )
            );
        });
        setTokens((prevTokens:any) => {
          return (
            prevTokens[trendingCategoryPage]?
            {...prevTokens, [trendingCategoryPage]:[...prevTokens[trendingCategoryPage], data.nextPageToken]}
            :
            {...prevTokens, [trendingCategoryPage]:[data.nextPageToken]}
            );
        });
        setHasMore((prevHasMore:any) => {
          return {...prevHasMore, [trendingCategoryPage]:Boolean(data.nextPageToken)};
        });
        setLoading(false);
        // stateFunction(():any => [data])
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage[trendingCategoryPage],pageName,trendingCategoryPage]);
  useEffect(() => {
    if((pageName === '/trending' && trendingCategoryPage === '23') &&
         (!pgTokens[trendingCategoryPage] ||
         (pgTokens[trendingCategoryPage].length ===
          nextVideoPage[trendingCategoryPage]?.length))){
      setLoading(true);
      setError(false);
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/trending`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage[trendingCategoryPage] === undefined ?
             0:nextVideoPage[trendingCategoryPage][nextVideoPage[trendingCategoryPage].length-1]}`,
          'trendingpage': `${trendingCategoryPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        trendingObjectSetter((prevCollection:any) => {
          return(
            prevCollection[trendingCategoryPage] ?
            {...prevCollection, [trendingCategoryPage]: [
              ...prevCollection[trendingCategoryPage], ...data.items
            ]}
            :
            {...prevCollection, [trendingCategoryPage]: [...data.items]}
          );
        });
        stateFunction((prevVideos:any) => {
          return (
            prevVideos[trendingCategoryPage] ?
            {...prevVideos, [trendingCategoryPage]:
            [...prevVideos[trendingCategoryPage], ...data.items.map((video:any) => {
              return(video['snippet']['thumbnails']['maxres'] ?
              video['snippet']['thumbnails']['maxres']['url']
              :
              video['snippet']['thumbnails']['standard']?
              video['snippet']['thumbnails']['standard']['url']
              :
              video['snippet']['thumbnails']['high']?
              video['snippet']['thumbnails']['high']['url']
              :
              video['snippet']['thumbnails']['medium']?
              video['snippet']['thumbnails']['medium']['url']
              :
              video['snippet']['thumbnails']['default']?
              video['snippet']['thumbnails']['default']['url']
              :'../assets/no_thumbnail.jpg'
              );
            })]}
          :
            {...prevVideos, [trendingCategoryPage]:
              [...data.items.map((video:any) => {
                return(video['snippet']['thumbnails']['maxres'] ?
                video['snippet']['thumbnails']['maxres']['url']
                :
                video['snippet']['thumbnails']['standard']?
                video['snippet']['thumbnails']['standard']['url']
                :
                video['snippet']['thumbnails']['high']?
                video['snippet']['thumbnails']['high']['url']
                :
                video['snippet']['thumbnails']['medium']?
                video['snippet']['thumbnails']['medium']['url']
                :
                video['snippet']['thumbnails']['default']?
                video['snippet']['thumbnails']['default']['url']
                :'../assets/no_thumbnail.jpg'
              );
            })]
            }
          );
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            prevUrls[trendingCategoryPage]? (
            {...prevUrls, [trendingCategoryPage]:[...prevUrls[trendingCategoryPage], ...data.items.map((playerItem:any) => {
            return(playerItem['player'] ?
            playerItem['player']['embedHtml'].match(
              /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
            )[0]
            :'//www.youtube.com'
            );
        })]}
            )
            :
            (

            {...prevUrls, [trendingCategoryPage]:[...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })]}
            )
            );
        });
        setTokens((prevTokens:any) => {
          return (
            prevTokens[trendingCategoryPage]?
            {...prevTokens, [trendingCategoryPage]:[...prevTokens[trendingCategoryPage], data.nextPageToken]}
            :
            {...prevTokens, [trendingCategoryPage]:[data.nextPageToken]}
            );
        });
        setHasMore((prevHasMore:any) => {
          return {...prevHasMore, [trendingCategoryPage]:Boolean(data.nextPageToken)};
        });
        setLoading(false);
        // stateFunction(():any => [data])
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage[trendingCategoryPage],pageName,trendingCategoryPage]);
  useEffect(() => {
    if((pageName === '/trending' && trendingCategoryPage === '24') &&
    (!pgTokens[trendingCategoryPage] ||
    (pgTokens[trendingCategoryPage].length ===
     nextVideoPage[trendingCategoryPage]?.length))){
      setLoading(true);
      setError(false);
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/trending`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage[trendingCategoryPage] === undefined ?
             0:nextVideoPage[trendingCategoryPage][nextVideoPage[trendingCategoryPage].length-1]}`,
          'trendingpage': `${trendingCategoryPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        trendingObjectSetter((prevCollection:any) => {
          return(
            prevCollection[trendingCategoryPage] ?
            {...prevCollection, [trendingCategoryPage]: [
              ...prevCollection[trendingCategoryPage], ...data.items
            ]}
            :
            {...prevCollection, [trendingCategoryPage]: [...data.items]}
          );
        });
        stateFunction((prevVideos:any) => {
          return (
            prevVideos[trendingCategoryPage] ?
            {...prevVideos, [trendingCategoryPage]:
            [...prevVideos[trendingCategoryPage], ...data.items.map((video:any) => {
              return(video['snippet']['thumbnails']['maxres'] ?
              video['snippet']['thumbnails']['maxres']['url']
              :
              video['snippet']['thumbnails']['standard']?
              video['snippet']['thumbnails']['standard']['url']
              :
              video['snippet']['thumbnails']['high']?
              video['snippet']['thumbnails']['high']['url']
              :
              video['snippet']['thumbnails']['medium']?
              video['snippet']['thumbnails']['medium']['url']
              :
              video['snippet']['thumbnails']['default']?
              video['snippet']['thumbnails']['default']['url']
              :'../assets/no_thumbnail.jpg'
              );
            })]}
          :
            {...prevVideos, [trendingCategoryPage]:
              [...data.items.map((video:any) => {
                return(video['snippet']['thumbnails']['maxres'] ?
                video['snippet']['thumbnails']['maxres']['url']
                :
                video['snippet']['thumbnails']['standard']?
                video['snippet']['thumbnails']['standard']['url']
                :
                video['snippet']['thumbnails']['high']?
                video['snippet']['thumbnails']['high']['url']
                :
                video['snippet']['thumbnails']['medium']?
                video['snippet']['thumbnails']['medium']['url']
                :
                video['snippet']['thumbnails']['default']?
                video['snippet']['thumbnails']['default']['url']
                :'../assets/no_thumbnail.jpg'
              );
            })]
            }
          );
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            prevUrls[trendingCategoryPage]? (
            {...prevUrls, [trendingCategoryPage]:[...prevUrls[trendingCategoryPage], ...data.items.map((playerItem:any) => {
            return(playerItem['player'] ?
            playerItem['player']['embedHtml'].match(
              /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
            )[0]
            :'//www.youtube.com'
            );
        })]}
            )
            :
            (

            {...prevUrls, [trendingCategoryPage]:[...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })]}
            )
            );
        });
        setTokens((prevTokens:any) => {
          return (
            prevTokens[trendingCategoryPage]?
            {...prevTokens, [trendingCategoryPage]:[...prevTokens[trendingCategoryPage], data.nextPageToken]}
            :
            {...prevTokens, [trendingCategoryPage]:[data.nextPageToken]}
            );
        });
        setHasMore((prevHasMore:any) => {
          return {...prevHasMore, [trendingCategoryPage]:Boolean(data.nextPageToken)};
        });
        setLoading(false);
        // stateFunction(():any => [data])
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage[trendingCategoryPage],pageName,trendingCategoryPage]);
  useEffect(() => {
    if((pageName === '/trending' && trendingCategoryPage === '26') &&
    (!pgTokens[trendingCategoryPage] ||
    (pgTokens[trendingCategoryPage].length ===
     nextVideoPage[trendingCategoryPage]?.length))){
      setLoading(true);
      setError(false);
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/trending`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage[trendingCategoryPage] === undefined ?
             0:nextVideoPage[trendingCategoryPage][nextVideoPage[trendingCategoryPage].length-1]}`,
          'trendingpage': `${trendingCategoryPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        trendingObjectSetter((prevCollection:any) => {
          return(
            prevCollection[trendingCategoryPage] ?
            {...prevCollection, [trendingCategoryPage]: [
              ...prevCollection[trendingCategoryPage], ...data.items
            ]}
            :
            {...prevCollection, [trendingCategoryPage]: [...data.items]}
          );
        });
        stateFunction((prevVideos:any) => {
          return (
            prevVideos[trendingCategoryPage] ?
            {...prevVideos, [trendingCategoryPage]:
            [...prevVideos[trendingCategoryPage], ...data.items.map((video:any) => {
              return(video['snippet']['thumbnails']['maxres'] ?
              video['snippet']['thumbnails']['maxres']['url']
              :
              video['snippet']['thumbnails']['standard']?
              video['snippet']['thumbnails']['standard']['url']
              :
              video['snippet']['thumbnails']['high']?
              video['snippet']['thumbnails']['high']['url']
              :
              video['snippet']['thumbnails']['medium']?
              video['snippet']['thumbnails']['medium']['url']
              :
              video['snippet']['thumbnails']['default']?
              video['snippet']['thumbnails']['default']['url']
              :'../assets/no_thumbnail.jpg'
              );
            })]}
          :
            {...prevVideos, [trendingCategoryPage]:
              [...data.items.map((video:any) => {
                return(video['snippet']['thumbnails']['maxres'] ?
                video['snippet']['thumbnails']['maxres']['url']
                :
                video['snippet']['thumbnails']['standard']?
                video['snippet']['thumbnails']['standard']['url']
                :
                video['snippet']['thumbnails']['high']?
                video['snippet']['thumbnails']['high']['url']
                :
                video['snippet']['thumbnails']['medium']?
                video['snippet']['thumbnails']['medium']['url']
                :
                video['snippet']['thumbnails']['default']?
                video['snippet']['thumbnails']['default']['url']
                :'../assets/no_thumbnail.jpg'
              );
            })]
            }
          );
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            prevUrls[trendingCategoryPage]? (
            {...prevUrls, [trendingCategoryPage]:[...prevUrls[trendingCategoryPage], ...data.items.map((playerItem:any) => {
            return(playerItem['player'] ?
            playerItem['player']['embedHtml'].match(
              /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
            )[0]
            :'//www.youtube.com'
            );
        })]}
            )
            :
            (

            {...prevUrls, [trendingCategoryPage]:[...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })]}
            )
            );
        });
        setTokens((prevTokens:any) => {
          return (
            prevTokens[trendingCategoryPage]?
            {...prevTokens, [trendingCategoryPage]:[...prevTokens[trendingCategoryPage], data.nextPageToken]}
            :
            {...prevTokens, [trendingCategoryPage]:[data.nextPageToken]}
            );
        });
        setHasMore((prevHasMore:any) => {
          return {...prevHasMore, [trendingCategoryPage]:Boolean(data.nextPageToken)};
        });
        setLoading(false);
        // stateFunction(():any => [data])
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage[trendingCategoryPage],pageName,trendingCategoryPage]);
  useEffect(() => {
    if((pageName === '/trending' && trendingCategoryPage === '28') &&
    (!pgTokens[trendingCategoryPage] ||
    (pgTokens[trendingCategoryPage].length ===
     nextVideoPage[trendingCategoryPage]?.length))){
      let fetchPath:string;
      setLoading(true);
      setError(false);
      const ac = new AbortController();
  
      fetch(`http://localhost:3000/trending`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'pagetoken':`${nextVideoPage[trendingCategoryPage] === undefined ?
             0:nextVideoPage[trendingCategoryPage][nextVideoPage[trendingCategoryPage].length-1]}`,
          'trendingpage': `${trendingCategoryPage}`
        }
      })
      .then(response => response.json())
      .then((data:any) => {
        data = JSON.parse(data);
        trendingObjectSetter((prevCollection:any) => {
          return(
            prevCollection[trendingCategoryPage] ?
            {...prevCollection, [trendingCategoryPage]: [
              ...prevCollection[trendingCategoryPage], ...data.items
            ]}
            :
            {...prevCollection, [trendingCategoryPage]: [...data.items]}
          );
        });
        stateFunction((prevVideos:any) => {
          return (
            prevVideos[trendingCategoryPage] ?
            {...prevVideos, [trendingCategoryPage]:
            [...prevVideos[trendingCategoryPage], ...data.items.map((video:any) => {
              return(video['snippet']['thumbnails']['maxres'] ?
              video['snippet']['thumbnails']['maxres']['url']
              :
              video['snippet']['thumbnails']['standard']?
              video['snippet']['thumbnails']['standard']['url']
              :
              video['snippet']['thumbnails']['high']?
              video['snippet']['thumbnails']['high']['url']
              :
              video['snippet']['thumbnails']['medium']?
              video['snippet']['thumbnails']['medium']['url']
              :
              video['snippet']['thumbnails']['default']?
              video['snippet']['thumbnails']['default']['url']
              :'../assets/no_thumbnail.jpg'
              );
            })]}
          :
            {...prevVideos, [trendingCategoryPage]:
              [...data.items.map((video:any) => {
                return(video['snippet']['thumbnails']['maxres'] ?
                video['snippet']['thumbnails']['maxres']['url']
                :
                video['snippet']['thumbnails']['standard']?
                video['snippet']['thumbnails']['standard']['url']
                :
                video['snippet']['thumbnails']['high']?
                video['snippet']['thumbnails']['high']['url']
                :
                video['snippet']['thumbnails']['medium']?
                video['snippet']['thumbnails']['medium']['url']
                :
                video['snippet']['thumbnails']['default']?
                video['snippet']['thumbnails']['default']['url']
                :'../assets/no_thumbnail.jpg'
              );
            })]
            }
          );
        });
        urlObjectSetter((prevUrls:any) => {
          return (
            prevUrls[trendingCategoryPage]? (
            {...prevUrls, [trendingCategoryPage]:[...prevUrls[trendingCategoryPage], ...data.items.map((playerItem:any) => {
            return(playerItem['player'] ?
            playerItem['player']['embedHtml'].match(
              /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
            )[0]
            :'//www.youtube.com'
            );
        })]}
            )
            :
            (

            {...prevUrls, [trendingCategoryPage]:[...data.items.map((playerItem:any) => {
              return(playerItem['player'] ?
              playerItem['player']['embedHtml'].match(
                /\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\/embed\/[-a-zA-Z0-9@:%._\+~#=]{2,256}/
              )[0]
              :'//www.youtube.com'
              );
          })]}
            )
            );
        });
        setTokens((prevTokens:any) => {
          return (
            prevTokens[trendingCategoryPage]?
            {...prevTokens, [trendingCategoryPage]:[...prevTokens[trendingCategoryPage], data.nextPageToken]}
            :
            {...prevTokens, [trendingCategoryPage]:[data.nextPageToken]}
            );
        });
        setHasMore((prevHasMore:any) => {
          return {...prevHasMore, [trendingCategoryPage]:Boolean(data.nextPageToken)};
        });
        setLoading(false);
        // stateFunction(():any => [data])
      })
      .catch(e => {
        setError(true);
      })
      return () => ac.abort();
    }
  }, [nextVideoPage[trendingCategoryPage],pageName,trendingCategoryPage]);
  
    return {
      loading, error, hasMore
    };
}

export default useVideoSearch;