import React, { useEffect, useRef } from 'react';
import './home2.scss';

export default function Home2() {
    const comixContainerRef = useRef(null);

    useEffect(() => {
        const comixItems = comixContainerRef.current.children;

        // Intersection Observer callback
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                const index = Array.from(comixItems).indexOf(entry.target); // Pobranie indeksu elementu
                const delay = index * 0.2; // Opóźnienie w sekundach (dla każdego kolejnego elementu zwiększa się o 0.2s)

                if (entry.isIntersecting) {
                    // Element wchodzi do widoku: rozpocznij animację z opóźnieniem
                    entry.target.style.transitionDelay = `${delay}s`;
                    entry.target.style.transform = 'translateY(0px)';
                    entry.target.style.opacity = '1';
                } else {
                    // Element opuszcza widok: resetuj do pierwotnej pozycji bez opóźnienia
                    entry.target.style.transitionDelay = '0s';
                    entry.target.style.transform = 'translateY(200px)';
                    entry.target.style.opacity = '0';
                }
            });
        };

        // Ustawienia Intersection Observer
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5, // Procent widoczności elementu wymagany do aktywacji
        });

        // Obserwowanie każdego elementu comix-item
        Array.from(comixItems).forEach((item) => {
            observer.observe(item);
        });

        // Czyszczenie obserwatora po demontażu komponentu
        return () => {
            Array.from(comixItems).forEach((item) => {
                observer.unobserve(item);
            });
        };
    }, []);

    return (
        <div className="home2-container">
            {/* Heading */}
            <h1>Po co to całe gówno?</h1>

            {/* Comix 1-3 */}
            <div ref={comixContainerRef} className="comix-container">
                <div className="comix-item">Comix 1</div>
                <div className="comix-item">Comix 2</div>
                <div className="comix-item">Comix 3</div>
            </div>
        </div>
    );
}
