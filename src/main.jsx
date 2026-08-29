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

          <b>
            SAN REY
          </b>

          <small>
            PRODUCE
          </small>

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


      /* HERO TEXT */

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


      /* SCROLL CUE */

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
   PRODUCT SCENE
========================================================= */

function ProductScene({
  product,
  index
}) {

  const sceneRef = useRef(null);
  const mediaRef = useRef(null);
  const copyRef = useRef(null);

  const videoSrc = product.video;


  useEffect(() => {

    const scene = sceneRef.current;
    const media = mediaRef.current;
    const copy = copyRef.current;

    if (!scene || !media || !copy) return;

    const ctx = gsap.context(() => {

      /* VIDEO PARALLAX */

      gsap.fromTo(
        media,
        {
          scale: 1.08,
          yPercent: 4
        },
        {
          scale: 1.18,
          yPercent: -4,
          ease: "none",

          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        }
      );


      /* TEXTO */

      gsap.fromTo(
        copy,
        {
          opacity: 0,
          y: 90
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",

          scrollTrigger: {
            trigger: scene,
            start: "top 80%",
            end: "center 50%",
            scrub: 0.8
          }
        }
      );


      /* FADE */

      gsap.fromTo(
        scene,
        {
          opacity: 0.65
        },
        {
          opacity: 1,
          ease: "none",

          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "top 60%",
            scrub: 0.6
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
          y: 80
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",

          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 35%",
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

          <em>
            PREMIUM.
          </em>

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

      /* VIDEO PARALLAX */

      gsap.fromTo(
        media,
        {
          scale: 1.04,
          yPercent: 0
        },
        {
          scale: 1.10,
          yPercent: -2,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        }
      );


      /* TITULO */

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


      /* ETAPAS */

      steps.forEach((_, index) => {

        const stepElement =
          section.querySelector(
            `[data-route-step="${index}"]`
          );

        if (!stepElement) return;

        const start = index * 20;
        const end = start + 10;


        gsap.fromTo(
          stepElement,
          {
            opacity: 0,
            y: 20,
            filter: "blur(6px)"
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

          <video
            className="scene-video"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
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
            <em>
              AL MUNDO.
            </em>
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
   INFRASTRUCTURE
   CINEMATIC CONTINUOUS SEQUENCE
========================================================= */

function Infrastructure() {

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const scenesRef = useRef([]);
  const copiesRef = useRef([]);

  /*
   * Los cuatro videos se cargan automáticamente
   * siguiendo el orden de INFRASTRUCTURE.
   */

  const infrastructureScenes =
    INFRASTRUCTURE.map((scene, index) => ({

      ...scene,

      videoSrc:
        scene.videoSrc ||
        `/assets/infrastructure/infrastructure-${String(
          index + 1
        ).padStart(2, "0")}.mp4`

    }));


  useEffect(() => {

    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) return;

    const scenes = scenesRef.current;
    const copies = copiesRef.current;

    const ctx = gsap.context(() => {

      /*
       * =====================================================
       * ESTADO INICIAL
       * =====================================================
       */

      gsap.set(scenes, {
        opacity: 0,
        scale: 1.06
      });


      gsap.set(scenes[0], {
        opacity: 1,
        scale: 1
      });


      gsap.set(copies, {
        opacity: 0,
        y: 35
      });


      gsap.set(copies[0], {
        opacity: 1,
        y: 0
      });


      /*
       * =====================================================
       * MASTER TIMELINE
       *
       * Todo Infrastructure funciona como UNA SOLA
       * experiencia visual.
       * =====================================================
       */

      const timeline = gsap.timeline({

        scrollTrigger: {

          trigger: section,

          start: "top top",

          end: "bottom bottom",

          scrub: 0.8,

          pin: stage,

          anticipatePin: 1,

          invalidateOnRefresh: true

        }

      });


      /*
       * =====================================================
       * SECUENCIA DE LOS 4 VIDEOS
       * =====================================================
       */

      infrastructureScenes.forEach((_, index) => {

        if (index === 0) {

          timeline.to(
            scenes[0],
            {
              scale: 1.02,
              duration: 1,
              ease: "none"
            }
          );

          return;
        }


        /*
         * Entrada del siguiente video
         */

        timeline.to(
          scenes[index],
          {
            opacity: 1,
            scale: 1,
            duration: 1.15,
            ease: "power2.inOut"
          },
          "+=0.15"
        );


        /*
         * Salida del video anterior
         */

        timeline.to(
          scenes[index - 1],
          {
            opacity: 0,
            scale: 1.025,
            duration: 1.15,
            ease: "power2.inOut"
          },
          "<"
        );


        /*
         * Texto anterior desaparece
         */

        timeline.to(
          copies[index - 1],
          {
            opacity: 0,
            y: -25,
            duration: 0.35,
            ease: "power2.out"
          },
          "<"
        );


        /*
         * Nuevo texto entra suavemente
         */

        timeline.to(
          copies[index],
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out"
          },
          "-=0.45"
        );

      });


      /*
       * =====================================================
       * PEQUEÑO HOLD FINAL
       *
       * Permite disfrutar el cuarto video antes
       * de abandonar Infrastructure.
       * =====================================================
       */

      timeline.to(
        stage,
        {
          scale: 1,
          duration: 0.7,
          ease: "none"
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


      {/* ===================================================
          ESCENARIO FIJO
      =================================================== */}

      <div
        ref={stageRef}
        className="infra-stage"
      >


        {/* =================================================
            VIDEOS SUPERPUESTOS
        ================================================= */}

        <div className="infra-video-stack">

          {infrastructureScenes.map(
            (scene, index) => (

              <div
                key={scene.number || index}
                ref={(element) => {
                  scenesRef.current[index] = element;
                }}
                className="infra-video-scene"
              >

                <LoopVideo
                  src={scene.videoSrc}
                />

              </div>

            )
          )}

        </div>


        {/* =================================================
            OVERLAY CINEMATOGRÁFICO
        ================================================= */}

        <div className="infra-overlay" />


        {/* =================================================
            HEADER / TITULO
        ================================================= */}

        <div className="infra-title">

          <div className="section-no">
            04 / INFRASTRUCTURE
          </div>


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


        {/* =================================================
            TEXTOS DE CADA VIDEO
        ================================================= */}

        <div className="infra-content">

          {infrastructureScenes.map(
            (scene, index) => (

              <div
                key={`copy-${scene.number || index}`}
                ref={(element) => {
                  copiesRef.current[index] = element;
                }}
                className="infra-copy cinematic-infra-copy"
              >

                <div className="infra-kicker">
                  SAN REY PRODUCE
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


                <div className="infra-progress">

                  <span>
                    0{index + 1}
                  </span>

                  <i />

                  <span>
                    0{infrastructureScenes.length}
                  </span>

                </div>

              </div>

            )
          )}

        </div>


        {/* =================================================
            INDICADOR DE PROGRESO
        ================================================= */}

        <div className="infra-sequence-label">

          <span>
            SUPPLY CHAIN
          </span>

          <div className="infra-sequence-line" />

          <span>
            CONTINUOUS PROCESS
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

      /* VIDEO PARALLAX */

      gsap.fromTo(
        media,
        {
          scale: 1.06,
          yPercent: 4
        },
        {
          scale: 1.16,
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


      /* TEXTO */

      gsap.fromTo(
        copy,
        {
          opacity: 0,
          y: 80
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",

          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "center 45%",
            scrub: 0.8
          }
        }
      );


      /* MAPA */

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
          <em>
            GLOBAL.
          </em>
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
