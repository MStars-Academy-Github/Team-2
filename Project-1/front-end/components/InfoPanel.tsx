import React from "react";

type Props = {};

export default function InfoPanel({}: Props) {
  return (
    <div style={{ color: "ButtonShadow", marginBottom: "10px" }}>
      FrontEnd by
      <a
        href="https://github.com/MunkhtamirG"
        target="/blank"
        style={{ color: "ActiveCaption" }}
      >
        Ozy
      </a>
      &#169;
      <span style={{ marginLeft: "20px" }}>
        BackEnd by
        <a
          href="https://github.com/odko19"
          style={{ color: "ActiveCaption" }}
          target="/blank"
        >
          Odko
        </a>
        &#169;
      </span>
    </div>
  );
}
