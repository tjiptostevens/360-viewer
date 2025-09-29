import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { GalleryPlugin } from "@photo-sphere-viewer/gallery-plugin";

import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/gallery-plugin/index.css";

export default function Gallery() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const viewer = new Viewer({
            container: containerRef.current,
            panorama: "/assets/img/204.jpg", // panorama default
            plugins: [
                [GalleryPlugin, {
                    items: [
                        {
                            id: "204",
                            name: "Room 204",
                            panorama: "/assets/img/204.jpg",
                            thumbnail: "/assets/img/204.jpg",
                        },
                        {
                            id: "204A",
                            name: "Room 204A",
                            panorama: "/assets/img/204A.jpg",
                            thumbnail: "/assets/img/204A.jpg",
                        },
                        {
                            id: "204B",
                            name: "Room 204B",
                            panorama: "/assets/img/204B.jpg",
                            thumbnail: "/assets/img/204B.jpg",
                        },
                        {
                            id: "204C",
                            name: "Room 204C",
                            panorama: "/assets/img/204C.jpg",
                            thumbnail: "/assets/img/204C.jpg",
                        },
                        {
                            id: "204D",
                            name: "Room 204D",
                            panorama: "/assets/img/204D.jpg",
                            thumbnail: "/assets/img/204D.jpg",
                        },
                        {
                            id: "204E",
                            name: "Room 204E",
                            panorama: "/assets/img/204E.jpg",
                            thumbnail: "/assets/img/204E.jpg",
                        },
                    ],
                }]
            ],
        });

        return () => {
            viewer.destroy();
        };
    }, []);

    return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
