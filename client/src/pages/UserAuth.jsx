import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/userServices";

function UserAuth() {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      if (!email.trim() || !password.trim()) {
        alert("Enter email and password");
        return;
      }

      const user = {
        email,
        password,
      };

      await registerUser(user);
      setLogin(true);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const user = {
        email,
        password,
      };

      const response = await loginUser(user);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 bg-white">
      <div className="shadow-lg rounded-xl w-full max-w-md p-8 bg-white">
        <h1 className="text-3xl font-bold text-center text-teal-500 mb-6">
          {login ? "Login" : "Register"}
        </h1>

        <form onSubmit={login ? handleLogin : handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-full bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-full bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-300 text-white py-3 rounded-full hover:bg-teal-200 transition"
          >
            {login ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {login ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-teal-500 ml-1"
            onClick={() => setLogin(!login)}
          >
            {login ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default UserAuth;
