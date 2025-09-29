import { useEffect, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

export default function Viewer360() {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    if (!container) return;

    try {
      const viewer = new Viewer({
        container,
        panorama: "/assets/img/204.jpg", // ganti dengan path gambar kamu
        plugins: [
          [MarkersPlugin, {
            markers: [
              {
                id: "marker-1",
                longitude: 0,
                latitude: 0,
                image: "/assets/marker.png",
                width: 32,
                height: 32,
                tooltip: "Ruang 204",
              }
            ]
          }]
        ]
      });

      viewer.once("ready", () => {
        console.log("✅ Viewer berhasil dimuat");
      });

      return () => viewer.destroy();
    } catch (err) {
      console.error("❌ Gagal inisialisasi viewer:", err);
    }
  }, [container]);

  return (
    <div
      ref={setContainer}
      style={{ width: "100vw", height: "100vh", background: "#000" }}
    />
  );
}
