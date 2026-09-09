import type { CSSProperties, ReactNode } from "react";

/* Tiki Taka design system bileşenleri — claude.ai/design projesinden uyarlandı. */

export const TICKET_URL = "https://biletinial.com/tr-tr/tiyatro/tiki-taka-dogaclama-tiyatro";
export const TICKET_ALT_URL = "https://www.bubilet.com.tr/istanbul/etkinlik/tikitaka-dogaclama";
export const IG_URL = "https://instagram.com/tikitakaimpro";
export const MAIL = "info@tikitakaimprov.com";

export function Wrap({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={"wrap " + className} style={style}>{children}</div>;
}

/* --- Buton --- */
export function Btn({
  children,
  href,
  size = "md",
  variant = "primary",
  external,
  style,
}: {
  children: ReactNode;
  href: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "ghost" | "dark";
  external?: boolean;
  style?: CSSProperties;
}) {
  const cls = ["btn", size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "", variant === "ghost" ? "btn-ghost" : variant === "dark" ? "btn-dark" : ""].filter(Boolean).join(" ");
  return (
    <a className={cls} href={href} style={style} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

export function Label({ tone, children, style }: { tone?: "brand" | "deep"; children: ReactNode; style?: CSSProperties }) {
  const t = tone === "brand" ? " dslabel-brand" : tone === "deep" ? " dslabel-deep" : "";
  return <div className={"dslabel" + t} style={style}>{children}</div>;
}

export function Tag({ tone, children }: { tone?: "alt" | "solid" | "line" | "accent"; children: ReactNode }) {
  const t = tone && tone !== "solid" ? " dstag-" + tone : "";
  return <span className={"dstag" + t}>{children}</span>;
}

export function SectionHead({ kicker, title, note }: { kicker?: string; title: string; note?: string }) {
  return (
    <div className="shead">
      {kicker ? <Label>{kicker}</Label> : null}
      <h2>{title}</h2>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

export function Quote({
  children,
  cite,
  tilt,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  cite?: string;
  tilt?: boolean;
  tone?: "brand" | "body" | "deep";
  className?: string;
}) {
  const t = tone === "body" ? " dsquote-body" : tone === "deep" ? " dsquote-deep" : "";
  return (
    <figure className={"dsquote" + t + " " + className} style={tilt ? { transform: "rotate(var(--tilt))" } : undefined}>
      <p>{children}</p>
      {cite ? <figcaption>{cite}</figcaption> : null}
    </figure>
  );
}

export function NoteBlock({
  title,
  dark,
  tone,
  children,
  style,
}: {
  title?: string;
  dark?: boolean;
  tone?: "mor" | "siyah";
  children: ReactNode;
  style?: CSSProperties;
}) {
  const cls = ["note", dark ? "note-dark" : "", tone ? "note-" + tone : ""].filter(Boolean).join(" ");
  return (
    <div className={cls} style={style}>
      {title ? <div className="note-t">{title}</div> : null}
      <div className="b2">{children}</div>
    </div>
  );
}

export function EventCard({
  kind = "",
  venue = "Kılçık Mekan",
  title,
  when,
  blurb,
  cta = "Bilet Al",
  href = TICKET_URL,
  tilt = false,
}: {
  kind?: string;
  venue?: string;
  title: string;
  when?: string;
  blurb?: string;
  cta?: string;
  href?: string;
  tilt?: boolean;
}) {
  return (
    <article className="ecard" style={tilt ? { transform: "rotate(var(--tilt-alt))" } : undefined}>
      <div className="ecard-top">
        <span>{kind}</span>
        <span>{venue}</span>
      </div>
      <div className="ecard-body">
        <h3>{title}</h3>
        {when ? <div className="ecard-when">{when}</div> : null}
        {blurb ? <p className="b2">{blurb}</p> : null}
        <div style={{ marginTop: "var(--s2)" }}>
          <a className="btn btn-sm" href={href} target="_blank" rel="noopener noreferrer">{cta}</a>
        </div>
      </div>
    </article>
  );
}

export function Marquee({ text, tone, reverse, skew }: { text: string; tone?: "mor" | "stripe" | "sari"; reverse?: boolean; skew?: boolean }) {
  const cls = ["mq", tone === "mor" ? "mq-mor" : "", tone === "sari" ? "mq-y" : "", tone === "stripe" ? "tex-stripe-k" : "", reverse ? "mq-rev" : "", skew ? "mq-skew" : ""].filter(Boolean).join(" ");
  return (
    <div className={cls} aria-hidden="true">
      <div className="mq-tr"><span>{text}</span><span>{text}</span></div>
    </div>
  );
}

export function Sticker({ children, tone, style, className = "" }: { children: ReactNode; tone?: "mor" | "yesil" | "y"; style?: CSSProperties; className?: string }) {
  const t = tone ? " sticker-" + tone : "";
  return <span className={"sticker" + t + " " + className} style={style}>{children}</span>;
}

export function DivX({ label = "× · +", dark }: { label?: string; dark?: boolean }) {
  return <div className={"divx" + (dark ? " divx-k" : "")}>{label}</div>;
}

/* Tasarımdaki foto alanları — görseller kırpılmış hâlleriyle /public/ds içinde. */
export function PhotoBox({
  slot,
  alt,
  ratio = "4 / 3",
  tilt,
  caption,
  priority,
}: {
  slot: string;
  alt: string;
  ratio?: string;
  tilt?: "tilt" | "tilt-alt";
  caption?: string;
  priority?: boolean;
}) {
  return (
    <div>
      <div className={"slot" + (tilt ? " " + tilt : "")} style={{ aspectRatio: ratio }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/ds/${slot}.webp`} alt={alt} loading={priority ? "eager" : "lazy"} />
      </div>
      {caption ? <div className="slot-cap mono">{caption}</div> : null}
    </div>
  );
}
