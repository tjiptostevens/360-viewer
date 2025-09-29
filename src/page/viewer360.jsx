import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

export default function Viewer360() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const viewer = new Viewer({
            container: containerRef.current,
            panorama: "/assets/img/204.jpg", // ganti dengan foto kamu
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

        return () => {
            viewer.destroy();
        };
    }, []);

    return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}
