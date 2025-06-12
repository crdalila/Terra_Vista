import "./Credits.css"

const CreditCard = ({ name = "Name", link = "" }) => {
    const randomIconIndex = Math.floor(Math.random() * 12) + 1;
    const iconPath = `/images/threeIcons/${randomIconIndex}.svg`;

    const colorList = ['#FFB41D', '#F96E43', '#3D9DD8', '#F78BD8', '#189B5C', '#7CE55E'];
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];

    return (
        <div className="credit-card" style={{ '--random-color': randomColor }}>
            <h4>{name}</h4>

            <img src={iconPath} alt={`icon-${randomIconIndex}`} className="project--icons" />

            <a href={link} target="_blank" className="credit-card--link">
                <div className="credit-card--link__text">
                    Follow me on LinkedIn<i>!</i>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
            </a>
        </div>
    );
};


function Credits() {


    return (
        <article className="article">
            <section className="page-header">
                <h2 className="page-title">Credits</h2>
                <div className="page-info">
                    <h3>Meet the team<i>!</i></h3>
                </div>
            </section>

            <section className="page-content" id="credits-page--content">
                <div className="credits-page--item">
                    <h3>Marketing</h3>
                    <div className="credits-page--users">
                        <CreditCard name="Inés Valdizán" link="www.linkedin.com/in/maría-inés-valdizán-martínez/" />
                        <CreditCard name="Ibai Irastorza" link="https://www.linkedin.com/in/ibaiirastorza/" />
                        <CreditCard name="Luisana Jimenez" link="https://www.linkedin.com/in/luisana-jimenez-marketing-digital/" />
                        <CreditCard name="Alonso Montalvo" link="www.linkedin.com/in/alonso-montalvo-rios-426488130/" />
                        <CreditCard name="Luis López" link="www.linkedin.com/in/luislopezgq/" />
                    </div>
                </div>

                <div className="credits-page--item">
                    <h3>Full Stack</h3>
                    <div className="credits-page--users">
                        <CreditCard name="Anaís Cabado (Done0424)" link="https://www.linkedin.com/in/anais-cabado-design/" />
                        <CreditCard name="Dalila Cabrera" link="https://www.linkedin.com/in/dalila-cabrera/" />
                        <CreditCard name="Sandra Fernández" link="https://www.linkedin.com/in/sandra-fernandez-menendez/" />
                        <CreditCard name="Kai Jauregi" link="https://www.linkedin.com/in/kaijauregi/" />
                    </div>
                </div>

                <div className="credits-page--item">
                    <h3>Data Science</h3>
                    <div className="credits-page--users">
                        <CreditCard name="Ana Barrios" link="https://www.linkedin.com/in/ana-barrios-alconada-839963226/" />
                        <CreditCard name="Mikel Guillén" link="www.linkedin.com/in/mikel-guillen-baque/" />
                        <CreditCard name="Nagore Juarez" link="https://www.linkedin.com/in/nagore-juarez-rodriguez/" />
                        <CreditCard name="Angelos Ampatzidis" link="https://www.linkedin.com/in/angelos-ampatzidis/" />
                        <CreditCard name="Itsazain M. Bilbao" link="linkedin.com/in/itsazain-m-bilbao/" />
                        <CreditCard name="Miguel Pozo" link="https://www.linkedin.com/in/miguelpozoa/" />
                    </div>
                </div>

                <div className="credits-page--item">
                    <h3>Cybersecurity</h3>
                    <div className="credits-page--users">
                        <CreditCard name="Mikel Rubio" link="https://www.linkedin.com/in/mikelrubio16/" />
                        <CreditCard name="Mariana Elisabeth Garzón" link="https://www.linkedin.com/in/mariana-garzon/" />
                        <CreditCard name="Asisko Arruabarrena" link="linkedin.com/in/asisko-arruabarrena/" />
                        <CreditCard name="Ander Gutiérrez" link="www.linkedin.com/in/ander-gutiérrez-fernandez-de-la-cuadra-751202365/" />
                    </div>
                </div>
            </section>
        </article>
    );
}

export default Credits;
