import React, { useEffect, useState } from 'react'
import api from "../../utils/api"
import { useSearchParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ChanelInfo from './ChanelInfo';
import VideoInfo from './VideoInfo';
import Comments from './Comments';
import VideoCard from '../../components/VideoCard'

const VideoDetail = () => {
    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState(null);

    const [searchParams] = useSearchParams();
    const id = searchParams.get("v");

    useEffect(() => {
        api.get(`/video/info?id=${id}&extend=1`).then((res) => setVideo(res?.data));
        api.get(`/comments?id=${id}`).then((res) => setComments(res?.data))
    }, [])
  
  return (
    <div className='h-screen detail-page overflow-auto'>
    <div>
        <div className='h-[50vh] lg:h-[60vh] overflow-hidden rounded-md'>
            <ReactPlayer 
            controls 
            width={"100%"}
            height={"100%"} 
            url={`https://youtube.com/watch?v=${id}`}
            />
        </div>

{!video && <p>Yükleniyor...</p> }

{video && (
    <>
    <h1 className="my-3 text-xl font-bold">{video.title}</h1>

    <ChanelInfo video={video}/>

    <VideoInfo video={video} />

    <Comments data={comments} />
    </> 
)}

    </div>

    <div>
        {video?.relatedVideos.data.map((item, index) => item.type === "video" && (
            <VideoCard video={item} key={index} isRow={true} />
        ))}
    </div>
    </div>
  )
}

export default VideoDetail