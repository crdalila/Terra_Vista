const CreditCard = ({ name = "Name", link = "" }) => {
    return (
        <div>
            <div className="instructions-item">
                <h4>{name} · <a href={link} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                    </svg>
                </a></h4>
            </div>
            <img alt="random icon"
                className="project--icons"
                src="/images/threeIcons/9.svg" />
        </div>
    );
};


function Credits() {


    return (
        <article className="article">
            <section className="page-header">
                <h2 className="page-title">Credits</h2>
            </section>

            <section className="page-content">
                <h3>Marketing</h3>
                <CreditCard name="Inés SecondName" link="" />
                <CreditCard name="Ibai SecondName" link="" />
                <CreditCard name="Lu SecondName" link="" />
                <CreditCard name="Alonso SecondName" link="" />
                <CreditCard name="Luis SecondName" link="" />

                <h3>Full Stack</h3>
                <CreditCard name="Anaís Cabado" link="https://www.linkedin.com/in/anais-cabado-design/" />
                <CreditCard name="Dalila Cabrera" link="https://www.linkedin.com/in/dalila-cabrera/" />
                <CreditCard name="Sandra Fernández" link="https://www.linkedin.com/in/sandra-fernandez-menendez/" />
                <CreditCard name="Kai Jauregi" link="https://www.linkedin.com/in/kaijauregi/" />

                <h3>Data Science</h3>
                <CreditCard name="Ana SecondName" link="" />
                <CreditCard name="Mikel SecondName" link="" />
                <CreditCard name="Nagore SecondName" link="" />
                <CreditCard name="Angelos SecondName" link="" />
                <CreditCard name="Itsazain SecondName" link="" />
                <CreditCard name="Miguel SecondName" link="" />

                <h3>Cybersecurity</h3>
                <CreditCard name="Mikel SecondName" link="" />
                <CreditCard name="Mariana SecondName" link="" />
                <CreditCard name="Asisko SecondName" link="" />
                <CreditCard name="Ander SecondName" link="" />
                <CreditCard name="Teresa SecondName" link="" />


            </section>
        </article>
    );
}

export default Credits;
