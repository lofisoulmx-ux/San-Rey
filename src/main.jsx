import React, { useEffect, useRef } from "react";
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
    const ctx = gsap.context(() => {

      gsap.to(headerRef.current, {
        opacity: 0,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "top -12%",
          scrub: 0.5
        }
      });

    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="site-header">

      <a href="#hero" className="brand">

        <span className="brand-mark">
          SR
        </span>

        <span className="brand-text">
          <b>SAN REY</b>
          <small>PRODUCE</small>
        </span>

      </a>

      <button
        className="menu"
        aria-label="Open menu"
      >
        <i />
        <i />
      </button>

    </header>
  );
}


/* =========================================================
   HERO
========================================================= */

function Hero() {

  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {

    const section = sectionRef.current;
    const media = mediaRef.current;
    const copy = copyRef.current;

    if (!section || !media || !copy) return;

    const ctx = gsap.context(() => {

      /* CAMERA */

      gsap.fromTo(
        media,
        {
          scale: 1.03,
          yPercent: 0
        },
        {
          scale: 1.12,
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.35
          }
        }
      );


      /* VIGNETTE */

      gsap.to(".hero-vignette", {
        opacity: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "20% top",
          end: "75% top",
          scrub: 1
        }
      });


      /* TEXT */

      gsap.fromTo(
        copy,
        {
          opacity: 1,
          y: 0
        },
        {
          opacity: 0,
          y: -80,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "18% top",
            end: "48% top",
            scrub: 0.8
          }
        }
      );


      /* INTRO */

      gsap.from(".hero-kicker", {
        opacity: 0,
        y: 25,
        duration: 1.2,
        ease: "power3.out"
      });

      gsap.from(".hero-line", {
        opacity: 0,
        y: 70,
        duration: 1.3,
        stagger: 0.1,
        ease: "power4.out"
      });

      gsap.from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      });


      /* SCROLL */

      gsap.to(".scroll-cue", {
        opacity: 0,
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "5% top",
          end: "18% top",
          scrub: 0.6
        }
      });

    }, section);

    return () => ctx.revert();

  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero cinematic-section"
    >

      <div className="hero-media">

        <video
          ref={mediaRef}
          className="hero-video"
          src="/assets/hero/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

      </div>

      <div className="hero-vignette" />

      <div
        ref={copyRef}
        className="hero-copy"
      >

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
   FALLBACK PARA ESCENAS SIN VIDEO
========================================================= */

function FrameSequence({
  framesPath,
  frameCount,
  placeholder = "SAN REY"
}) {

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {

    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image || !frameCount) return;

    const ctx = gsap.context(() => {

      const sequence = {
        frame: 1
      };

      ScrollTrigger.create({

        trigger: container,

        start: "top bottom",

        end: "bottom top",

        scrub: 0.35,

        onUpdate: (self) => {

          const target =
            1 +
            self.progress *
            (frameCount - 1);

          sequence.frame +=
            (target - sequence.frame) * 0.35;

          const current =
            Math.round(sequence.frame);

          const filename =
            String(current).padStart(3, "0");

          image.src =
            `${framesPath}${filename}.webp`;
        }

      });

    }, container);

    return () => ctx.revert();

  }, [framesPath, frameCount]);

  return (

    <div
      ref={containerRef}
      className="frame-sequence"
    >

      <div className="sequence-placeholder">
        <span>
          {placeholder}
        </span>
      </div>

      <img
        ref={imageRef}
        src={`${framesPath}001.webp`}
        alt=""
        draggable="false"
      />

    </div>

  );
}


/* =========================================================
   LOOP VIDEO
========================================================= */

function LoopVideo({
  src,
  className = ""
}) {

  return (

    <video
      className={`scene-video ${className}`}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
    />

  );
}


/* =========================================================
   PRODUCTS
========================================================= */

function ProductScene({
  product,
  index
}) {

  const sceneRef = useRef(null);
  const mediaRef = useRef(null);
  const copyRef = useRef(null);

  /*
    Convención de videos:

    /assets/products/cebollin.mp4
    /assets/products/cilantro.mp4

    Si el producto tiene videoSrc en content.js
    se utiliza ese.
  */

  const videoSrc =
    product.videoSrc ||
    `/assets/products/${product.key}.mp4`;

  useEffect(() => {

    const scene = sceneRef.current;
    const media = mediaRef.current;
    const copy = copyRef.current;

    if (!scene || !media || !copy) return;

    const ctx = gsap.context(() => {


      /* =====================================================
         MOVIMIENTO DE CÁMARA
      ===================================================== */

      gsap.fromTo(
        media,
        {
          scale: 1.04,
          yPercent: 2
        },
        {
          scale: 1.12,
          yPercent: -3,
          ease: "none",

          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "bottom top",

            scrub: 0.35
          }
        }
      );


      /* =====================================================
         ENTRADA DEL TEXTO
      ===================================================== */

      gsap.fromTo(
        copy,
        {
          opacity: 0,
          y: 70
        },
        {
          opacity: 1,
          y: 0,

          ease: "power2.out",

          scrollTrigger: {
            trigger: scene,
            start: "top 75%",
            end: "center 45%",

            scrub: 0.7
          }
        }
      );


      /* =====================================================
         LIGERO MOVIMIENTO DEL OVERLAY
      ===================================================== */

      gsap.fromTo(
        scene.querySelector(".product-scene-overlay"),
        {
          opacity: 0.7
        },
        {
          opacity: 1,

          ease: "none",

          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "center center",

            scrub: 1
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

      <div
        ref={mediaRef}
        className="product-scene-media"
      >

        <LoopVideo
          src={videoSrc}
        />

      </div>


      <div className="product-scene-overlay" />


      <div
        ref={copyRef}
        className="product-scene-copy"
      >

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
  const mediaRef = useRef(null);

  const videoSrc =
    ROUTE.videoSrc ||
    "/assets/route/route.mp4";

  useEffect(() => {

    const section = sectionRef.current;
    const media = mediaRef.current;

    if (!section || !media) return;

    const ctx = gsap.context(() => {

      gsap.fromTo(
        media,
        {
          scale: 1.04,
          yPercent: 2
        },
        {
          scale: 1.11,
          yPercent: -3,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        }
      );


      gsap.fromTo(
        ".route-copy",
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",

          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "center 45%",
            scrub: 0.7
          }
        }
      );

    }, section);

    return () => ctx.revert();

  }, []);

  return (

    <section
      ref={sectionRef}
      id="route"
      className="route cinematic-section"
    >

      <div
        ref={mediaRef}
        className="route-sequence"
      >

        <LoopVideo
          src={videoSrc}
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
  const mediaRef = useRef(null);
  const copyRef = useRef(null);

  const videoSrc =
    scene.videoSrc ||
    `/assets/infrastructure/infrastructure-${String(
      index + 1
    ).padStart(2, "0")}.mp4`;

  useEffect(() => {

    const element = sceneRef.current;
    const media = mediaRef.current;
    const copy = copyRef.current;

    if (!element || !media || !copy) return;

    const ctx = gsap.context(() => {


      /* CAMERA */

      gsap.fromTo(
        media,
        {
          scale: 1.04,
          yPercent: 2
        },
        {
          scale: 1.10,
          yPercent: -3,
          ease: "none",

          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        }
      );


      /* TEXT */

      gsap.fromTo(
        copy,
        {
          opacity: 0,
          x: index % 2 === 0 ? -40 : 40
        },
        {
          opacity: 1,
          x: 0,
          ease: "power2.out",

          scrollTrigger: {
            trigger: element,
            start: "top 75%",
            end: "center 45%",
            scrub: 0.7
          }
        }
      );

    }, element);

    return () => ctx.revert();

  }, [index]);

  return (

    <article
      ref={sceneRef}
      className={`infra-scene ${
        index % 2 === 1 ? "reverse" : ""
      }`}
    >

      <div
        ref={copyRef}
        className="infra-copy"
      >

        <div className="infra-kicker">
          SAN REY PRODUCE
        </div>

        <h3>
          {scene.title}
          <br />
          <em>
            {scene.subtitle}
          </em>
        </h3>

        <p>
          {scene.description}
        </p>

      </div>


      <div
        ref={mediaRef}
        className="infra-sequence"
      >

        <LoopVideo
          src={videoSrc}
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
  const mediaRef = useRef(null);

  const videoSrc =
    GLOBAL_PRESENCE.videoSrc ||
    "/assets/global/global.mp4";

  useEffect(() => {

    const section = sectionRef.current;
    const media = mediaRef.current;

    if (!section || !media) return;

    const ctx = gsap.context(() => {


      /* CAMERA */

      gsap.fromTo(
        media,
        {
          scale: 1.04,
          yPercent: 2
        },
        {
          scale: 1.10,
          yPercent: -3,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        }
      );


      /* TEXT */

      gsap.fromTo(
        ".global-copy",
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",

          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "center 45%",
            scrub: 0.7
          }
        }
      );


      /* MAP */

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
            end: "center 45%",
            scrub: 0.8
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

      <div
        ref={mediaRef}
        className="global-sequence"
      >

        <LoopVideo
          src={videoSrc}
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
            <small>
              PRODUCE
            </small>
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

createRoot(
  document.getElementById("root")
).render(
  <App />
);
