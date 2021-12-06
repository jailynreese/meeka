const handleLogin = (e) => {
    e.preventDefault();

    if ($("#user").val() == '' || $("#pass").val() == '') {
        //responseText("Username or password is empty");
        UIkit.modal.alert('Username or password is empty')
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        //responseText("All fields are required");
        UIkit.modal.alert("All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
        //responseText("Passwords do no match");
        UIkit.modal.alert("Passwords do no match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

const LoginWindow = (props) => {
    return (
        <form id="loginForm" name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm data-uk-form-stacked"
        >
            <div className="inputContainers">
                <span className="data-uk-form-icon" data-uk-icon="icon: user"></span>
                <input id="user" className="data-uk-input" type="text" name="username" placeholder="username"/>
            </div>

            <div className="inputContainers">
                <span className="data-uk-form-icon" data-uk-icon="icon: lock"></span>
                <input id="pass" className="data-uk-input" type="password" name="pass" placeholder="password"/>
            </div>
           
            <input type="hidden" name="_csrf" value={props.csrf} />
            <button className="data-uk-button data-uk-button-default">Sign in</button>
            
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm data-uk-form-stacked"
        >
            <div className="inputContainers">
                <span className="data-uk-form-icon" data-uk-icon="icon: user"></span>
                <input id="user" className="data-uk-input" type="text" name="username" placeholder="username"/>
            </div>
            <div className="inputContainers">
                <span className="data-uk-form-icon" data-uk-icon="icon: lock"></span>
                <input id="pass" className="data-uk-input" type="password" name="pass" placeholder="password"/>
            </div>
            <div className="inputContainers">
                <span className="data-uk-form-icon" data-uk-icon="icon: lock"></span>
                <input id="pass2" className="data-uk-input" type="password" name="pass2" placeholder="retype password"/>
            </div>
            
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit data-uk-button data-uk-button-default" type="submit" value="Sign Up"/>
        </form>
    );
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    createLoginWindow(csrf); //default view
};
 
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});