import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import "./RequestForm.css";

function RequestForm() {
    const { user } = useContext(AuthContext);
    // const navigate = useNavigate(); TODO BACK BUTTON
// TODO que solo pueda crear el campo de status y Terra Comments el PM
    return (
        <section className="create-request article">
            <h3>Request</h3>
            <form action="" method="post" className="request__form" >
                <label htmlFor="request-type">Request Type:</label>
                <select name="request-type" id="request-type" required>
                    <option value="copy-revision">Copy Revision</option>
                    <option value="desgin-issues">Design Issues:</option>
                    <option value="requested-change">Requested Change:</option>
                    <option value="new-item">New Item:</option>
                </select>

                <label htmlFor="status"></label>
                <select name="status" id="status" className="request-project-manager">
                    <option value="new">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Complete</option>
                </select>

                {/* <label htmlFor="requester">Requester:</label>
                <input type="text" name="requester" id="requester" /> */}

                <label htmlFor="device">Device:</label>
                <select name="device" id="device" required>
                    <option value="desktop">Desktop</option>
                    <option value="tablet">Tablet</option>
                    <option value="mobile">Mobile</option>
                    <option value="all">All Devices</option>
                </select>

                <label htmlFor="browser">Browser:</label>
                <select name="browser" id="browser" required>
                    <option value="chrome">Chrome</option>
                    <option value="firefox">Firefox</option>
                    <option value="safari">Safari</option>
                    <option value="other">Other</option>
                </select>
                <input type="text" name="other-browser" id="other-browser" />

                <label htmlFor="request">Request:</label>
                <textarea name="request" id="request" cols="30" rows="10" required></textarea>

                <label htmlFor="page">Page:</label>
                <input type="url" name="page" id="page" required />

                <label htmlFor="screenshot">Screenshot:</label>
                <input type="file" name="screenshot" id="screenshot" />

                <label htmlFor="terra-comments">Terra Comments:</label>
                <textarea name="terra-comments" id="terra-comments" cols="30" rows="10" className="request-project-manager"></textarea>

                <button type="submit" className="button-request-create">Create Request</button>
                <button type="submit" className="button-request-update">Update Request</button>
            </form>
        </section>
    );
}

export default RequestForm;