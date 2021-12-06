const handleEntry = (e) => {
    e.preventDefault();

    if ($("#entryDate").val() == '' || $("#entryMood").val() == '' || $("#entryMain").val() == '') {
        UIkit.modal.alert('All fields are required!');
        return false;
    }

    console.dir($("#entryForm").serialize());

    UIkit.modal("#entryFormContainer").hide();

    //let images = new FormData($(imgUpload).value);
    //sendAjax('POST', "/uploadFile", images);

    sendAjax('POST', $("#entryForm").attr("action"), $("#entryForm").serialize(), function () {
        loadEntriesFromServer();
    });

    return false;
};

const EntryForm = (props) => {
    return (
        <div className="uk-modal-dialog uk-modal-body">
            <button className="uk-modal-close-default" type="button" uk-close="true"></button>
            <form id="entryForm"
                onSubmit={handleEntry}
                name="entryForm"
                action="/maker"
                method="POST"
                className="entryForm data-uk-form-stacked"
            >
                <h2>New Entry</h2>
                <div className="uk-margin">
                    <label className="data-uk-form-label" htmlFor="entryDate" value={props.today} >Date: </label>
                    <input id="entryDate" type="date" name="entryDate" />
                </div>
                <div className="uk-margin">
                    <label className="data-uk-form-label" htmlFor="entryRating">Rate Your Day: </label>
                    <StarSVG id={"svg1"} value={1}></StarSVG>
                    <StarSVG id={"svg2"} value={2}></StarSVG>
                    <StarSVG id={"svg3"} value={3}></StarSVG>
                    <StarSVG id={"svg4"} value={4}></StarSVG>
                    <StarSVG id={"svg5"} value={5}></StarSVG>
                </div>

                <div className="uk-margin">
                    <label className="data-uk-form-label" htmlFor="entryMood">Overall Mood: </label>
                    <input id="entryMood" className="data-uk-input" type="text" name="entryMood" />
                </div>

                <div className="uk-margin">
                    <label className="data-uk-form-label" htmlFor="entryMood">Write Your Journal Entry Here: </label>
                    <textarea id="entryMain" className="data-uk-textarea" name="entryMain" rows="4" cols="50"></textarea>
                </div>

                {/* <div className="js-upload uk-placeholder uk-text-center">
                    <span className="uk-text-middle">Use shift or ctrl to select multiple files to upload</span>
                    
                        <input id="imgUpload" type="file" accept=".jpg, .jpeg, .png, .svg, .gif" multiple/>
                   
                </div> */}

                <div className="uk-margin">
                    <input className="makeentrySubmit data-uk-button data-uk-button-default" type="submit" value="Make entry" />
                </div>
                <input type="hidden" name="_csrf" value={props.csrf} />

            </form>
        </div>
    );
};

const StarSVG = function (props) {
    let clicked = false;

    const mouseOnStar = (e, clickedBool) => {
        clicked = clickedBool;
        if (e.target.id === "svg1") {
            $("#svg1").css("fill", "yellow");
        } else if (e.target.id === "svg2") {
            $("#svg1").css("fill", "yellow");
            $("#svg2").css("fill", "yellow");
        } else if (e.target.id === "svg3") {
            $("#svg1").css("fill", "yellow");
            $("#svg2").css("fill", "yellow");
            $("#svg3").css("fill", "yellow");
        } else if (e.target.id === "svg4") {
            $("#svg1").css("fill", "yellow");
            $("#svg2").css("fill", "yellow");
            $("#svg3").css("fill", "yellow");
            $("#svg4").css("fill", "yellow");
        } else {
            $("#svg1").css("fill", "yellow");
            $("#svg2").css("fill", "yellow");
            $("#svg3").css("fill", "yellow");
            $("#svg4").css("fill", "yellow");
            $("#svg5").css("fill", "yellow");
        }
    }

    const mouseOffStar = () => {
        if (!clicked) {
            $("#svg1").css("fill", "black");
            $("#svg2").css("fill", "black");
            $("#svg3").css("fill", "black");
            $("#svg4").css("fill", "black");
            $("#svg5").css("fill", "black");
        }
    }

    const svgStyle = {
        stroke: "black",
        strokeWidth: "1.2",
        padding: "5px"
    }

    const padding = {
        padding: "5px"
    }
    return (
        <svg id={props.id} value={props.value} onMouseEnter={mouseOnStar} onMouseLeave={mouseOffStar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={padding}><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" style={svgStyle} /></svg>
    );
}

const stringToDate = (date) => {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let update = new Date(year, month - 1, day);
    return update;
}

const EntryList = function (props) {
    if (props.entries.length === 0) {
        return (
            <div className="entryList">
                <h3 className="emptyList">No entries yet</h3>
            </div>
        );
    }

    let sortByDate = props.entries.reverse();
    
    const journalNodes = sortByDate.map(function (entry) {
        let thisDateEntry = stringToDate(entry.date);
        //console.log(getPicsByDate(entry.date));
        thisDateEntry = new Intl.DateTimeFormat('en-US', {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(thisDateEntry);
        let toggleString = "target: #MODAL" + entry._id;
        let idString = "MODAL" + entry._id;

        console.log(entry);
        return (
            <tr key={entry._id}>
                <td id={entry._id} className="entry">
                    <a uk-toggle={toggleString}>{thisDateEntry}</a>

                    <div id={idString} uk-modal="true">
                        <div className="uk-modal-dialog uk-modal-body">
                            <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                            <h2 className="uk-modal-title">{thisDateEntry}</h2>
                            <h4>Mood: {entry.mood}</h4>
                            <h4>Entry: </h4>
                            <p>{entry.entry}</p>
                        </div>
                    </div>
                </td>
            </tr>
        )
    });

    return (
        <div className="entryList">
            <table className="uk-table uk-table-hover uk-table-divider">
                <thead>
                    <tr>
                        <th>Entries</th>
                    </tr>
                </thead>
                <tbody>
                    {journalNodes}
                </tbody>
            </table>
        </div>
    );
};

// const getPicsByDate = (date) => {
//     sendAjax('GET', '/retrieveFile', {entryDate: date}, (data) => {
//         return data;
//     });
// };

const loadEntriesFromServer = () => {
    sendAjax('GET', '/getEntries', null, (data) => {
        ReactDOM.render(
            <EntryList entries={data.entries} />, document.querySelector("#entries")
        );
    });
};

const createEntryListWindow = (csrf) => {
    ReactDOM.render(
        <EntryList entries={[]} />, document.querySelector("#entries")
    );

    ReactDOM.render(
        <div />, document.querySelector("#settings")
    );

    loadEntriesFromServer();
};

const createSettingsWindow = (csrf) => {
    ReactDOM.render(
        <div />, document.querySelector("#entries")
    );
    ReactDOM.render(
        <Settings csrf={csrf} />, document.querySelector("#settings")
    );

}

const setup = function (csrf) {
    const settingsButton = document.querySelector("#settingsButton");
    const mainPageButton = document.querySelector("#mainPageButton");

    settingsButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSettingsWindow(csrf);
        return false;
    });

    mainPageButton.addEventListener("click", (e) => {
        e.preventDefault();
        createEntryListWindow(csrf);
        return false;
    });

    //default view
    createEntryListWindow(csrf);

    ReactDOM.render(
        <EntryForm csrf={csrf} />, document.querySelector("#entryFormContainer")
    );
};

const Settings = (props) => {
    return (
        <div id="settings">
            <UpdatePassForm csrf={props.csrf} />
            <button>Upgrade to get file uploading abilities</button>
        </div>
    );
};


const UpdatePassForm = (props) => {
    return (
        <form id="updatePassForm"
            name="updatePassForm"
            onSubmit={handleUpdate}
            action="/updatePass"
            method="POST"
            className="data-uk-form-stacked">
            <h2>Update Password</h2>
            <div className="inputContainers">
                <span className="data-uk-form-icon" data-uk-icon="icon: lock"></span>
                <input id="pass" className="data-uk-input" type="password" name="pass" placeholder="password" />
            </div>
            <div className="inputContainers">
                <span className="data-uk-form-icon" data-uk-icon="icon: lock"></span>
                <input id="pass2" className="data-uk-input" type="password" name="pass2" placeholder="retype password" />
            </div>

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit data-uk-button data-uk-button-default" type="submit" value="Update" />
        </form>
    );
};

const handleUpdate = (e) => {
    e.preventDefault();

    if ($("#pass").val() == '' || $("#pass2").val() == '') {
        //responseText("All fields are required");
        UIkit.modal.alert("All fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        //responseText("Passwords do no match");
        UIkit.modal.alert("Passwords do no match");
        return false;
    }

    sendAjax('POST', $("#updatePassForm").attr("action"), $("#updatePassForm").serialize(), UIkit.modal.alert('Password update successful!'));

    return false;
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});