import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  SITE,
  PRODUCTS,
  ROUTE,
  ROUTE_SCENE,
  INFRASTRUCTURE,
  GLOBAL_PRESENCE,
  CONTACT,
  SOCIAL,
} from "./content";

import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   UTILITIES
========================================================= */

const ease = "power3.out";

function useScrollProgress(ref, options = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: options.start || "top bottom",
      end: options.end || "bottom top",
      scrub: options.scrub ?? true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => trigger.kill();
  }, [ref, options.start, options.end, options.scrub]);

  return progress;
}

/* =========================================================
   HEADER
========================================================= */

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#hero">
        <span className="brand-mark">SR</span>

        <span>
          <b>{SITE.brand}</b>
          <small>{SITE.brandSub}</small>
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
   REVEAL
========================================================= */

function Reveal({ children, className = "" }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* =========================================================
   FRAME SEQUENCE
   ========================================================= */

function FrameSequence({
  framesPath,
  frameCount = 60,
  className = "",
  alt = "",
  triggerRef = null,
}) {
  const internalRef = useRef();
  const ref = triggerRef || internalRef;

  const [frame, setFrame] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const nextFrame = Math.max(
            1,
            Math.min(
              frameCount,
              Math.round(self.progress * (frameCount - 1)) + 1
            )
          );

          setFrame(nextFrame);
        },
      });

      return () => trigger.kill();
    }, ref);

    return () => ctx.revert();
  }, [framesPath, frameCount, ref]);

  const frameNumber = String(frame).padStart(3, "0");

  return (
    <div
      ref={ref}
      className={`frame-sequence ${loaded ? "has-media" : ""} ${className}`}
    >
      <img
        src={`${framesPath}${frameNumber}.webp`}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />

      {!loaded && (
        <div className="sequence-placeholder">
          <span>SCENE</span>
        </div>
      )}

      <div className="frame-meta">
        <span>FRAME {frameNumber}</span>
        <span>SCROLL / CAMERA</span>
      </div>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  const sectionRef = useRef();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      timeline
        .to(
          ".hero-sequence",
          {
            scale: 1.12,
            yPercent: 8,
            ease: "none",
          },
          0
        )
        .to(
          ".hero-depth",
          {
            yPercent: -12,
            ease: "none",
          },
          0
        )
        .to(
          ".hero-copy",
          {
            yPercent: -30,
            opacity: 0.05,
            ease: "none",
          },
          0
        )
        .to(
          ".hero-glow",
          {
            scale: 1.5,
            opacity: 0.16,
            ease: "none",
          },
          0
        );

      gsap.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.3,
        stagger: 0.12,
        ease,
      });

      gsap.from(".hero-kicker", {
        x: -35,
        opacity: 0,
        duration: 1,
        ease,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero cinematic-section"
    >
      <div className="hero-depth">
        <FrameSequence
          framesPath={SITE.hero.framesPath}
          frameCount={SITE.hero.frameCount}
          className="hero-sequence"
          alt="San Rey Produce truck"
        />
      </div>

      <div className="hero-glow" />

      <div className="hero-copy">
        <div className="hero-kicker">{SITE.hero.kicker}</div>

        <h1>
          {SITE.hero.title.map((line, index) => (
            <span
              key={line}
              className={`hero-line ${
                index === SITE.hero.title.length - 1 ? "accent" : ""
              }`}
            >
              {line}
            </span>
          ))}
        </h1>

        <p>
          <Reveal>
            {SITE.hero.description}
          </Reveal>
        </p>

        <a className="ghost-button" href="#products">
          {SITE.hero.button}
          <span>↗</span>
        </a>
      </div>

      <div className="scroll-cue">
        <span />
        SCROLL TO EXPERIENCE
      </div>
    </section>
  );
}

/* =========================================================
   PRODUCTS
========================================================= */

function ProductScene({ product, index }) {
  return (
    <article className="product-card">
      <FrameSequence
        framesPath={product.framesPath}
        frameCount={product.frameCount}
        className={`product-sequence ${product.key}`}
        alt={product.english}
      />

      <div className="product-info">
        <span className="product-index">
          0{index + 1}
        </span>

        <h3>{product.title}</h3>

        <div className="product-en">
          {product.english}
        </div>

        <p>{product.description}</p>
      </div>
    </article>
  );
}

function Products() {
  const sectionRef = useRef();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".product-intro", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".product-card",
        {
          rotateX: 6,
          scale: 0.94,
        },
        {
          rotateX: 0,
          scale: 1,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: ".product-grid",
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

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

      <div className="product-grid">
        {PRODUCTS.map((product, index) => (
          <ProductScene
            key={product.key}
            product={product}
            index={index}
          />
        ))}
      </div>

      <div className="section-cta">
        VER TODOS LOS PRODUCTOS
        <span>→</span>
      </div>
    </section>
  );
}

/* =========================================================
   ROUTE
========================================================= */

function Route() {
  const sectionRef = useRef();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".route-sequence", {
        scale: 1.12,
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".route-copy", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".route-line", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="route"
      className="route cinematic-section"
    >
      <FrameSequence
        framesPath={ROUTE_SCENE.framesPath}
        frameCount={ROUTE_SCENE.frameCount}
        className="route-sequence"
        alt="San Rey Produce route"
      />

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
          Una ruta de frescura que cruza fronteras.
        </p>
      </div>

      <div className="route-line">
        {ROUTE.map((step) => (
          <div
            className="route-step"
            key={step.key}
          >
            <i />

            <div>
              <small>{step.number}</small>
              <span>{step.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="route-caption">
        CAMERA / JOURNEY
        <b>01—05</b>
      </div>
    </section>
  );
}

/* =========================================================
   INFRASTRUCTURE
========================================================= */

function InfrastructureScene({
  item,
}) {
  return (
    <article className="infra-card">
      <div className="infra-number">
        {item.number}
      </div>

      <div className="infra-icon">
        <span />
      </div>

      <div className="infra-copy">
        <h3>
          {item.title}
          <br />
          <em>{item.accent}</em>
        </h3>

        <p>{item.description}</p>
      </div>

      <FrameSequence
        framesPath={item.framesPath}
        frameCount={item.frameCount}
        className={`infra-sequence ${item.key}`}
        alt={item.title}
      />

      <span className="infra-arrow">
        ↗
      </span>
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
          Tecnología, procesos y personas comprometidas
          con la excelencia.
        </p>
      </div>

      <div className="infra-stack">
        {INFRASTRUCTURE.map((item) => (
          <InfrastructureScene
            key={item.key}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   GLOBAL PRESENCE
========================================================= */

function Global() {
  const sectionRef = useRef();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".global-sequence", {
        scale: 1.12,
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.fromTo(
        ".map-line",
        {
          strokeDashoffset: 600,
        },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      gsap.to(".global-copy", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="global"
      className="global cinematic-section"
    >
      <FrameSequence
        framesPath={GLOBAL_PRESENCE.framesPath}
        frameCount={GLOBAL_PRESENCE.frameCount}
        className="global-sequence"
        alt="San Rey Produce global presence"
      />

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
          {GLOBAL_PRESENCE.title[0]}
          <br />
          <em>{GLOBAL_PRESENCE.title[1]}</em>
        </h2>

        <p>
          {GLOBAL_PRESENCE.description}
        </p>
      </div>

      <div className="location mexico">
        {GLOBAL_PRESENCE.origin.name}
        <span />
      </div>

      <div className="location usa">
        {GLOBAL_PRESENCE.destination.name}
        <span />
      </div>

      <div className="contact">
        <div className="brand-large">
          {SITE.brand}
          <small>{SITE.brandSub}</small>
        </div>

        <p>{CONTACT.tagline}</p>

        <a href={`mailto:${CONTACT.email}`}>
          {CONTACT.button}
        </a>
      </div>

      <div className="social">
        <a href={SOCIAL.facebook}>f</a>
        &nbsp;&nbsp;&nbsp;
        <a href={SOCIAL.instagram}>◎</a>
        &nbsp;&nbsp;&nbsp;
        <a href={SOCIAL.linkedin}>in</a>
      </div>
    </section>
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
