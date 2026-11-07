import React, { createContext, useState } from 'react';

export const LayoutContext = createContext();

export function LayoutProvider({ children }) {
    const [layout, setLayout] = useState('casual');

    const switchLayout = (newLayout) => {
        if (newLayout === 'casual' || newLayout === 'creative') {
            setLayout(newLayout);
        }
    };

    return (
        <LayoutContext.Provider value={{ layout, switchLayout }}>
            {children}
        </LayoutContext.Provider>
    );
}
