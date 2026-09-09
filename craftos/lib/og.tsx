import { ImageResponse } from "next/og";
export function articleOg(title: string, kind: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#101014",
          color: "#fff",
          padding: "65px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "#f2af38" }}>
          CraftOS · {kind}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 52 : 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 23, color: "#bcbcc6" }}>
          Wissen für Ihren Handwerksbetrieb · craftos.eu
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
