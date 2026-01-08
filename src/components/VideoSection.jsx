import React, { memo } from 'react';
import { Laptop } from 'lucide-react';

import videosData from '../content/videos.json';

const VideoSection = memo(({ isRTL }) => {
    // Determine how many times to repeat the list to ensure the marquee fills the screen
    // If we have few videos, we repeat them more times
    const sourceVideos = videosData.videos;
    const repeatCount = sourceVideos.length > 5 ? 2 : 5;

    // Helper to extract ID from various YouTube URL formats
    const getYoutubeId = (url) => {
        if (!url) return "";
        // Handle direct IDs
        if (!url.includes("/")) return url;

        // Handle URLs
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : url;
    };

    return (
        <section className="video-section">
            <div className="section-header">
                <Laptop size={32} className="icon-star" />
                <h2>{isRTL ? "الحياة في B-Coders" : "Life at B-Coders"}</h2>
            </div>

            <div className="marquee-container" dir="ltr">
                <div className="marquee-track">
                    {[...Array(repeatCount)].map(() => sourceVideos).flat().map((video, index) => {
                        const videoId = getYoutubeId(video.id);
                        return (
                            <div key={`${videoId}-${index}`} className="video-card">
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1&mute=1&disablekb=1&iv_load_policy=3`}
                                    className="marquee-video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    title="Student Video"
                                    loading="lazy"
                                    frameBorder="0"
                                ></iframe>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});

export default VideoSection;
