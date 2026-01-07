import React, { memo } from 'react';
import { motion } from 'framer-motion';

const HeroSection = memo(({ t, onCtaClick }) => {
    return (
        <section className="hero-section">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="hero-content"
            >
                <div className="badge animate-bounce-slow">
                    {t.heroBadge}
                </div>
                <h1 className="hero-title">
                    {t.heroTitle} <br />
                    <span className="text-highlight">
                        {t.heroTitleHighlight}
                    </span>
                </h1>
                <p className="hero-subtitle">
                    {t.heroSubtitle}
                </p>

                <div className="hero-actions">
                    <button onClick={onCtaClick} className="btn-primary push-effect">
                        {t.cta}
                    </button>
                </div>
            </motion.div>
        </section>
    );
});

export default HeroSection;
