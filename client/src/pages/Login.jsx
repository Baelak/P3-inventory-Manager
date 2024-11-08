const Login = () => {
    return (
        <section id="login">
            <h2>Log In</h2>
            <form className="login-form" action="/api/users/login" method="POST">
                <label for="email-login">Email:</label>
                <input type="email" id="email-login" name="email" required />

                <label for="password-login">Password:</label>
                <input type="password" id="password-login" name="password" required />

                <button type="submit">Log In</button>
            </form>
        </section>
    )
}


export default Login;