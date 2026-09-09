export interface OfferPosition {
  title: string;
  quantity: number;
  unit: string;
  unitPriceCents: number;
}

export type OfferPositions = readonly [OfferPosition, OfferPosition, OfferPosition];

export type SnippetExample = { id: string; project: string } & (
  | { variant: "angebot"; positions: OfferPositions }
  | { variant: "planung"; activity: string }
);

export const offerPositionCents = (position: OfferPosition) =>
  Math.round(position.quantity * position.unitPriceCents);

export const defaultOfferPositions: OfferPositions = [
  { title: "Wand streichen", quantity: 35, unit: "m²", unitPriceCents: 1050 },
  { title: "Untergrund vorbereiten", quantity: 35, unit: "m²", unitPriceCents: 400 },
  { title: "Boden abdecken", quantity: 20, unit: "m²", unitPriceCents: 280 },
];
