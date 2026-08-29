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
    const ctx = gsap.context(() => {

      gsap.to(headerRef.current, {
        opacity: 0,
        y: -30,
        ease: "power2.out",

        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "top -15%",
          scrub: 0.8
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
   SCROLL-SCRUBBED VIDEO
========================================================= */

function Hero() {

  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {

    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let scrollTarget = 0;
    let smoothTime = 0;
    let rafId = null;
    let trigger = null;

    const renderVideo = () => {

      if (!video.duration || !Number.isFinite(video.duration)) {
        rafId = requestAnimationFrame(renderVideo);
        return;
      }

      /*
        Interpolación suave.

        El scroll NO cambia directamente currentTime.
        Primero cambia scrollTarget y después el video
        se acerca progresivamente a ese punto.
      */

      smoothTime +=
        (scrollTarget - smoothTime) * 0.12;

      if (
        Math.abs(video.currentTime - smoothTime) > 0.003
      ) {
        try {
          video.currentTime = smoothTime;
        } catch (error) {
          // Algunos móviles pueden rechazar un seek
          // durante determinados estados del video.
        }
      }

      rafId = requestAnimationFrame(renderVideo);
    };


    const setup = () => {

      if (
        !video.duration ||
        !Number.isFinite(video.duration)
      ) {
        return;
      }

      /*
        IMPORTANTE:

        El video permanece pausado.
        Nosotros controlamos su posición mediante scroll.
      */

      video.pause();

      try {
        video.currentTime = 0;
      } catch (error) {}

      scrollTarget = 0;
      smoothTime = 0;

      const ctx = gsap.context(() => {

        trigger = ScrollTrigger.create({

          trigger: section,

          /*
            El Hero tiene suficiente recorrido para que
            el movimiento del video no se sienta comprimido.
          */

          start: "top top",
          end: "bottom top",

          /*
            GSAP suaviza la relación entre scroll y progreso.
          */

          scrub: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {

            if (
              !video.duration ||
              !Number.isFinite(video.duration)
            ) {
              return;
            }

            const duration =
              video.duration;

            /*
              Evitamos llegar exactamente al último frame
              porque algunos navegadores hacen un pequeño
              salto al final del video.
            */

            const safeDuration =
              Math.max(duration - 0.08, 0);

            scrollTarget =
              self.progress * safeDuration;
          }

        });


        /*
          Entrada cinematográfica del texto.
        */

        gsap.from(".hero-kicker", {
          opacity: 0,
          y: 30,
          duration: 1.1,
          ease: "power3.out"
        });


        gsap.from(".hero-line", {
          opacity: 0,
          y: 75,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out"
        });


        gsap.from(".hero-description", {
          opacity: 0,
          y: 25,
          duration: 1,
          delay: 0.35,
          ease: "power3.out"
        });


        /*
          El indicador de scroll desaparece
          progresivamente conforme empieza la experiencia.
        */

        gsap.to(".scroll-cue", {
          opacity: 0,
          y: 20,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "top 25%",
            scrub: true
          }
        });

      }, section);


      /*
        Arrancamos el render loop.
      */

      rafId =
        requestAnimationFrame(renderVideo);


      /*
        Actualizamos ScrollTrigger después de que
        el metadata del video esté disponible.
      */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });


      /*
        Cleanup
      */

      return () => {
        if (trigger) {
          trigger.kill();
        }

        if (rafId) {
          cancelAnimationFrame(rafId);
        }

        ctx.revert();
      };
    };


    if (video.readyState >= 1) {

      const cleanup =
        setup();

      return () => {

        if (typeof cleanup === "function") {
          cleanup();
        }

        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };

    }


    video.addEventListener(
      "loadedmetadata",
      setup,
      { once: true }
    );


    return () => {

      video.removeEventListener(
        "loadedmetadata",
        setup
      );

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      if (trigger) {
        trigger.kill();
      }
    };

  }, []);


  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero cinematic-section"
    >

      {/* =================================================
          VIDEO
      ================================================= */}

      <div className="hero-depth">

        <div className="hero-sequence">

          <video
            ref={videoRef}
            className="hero-video"
            src="/assets/hero/hero.mp4"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            aria-hidden="true"
          />

        </div>

      </div>


      {/* =================================================
          ATMOSPHERE
      ================================================= */}

      <div className="hero-glow" />


      {/* =================================================
          TEXT
      ================================================= */}

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


      {/* =================================================
          SCROLL INDICATOR
      ================================================= */}

      <div className="scroll-cue">
        <span />
        SCROLL TO EXPERIENCE
      </div>

    </section>
  );
}


/* =========================================================
   FRAME SEQUENCE
========================================================= */

function FrameSequence({
  framesPath,
  frameCount,
  className = "",
  placeholder = "SAN REY"
}) {

  const containerRef = useRef(null);

  const [frame, setFrame] =
    useState(1);

  const [loaded, setLoaded] =
    useState(false);


  useEffect(() => {

    const container =
      containerRef.current;

    if (!container || !frameCount) {
      return;
    }

    let lastFrame = 1;

    const ctx = gsap.context(() => {

      ScrollTrigger.create({

        trigger: container,

        start: "top bottom",
        end: "bottom top",

        scrub: 0.8,

        onUpdate: (self) => {

          const nextFrame =
            Math.round(
              self.progress *
              (frameCount - 1)
            ) + 1;

          if (
            nextFrame !== lastFrame
          ) {

            lastFrame =
              nextFrame;

            setFrame(nextFrame);
          }
        }

      });

    }, container);


    return () => ctx.revert();

  }, [frameCount]);


  const frameNumber =
    String(frame).padStart(3, "0");


  return (
    <div
      ref={containerRef}
      className={
        `frame-sequence ${className} ${
          loaded ? "has-media" : ""
        }`
      }
    >

      <div className="sequence-placeholder">
        <span>
          {placeholder}
        </span>
      </div>

      <img
        src={
          `${framesPath}${frameNumber}.webp`
        }
        alt=""
        draggable="false"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />

    </div>
  );
}


/* =========================================================
   PRODUCTS
========================================================= */

function ProductScene({
  product,
  index
}) {

  const sceneRef =
    useRef(null);


  useEffect(() => {

    const scene =
      sceneRef.current;

    if (!scene) return;

    const ctx =
      gsap.context(() => {

        gsap.fromTo(
          ".product-scene-copy",

          {
            opacity: 0,
            y: 60
          },

          {
            opacity: 1,
            y: 0,
            ease: "none",

            scrollTrigger: {
              trigger: scene,
              start: "top 80%",
              end: "center center",
              scrub: 0.8
            }
          }
        );


        gsap.to(
          ".product-scene-media",

          {
            scale: 1.05,
            yPercent: -3,
            ease: "none",

            scrollTrigger: {
              trigger: scene,
              start: "top bottom",
              end: "bottom top",
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

      <div className="product-scene-media">

        <FrameSequence
          framesPath={product.framesPath}
          frameCount={product.frameCount}
          placeholder={
            product.english.toUpperCase()
          }
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

        {PRODUCTS.map(
          (product, index) => (

            <ProductScene
              key={product.key}
              product={product}
              index={index}
            />

          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   ROUTE
========================================================= */

function Route() {

  const sectionRef =
    useRef(null);


  useEffect(() => {

    const section =
      sectionRef.current;

    if (!section) return;

    const ctx =
      gsap.context(() => {

        gsap.to(".route-sequence", {

          scale: 1.06,
          yPercent: -2,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }

        });


        gsap.fromTo(
          ".route-copy",

          {
            opacity: 0,
            y: 50
          },

          {
            opacity: 1,
            y: 0,
            ease: "none",

            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "center center",
              scrub: 0.8
            }
          }
        );


        gsap.to(".route-line", {

          yPercent: -6,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
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

        {ROUTE.steps.map(
          (step, index) => (

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

          )
        )}

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

  const sceneRef =
    useRef(null);


  useEffect(() => {

    const element =
      sceneRef.current;

    if (!element) return;

    const ctx =
      gsap.context(() => {

        gsap.fromTo(
          ".infra-copy",

          {
            opacity: 0,
            y: 50
          },

          {
            opacity: 1,
            y: 0,
            ease: "none",

            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "center center",
              scrub: 0.8
            }
          }
        );


        gsap.to(
          ".infra-sequence",

          {
            scale: 1.05,
            ease: "none",

            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );

      }, element);


    return () => ctx.revert();

  }, []);


  return (
    <article
      ref={sceneRef}
      className={
        `infra-scene ${
          index % 2 === 1
            ? "reverse"
            : ""
        }`
      }
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

        {INFRASTRUCTURE.map(
          (scene, index) => (

            <InfrastructureScene
              key={scene.number}
              scene={scene}
              index={index}
            />

          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   GLOBAL
========================================================= */

function Global() {

  const sectionRef =
    useRef(null);


  useEffect(() => {

    const section =
      sectionRef.current;

    if (!section) return;

    const ctx =
      gsap.context(() => {

        gsap.fromTo(
          ".global-copy",

          {
            opacity: 0,
            y: 50
          },

          {
            opacity: 1,
            y: 0,
            ease: "none",

            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "center center",
              scrub: 0.8
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

      <div className="global-sequence">

        <FrameSequence
          framesPath={
            GLOBAL_PRESENCE.framesPath
          }
          frameCount={
            GLOBAL_PRESENCE.frameCount
          }
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
          d="
            M290 505
            C420 420
            470 350
            610 250
            C710 175
            755 155
            835 105
          "
        />

        <path
          className="map-line second"
          d="
            M290 505
            C500 450
            590 390
            710 300
            C790 240
            830 190
            885 155
          "
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
