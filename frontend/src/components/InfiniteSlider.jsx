import React from 'react';

function InfiniteSlider() {
    const styles = {
        viewport: {
            width: '100%',
            overflow: 'hidden', // Hides the images outside the box
            backgroundColor: '#f3f3f3',
            padding: '20px 0'
        },
        track: {
            display: 'flex',
            width: 'calc(200% + 40px)', // Double width to hold two sets of images
            animation: 'scroll 20s linear infinite', // Continuous linear motion
        },
        imageCard: {
            width: '300px',
            height: '200px',
            margin: '0 10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0 // Prevents images from squishing
        },
        img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px'
        }
    };

    const images = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605398417419-3c58b32b0c0c?q=80&w=1500&auto=format&fit=crop"
];
    return (
        <div style={styles.viewport}>
            <div style={styles.track}>
                {/* First Set of Images */}
                {images.map((url, index) => (
                    <div key={`set1-${index}`} style={styles.imageCard}>
                        <img src={url} alt="amazon-offer" style={styles.img} />
                    </div>
                ))}
                {/* Duplicate Set (to create the infinite loop effect) */}
                {images.map((url, index) => (
                    <div key={`set2-${index}`} style={styles.imageCard}>
                        <img src={url} alt="amazon-offer" style={styles.img} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InfiniteSlider;