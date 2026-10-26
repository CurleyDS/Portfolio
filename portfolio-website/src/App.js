import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { messages } from './i18n/messages';

import Home from './layouts/Casual/pages/HomePage';
import Project from './layouts/Casual/pages/ProjectPage';

import Navbar from './layouts/Casual/components/NavComponent';
import Footer from './layouts/Casual/components/FooterComponent';

import './fontAwesome';

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
