import './Instructions.css'

function Instructions() {
    return (
        <article className="instructions article">
            <section className="page-header">
                <h2 className="page-title">Manual</h2>
            </section>

            <section className="page-content">
                {/* <video src=""></video> */}
                <h3>What kind of request do you ask for?</h3>
                <p>You can select between four kind of request types, which are:</p>

                <div className="instructions-item">
                    <img src="../../public/images/icons-instructions.png" alt="icons" className='icons-instructions' />
                    <div className="instructions-item--text">
                        <h4>Copy Revision</h4>
                        <p>Choose this option for text adjustemnts, from a title to a button</p>
                        <ul>
                            <li>options</li>
                        </ul>
                    </div>
                </div>

                <div className="instructions-item">
                    <img src="../../public/images/icons-instructions.png" alt="icons" className='icons-instructions' />
                    <div className="instructions-item--text">
                        <h4>Design Issues</h4>
                        <p>This is your space to make changes about the visual of your website</p>
                        <ul>
                            <li>options</li>
                        </ul>
                    </div>
                </div>

                <div className="instructions-item">
                    <img src="../../public/images/icons-instructions.png" alt="icons" className='icons-instructions' />
                    <div className="instructions-item--text">
                        <h4>Requested Change</h4>
                        <p>To make changes about the content of your website</p>
                        <ul>
                            <li>options</li>
                        </ul>
                    </div>
                </div>

                <div className="instructions-item">
                    <img src="../../public/images/icons-instructions.png" alt="icons" className='icons-instructions' />
                    <div className="instructions-item--text">
                        <h4>New Item</h4>
                        <p>To add new content to your website</p>
                    </div>
                </div>
            </section>

            <section className="instructions-contact">
                <h3>Any questions?</h3>
                <div className="instructions-contact--info">
                    <p>Send us a message and we will contact you.</p>
                    <button>Contact Us</button>
                    <img src="../../public/images/icons-instructions.png" alt="icons" className='icons-instructions-contact' />
                </div>
            </section>
        </article>
    );
}

export default Instructions