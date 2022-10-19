import React from "react";
import { useSelector } from "react-redux";

export default function () {
  const name = useSelector(state => state.user.info.name);
  return <h1 className="text-white">Welcome, {name}!</h1>;
}
