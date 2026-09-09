import Image from "next/image";
const slugs = [
  "elektriker",
  "shk",
  "maler",
  "tischler-schreiner",
  "dachdecker",
  "fliesenleger",
  "zimmerer",
  "galabau",
  "trockenbau",
  "metallbau",
  "bauunternehmen",
  "allrounder",
];
export function GewerkIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return (
    <Image
      src={
        "/icons/gewerke/" +
        (slugs.includes(slug) ? slug : "allrounder") +
        ".svg"
      }
      alt=""
      width={64}
      height={64}
      className={className}
      unoptimized
    />
  );
}
