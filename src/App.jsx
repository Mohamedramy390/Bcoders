import React, { useState } from 'react';
import { Download, ChevronRight, Star, Code, Database, Globe, Shield, Calendar, User, Phone, MapPin, BookOpen, CheckCircle, Map, Laptop, Laptop2, Bot, BotIcon, BrainCircuit, Layout, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import VideoSection from './components/VideoSection';
import LocationSection from './components/LocationSection';

import uiContent from './content/ui.json';
import coursesData from './content/courses.json';

// --- GOOGLE SHEET CONFIGURATION ---
// 1. Create a Google Sheet and use the script from google_sheet_setup.md
// 2. Paste your Web App URL below:
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbyYUD24m37SNWfEqDdZA25V6NSZo-i8-LTE4d5Q5Slfd87BLjDa8zeEoMe8fSF6Y2lv/exec";

// Icon Mapping
const iconMap = {
  Laptop2: <Laptop2 size={40} className="icon-primary" />,
  BotIcon: <BotIcon size={40} className="icon-secondary" />,
  BrainCircuit: <BrainCircuit size={40} className="icon-accent" />,
  Layout: <Layout size={40} className="icon-primary" />,
  Code: <Code size={40} className="icon-primary" />,
  Database: <Database size={40} className="icon-accent" />,
  Globe: <Globe size={40} className="icon-secondary" />,
  Shield: <Shield size={40} className="icon-primary" />
};

const courses = coursesData.courses;
const content = uiContent;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

function App() {
  const [lang, setLang] = useState('en');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    birthday: '',
    fatherPhone: '',
    motherPhone: '',
    mode: '',
    course: ''
  });

  const t = content[lang];
  const isRTL = lang === 'ar';

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (SHEET_API_URL) {
      // Send data to Google Sheet Web App
      fetch(SHEET_API_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script to accept the request from browser
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          console.log("Form submitted!");
        })
        .catch((error) => console.error("Error!", error.message));
    }

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        studentName: '',
        birthday: '',
        fatherPhone: '',
        motherPhone: '',
        mode: '',
        course: ''
      });
    }, 5000);
  };

  return (
    <div className={`app-container ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="blobs-wrapper">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>
      </div>

      <header className="main-header">
        <div className="logo-container">
          <div className="logo-wrapper">
            <img src="/logo-2.png" alt="B-Coders Logo" className="logo-img" />
          </div>
          <span className="logo-text">B-CODERS</span>
        </div>
        <div className="nav-actions">
          <button onClick={toggleLang} className="lang-toggle btn-glass">
            {lang === 'en' ? '🇮🇶 العربية' : '🇺🇸 English'}
          </button>
          <button onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })} className="btn-secondary hidden-mobile">
            {t.submit}
          </button>
        </div>
      </header>

      <main className="main-content">

        <HeroSection
          t={t}
          onCtaClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}
        />

        <AboutSection t={t} />

        <VideoSection isRTL={isRTL} />

        {/* Courses Cards */}
        <section id="courses" className="courses-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Star className="icon-star spin-slow" size={32} />
            <h2>{t.coursesTitle}</h2>
          </motion.div>

          <motion.div
            className="courses-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {courses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className="course-card glass-panel"
                whileHover={{ y: -10 }}
              >
                <div className="card-icon-wrapper">
                  {iconMap[course.iconName] || <Code size={40} />}
                </div>

                <h3>{isRTL ? course.titleAr : course.title}</h3>
                <p>
                  {isRTL ? course.descriptionAr : course.description}
                </p>

                <a
                  href={course.link}
                  className="card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download size={18} />
                  {t.download}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <LocationSection title={t.locationTitle} />

        {/* Registration Form */}
        <section id="register" className="form-section">
          <div className="form-container glass-panel">
            <div className="form-header">
              <h2>{t.formTitle}</h2>
              <p>{t.formSubtitle}</p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-message"
              >
                <CheckCircle size={64} className="text-green-400 mb-4" />
                <h3>{t.formSuccess}</h3>
              </motion.div>
            ) : (
              <form
                className="registration-form"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label>
                    <User size={18} className="form-icon" />
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    placeholder={isRTL ? "الاسم الثلاثي" : "Full Name"}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Calendar size={18} className="form-icon" />
                    {t.dobLabel}
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <Phone size={18} className="form-icon" />
                      {t.fatherPhoneLabel}
                    </label>
                    <input
                      type="tel"
                      name="fatherPhone"
                      value={formData.fatherPhone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Phone size={18} className="form-icon" />
                      {t.motherPhoneLabel}
                    </label>
                    <input
                      type="tel"
                      name="motherPhone"
                      value={formData.motherPhone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <MapPin size={18} className="form-icon" />
                    {t.modeLabel}
                  </label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="mode"
                        value="online"
                        checked={formData.mode === "online"}
                        onChange={handleChange}
                        required
                      />
                      <span>{t.modeOnline}</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="mode"
                        value="onsite"
                        checked={formData.mode === "onsite"}
                        onChange={handleChange}
                      />
                      <span>{t.modeOnsite}</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <BookOpen size={18} className="form-icon" />
                    {t.courseLabel}
                  </label>
                  <select
                    required
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="custom-select"
                  >
                    <option value="" disabled>{isRTL ? "اختر الدورة..." : "Select a course..."}</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.title}>
                        {isRTL ? c.titleAr : c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="submit-btn btn-primary push-effect">
                  {t.submit}
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      <footer className="main-footer">
        <div className="social-links">
          <a href="https://www.facebook.com/share/19y3PioPYM/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
            <Facebook size={24} />
          </a>
          <a href="https://www.instagram.com/bstudy.coders?igsh=YjBseTdraXZnbGtp" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
            <Instagram size={24} />
          </a>
          <a href="https://www.linkedin.com/company/b-study/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>

        </div>
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}

export default App;
