import "./Footer.css";

function Footer() {
    return (
        <article className="footer">
            <section className="footer-image">
                <img src="../../../public/images/terra_vista10k.png" alt="logo" className="footer-logo" />
            </section>

            <section className="footer-copyright">
                <p>© 2025 Terra Vista. All Rights Reserved. | Privacy Policy | Terms & Conditions | Site Map</p>
            </section>
        </article>
    );
}

export default Footer;