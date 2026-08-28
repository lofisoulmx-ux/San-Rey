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

const ease = "power3.out";

/* =========================================================
   HELPERS
========================================================= */

function useScrollFrameSequence({
  sectionRef,
  imageRef,
  framesPath,
  frameCount
}) {
  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image || !frameCount) return;

    let lastFrame = -1;

    const updateFrame = (progress) => {
      const frame = Math.min(
        frameCount,
        Math.max(
          1,
          Math.round(progress * (frameCount - 1)) + 1
        )
      );

      if (frame === lastFrame) return;

      lastFrame = frame;

      const number = String(frame).padStart(3, "0");

      image.src = `${framesPath}${number}.webp`;
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,

        onUpdate: (self) => {
          updateFrame(self.progress);
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [sectionRef, imageRef, framesPath, frameCount]);
}

/* =========================================================
   HEADER
========================================================= */

function Header() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 0,
        y: -35,
        pointerEvents: "none",
        ease: "power2.out",

        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "top -18%",
          scrub: true
        }
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={ref} className="site-header">

      <a className="brand" href="#hero">

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
        type="button"
      >
        <i />
        <i />
      </button>

    </header>
  );
}

/* =========================================================
   HERO VIDEO
========================================================= */

function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let ready = false;
    let lastTime = -1;

    const prepareVideo = () => {
      if (!video.duration || !Number.isFinite(video.duration)) {
        return;
      }

      ready = true;

      video.pause();
      video.currentTime = 0;

      ScrollTrigger.refresh();
    };

    const updateVideo = (progress) => {
      if (!ready) return;

      const duration = video.duration;

      if (!duration || !Number.isFinite(duration)) {
        return;
      }

      /*
        Dejamos unos milisegundos antes del final
        para evitar que algunos navegadores móviles
        salten al último frame o congelen el video.
      */
      const targetTime =
        progress * Math.max(0, duration - 0.05);

      if (Math.abs(targetTime - lastTime) < 0.015) {
        return;
      }

      lastTime = targetTime;

      try {
        video.currentTime = targetTime;
      } catch {
        // Algunos navegadores pueden rechazar un seek
        // durante la carga inicial. No hacemos nada.
      }
    };

    video.addEventListener(
      "loadedmetadata",
      prepareVideo
    );

    video.addEventListener(
      "canplay",
      prepareVideo
    );

    /*
      Forzamos la carga del archivo.
    */
    video.load();

    const ctx = gsap.context(() => {

      ScrollTrigger.create({
        trigger: section,

        /*
          El hero ocupa bastante espacio para que
          el movimiento del video sea realmente visible.
        */
        start: "top top",
        end: "bottom top",

        scrub: 0.15,

        onUpdate: (self) => {
          updateVideo(self.progress);
        }
      });

      /* -----------------------------------------------
         HERO TEXT
      ------------------------------------------------ */

      gsap.fromTo(
        ".hero-kicker",
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease
        }
      );

      gsap.fromTo(
        ".hero-line",
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.1,
          ease
        }
      );

      gsap.fromTo(
        ".hero-copy p",
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.35,
          ease
        }
      );

      gsap.fromTo(
        ".scroll-cue",
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 1,
          delay: 1,
          ease
        }
      );

    }, section);

    return () => {
      ctx.revert();

      video.removeEventListener(
        "loadedmetadata",
        prepareVideo
      );

      video.removeEventListener(
        "canplay",
        prepareVideo
      );
    };

  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero cinematic-section"
    >

      {/* VIDEO BACKGROUND */}

      <div className="hero-video-layer">

        <video
          ref={videoRef}
          className="hero-video"
          src="/assets/hero/hero.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
        />

      </div>

      {/* DARK CINEMATIC OVERLAY */}

      <div className="hero-overlay" />

      {/* GREEN LIGHT */}

      <div className="hero-glow" />

      {/* HERO CONTENT */}

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

        <p>
          Fresh produce, handled with precision
          <br />
          and delivered with reliability.
        </p>

      </div>

      {/* SCROLL INDICATOR */}

      <div className="scroll-cue">

        <span />

        <span>
          SCROLL TO EXPERIENCE
        </span>

      </div>

    </section>
  );
}

/* =========================================================
   PRODUCT FRAME SEQUENCE
========================================================= */

function FrameSequence({ product }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useScrollFrameSequence({
    sectionRef,
    imageRef,
    framesPath: product.framesPath,
    frameCount: product.frameCount
  });

  return (
    <div
      ref={sectionRef}
      className="frame-sequence"
    >

      <div className="sequence-placeholder">
        <span>
          {product.english.toUpperCase()}
        </span>
      </div>

      <img
        ref={imageRef}
        src={`${product.framesPath}001.webp`}
        alt=""
        draggable="false"
      />

    </div>
  );
}

/* =========================================================
   PRODUCT SCENE
========================================================= */

function ProductScene({ product, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".product-scene-copy",
        {
          y: 70,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",

          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "center center",
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        ".product-scene-media",
        {
          scale: 1.04
        },
        {
          scale: 1.1,
          ease: "none",

          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={ref}
      className={`product-scene product-scene-${index + 1}`}
    >

      <div className="product-scene-media">
        <FrameSequence product={product} />
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

/* =========================================================
   PRODUCTS
========================================================= */

function Products() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.to(".product-intro", {
        yPercent: -18,
        ease: "none",

        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
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
  const ref = useRef(null);
  const imageRef = useRef(null);

  useScrollFrameSequence({
    sectionRef: ref,
    imageRef,
    framesPath: ROUTE.framesPath,
    frameCount: ROUTE.frameCount
  });

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.to(".route-sequence", {
        scale: 1.08,
        yPercent: 6,
        ease: "none",

        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });

      gsap.to(".route-line", {
        yPercent: -8,
        ease: "none",

        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="route"
      className="route cinematic-section"
    >

      <div className="route-sequence">

        <div className="sequence-placeholder">
          <span>SAN REY</span>
        </div>

        <img
          ref={imageRef}
          className="route-frame"
          src={`${ROUTE.framesPath}001.webp`}
          alt=""
          draggable="false"
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

        {ROUTE.steps.map((item, index) => (
          <div
            className="route-step"
            key={item}
          >

            <i />

            <div className="route-step-content">

              <small>
                0{index + 1}
              </small>

              <span>
                {item}
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
   INFRASTRUCTURE SCENE
========================================================= */

function InfrastructureScene({ scene }) {
  const ref = useRef(null);
  const imageRef = useRef(null);

  useScrollFrameSequence({
    sectionRef: ref,
    imageRef,
    framesPath: scene.framesPath,
    frameCount: scene.frameCount
  });

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".infra-sequence",
        {
          scale: 1.08,
          opacity: 0.7
        },
        {
          scale: 1,
          opacity: 1,
          ease: "none",

          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "center center",
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        ".infra-copy",
        {
          y: 70,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",

          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "center center",
            scrub: 1
          }
        }
      );

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={ref}
      className="infra-scene"
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

        <div className="sequence-placeholder">
          <span>
            {scene.title}
          </span>
        </div>

        <img
          ref={imageRef}
          src={`${scene.framesPath}001.webp`}
          alt=""
          draggable="false"
        />

      </div>

    </article>
  );
}

/* =========================================================
   INFRASTRUCTURE
========================================================= */

function Infrastructure() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
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

        {INFRASTRUCTURE.map((scene) => (
          <InfrastructureScene
            key={scene.number}
            scene={scene}
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
  const ref = useRef(null);
  const imageRef = useRef(null);

  useScrollFrameSequence({
    sectionRef: ref,
    imageRef,
    framesPath: GLOBAL_PRESENCE.framesPath,
    frameCount: GLOBAL_PRESENCE.frameCount
  });

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".global-sequence",
        {
          scale: 1.08,
          opacity: 0.7
        },
        {
          scale: 1,
          opacity: 1,
          ease: "none",

          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "center center",
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        ".global-copy",
        {
          y: 70,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",

          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "center center",
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        ".map-line",
        {
          strokeDashoffset: 600
        },
        {
          strokeDashoffset: 0,
          ease: "none",

          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "center center",
            scrub: 1
          }
        }
      );

      gsap.to(".location", {
        yPercent: -12,
        ease: "none",

        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="global"
      className="global cinematic-section"
    >

      <div className="global-sequence">

        <div className="sequence-placeholder">
          <span>SAN REY</span>
        </div>

        <img
          ref={imageRef}
          className="global-frame"
          src={`${GLOBAL_PRESENCE.framesPath}001.webp`}
          alt=""
          draggable="false"
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

            <a href="#" aria-label="Facebook">
              Facebook
            </a>

            <a href="#" aria-label="Instagram">
              Instagram
            </a>

            <a href="#" aria-label="TikTok">
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
   MOUNT
========================================================= */

createRoot(
  document.getElementById("root")
).render(
  <App />
);
