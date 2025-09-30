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
          [MarkersPlugin, {}]
        ]
      });

      const markersPlugin = viewer.getPlugin(MarkersPlugin);


      viewer.addEventListener("ready", () => {
        console.log("✅ Viewer berhasil dimuat");
        markersPlugin.addMarker({
          id: "to-lobby",
          position: { yaw: 0.2, pitch: 0.1 },
          image: "/assets/marker.png",
          size: { width: 32, height: 32 },
          tooltip: "Pergi ke Lobby",
        });

        markersPlugin.addMarker({
          id: "to-classroom",
          position: { yaw: -0.5, pitch: 0.15 },
          image: "/assets/marker.png",
          size: { width: 32, height: 32 },
          tooltip: "Pergi ke Ruang Kelas",
        });

        markersPlugin.addMarker({
          id: "to-library",
          position: { yaw: 1.0, pitch: -0.1 },
          image: "/assets/marker.png",
          size: { width: 32, height: 32 },
          tooltip: "Pergi ke Perpustakaan",
        });
      });
      // Event klik marker
      markersPlugin.addEventListener("select-marker", (e) => {
        const marker = e.marker;
        console.log("👉 Marker diklik:", marker.id);

        if (marker.id === "to-lobby") {
          alert("Pindah ke Lobby");
        } else if (marker.id === "to-classroom") {
          alert("Pindah ke Ruang Kelas");
        } else if (marker.id === "to-library") {
          alert("Pindah ke Perpustakaan");
        }
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
