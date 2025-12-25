import { useState } from "react";
import { registerApi } from "../../api/auth.api";

export default function Register() {
  const [form, setForm] = useState({ firstName:"", lastName:"", phone:"", email:"", password:"", channel:"EMAIL" });
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await registerApi(form);
    setMsg(Registered. Verification code (demo): ${res.data.verification.code});
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="First name" onChange={e=>setForm({...form, firstName:e.target.value})}/>
        <input placeholder="Last name" onChange={e=>setForm({...form, lastName:e.target.value})}/>
        <input placeholder="Phone" onChange={e=>setForm({...form, phone:e.target.value})}/>
        <input placeholder="Email" onChange={e=>setForm({...form, email:e.target.value})}/>
        <input placeholder="Password" type="password" onChange={e=>setForm({...form, password:e.target.value})}/>
        <select onChange={e=>setForm({...form, channel:e.target.value})}>
          <option value="EMAIL">Email</option>
          <option value="WHATSAPP">WhatsApp</option>
        </select>
        <button>Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}