
export default function Footer() {
    const footerStyle = {
        padding: "20px",
        textAlign: "center",
        fontSize: "14px",
    };

    const currentYear = new Date().getFullYear();

    return (
        <div style={footerStyle}>
            <p>Built with 💻 by <a href="https://www.linkedin.com/in/muhammad-sahil-983b2a23a/" target="_blank" rel="noopener noreferrer">Sahil</a></p>
            <p>This application uses React to deliver seamless, interactive user experiences.</p>
            <p>Our web app helps users write and manage emails and text messages efficiently.</p>
            <p>All rights reserved &copy; {currentYear}</p>
        </div>
    );
}