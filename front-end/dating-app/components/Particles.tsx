import React from "react";
import { Particles } from "@blackbox-vision/react-particles";
import { tsParticles } from "tsparticles-engine";

export default function ParticlesBackground() {
  return (
    <Particles
      id="simple"
      width="100vw"
      height="100vh"
      style={{
        background: "linear-gradient(to bottom, #8a2387, #e94057, #f27121)",
        position: "fixed",
        zIndex: "-1",
        top: 0,
        left: 0,
      }}
      params={{
        particles: {
          number: {
            value: 150,
          },
          size: {
            value: 1,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
          },
        },
      }}
    />
  );
}
