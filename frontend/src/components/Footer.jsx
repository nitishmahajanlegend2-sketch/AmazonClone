import React from 'react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const styles = {
        footer: {
            backgroundColor: '#232f3e',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            marginTop: '40px'
        },
        backToTop: {
            backgroundColor: '#37475a',
            color: 'white',
            padding: '15px',
            textAlign: 'center',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: '500'
        },
        container: {
            display: 'flex',
            justifyContent: 'space-around',
            padding: '40px 10% 20px 10%',
            maxWidth: '1200px',
            margin: '0 auto',
            flexWrap: 'wrap',
            gap: '20px'
        },
        column: {
            minWidth: '150px'
        },
        columnTitle: {
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '14px'
        },
        linkList: {
            listStyle: 'none',
            padding: 0,
            margin: 0
        },
        linkItem: {
            fontSize: '14px',
            color: '#DDD',
            marginBottom: '10px',
            cursor: 'pointer'
        },
        bottomSection: {
            borderTop: '1px solid #3a4553',
            padding: '30px 0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        logo: {
            width: '80px',
            marginBottom: '20px',
            cursor: 'pointer'
        },
        copyright: {
            fontSize: '12px',
            color: '#999',
            marginTop: '10px'
        }
    };

    const footerData = [
        {
            title: "Get to Know Us",
            links: ["About Us", "Careers", "Press Releases", "Amazon Science"]
        },
        {
            title: "Connect with Us",
            links: ["Facebook", "Twitter", "Instagram"]
        },
        {
            title: "Make Money with Us",
            links: ["Sell on Amazon", "Become an Affiliate", "Advertise Your Products"]
        },
        {
            title: "Let Us Help You",
            links: ["COVID-19 and Amazon", "Your Account", "Returns Centre", "Help"]
        }
    ];

    return (
        <footer style={styles.footer}>
            {/* Back to Top */}
            <div style={styles.backToTop} onClick={scrollToTop}>
                Back to top
            </div>

            {/* Link Columns */}
            <div style={styles.container}>
                {footerData.map((section, index) => (
                    <div key={index} style={styles.column}>
                        <div style={styles.columnTitle}>{section.title}</div>
                        <ul style={styles.linkList}>
                            {section.links.map((link, i) => (
                                <li key={i} style={styles.linkItem}>{link}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom Branding */}
            <div style={styles.bottomSection}>
                <img 
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                    alt="Amazon Logo" 
                    style={styles.logo} 
                />
                
                <div style={{fontSize: '12px', display: 'flex', gap: '15px', color: '#DDD'}}>
                    <span>Australia</span>
                    <span>Brazil</span>
                    <span>Canada</span>
                    <span>China</span>
                    <span>France</span>
                    
                </div>

                <div style={styles.copyright}>
                    Conditions of Use & Sale &nbsp; Privacy Notice &nbsp; Interest-Based Ads <br />
                    © 1996-2026, Amazon.com, Inc. or its affiliates
                </div>
            </div>
        </footer>
    );
};

export default Footer;