import React from "react";
import './background.css';

export default function Background() {
  function change(event) {
    const value = event.target.value;
    if (value.startsWith("http")) {
      document.body.style.backgroundImage = `url(${value})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    } else {
      document.body.style.backgroundColor = value;
      document.body.style.backgroundImage = "";
    }
  }

  return (
    <div
      style={{
        position: "absolute",   
        top: "10px",            
        right: "10px",          
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "1rem",
      }}
    >
      <h2 style={{ marginBottom: "1rem", fontSize: "14px" }}>Choose a Background:</h2>
      
      <select
        onChange={change}
        style={{
          padding: "8px",
          fontSize: "14px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          cursor: "pointer",
          width: "100%",
          maxWidth: "200px",
        }}
      >
        <option style={{ color: "#555" }} value="#f5f5f5">
          Light Gray
        </option>
        <option style={{ color: "#a67c52" }} value="#f0e4d7">
          Warm Beige
        </option>
        <option style={{ color: "#668c88" }} value="#b8d8d8">
          Pale Teal
        </option>
        <option style={{ color: "#ff6f61" }} value="#ff6f61">
          Soft Coral
        </option>
        <option style={{ color: "#5b93d3" }} value="#a2c2e4">
          Powder Blue
        </option>
        <option style={{ color: "#e1c7d0" }} value="#e1c7d0">
          Dusty Rose
        </option>
        <option style={{ color: "#93c6ff" }} value="#c6e2ff">
          Light Sky Blue
        </option>
        <option
          style={{ fontStyle: "italic", color: "#007bff" }}
          value="https://amaliahomecollection.com/wp-content/uploads/2018/12/blue-ocean-692x391.png"
        >
          Beach
        </option>
        <option
          style={{ fontStyle: "italic", color: "#5a423a" }}
          value="https://cdn.prod.website-files.com/5e261bc81db8f19fa664899d/64add0eb758ddc8d390ed4a0_out-0.png"
        >
          Mountain
        </option>
      </select>
    </div>
  );
}
