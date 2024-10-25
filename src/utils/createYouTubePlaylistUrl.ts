import { Trailer } from "types/movieTypes";

const createYouTubePlaylistUrl = (videos: Trailer[]) => {
    const videoKeys = videos.map(video => video.key).join(',');
    
    return `https://www.youtube.com/watch_videos?video_ids=${videoKeys}`;;
}

export default createYouTubePlaylistUrl;