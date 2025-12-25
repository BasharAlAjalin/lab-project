import { useState } from "react";
import { loginApi } from "../../api/auth.api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await loginApi({ email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    setMsg("Logged in successfully");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}/>
        <button>Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}