import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isLogedIn = Cookies.get("token");

  useEffect(() => {
    if (isLogedIn) {
      navigate("/");
    }
  }, [isLogedIn, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault(); 

 
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); 
    try {
      const response = await fetch("https://todoapi-d24p.onrender.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name:name, email: email, password:confirmPassword }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      if (response.ok) {
          Swal.fire({
            title: "Good job!",
            text: "Account Created Successfully!",
            icon: "success",
          });
          navigate("/login");
      
      } else {
        console.log("Registration failed:", data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="minHeight d-flex flex-column justify-content-center align-items-center">
      <div className="col-11 col-md-8 col-lg-5 m-auto border row rounded-3 pt-2 registerBg">
        <h3 className="text-center mb-4 mt-3">Register</h3>
        <form onSubmit={handleSubmit} className="row m-auto">
            <label className="m-0 p-0 fw-medium">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            className="col-12 m-auto p-2 fs-6 fw-medium mb-2 rounded-3 border-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
           <label className="m-0 p-0 fw-medium">Mail Id</label>
          <input
            type="email"
            placeholder="Enter Mail Id"
            className="col-12 m-auto p-2 fs-6 fw-medium mb-2 rounded-3 border-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <label className="m-0 p-0 fw-medium">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="col-12 m-auto p-2 fs-6 fw-medium mb-2 rounded-3 border-0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <label className="m-0 p-0 fw-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter Confirm Password"
            className="col-12 m-auto p-2 fs-6 fw-medium mb-2 rounded-3 border-0"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-danger text-center">{error}</p>}
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-white text-dark fw-bold mt-3"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Now"}
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          If you already have an account, please go to{" "}
          <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Register;
