import React, { memo } from 'react';
import { CheckCircle } from 'lucide-react';

const AboutSection = memo(({ t }) => {
    return (
        <section className="about-section">
            <div className="section-header">
                <CheckCircle className="icon-star" size={32} />
                <h2>{t.aboutTitle}</h2>
            </div>
            <div className="about-grid">
                <div className="about-visual">
                    <img
                        src="/student_mascot.png"
                        alt="Student Mascot"
                        className="about-img"
                        loading="eager"
                        width="400"
                        height="400"
                    />
                </div>
                <div className="about-content">
                    <p>{t.aboutText1}</p>
                    <p>{t.aboutText2}</p>
                </div>
            </div>
        </section>
    );
});

export default AboutSection;
