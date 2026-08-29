import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  PRODUCTS,
  INFRASTRUCTURE,
  ROUTE,
  GLOBAL_PRESENCE
} from "./content";

import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   HEADER
========================================================= */

function Header() {
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      gsap.to(header, {
        opacity: 0,
        y: -25,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "top -12%",
          scrub: 0.05
        }
      });
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="site-header">
      <a href="#hero" className="brand">
        <span className="brand-mark">SR</span>

        <span className="brand-text">
          <b>SAN REY</b>
          <small>PRODUCE</small>
        </span>
      </a>

      <button className="menu" aria-label="Open menu">
        <i />
        <i />
      </button>
    </header>
  );
}


/* =========================================================
   HERO
   SIN SCRUB DE VIDEO
========================================================= */

function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const ctx = gsap.context(() => {

      /*
       * El video ya NO está siendo obligado a saltar
       * entre currentTime durante el scroll.
       *
       * Esto elimina el principal cuello de botella.
       */

      const playVideo = () => {
        video.currentTime = 0;

        const promise = video.play();

        if (promise && promise.catch) {
          promise.catch(() => {});
        }
      };

      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener(
          "canplay",
          playVideo,
          { once: true }
        );
      }

      /* HERO ZOOM */
      gsap.to(video, {
        scale: 1.08,
        yPercent: -2,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.05
        }
      });

      /* TEXTO */

      gsap.from(".hero-kicker", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".hero-line", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out"
      });

      gsap.from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.35,
        ease: "power3.out"
      });

    }, section);

    return () => {
      video.pause();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero cinematic-section"
    >

      <div className="hero-media">

        <video
          ref={videoRef}
          className="hero-video"
          src="/assets/hero/hero.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          loop
          disablePictureInPicture
        />

      </div>

      <div className="hero-vignette" />

      <div className="hero-copy">

        <div className="hero-kicker">
          FROM FIELD TO MARKET
        </div>

        <h1>

          <span className="hero-line">
            FRESHNESS
          </span>

          <span className="hero-line">
            ON THE
          </span>

          <span className="hero-line accent">
            MOVE.
          </span>

        </h1>

        <p className="hero-description">
          Fresh produce, handled with precision
          <br />
          and delivered with reliability.
        </p>

      </div>

      <div className="scroll-cue">
        <span />
        SCROLL TO EXPERIENCE
      </div>

    </section>
  );
}


/* =========================================================
   FRAME SEQUENCE
   OPTIMIZADO — SIN setState EN CADA FRAME
========================================================= */

function FrameSequence({
  framesPath,
  frameCount,
  className = "",
  placeholder = "SAN REY"
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image || !frameCount) return;

    let currentFrame = 1;

    const updateFrame = (progress) => {
      const nextFrame =
        Math.round(
          progress * (frameCount - 1)
        ) + 1;

      if (nextFrame === currentFrame) return;

      currentFrame = nextFrame;

      const number =
        String(nextFrame).padStart(3, "0");

      const src =
        `${framesPath}${number}.webp`;

      /*
       * Cambiamos directamente el src.
       * No provocamos un render de React.
       */

      if (image.src !== window.location.origin + src) {
        image.src = src;
      }
    };

    const ctx = gsap.context(() => {

      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.03,

        onUpdate: (self) => {
          updateFrame(self.progress);
        }
      });

    }, container);

    return () => ctx.revert();

  }, [framesPath, frameCount]);

  const initialSrc =
    `${framesPath}001.webp`;

  return (
    <div
      ref={containerRef}
      className={`frame-sequence ${
        className
      } ${loaded ? "has-media" : ""}`}
    >

      <div className="sequence-placeholder">
        <span>{placeholder}</span>
      </div>

      <img
        ref={imageRef}
        src={initialSrc}
        alt=""
        draggable="false"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />

    </div>
  );
}


/* =========================================================
   PRODUCTS
========================================================= */

function ProductScene({ product, index }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".product-scene-copy",
        {
          opacity: 0,
          y: 45
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: scene,
            start: "top 80%",
            end: "center center",
            scrub: 0.05
          }
        }
      );

      gsap.to(
        ".product-scene-media",
        {
          scale: 1.05,
          yPercent: -2,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.05
          }
        }
      );

    }, scene);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={sceneRef}
      className="product-scene"
    >

      <div className="product-scene-media">

        <FrameSequence
          framesPath={product.framesPath}
          frameCount={product.frameCount}
          placeholder={product.english.toUpperCase()}
        />

      </div>

      <div className="product-scene-overlay" />

      <div className="product-scene-copy">

        <span className="product-scene-index">
          0{index + 1}
        </span>

        <div className="product-scene-kicker">
          SAN REY PRODUCE
        </div>

        <h3>
          {product.title}
        </h3>

        <div className="product-scene-en">
          {product.english}
        </div>

        <p>
          {product.description}
        </p>

      </div>

    </article>
  );
}


function Products() {
  return (
    <section
      id="products"
      className="products cinematic-section"
    >

      <div className="section-no">
        02 / PRODUCTS
      </div>

      <div className="product-intro">

        <h2>
          FRESH.
          <br />
          NATURAL.
          <br />
          <em>PREMIUM.</em>
        </h2>

        <p>
          Productos frescos, cultivados con pasión
          <br />
          y altos estándares.
        </p>

      </div>

      <div className="product-scenes">

        {PRODUCTS.map((product, index) => (
          <ProductScene
            key={product.key}
            product={product}
            index={index}
          />
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   ROUTE
========================================================= */

function Route() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {

      gsap.to(".route-sequence", {
        scale: 1.05,
        yPercent: -2,
        force3D: true,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.05
        }
      });

      gsap.fromTo(
        ".route-copy",
        {
          opacity: 0,
          y: 45
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "center center",
            scrub: 0.05
          }
        }
      );

      gsap.to(".route-line", {
        yPercent: -5,
        force3D: true,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.05
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="route"
      className="route cinematic-section"
    >

      <div className="route-sequence">

        <FrameSequence
          framesPath={ROUTE.framesPath}
          frameCount={ROUTE.frameCount}
          placeholder="SAN REY"
        />

      </div>

      <div className="route-overlay" />

      <div className="route-copy">

        <div className="section-no">
          03 / OUR ROUTE
        </div>

        <h2>
          DEL CAMPO
          <br />
          <em>AL MUNDO.</em>
        </h2>

        <p>
          Una ruta de frescura que cruza
          fronteras.
        </p>

      </div>

      <div className="route-line">

        <div className="route-line-track" />

        {ROUTE.steps.map((step, index) => (
          <div
            className="route-step"
            key={step}
          >

            <i />

            <div className="route-step-content">

              <small>
                0{index + 1}
              </small>

              <span>
                {step}
              </span>

            </div>

          </div>
        ))}

      </div>

      <div className="route-caption">
        FROM FIELD TO MARKET
      </div>

    </section>
  );
}


/* =========================================================
   INFRASTRUCTURE
========================================================= */

function InfrastructureScene({
  scene,
  index
}) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const element = sceneRef.current;

    if (!element) return;

    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".infra-copy",
        {
          opacity: 0,
          y: 45
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "center center",
            scrub: 0.05
          }
        }
      );

      gsap.to(".infra-sequence", {
        scale: 1.04,
        force3D: true,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.05
        }
      });

    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={sceneRef}
      className={`infra-scene ${
        index % 2 === 1 ? "reverse" : ""
      }`}
    >

      <div className="infra-copy">

        <div className="infra-kicker">
          SAN REY PRODUCE
        </div>

        <h3>
          {scene.title}
          <br />
          <em>{scene.subtitle}</em>
        </h3>

        <p>
          {scene.description}
        </p>

      </div>

      <div className="infra-sequence">

        <FrameSequence
          framesPath={scene.framesPath}
          frameCount={scene.frameCount}
          placeholder={scene.title}
        />

      </div>

    </article>
  );
}


function Infrastructure() {
  return (
    <section
      id="infrastructure"
      className="infrastructure cinematic-section"
    >

      <div className="section-no">
        04 / INFRASTRUCTURE
      </div>

      <div className="infra-head">

        <h2>
          INFRAESTRUCTURA
          <br />
          DE <em>CLASE MUNDIAL.</em>
        </h2>

        <p>
          Tecnología, procesos y personas
          comprometidas con la excelencia.
        </p>

      </div>

      <div className="infra-stack">

        {INFRASTRUCTURE.map((scene, index) => (
          <InfrastructureScene
            key={scene.number}
            scene={scene}
            index={index}
          />
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   GLOBAL
========================================================= */

function Global() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".global-copy",
        {
          opacity: 0,
          y: 45
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "center center",
            scrub: 0.05
          }
        }
      );

      gsap.fromTo(
        ".map-line",
        {
          strokeDashoffset: 700
        },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "center center",
            scrub: 0.05
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="global"
      className="global cinematic-section"
    >

      <div className="global-sequence">

        <FrameSequence
          framesPath={GLOBAL_PRESENCE.framesPath}
          frameCount={GLOBAL_PRESENCE.frameCount}
          placeholder="SAN REY"
        />

      </div>

      <div className="global-overlay" />

      <svg
        className="route-svg"
        viewBox="0 0 1000 650"
        preserveAspectRatio="none"
      >

        <path
          className="map-line"
          d="M290 505 C420 420 470 350 610 250 C710 175 755 155 835 105"
        />

        <path
          className="map-line second"
          d="M290 505 C500 450 590 390 710 300 C790 240 830 190 885 155"
        />

      </svg>

      <div className="global-copy">

        <div className="section-no">
          05 / GLOBAL PRESENCE
        </div>

        <h2>
          PRESENCIA
          <br />
          <em>GLOBAL.</em>
        </h2>

        <p>
          Llevamos frescura a los mercados
          más exigentes.
        </p>

      </div>

      <div className="location mexico">
        {GLOBAL_PRESENCE.origin}
        <span />
      </div>

      <div className="location usa">
        {GLOBAL_PRESENCE.destination}
        <span />
      </div>

    </section>
  );
}


/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-main">

        <div className="footer-brand">

          <div className="brand-large">
            SAN REY
            <small>PRODUCE</small>
          </div>

          <p>
            Freshness that travels.
          </p>

        </div>

        <div className="footer-social">

          <span>
            FOLLOW SAN REY
          </span>

          <div className="social-links">

            <a href="#">
              Facebook
            </a>

            <a href="#">
              Instagram
            </a>

            <a href="#">
              TikTok
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <span>
          San Rey Produce
        </span>

        <span>
          Todos los derechos reservados.
        </span>

      </div>

    </footer>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Products />
        <Route />
        <Infrastructure />
        <Global />
      </main>

      <Footer />
    </>
  );
}


/* =========================================================
   RENDER
========================================================= */

const root = document.getElementById("root");

createRoot(root).render(
  <App />
);
