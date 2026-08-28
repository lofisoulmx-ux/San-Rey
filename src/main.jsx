import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PRODUCTS,
  INFRASTRUCTURE,
  ROUTE
} from "./content";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const ease = "power3.out";

/* =========================================================
   HEADER
========================================================= */

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#hero">
        <span className="brand-mark">SR</span>

        <span>
          <b>SAN REY</b>
          <small>PRODUCE</small>
        </span>
      </a>

      <button className="menu" aria-label="Menu">
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
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      })
      .to(".hero-sequence", {
        scale: 1.13,
        yPercent: 8,
        ease: "none"
      }, 0)
      .to(".hero-copy", {
        yPercent: -25,
        opacity: .2,
        ease: "none"
      }, 0);

      gsap.from(".hero-line", {
        y: 90,
        opacity: 0,
        duration: 1.25,
        stagger: .12,
        ease
      });

      gsap.from(".hero-kicker", {
        x: -35,
        opacity: 0,
        duration: 1,
        ease
      });

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="hero cinematic-section"
    >

      <div className="hero-depth">

        <div className="hero-sequence">
          <div className="sequence-placeholder">
            <span>SAN REY</span>
          </div>
        </div>

      </div>

      <div className="hero-glow" />

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

function FrameSequence({ product }) {

  const ref = useRef();
  const [frame, setFrame] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    const ctx = gsap.context(() => {

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,

        onUpdate: self => {

          const current =
            Math.round(
              self.progress *
              (product.frameCount - 1)
            ) + 1;

          setFrame(current);
        }
      });

    }, ref);

    return () => ctx.revert();

  }, [product]);

  const number =
    String(frame).padStart(3, "0");

  return (
    <div
      ref={ref}
      className={
        "frame-sequence " +
        (loaded ? "has-media" : "")
      }
    >

      <div
        className={
          "sequence-placeholder " +
          product.key
        }
      >
        <span>
          {product.english.toUpperCase()}
        </span>
      </div>

      <img
        src={`${product.framesPath}${number}.webp`}
        alt=""
        draggable="false"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />

    </div>
  );
}

/* =========================================================
   PRODUCT SCENE
========================================================= */

function ProductScene({ product, index }) {

  const ref = useRef();

  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".product-scene-copy",
        {
          y: 80,
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

      gsap.to(
        ".product-scene-media",
        {
          scale: 1.08,
          yPercent: -4,
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
      className={
        "product-scene product-scene-" +
        (index + 1)
      }
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

  const ref = useRef();

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

  const ref = useRef();

  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.to(".route-sequence", {
        scale: 1.12,
        yPercent: 7,
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

        {ROUTE.map((item, index) => (

          <div
            className="route-step"
            key={item}
          >

            <i />

            <div>
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
   INFRASTRUCTURE
========================================================= */

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
          ([number, title, subtitle, description]) => (

            <article
              className="infra-card"
              key={number}
            >

              <div className="infra-number">
                {number}
              </div>

              <div className="infra-icon">
                <span />
              </div>

              <div className="infra-copy">

                <h3>
                  {title}
                  <br />
                  <em>{subtitle}</em>
                </h3>

                <p>
                  {description}
                </p>

              </div>

              <div
                className={
                  "infra-sequence media-" +
                  number
                }
              />

            </article>

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

  const ref = useRef();

  useEffect(() => {

    const ctx = gsap.context(() => {

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

      gsap.to(".global-sequence", {
        scale: 1.1,
        yPercent: 4,
        ease: "none",

        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
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
        MÉXICO
        <span />
      </div>

      <div className="location usa">
        USA
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

            <a
              href="#"
              aria-label="Facebook"
            >
              Facebook
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              Instagram
            </a>

            <a
              href="#"
              aria-label="TikTok"
            >
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

createRoot(
  document.getElementById("root")
).render(
  <App />
);
