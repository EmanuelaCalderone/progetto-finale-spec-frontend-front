import '../styles/Footer.css';

function Footer() {

    return (
        <footer className="footer-container">
            <p>{new Date().getFullYear()} Emanuela Calderone - Junior Front-end Developer</p>

            <div className="contact-icons">

                {/* email */}
                <a
                    href="mailto:emanuelacalderone3006@gmail.com"
                    title="Invia email"
                    target="_blank"
                >
                    <i className="fas fa-envelope"></i>
                </a>

                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/emanuela-calderone-webdeveloper/"
                    target="_blank"
                    title="Vai su LinkedIn"
                >
                    <i className="fab fa-linkedin"></i>
                </a>

                {/* GitHub */}
                <a
                    href="https://github.com/EmanuelaCalderone"
                    target="_blank"
                    title="Vai su GitHub"
                >
                    <i className="fab fa-github"></i>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
