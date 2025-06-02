function CreateTask() {
    return (
        <section className="create-task">
            <h3>Create Task</h3>
            <form action="" method="post" className="create-task__form">
                <label htmlFor="request-type">Request Type:</label>
                <select name="request-type" id="request-type">
                    <option value="copy-revision">Copy Revision</option>
                    <option value="desgin-issues">Design Issues:</option>
                    <option value="new-item">New Item:</option>
                </select>

                {/* <label htmlFor="status"></label>
                <select name="status" id="status">
                    <option value="new">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Complete</option>
                </select> */}

                {/* <label htmlFor="request-id">Request #:</label>
                <input type="number" name="request-id" id="request-id" /> */}

                {/* <label htmlFor="input-date">Input Date:</label>
                <input type="date" name="input-date" id="input-date"/> */}

                {/* <label htmlFor="requester">Requester:</label>
                <input type="text" name="requester" id="requester" /> */}

                <label htmlFor="device">Device:</label>
                <select name="device" id="device">
                    <option value="desktop">Desktop</option>
                    <option value="tablet">Tablet</option>
                    <option value="mobile">Mobile</option>
                </select>

                <label htmlFor="browser">Browser:</label>
                <select name="browser" id="browser">
                    <option value="chrome">Chrome</option>
                    <option value="firefox">Firefox</option>
                    <option value="safari">Safari</option>
                    <option value="other">Other</option>
                </select>
                <input type="text" name="other-browser" id="other-browser" />

                <label htmlFor="request">Request:</label>
                <textarea name="request" id="request" cols="30" rows="10"></textarea>

                <label htmlFor="page">Page:</label>
                <input type="url" name="page" id="page" />

                <label htmlFor="screenshot">Screenshot:</label>
                <input type="file" name="screenshot" id="screenshot" />

                {/* <label htmlFor="terra-comments">Terra Comments:</label>
                <textarea name="terra-comments" id="terra-comments" cols="30" rows="10"></textarea> */}

                <button type="submit">Create Task</button>
            </form>
        </section>
    );
}

export default CreateTask;