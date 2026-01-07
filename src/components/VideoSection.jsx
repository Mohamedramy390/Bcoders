import React, { memo } from 'react';
import { Laptop } from 'lucide-react';

const VideoSection = memo(({ isRTL }) => {
    return (
        <section className="video-section">
            <div className="section-header">
                <Laptop size={32} className="icon-star" />
                <h2>{isRTL ? "الحياة في B-Coders" : "Life at B-Coders"}</h2>
            </div>

            <div className="marquee-container" dir="ltr">
                <div className="marquee-track">
                    {[...Array(5)].map(() => [
                        "B7_zjRKEC_w",
                        "7t1oGld7yg8",
                        "EfzmvUv5CJE"
                    ]).flat().map((id, index) => (
                        <div key={index} className="video-card">
                            <iframe
                                src={`https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&controls=0&rel=0&modestbranding=1&playsinline=1&mute=1&disablekb=1&iv_load_policy=3`}
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
