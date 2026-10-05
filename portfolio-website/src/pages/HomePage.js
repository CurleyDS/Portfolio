import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import List from '../components/ListComponent';
import prflpic from '../assets/profile.jpg';

function Home() {
    const navigate = useNavigate();
    const { hash } = useLocation();

    const [languages, setLanguages] = useState([]);
    const [frameworks, setFrameworks] = useState([]);
    const [projects, setProjects] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const sectionId = hash.replace('#', '');
        const section = document.getElementById(sectionId);
        
        if (section != null) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, [hash]);

    useEffect(() => {
        fetch('/data.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setLanguages(data.languages);
            setFrameworks(data.frameworks);
            setProjects(data.projects);
            setLoading(true);
        })
        .catch((error) => {
            setError(error);
            setLoading(true);
        });
    }, []);
    
    return (
        <main className='flex flex-col justify-center max-w-5xl mx-auto p-2 gap-5'>
            {/* Hidden Section */}
            <section id='top'>
                {error && <p>Error: {error.message}</p>}
            </section>

            {/* Section About Me */}
            <section className='min-h-screen' id="aboutme">
                <h2 className='p-4 text-2xl font-bold'><FormattedMessage id='aboutTitle' defaultMessage="Over Mij" /></h2>
                
                <hr />
                
                <div className='flex flex-row items-center py-4'>
                    <div className='px-4'>
                        <img src={prflpic} alt="Portfolio" className='object-scale-down max-w-56 h-auto rounded-lg shadow-lg' />
                    </div>
                    <div className='px-4'>
                        <p className='whitespace-pre-line'>
                            <FormattedMessage
                                id='introduction'
                                defaultMessage={
                                    `Hallo! Mijn naam is Dylan Schoop. Ik ben een derdejaars student van de opleiding
                                    Creative Media & Game Technologies (CMGT) aan de Hogeschool Rotterdam. Ook heb ik
                                    een mbo diploma in Software Development tijdens mijn studie aan het Da Vinci College.

                                    Als Creative Developer heb ik kennis opgedaan van programmeren en ontwikkelen. Ik
                                    heb ervaring met HTML, CSS, Javascript, PHP en SQL, evenals frameworks zoals React,
                                    Vue.js, Laravel en Node.js. Ook heb ik een beetje ervaring met Python en Unity. Mijn
                                    meest recente project is een app die gebruik maakt van Gamificatie.

                                    Mijn hobby's zijn sporten, gamen, shows kijken, tekenen, naar muziek te luisteren
                                    en af en toe gitaar te spelen. Mijn doel is om van deze hobby's en creativiteit
                                    gebruik te maken in Serious Games.`
                                }
                            />
                            {/* Stel jezelf voor een geef aan wat je kan! Zie mails en motivatie als voorbeeld. */}
                            {/* Derde kopje omveranderen dat je een creative developer bent en dat je een meer creatieve kant
                            van Software Development op wilt. Geef later in één zin aan dat je doel eindigt als iemand die Serious Games ontwikkelt. */}
                            {/* Waarvoor heb je voor creativiteit in de opleiding gekozen? */}
                            {/* Geef je contacten mee (Github, LinkedIn, etc.) */}
                        </p>
                    </div>
                </div>
            </section>

            {/* Section Projects */}
            <section className='min-h-screen flex flex-col' id="projects">
                <h2 className='p-4 text-2xl font-bold'><FormattedMessage id='projectsTitle' defaultMessage="Projecten" /></h2>
                
                <hr />
                
                <div className='flex flex-col py-4'>
                    <div className='px-4'>
                        <p><FormattedMessage id='bestProjects' defaultMessage="Hier zijn mijn beste projecten waar ik aan heb gewerkt:" /></p>
                        {loading ? (
                            <List data={projects} favorite={true} />
                        ) : (
                            <p>Loading projects...</p>
                        )}
                        <button className='underline text-orange-700' onClick={() => navigate('/projects')}><FormattedMessage id='moreProjects' defaultMessage="Projecten" /></button>
                    </div>
                </div>
            </section>
            {/* Verander om dat je minder hoeft te klikken. Misschien naar nieuwe pagina navigeren. Laat hierin zien wat je kunt! */}
            {/* Toon projecten waar je trots op bent! Andere projecten kun je tonen in de een Overig lijst */}
            {/* Haal links eruit. Werken toch niet. Gebruik afbeeldingen. */}
            {/* Reflecteer welke vaardigheden je hebt opgedaan door je projecten. */}

            {/* Section Skills */}
            <section className='min-h-screen flex flex-col' id="skills">
                <h2 className='p-4 text-2xl font-bold'><FormattedMessage id='skillsTitle' defaultMessage="Vaardigheden" /></h2>
                
                <hr />
                
                <p className='p-5'><FormattedMessage id='coding' defaultMessage="Ik ben vaardig in het gebruik van codeertalen en/of frameworks:" /></p>
                {loading ? (
                    <div className='flex-1'>
                        <List data={languages} />
                    </div>
                ) : (
                    <p className='p-5'>Loading slides...</p>
                )}
                
                <p className='p-5'><FormattedMessage id='frameworks' defaultMessage="Ik heb ook wat ervaring met andere codeertalen en/of frameworks:" /></p>
                {loading ? (
                    <div className='flex-1'>
                        <List data={frameworks} />
                    </div>
                ) : (
                    <p className='p-5'>Loading slides...</p>
                )}
            </section>
            {/* Beschrijf dit in je projecten. Laat zien dat je dit in je projecten kunt doen. Som het later op! */}
            
            {/* Section Contact */}
            <section id="contact">
                <h2 className='p-4 text-2xl font-bold'><FormattedMessage id='contactTitle' defaultMessage="Contact" /></h2>
                
                <hr />
                
                <p className='p-5'>
                    <FormattedMessage
                        id='contacts'
                        values={{
                            mail: (chunks) => <a href="mailto:dylanschoop@gmail.com">{chunks}</a>,
                            linkedIn: (chunks) => <a target="_blank" className='underline text-orange-700' href="https://www.linkedin.com/in/dylan-schoop-b5b753174/" rel="noopener noreferrer">{chunks}</a>,
                            instagram: (chunks) => <a target="_blank" className='underline text-orange-700' href="https://www.instagram.com/dylan_cmgt/" rel="noopener noreferrer">{chunks}</a>
                        }}
                        defaultMessage={
                            `U kunt mij bereiken via <mail>dylanschoop@gmail.com</mail> of bezoek mijn socials
                            <linkedIn>LinkedIn</linkedIn> en <instagram>Instagram</instagram>.`
                        }
                    />
                </p>
            </section>

            {/* Example Slides-section */}
            {/* <section className='min-h-screen flex flex-col' id="projects">
                <h2 className='p-4 text-2xl font-bold'><FormattedMessage id='projectsTitle' defaultMessage="Projecten" /></h2>
                
                <hr />
                
                <p className='p-5'><FormattedMessage id='projects' defaultMessage="Dit zijn projecten waar ik aan heb gewerkt:" /></p>
                {loading ? (
                    <div className='flex-1'>
                        <Slides data={projects} />
                    </div>
                ) : (
                    <p className='p-5'>Loading slides...</p>
                )}
            </section> */}
        </main>
    );
}

export default Home;
