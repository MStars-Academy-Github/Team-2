import React from "react";

type Props = {};

export default function InfoPanel({}: Props) {
  return (
    <div style={{ color: "ButtonShadow", marginBottom: "10px" }}>
      FrontEnd by{" "}
      <a
        href="https://github.com/MunkhtamirG"
        style={{ color: "ActiveCaption" }}
      >
        Ozy
      </a>{" "}
      &#169;{" "}
      <span style={{ marginLeft: "20px" }}>
        {" "}
        BackEnd by{" "}
        <a href="" style={{ color: "ActiveCaption" }}>
          Odko
        </a>{" "}
        &#169;
      </span>
    </div>
  );
}
