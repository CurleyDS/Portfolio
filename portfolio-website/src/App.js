import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './fontAwesome';
import { IntlProvider } from 'react-intl';
import { messages } from './i18n/messages';
import Home from './pages/HomePage';
import Project from './pages/ProjectPage';
import Navbar from './components/NavComponent';
import Footer from './components/FooterComponent';

function App({ switchLocale }) {
    return (
        <>
            {/* Navigation Bar */}
            <Navbar switchLocale={switchLocale} />

            {/* Main */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Project />} />
            </Routes>

            {/* Footer */}
            <Footer />
        </>
    );
}

function AppWrapper() {
    const [locale, setLocale] = useState('nl'); // default locale

    const switchLocale = (newLocale) => {
        setLocale(newLocale);
    };

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <Router>
                <App switchLocale={switchLocale} />
            </Router>
        </IntlProvider>
    );
}

export default AppWrapper;
