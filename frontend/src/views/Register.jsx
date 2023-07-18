import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      fullname,
      password,
    };

    axios
      .post("http://localhost:5000/user/register", user)
      .then((res) => {
        console.log(res.data);
        setEmail("");
        setFullName("");
        setPassword("");
      })
      .catch((err) => console.log("Error: " + err));
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <form
          className="border border-black p-8 space-y-4 rounded-2xl bg-slate-300"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center">Register</h1>
          <div>
            <label className="block">Email</label>
            <input
              className="border border-black"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@email.com"
            />
          </div>
          <div>
            <label className="block">Fullname</label>
            <input
              className="border border-black"
              value={fullname}
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Juan Dela Cruz"
            />
          </div>
          <div>
            <label className="block">Password</label>
            <input
              className="border border-black"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full border border-black rounded-md bg-sky-400">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
