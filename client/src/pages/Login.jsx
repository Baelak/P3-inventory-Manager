import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem('id_token', data.login.token);
      window.location.assign('/');
    } catch (err) {
      console.error(err);
    }
  };

    return (
        <section id="login">
            <h2>Log In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label for="email-login">Email:</label>
                <input type="email" id="email-login" name="email" onChange={(e) => setEmail(e.target.value)} required />

                <label for="password-login">Password:</label>
                <input type="password" id="password-login" name="password"  onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Log In</button>
            </form>
        </section>
    )
}


export default Login;