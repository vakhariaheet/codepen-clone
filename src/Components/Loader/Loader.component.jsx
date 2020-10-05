import React, { useEffect } from "react";
import { gsap } from "gsap";

import "./Loader.styles.scss";

const Loader = ({ isLoading }) => {
  useEffect(() => {
    const tl = new gsap.timeline({ repeat: -1, yoyo: true });
    const dots = document.getElementsByClassName("loader-dot");

    for (let i = 3; i >= 0; i--) {
      tl.to(dots[i], 0.8, {
        opacity: 0,
      });
    }
  }, []);

  return (
    <div className="loader">
      <svg id="loader--logo" className="loader__logo" viewBox="0 0 138 26">
        <path d="M15 8a7 7 0 100 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0l11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 010 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 000-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6" />
        <circle cx={25} cy={40} r={5} className="loader-dot-1 loader-dot" />
        <circle cx={50} cy={40} r={5} className="loader-dot-2 loader-dot" />
        <circle cx={75} cy={40} r={5} className="loader-dot-3 loader-dot" />
        <circle cx={100} cy={40} r={5} className="loader-dot-4 loader-dot" />
      </svg>
    </div>
  );
};

export default Loader;
