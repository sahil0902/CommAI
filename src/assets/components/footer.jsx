
export default function Footer() {
    const footerStyle = {
        padding: "20px",
        textAlign: "center",
        fontSize: "14px",
    };

    const currentYear = new Date().getFullYear();

    return (
        <div style={footerStyle}>
            <p>Built by <a href="https://www.linkedin.com/in/muhammad-sahil-983b2a23a/" target="_blank" rel="noopener noreferrer">Sahil</a></p>
            <p>All rights reserved &copy; {currentYear}</p>
        </div>
    );
}