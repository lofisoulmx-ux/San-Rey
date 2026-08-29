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
   VIDEO
   Reproducción independiente.
   NO usamos currentTime.
   NO usamos ScrollTrigger para controlar reproducción.
========================================================= */

function LoopVideo({ src, className = "" }) {

  const videoRef = useRef(null);

  useEffect(() => {

    const video = videoRef.current;

    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("canplay", playVideo);
    video.addEventListener("loadeddata", playVideo);

    playVideo();

    return () => {
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("loadeddata", playVideo);
    };

  }, [src]);

  return (
    <video
      ref={videoRef}
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
   HEADER
========================================================= */

function Header() {

  const headerRef = useRef(null);

  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.to(headerRef.current, {

        opacity: 0,
        y: -20,

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

    <header
      ref={headerRef}
      className="site-header"
    >

      <a
        href="#hero"
        className="brand"
      >

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
          scale: 1.10,
          yPercent: -3,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.5
          }
        }
      );


      /* HERO COPY */

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
            start: "15% top",
            end: "48% top",
            scrub: 0.8
          }
        }
      );


      /* HERO INTRO */

      gsap.from(".hero-kicker", {
        opacity: 0,
        y: 25,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".hero-line", {
        opacity: 0,
        y: 65,
        duration: 1.25,
        stagger: 0.1,
        ease: "power4.out"
      });

      gsap.from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.45,
        ease: "power3.out"
      });


      /* SCROLL CUE */

      gsap.to(".scroll-cue", {
        opacity: 0,
        y: 20,

        scrollTrigger: {
          trigger: section,
          start: "3% top",
          end: "16% top",
          scrub: 0.5
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

      <div
        ref={mediaRef}
        className="hero-media"
      >

        <video
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
   PRODUCT SCENE
========================================================= */

function ProductScene({ product, index }) {

  const sceneRef = useRef(null);
  const mediaRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {

    const scene = sceneRef.current;
    const media = mediaRef.current;
    const copy = copyRef.current;

    if (!scene || !media || !copy) return;

    const ctx = gsap.context(() => {

      /* CAMERA */

      gsap.fromTo(
        media,
        {
          scale: 1.05,
          yPercent: 3
        },
        {
          scale: 1.12,
          yPercent: -3,
          ease: "none",

          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        }
      );


      /* COPY */

      gsap.fromTo(
        copy,
        {
          opacity: 0,
          y: 70,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power2.out",

          scrollTrigger: {
            trigger: scene,
            start: "top 78%",
            end: "center 50%",
            scrub: 0.7
          }
        }
      );


      /* COPY EXIT */

      gsap.to(copy, {

        opacity: 0,
        y: -40,
        filter: "blur(5px)",

        scrollTrigger: {
          trigger: scene,
          start: "center 25%",
          end: "bottom 5%",
          scrub: 0.7
        }

      });

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
          src={product.video}
        />

      </div>

      <div className="product-scene-overlay" />

      <div
        ref={copyRef}
        className="product-scene-copy"
      >

        <div className="product-scene-kicker">
          0{index + 1} / SAN REY PRODUCE
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


/* =========================================================
   PRODUCTS
========================================================= */

function Products() {

  const sectionRef = useRef(null);

  useEffect(() => {

    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".product-intro",
        {
          opacity: 0,
          y: 70
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",

          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 35%",
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
  const copyRef = useRef(null);

  const videoSrc =
    ROUTE.videoSrc ||
    "/assets/route/ruta.mp4";

  const steps = [
    "CAMPO",
    "EMPACADO",
    "TRANSPORTE",
    "FRONTERA",
    "DESTINO"
  ];

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
          scale: 1.04,
          yPercent: 0
        },
        {
          scale: 1.09,
          yPercent: -2,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7
          }
        }
      );


      /* TITLE */

      gsap.fromTo(
        copy,
        {
          opacity: 0,
          y: 45
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",

          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 35%",
            scrub: 0.6
          }
        }
      );


      /* ROUTE STEPS */

      steps.forEach((_, index) => {

        const stepElement =
          section.querySelector(
            `[data-route-step="${index}"]`
          );

        if (!stepElement) return;

        const start = index * 20;
        const end = start + 11;

        gsap.fromTo(
          stepElement,
          {
            opacity: 0,
            y: 18,
            filter: "blur(7px)"
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",

            scrollTrigger: {
              trigger: section,
              start: `${start}% top`,
              end: `${end}% top`,
              scrub: 0.5
            }
          }
        );

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

      <div className="route-sticky">

        <div
          ref={mediaRef}
          className="route-sequence"
        >

          <LoopVideo
            src={videoSrc}
          />

        </div>

        <div className="route-overlay" />

        <div
          ref={copyRef}
          className="route-copy"
        >

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

        <div className="route-steps">

          {steps.map((step, index) => (

            <div
              key={step}
              className="route-step"
              data-route-step={index}
            >

              <span className="route-step-number">
                0{index + 1}
              </span>

              <span className="route-step-name">
                {step}
              </span>

            </div>

          ))}

        </div>

        <div className="route-caption">
          FROM FIELD TO MARKET
        </div>

      </div>

    </section>

  );
}


/* =========================================================
   INFRASTRUCTURE SCENE
   NO ES UNA SECCIÓN INDIVIDUAL.
   Es una capa dentro de una única experiencia.
========================================================= */

function InfrastructureScene({
  scene,
  index,
  mediaRefs,
  copyRefs
}) {

  const videoSrc =
    scene.videoSrc ||
    `/assets/infrastructure/infrastructure-${String(
      index + 1
    ).padStart(2, "0")}.mp4`;

  return (

    <div
      ref={el => {
        mediaRefs.current[index] = el;
      }}
      className={`infra-video-scene ${
        index === 0 ? "active" : ""
      }`}
    >

      <LoopVideo
        src={videoSrc}
      />

      <div
        ref={el => {
          copyRefs.current[index] = el;
        }}
        className={`cinematic-infra-copy ${
          index === 0 ? "active" : ""
        }`}
      >

        <div className="infra-kicker">
          0{index + 1} / SAN REY PRODUCE
        </div>

        <h3>
          {scene.title}

          {scene.subtitle && (
            <>
              <br />
              <em>
                {scene.subtitle}
              </em>
            </>
          )}
        </h3>

        <p>
          {scene.description}
        </p>

      </div>

    </div>

  );
}


/* =========================================================
   INFRASTRUCTURE
   UNA SOLA PANTALLA VISUAL.
   EL SCROLL CAMBIA LAS CAPAS.
========================================================= */

function Infrastructure() {

  const sectionRef = useRef(null);

  const mediaRefs = useRef([]);
  const copyRefs = useRef([]);

  useEffect(() => {

    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {

      const mediaScenes = mediaRefs.current;
      const copyScenes = copyRefs.current;

      if (!mediaScenes.length) return;


      /* =====================================================
         ESTADO INICIAL
      ===================================================== */

      gsap.set(mediaScenes, {
        opacity: 0,
        scale: 1.06
      });

      gsap.set(copyScenes, {
        opacity: 0,
        y: 35,
        filter: "blur(8px)"
      });

      gsap.set(mediaScenes[0], {
        opacity: 1,
        scale: 1
      });

      gsap.set(copyScenes[0], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
      });


      /* =====================================================
         MASTER TIMELINE
      ===================================================== */

      const tl = gsap.timeline({
        scrollTrigger: {

          trigger: section,

          start: "top top",
          end: "bottom bottom",

          scrub: 1,

          pin: ".infra-stage",

          anticipatePin: 1,

          invalidateOnRefresh: true
        }
      });


      const total = mediaScenes.length;

      mediaScenes.forEach((media, index) => {

        if (index === 0) return;

        const previousMedia =
          mediaScenes[index - 1];

        const previousCopy =
          copyScenes[index - 1];

        const currentCopy =
          copyScenes[index];


        /* VIDEO CROSSFADE */

        tl.to(
          previousMedia,
          {
            opacity: 0,
            scale: 1.035,
            duration: 1.2,
            ease: "power2.inOut"
          },
          `scene${index}`
        );


        tl.fromTo(
          media,
          {
            opacity: 0,
            scale: 1.08
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out"
          },
          `scene${index}`
        );


        /* TEXT OUT */

        tl.to(
          previousCopy,
          {
            opacity: 0,
            y: -25,
            filter: "blur(6px)",
            duration: 0.7,
            ease: "power2.in"
          },
          `scene${index}+=0.15`
        );


        /* TEXT IN */

        tl.fromTo(
          currentCopy,
          {
            opacity: 0,
            y: 35,
            filter: "blur(8px)"
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out"
          },
          `scene${index}+=0.45`
        );

      });


      /* =====================================================
         TITLE
      ===================================================== */

      gsap.fromTo(
        ".infra-title",
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,

          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 35%",
            scrub: 0.6
          }
        }
      );

    }, section);

    return () => ctx.revert();

  }, []);

  return (

    <section
      ref={sectionRef}
      id="infrastructure"
      className="infrastructure cinematic-section"
    >

      <div className="section-no">
        04 / INFRASTRUCTURE
      </div>


      <div className="infra-stage">

        {/* VIDEOS */}

        <div className="infra-video-stack">

          {INFRASTRUCTURE.map(
            (scene, index) => (

              <InfrastructureScene
                key={scene.number || index}
                scene={scene}
                index={index}
                mediaRefs={mediaRefs}
                copyRefs={copyRefs}
              />

            )
          )}

        </div>


        {/* OVERLAY */}

        <div className="infra-overlay" />


        {/* TITLE */}

        <div className="infra-title">

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


        {/* PROGRESS */}

        <div className="infra-sequence-label">

          <span className="infra-sequence-line" />

          <span>
            01 — 04
          </span>

        </div>

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
  const copyRef = useRef(null);

  const videoSrc =
    GLOBAL_PRESENCE.videoSrc ||
    "/assets/global/global.mp4";

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
          scale: 1.06,
          yPercent: 4
        },
        {
          scale: 1.14,
          yPercent: -4,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        }
      );


      /* COPY */

      gsap.fromTo(
        copy,
        {
          opacity: 0,
          y: 70,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power2.out",

          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "center 45%",
            scrub: 0.8
          }
        }
      );


      /* MAP */

      gsap.fromTo(
        ".map-line",
        {
          strokeDasharray: 1000,
          strokeDashoffset: 1000
        },
        {
          strokeDashoffset: 0,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "center 40%",
            scrub: 0.9
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


      <div
        ref={copyRef}
        className="global-copy"
      >

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
