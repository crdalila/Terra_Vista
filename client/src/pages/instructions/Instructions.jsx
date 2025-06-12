import './Instructions.css'

function Instructions() {
    const randomIconIndex = Math.floor(Math.random() * 12) + 1;
    const iconPath = `/images/threeIcons/${randomIconIndex}.svg`;

    return (
        <article className="instructions article">
            <section className="page-header">
                <h2 className="page-title">FAQ</h2>
                <div className="page-info">
                    <h3>Quick guide to make the most of Terra Vista.</h3>
                    <p>Check this manual to learn how to use each section of the platform.</p>
                </div>
            </section>

            <section className="page-content">
                {/* <video src=""></video> */}
                <p>Terra Vista is a platform designed to make it easy for you to share feedback about the
                    website we've prepared for you. It's the final stretch of the creative journey where your
                    perspective helps shape the final result.</p>

                <p>Simply go to your Projects page, click on Create Request, and start submitting your
                    comments and suggestions. We're here to listen and help you refine your website to meet
                    your expectations.</p>

                <h3>What type of comment would you like to make?</h3>
                <p>When interacting with your site, you will be able to select the comment type that
                    best describes your feedback. This helps us better understand and implement
                    your suggestions.</p>

                <div className="instructions-item">
                    <img
                        src={`/images/threeIcons/${Math.floor(Math.random() * 12) + 1}.svg`}
                        alt="random icon"
                        className="project--icons"
                    />
                    <div className="instructions-item--text">
                        <h4>Copy Revision</h4>
                        <p>Use this option to suggest edits to the text, from a headline that feels too
                            formal to a button that could say it better.</p>
                        <ul>
                            <li>Corrections in tone or writing style</li>
                            <li>Modifications to headlines, descriptions, or calls to action</li>
                        </ul>
                    </div>
                </div>

                <div className="instructions-item">
                    <img
                        src={`/images/threeIcons/${Math.floor(Math.random() * 12) + 1}.svg`}
                        alt="random icon"
                        className="project--icons"
                    />
                    <div className="instructions-item--text">
                        <h4>Design Issues</h4>
                        <p>Color, size, font, or alignment, this is the place for visual adjustments.</p>
                        <ul>
                            <li>Tweaks to colors, typography or sizing</li>
                            <li>Alignment or spacing problems</li>
                            <li>Elements not displaying correctly on different devices</li>
                        </ul>
                    </div>
                </div>

                <div className="instructions-item">
                    <img
                        src={`/images/threeIcons/${Math.floor(Math.random() * 12) + 1}.svg`}
                        alt="random icon"
                        className="project--icons"
                    />
                    <div className="instructions-item--text">
                        <h4>Requested Change</h4>
                        <p>Want to reorder something? Remove an element? Move an image?
                            This type of comment is intended for adjusting what already exists. It’s not a
                            mistake, you just want it to work differently</p>
                        <ul>
                            <li>Reorganizing sections or elements</li>
                            <li>Replacing images or content</li>
                            <li>Changing the layout or arrangement of components</li>
                        </ul>
                    </div>
                </div>

                <div className="instructions-item">
                    <img
                        src={`/images/threeIcons/${Math.floor(Math.random() * 12) + 1}.svg`}
                        alt="random icon"
                        className="project--icons"
                    />
                    <div className="instructions-item--text">
                        <h4>New Item</h4>
                        <p>Looking to add something that’s not in the design?
                            If you need a new section, more text, an extra block, or another resource,
                            choose this option.</p>
                        <ul>
                            <li>Adding new sections or content blocks</li>
                            <li>Including buttons, links, or interactive elements</li>
                            <li>Adding testimonials, case studies, or other resources</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="instructions-contact">
                <h3>Frequently Asked Questions (FAQ)</h3>
                <div className="instructions-contact--info">
                    <p className="instructions-contact--title">1. Can I view the revision history?</p>
                    <p>Yes! In the “History” section, you will find a log of all changes made and access to previous
                        versions.</p>

                    <p className="instructions-contact--title">2. Are my comments public?</p>
                    <p>No. Your comments are only visible to our team.</p>

                    <p className="instructions-contact--title">3. Can I use TerraVista on my phone?</p>
                    <p>Yes, TerraVista is mobile-friendly, though we recommend using a desktop for the best
                        experience.</p>

                    <p className="instructions-contact--title">4. How do I know if my feedback has been applied?</p>
                    <p>You will receive a notification when a new version with your feedback goes live. You can also
                        check it in the History section.</p>

                    <p className="instructions-contact--title">5. Where can I see an overview of the project status?</p>
                    <p>The main dashboard shows you a summary with statuses like: pending review, approved,
                        under revision, and final delivery.</p>
                </div>
            </section>
        </article>
    );
}

export default Instructions