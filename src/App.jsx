import React, { useState } from 'react';
import { Download, ChevronRight, Star, Code, Database, Globe, Shield, Calendar, User, Phone, MapPin, BookOpen, CheckCircle, Map, Laptop, Laptop2, Bot, BotIcon, BrainCircuit, Layout, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import VideoSection from './components/VideoSection';
import LocationSection from './components/LocationSection';

// --- GOOGLE SHEET CONFIGURATION ---
// 1. Create a Google Sheet and use the script from google_sheet_setup.md
// 2. Paste your Web App URL below:
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbyYUD24m37SNWfEqDdZA25V6NSZo-i8-LTE4d5Q5Slfd87BLjDa8zeEoMe8fSF6Y2lv/exec";

const courses = [
  {
    id: 1,
    title: "Junior Discoveries Diploma",
    titleAr: "دبلومة المكتشف الصغير",
    description: "Start your digital journey! Learn computer basics, digital art with Paint, and your first coding steps with Scratch.",
    descriptionAr: "ابدأ رحلتك الرقمية! تعلم أساسيات الكمبيوتر، والرسم الرقمي، وأولى خطوات البرمجة باستخدام سكراتش.",
    icon: <Laptop2 size={40} className="icon-primary" />,
    link: "/curricula/Junior Discoveries Diploma-1.pdf"
  },
  {
    id: 2,
    title: "AI For Kids Diploma",
    titleAr: "دبلومة الذكاء الاصطناعي للأطفال",
    description: "Create games and learn AI! Build interactive stories with PictoBlox and train models to recognize images and voices.",
    descriptionAr: "اصنع الألعاب وتعلم الذكاء الاصطناعي! صمم قصصاً تفاعلية مع PictoBlox ودرب نماذج لتمييز الصور والأصوات.",
    icon: <BotIcon size={40} className="icon-secondary" />,
    link: "/curricula/AI for kids diploma-2.pdf"
  },
  {
    id: 3,
    title: "Python AI Diploma",
    titleAr: "دبلومة بايثون والذكاء الاصطناعي",
    description: "Master Python programming! From basics to advanced AI, learn to train computers to play games and solve problems.",
    descriptionAr: "احترف لغة بايثون! من الأساسيات إلى الذكاء الاصطناعي المتقدم، تعلم كيف تدرب الكمبيوتر على لعب الألعاب وحل المشكلات.",
    icon: <BrainCircuit size={40} className="icon-accent" />,
    link: "/curricula/Python AI diploma.pdf"
  },
  {
    id: 4,
    title: "Front End Web Diploma",
    titleAr: "دبلومة تصميم واجهات الويب",
    description: "Design professional websites! Master HTML, CSS, JavaScript, and ReactJS to build stunning, interactive web applications.",
    descriptionAr: "صمم مواقع احترافية! اتقن HTML و CSS و JavaScript و ReactJS لبناء تطبيقات ويب تفاعلية ومذهلة.",
    icon: <Layout size={40} className="icon-primary" />,
    link: "/curricula/Web design diploma-3.pdf"
  }
];

const content = {
  en: {
    heroBadge: "🚀 Super Powers for Kids",
    heroTitle: "Unleash Your Inner",
    heroTitleHighlight: "Coding Hero",
    heroSubtitle: "Join B-Coders Academy and learn to build games, websites, and robots. The future is yours to create!",
    cta: "Start Your Adventure",
    coursesTitle: "Choose Your Mission",
    download: "Curriculum",
    formTitle: "Join the Squad",
    formSubtitle: "Fill out this form to reserve your spot!",
    nameLabel: "Student Name",
    dobLabel: "Birthday",
    fatherPhoneLabel: "Father's Phone",
    motherPhoneLabel: "Mother's Phone",
    modeLabel: "Course Mode",
    courseLabel: "Select Mission (Course)",
    modeOnline: "Online 🌐",
    modeOnsite: "Onsite 🏫",
    submit: "Register Now",
    footer: "© 2024 B-Coders. Building the future, one line of code at a time.",
    contact: "Contact Us",
    formSuccess: "Awesome! You're on the list. 🚀",
    aboutTitle: "Who We Are",
    aboutText1: "B-Coders is an academy dedicated to empowering the next generation of technology leaders. We believe that coding is not just about typing lines of text; it's about creativity, problem-solving, and building the future.",
    aboutText2: "Our courses are designed specifically for kids and teens, making complex concepts fun and easy to understand. With expert mentors and hands-on projects, we turn passive consumers of technology into active creators.",
    locationTitle: "Our Base of Operations",
  },
  ar: {
    heroBadge: "🚀 قوى خارقة للأطفال",
    heroTitle: "أطلق العنان لقدراتك",
    heroTitleHighlight: "كـبطل برمجة",
    heroSubtitle: "انضم إلى أكاديمية B-Coders وتعلم بناء الألعاب والمواقع والروبوتات. المستقبل بانتظارك لتبدعه!",
    cta: "ابدأ مغامرتك",
    coursesTitle: "اختر مهمتك",
    download: "المنهج الدراسي",
    formTitle: "انضم إلى الفريق",
    formSubtitle: "املأ هذا النموذج لحجز مكانك!",
    nameLabel: "اسم الطالب",
    dobLabel: "تاريخ الميلاد",
    fatherPhoneLabel: "رقم هاتف الأب",
    motherPhoneLabel: "رقم هاتف الأم",
    modeLabel: "نظام الدورة",
    courseLabel: "اختر المهمة (الدورة)",
    modeOnline: "أونلاين 🌐",
    modeOnsite: "في المقر 🏫",
    submit: "سجل الآن",
    footer: "© 2024 B-Coders. نبني المستقبل، بسطر كود كل مرة.",
    contact: "تواصل معنا",
    formSuccess: "رائع! تم تسجيلك في القائمة. 🚀",
    aboutTitle: "من نحن",
    aboutText1: "بي-كودرز هي أكاديمية مكرسة لتمكين الجيل القادم من قادة التكنولوجيا. نحن نؤمن بأن البرمجة ليست مجرد كتابة أسطر من النصوص؛ إنها تتعلق بالإبداع وحل المشكلات وبناء المستقبل.",
    aboutText2: "تم تصميم دوراتنا خصيصًا للأطفال والمراهقين، مما يجعل المفاهيم المعقدة ممتعة وسهلة الفهم. مع موجهين خبراء ومشاريع عملية، نحول مستخدمي التكنولوجيا إلى مبدعين حقيقيين.",
    locationTitle: "مقر عملياتنا",
  }
};

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
                  {course.icon}
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
          <a href="https://www.facebook.com/share/18BmEuwDqg/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
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
