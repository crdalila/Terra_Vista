import "./Footer.css";

function Footer() {
    return (
        <article className="footer">
            <section className="footer-image">
                <img src="../../../public/images/logo_terra_vista.png" alt="logo" className="footer-logo" />
            </section>

            <section className="footer-copyright">
                <p>© 2025 Terra Vista. All Rights Reserved. | Privacy Policy | Terms & Conditions | Site Map</p>
            </section>
        </article>
    );
}

export default Footer;