import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import List from '../components/ListComponent';

function Project() {
    const [projects, setProjects] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/data.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
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
            
            {/* Section Projects */}
            <section>
                <h2 className='p-4 text-2xl font-bold'><FormattedMessage id='projectsTitle' defaultMessage="Projecten" /></h2>
                
                <hr />
                
                {loading ? (
                    <List data={projects} favorite={false} />
                ) : (
                    <p>Loading projects...</p>
                )}
            </section>
        </main>
    );
}

export default Project;
