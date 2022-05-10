import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

// import useMutation from react-query
import { useMutation } from "react-query";

// Get API config
import { API } from "../../config/api";

const Register = () => {
  const navigate = useNavigate();

  const title = "Register";
  document.title = "Dumbmers | " + title;

  // Create variabel for store data with useState
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // dikeluarkan
  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, //? name
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // convert data menjadi string, untuk dikirim ke database
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      setMessage("Register Success");

      if (response.data.status === "Success") {
        const alert = (
          <Alert variant="success" className="py-1">
            {response.data.message}
          </Alert>
        );

        setForm({
          name: "",
          email: "",
          password: "",
        });
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1 text-center">
          <span className="blink">Failed</span>
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="card-auth p-4">
        <div
          style={{ fontSize: "36px", lineHeight: "49px", fontWeight: "700" }}
          className="mb-2"
        >
          Register
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              name="name"
              onChange={handleChange}
              className="px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
          </div>
          <div className="d-grid gap-2 mt-5">
            <button type="submit" className="btn btn-login">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
