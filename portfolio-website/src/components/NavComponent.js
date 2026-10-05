import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

function Navbar({ switchLocale }) {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
            document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className='bg-white sticky top-0 z-10 flex justify-center'>
            <button
                className='font-normal text-base w-full text-center p-5 hover:font-semibold hover:text-lg hover:py-4 transition-all'
                onClick={() => navigate('/')}
            >
                <FormattedMessage id='navHome' defaultMessage="Home" />
            </button>
            <button
                className='font-normal text-base w-full text-center p-5 hover:font-semibold hover:text-lg hover:py-4 transition-all'
                onClick={() => navigate('/#aboutme')}
            >
                <FormattedMessage id='navAbout' defaultMessage="Over Mij" />
            </button>
            <button
                className='font-normal text-base w-full text-center p-5 hover:font-semibold hover:text-lg hover:py-4 transition-all'
                onClick={() => navigate('/#projects')}
            >
                <FormattedMessage id='navProjects' defaultMessage="Projecten" />
            </button>
            <button
                className='font-normal text-base w-full text-center p-5 hover:font-semibold hover:text-lg hover:py-4 transition-all'
                onClick={() => navigate('/#skills')}
            >
                <FormattedMessage id='navSkills' defaultMessage="Vaardigheden" />
            </button>
            <button
                className='font-normal text-base w-full text-center p-5 hover:font-semibold hover:text-lg hover:py-4 transition-all'
                onClick={() => navigate('/#contact')}
            >
                <FormattedMessage id='navContact' defaultMessage="Contact" />
            </button>

            <div className="relative" ref={dropdownRef}>
                <div className="bg-gray-300 w-full text-center p-5 cursor-pointer" onClick={toggleDropdown}>
                    <FormattedMessage id='translation' defaultMessage="Talen" />
                </div>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                        <button
                            className='font-normal text-base p-5 hover:font-semibold hover:text-lg hover:py-4 transition-all'
                            onClick={() => switchLocale('nl')}
                        >
                            Nederlands
                        </button>
                        <button
                            className='font-normal text-base p-5 hover:font-semibold hover:text-lg hover:py-4 transition-all'
                            onClick={() => switchLocale('en')}
                        >
                            English
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;