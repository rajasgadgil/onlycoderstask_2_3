"use client";
import React, { useEffect, useState } from "react";
import { FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Popup from "reactjs-popup";
export default function SignUp() {
  const [emailError, setEmailError] = useState("");
  const [passError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [generalError, setGeneralError] = useState(0);
  useEffect(() => {
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    setGeneralError(0);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    console.log(password);
    console.log(confirmPassword);

    if (!email) {
      setEmailError("Please Enter Email Address");
    }else{
        setEmailError("");

    }
    if (!password) {
      setPasswordError("Please Enter Your Password");
    }else{
        setPasswordError("")
    }
    if (!confirmPassword) {
      setConfirmError("Please Confirm Your Password.");
    }else{
        setConfirmError("")
    }
    if (email && password && confirmPassword) {
      //regex to validate email
      const validEmail = new RegExp(
        "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
      );
      if (!validEmail.test(email)) {
        setEmailError("Please enter a valid email!");
      } else {
        setEmailError("");
      }

      //regex to validate password
      const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,20}$");
      if (!validPassword.test(password)) {
        setPasswordError(
          "Password should contain atleast 1 Uppercase, 1 Lowercase, 1 Special Character and should be between 6 and 20 digits"
        );
      } else {
        setPasswordError("");
      }

      // Loop to check if password and confirm password fields are same
      if (validEmail && validPassword) {
        if (password == confirmPassword) {
          setConfirmError("");
          setEmailError("");
          setPasswordError("");
          setGeneralError(0);
          const data = [
            {
              email: email,
              password: password,
              confirm_password: confirmPassword,
            },
          ];

          const response = await fetch("/api/submit", {
            method: "POST",

            body: JSON.stringify(data),
          });
          const res = await response.json();
          //set value to 1 if we get a response
          setGeneralError(1);
        } else {
            //if passwords do not match, set confirm password error
            setConfirmError("Passwords do not match!");
        }
      }
    }
  }

  return (
    <div
      className="container"
      style={{ border: "none", textAlign: "center", marginTop: "4em" }}
    >
       <h1 style={{color:'green'}}>{generalError == 1 ? "Data Saved Successfully" : ""}</h1> 
      <form id="form" method="post" onSubmit={onSubmit}>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Please Enter Email Address"
            name="email"
            style={{ border: "solid", width: "100%" }}
          />

          <div>
            <p style={{ color: "red" }}>{emailError}</p>
          </div>
        </div>

        <br />
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            style={{ border: "solid" }}
            placeholder="Please Enter Password"
          />

          <div>
            <p style={{ color: "red" }}>{passError}</p>
          </div>
        </div>
        <br />
        <div className="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Please Confirm Your Password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            style={{ border: "solid" }}
          />

          <div>
            <p style={{ color: "red" }}>{confirmError}</p>
          </div>
        </div>
        <br />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
