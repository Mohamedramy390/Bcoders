import React, { memo } from 'react';
import { Map } from 'lucide-react';

const LocationSection = memo(({ title }) => {
    return (
        <section className="location-section">
            <div className="section-header">
                <Map className="icon-star" size={32} />
                <h2>{title}</h2>
            </div>
            <div className="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3412.1598317423845!2d29.958053075599448!3d31.216300974354553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDEyJzU4LjciTiAyOcKwNTcnMzguMyJF!5e0!3m2!1sen!2seg!4v1767787622557!5m2!1sen!2seg"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                ></iframe>
            </div>
        </section>
    );
});

export default LocationSection;
