import React, { memo } from 'react';
import { Laptop } from 'lucide-react';

import videosData from '../content/videos.json';

const VideoSection = memo(({ isRTL }) => {
    // Determine how many times to repeat the list to ensure the marquee fills the screen
    // If we have few videos, we repeat them more times
    const sourceVideos = videosData.videos;
    const repeatCount = sourceVideos.length > 5 ? 2 : 5;

    return (
        <section className="video-section">
            <div className="section-header">
                <Laptop size={32} className="icon-star" />
                <h2>{isRTL ? "الحياة في B-Coders" : "Life at B-Coders"}</h2>
            </div>

            <div className="marquee-container" dir="ltr">
                <div className="marquee-track">
                    {[...Array(repeatCount)].map(() => sourceVideos).flat().map((video, index) => (
                        <div key={`${video.id}-${index}`} className="video-card">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&loop=1&playlist=${video.id}&controls=0&rel=0&modestbranding=1&playsinline=1&mute=1&disablekb=1&iv_load_policy=3`}
                                className="marquee-video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title="Student Video"
                                loading="lazy"
                                frameBorder="0"
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default VideoSection;
