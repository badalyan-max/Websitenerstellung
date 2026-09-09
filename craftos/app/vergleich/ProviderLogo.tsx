import Image from "next/image";
import { CraftOSMark } from "@/components/CraftOSLogo";
import styles from "./Comparison.module.css";

type ProviderName = "CraftOS" | "Craftnote" | "plancraft";

/** Official brand artwork, sized consistently without recolouring or cropping. */
export function ProviderLogo({ provider }: { provider: ProviderName }) {
  return (
    <span
      className={`${styles.providerLogo} ${provider === "plancraft" ? styles.providerLogoDark : ""}`}
      role="img"
      aria-label={provider}
    >
      {provider === "CraftOS" ? (
        <span className={styles.craftosWordmark} aria-hidden="true">
          <CraftOSMark size={44} />
          <span>CraftOS</span>
        </span>
      ) : (
        <Image
          src={`/images/brands/${provider === "Craftnote" ? "craftnote.png" : "plancraft.svg"}`}
          alt=""
          width={provider === "Craftnote" ? 1277 : 146}
          height={provider === "Craftnote" ? 335 : 40}
          unoptimized
          className={styles.providerArtwork}
        />
      )}
    </span>
  );
}
