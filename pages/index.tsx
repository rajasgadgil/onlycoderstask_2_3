"use client";
import React, { useEffect, useState } from "react";
import { FormEvent } from "react";

export default function Page() {
  const [emailError, setEmailError] = useState("");
  const [passError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!email) {
      setEmailError("Please Enter Email Address");
    }
    if (!password) {
      setPasswordError("Please Enter Your Password");
    }
    if (!confirmPassword) {
      setConfirmError("Please Confirm Your Password.");
    }

    const data = [
      {
        email: email,
        password: password,
        confirm_password: confirmPassword,
      },
    ];

    if (email && password && confirmPassword) {
      const response = await fetch("/api/submit", {
        method: "POST",

        body: JSON.stringify(data),
      });
    }
  }

  return (
    <div className="container">
      <form id="form" method="post" onSubmit={onSubmit}>
        <input type="email" id="email" name="email" />
        <input type="password" id="password" name="password" />
        <input type="password" id="confirmPassword" name="confirmPassword" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
