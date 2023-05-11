import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formFields);
    const reqBody = {
      ...formFields,
      first_name: formFields.firstName,
      last_name: formFields.lastName,
    };
    axios
      .post("http://127.0.0.1:8000/api/signup/", reqBody)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        margin: "auto",
        alignItems: "center",
        padding: "20px",
        background: "whitesmoke",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="First Name"
        variant="filled"
        name="firstName"
        required
        value={formFields.firstName}
        onChange={handleChange}
      />
      <TextField
        label="Last Name"
        variant="filled"
        name="lastName"
        required
        value={formFields.lastName}
        onChange={handleChange}
      />
      <TextField
        label="Username"
        variant="filled"
        name="username"
        required
        value={formFields.username}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        name="password"
        required
        value={formFields.password}
        onChange={handleChange}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default Signup;
