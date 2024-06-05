import React from "react";
import Form from "../components/Form";

export default function Login() {
  return <Form route="/api/token/login/" method="login" />;
}
