import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

import axios from "axios";

const Login = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });
  const { setIsLoggedIn, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(formFields);
    axios
      .post("http://127.0.0.1:8000/api/login/", formFields)
      .then((res) => {
        console.log(res.data);
        setIsLoggedIn(true);
        setUser(res.data)
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      onSubmit={handleLogin}
    >
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
          Login
        </Button>
      </div>
      <Link to={"/signup"}>Don't have account, Go to Signup</Link>
    </form>
  );
};

export default Login;
