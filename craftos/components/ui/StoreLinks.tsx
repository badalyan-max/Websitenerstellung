import { Apple } from "lucide-react";
import { site } from "@/lib/site";
import styles from "./StoreLinks.module.css";

export function StoreLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`${styles.links} ${compact ? styles.compact : ""}`}
      aria-label="CraftOS für Ihr Handy"
    >
      <a
        href={site.iosUrl}
        aria-label="CraftOS für iOS im App Store"
        className={styles.link}
      >
        <Apple size={compact ? 17 : 24} aria-hidden="true" />
        {compact ? (
          <span>iOS</span>
        ) : (
          <span>
            <small>Für iPhone und iPad</small>
            <strong>App Store</strong>
          </span>
        )}
      </a>
      <a
        href={site.androidUrl}
        aria-label="CraftOS für Android bei Google Play"
        className={styles.link}
      >
        <svg
          width={compact ? 17 : 24}
          height={compact ? 17 : 24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 3.5c0-1 .7-1.3 1.5-.8l15 8.4c.8.5.8 1.3 0 1.8l-15 8.4c-.8.5-1.5.2-1.5-.8z" />
          <path d="m4.5 3 12.8 12M4.5 21 17.3 9" />
        </svg>
        {compact ? (
          <span>Android</span>
        ) : (
          <span>
            <small>Für Ihr Android Handy</small>
            <strong>Google Play</strong>
          </span>
        )}
      </a>
    </div>
  );
}
