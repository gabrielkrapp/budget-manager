import React, { useState } from "react";
import { loginUser } from "../api/Login";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      navigate("/");
      console.log(response);
    } catch (error) {
      setServerError("Failed to login.");
    }
  };

  return (
    <form className="mt-8">
      <div className="rounded-md shadow-sm">
        <div>
          <input
            aria-label="Email address"
            name="email"
            type="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-2">
          <input
            aria-label="Password"
            name="password"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out"
          onClick={(e) => login(e)}
        >
          Sign In
        </button>
        {serverError && <p className="mt-2 text-red-500">{serverError}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
