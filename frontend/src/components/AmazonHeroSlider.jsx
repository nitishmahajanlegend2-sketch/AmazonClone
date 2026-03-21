import React from 'react';

function AmazonHeroSlider() {
    const images = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1500&auto=format&fit=crop"
    
];

    const styles = {
        viewport: {
            width: '100%',
            height: '450px',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: '#eaeded' // Amazon light gray background
        },
        slider: {
            display: 'flex',
            width: '300%', // 3 images = 300%
            height: '100%',
            animation: 'slide-and-pause 9s infinite ease-in-out', 
        },
        imageContainer: {
            width: '30%',
            height: '30%',
            flexShrink: 0
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // This mask creates the Amazon "fade to bottom" look
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
        }
    };

    return (
        <div style={styles.viewport}>
            <div style={styles.slider}>
                {images.map((url, index) => (
                    <div key={index} style={styles.imageContainer}>
                        <img src={url} alt={`banner-${index}`} style={styles.image} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AmazonHeroSlider;