import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

function List({ data = [], favorite = false }) {
    const intl = useIntl();
    const currentLocale = intl.locale;
    
    const [currentKey, setCurrentKey] = useState(null);

    const toggleDetails = (key) => {
        data[key].description && setCurrentKey((prevKey) => (prevKey === key ? null : key));
    };

    const markdownComponents = {
        p: ({ node, ...props }) => (
            <p
                {...props}
                className='py-1'
            />
        ),
        img: ({ node, ...props }) => (
            <img
                {...props}
                className="inline-block object-scale-down max-w-[33%] h-auto mx-auto"
            />
        ),
    };

    useEffect(() => {
        if (currentKey !== null) {
            const detail = document.getElementById(`detail-${currentKey}`);
            detail && detail.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentKey]);
    
    return (
        <ul>
            {data.filter((item) => !favorite || item.favoritized).map((item, index) => (
                <li key={index}>
                    <span className='flex flex-row w-full items-center'>
                        <div className='flex flex-row flex-1' onClick={() => toggleDetails(index)}>
                            <div className='p-5'>
                                <img src={item.img} alt={item.title} className='object-scale-down h-32 w-64' />
                            </div>
                            <div className='flex flex-col p-5 justify-center text-left'>
                                <div className='flex items-center'>
                                    <h3>{item.title}</h3>
                                </div>
                                <div className='flex items-center'>
                                    {item.summary !== null && <p>{item.summary[currentLocale]}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='p-5'>
                            {item.github_link && <a href={item.github_link} target="_blank" rel="noopener noreferrer" title='Go to Github Project'>
                                <FontAwesomeIcon icon={faGithub} size='2x' />
                            </a>}
                        </div>
                    </span>
                    <span className={`flex items-start justify-center w-full transform transition-all duration-500 ease-in-out ${
                        currentKey === index
                            ? "opacity-100 scale-100 h-auto"
                            : "opacity-0 scale-95 h-0 overflow-hidden"
                        }`}
                    >
                        <div className='flex flex-col'>
                            <div id={`detail-${index}`} className='flex justify-center p-5'>
                                <img src={item.img} alt={item.title} className='object-scale-down h-64' />
                            </div>
                            <div className='flex flex-col p-5 text-left'>
                                <div className='flex items-center'>
                                    <h2 className='text-2xl font-bold text-left'>{item.title}</h2>
                                </div>
                                <div className='flex items-center'>
                                    {item.description && (
                                        <ReactMarkdown className="text-left" components={markdownComponents}>
                                            {item.description[currentLocale]}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                            <div className='flex justify-end p-5'>
                                <FontAwesomeIcon icon={faChevronUp} size='2x' onClick={() => toggleDetails(index)} />
                            </div>
                            
                            <hr className='p-5' />
                        </div>
                    </span>
                </li>
            ))}
        </ul>
      );
};

export default List;
