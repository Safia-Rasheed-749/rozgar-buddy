import "../styles.css";

export default function AuthForm() {
  return (
    <div className="container">
      <h1>Rozgar Buddy</h1>
      <h2>Login</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <p>Don’t have an account? <button>Sign Up</button></p>
    </div>
  );
}
