"use client";

import type { TeamMember } from "@/types/team";

const AMBER = "#C8773E";

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function TeamCard({
  name,
  title,
  description,
  imageSrc,
  linkedinUrl,
  badgeSrc = "/Supplied Icon Orange.svg",
}: TeamMember & { badgeSrc?: string }) {
  return (
    <div className="team-card">
      <img src={imageSrc} alt={name} className="card-img" />
      <div className="img-blur" />

      <div className="badge">
        <img src={badgeSrc} alt="Supplied" className="w-6 h-6" />
      </div>

      <section>
        <div className="name-plate">
          <h2>{name}</h2>
          <span className="role">{title}</span>
        </div>

        <p>{description}</p>

        <div className="card-actions">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            <LinkedInIcon />
          </a>
        </div>
      </section>

      <style jsx>{`
        .team-card {
          background: #1a1a1a;
          border-radius: 2rem;
          padding: 0.5rem;
          width: 100%;
          height: 22rem;
          overflow: clip;
          position: relative;
          cursor: default;
          transition: box-shadow 0.35s ease;
        }

        .team-card:hover,
        .team-card:focus-within {
          box-shadow: 0 0 40px 8px rgba(200, 119, 62, 0.35),
                      0 0 80px 20px rgba(200, 119, 62, 0.15);
        }

        .card-img {
          width: 100%;
          height: 21rem;
          object-fit: cover;
          object-position: 50% 25%;
          border-radius: 1.5rem;
          display: block;
          transition: height 0.3s ease, object-position 0.3s ease;
        }

        .img-blur {
          position: absolute;
          width: calc(100% - 1rem);
          height: 35%;
          bottom: 0.5rem;
          left: 0.5rem;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 80%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 80%);
          -webkit-backdrop-filter: blur(1rem);
          backdrop-filter: blur(1rem);
          border-radius: 0 0 1.5rem 1.5rem;
          z-index: 1;
          pointer-events: none;
          translate: 0 0;
          transition: translate 0.25s ease;
        }

        .badge {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
          z-index: 3;
        }

        .team-card > section {
          margin: 0.6rem 1rem 0;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .name-plate {
          translate: 0 -5rem;
          background: #1a1a1a;
          border-radius: 1rem;
          padding: 0.6rem 1.2rem;
          width: fit-content;
          transition: translate 0.3s ease, background 0.3s ease,
                      padding 0.3s ease, border-radius 0.3s ease;
        }

        .name-plate h2 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #fff;
          white-space: nowrap;
          transition: color 0.3s;
        }

        .role {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: ${AMBER};
          margin-top: 0.15rem;
          transition: color 0.3s;
        }

        .team-card > section p {
          font-size: 0.75rem;
          line-height: 1.4;
          color: #bbb;
          opacity: 0;
          margin: 0;
          margin-block-start: 0.5rem;
          translate: 0 30%;
          transition: opacity 0.35s 0.1s, translate 0.25s 0.1s;
        }

        .card-actions {
          margin-block-start: 0.75rem;
          margin-block-end: 0.35rem;
          display: flex;
          align-items: center;
          opacity: 0;
          translate: 0 30%;
          transition: translate 0.25s 0.15s, opacity 0.35s 0.15s;
        }

        .linkedin-link {
          display: flex;
          align-items: center;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }

        .linkedin-link:hover {
          color: ${AMBER};
        }

        /* ===== HOVER STATE ===== */

        .team-card:hover .img-blur,
        .team-card:focus-within .img-blur {
          translate: 0 100%;
        }

        .team-card:hover .card-img,
        .team-card:focus-within .card-img {
          height: 12rem;
          object-position: 50% 30%;
        }

        .team-card:hover .name-plate,
        .team-card:focus-within .name-plate {
          translate: 0 0;
          background: transparent;
          padding: 0;
          border-radius: 0;
        }

        .team-card:hover .name-plate h2,
        .team-card:focus-within .name-plate h2 {
          color: #fff;
        }

        .team-card:hover .role,
        .team-card:focus-within .role {
          color: ${AMBER};
        }

        .team-card:hover > section p,
        .team-card:focus-within > section p {
          translate: 0 0;
          opacity: 1;
        }

        .team-card:hover .card-actions,
        .team-card:focus-within .card-actions {
          translate: 0 0;
          opacity: 1;
          transition: translate 0.25s 0.2s, opacity 0.4s 0.2s;
        }
      `}</style>
    </div>
  );
}
