# Building Tour – Implementation Plan

## Overview

This document outlines the plan to turn the current 360-viewer prototype into a fully functional **interactive building tour** application. The goal is to allow users (prospective students, visitors, staff) to explore a building virtually by navigating between rooms/areas using 360° panoramic images with clickable hotspots.

---

## Current State

| Feature | Status |
|---------|--------|
| React + Vite project scaffold | ✅ Done |
| Photo Sphere Viewer integration | ✅ Done |
| Gallery view (multiple panoramas) | ✅ Done |
| Marker-based navigation (viewer360) | ⚠️ Prototype only (hardcoded, alerts instead of navigation) |
| Virtual Tour plugin usage | ❌ Not implemented (dependency installed but unused) |
| Responsive / mobile support | ❌ Not tested |
| Real building panorama images | ⚠️ Only Room 204 variants available |
| Deployment | ❌ Not configured |

---

## Phase 1 – Content Preparation

### 1.1 Panorama Photography
- [ ] Create a shot list of all rooms/areas to photograph (lobby, hallways, classrooms, labs, library, cafeteria, etc.)
- [ ] Capture 360° equirectangular images for each location (recommended resolution: 4096×2048 or higher)
- [ ] Name files consistently (e.g., `lobby.jpg`, `hallway-1f-north.jpg`, `room-301.jpg`)
- [ ] Optimize images for web (compress to < 3 MB each while maintaining quality)

### 1.2 Floor Plan & Node Map
- [ ] Obtain or create a simplified floor plan of the building
- [ ] Define nodes (locations where a panorama was taken) with:
  - Unique ID
  - Display name
  - Floor level
  - GPS or relative coordinates (for minimap)
- [ ] Define links between nodes (which rooms connect to which)
- [ ] Record yaw/pitch angles for each link (direction a user would look to see the next room)

---

## Phase 2 – Virtual Tour Implementation

### 2.1 Data Model
Create a JSON configuration file (`src/data/tourNodes.js` or fetched from an API) structured as:

```json
{
  "nodes": [
    {
      "id": "lobby",
      "name": "Main Lobby",
      "panorama": "/assets/img/lobby.jpg",
      "thumbnail": "/assets/img/thumbs/lobby.jpg",
      "floor": 1,
      "position": { "x": 0, "y": 0 },
      "links": [
        { "nodeId": "hallway-1f", "yaw": 1.2, "pitch": 0 },
        { "nodeId": "reception", "yaw": -0.5, "pitch": 0 }
      ],
      "markers": [
        { "id": "info-1", "type": "info", "yaw": 0.8, "pitch": 0.1, "tooltip": "Welcome Desk" }
      ]
    }
  ]
}
```

### 2.2 Integrate Virtual Tour Plugin
- [ ] Replace the current hardcoded marker navigation with the `@photo-sphere-viewer/virtual-tour-plugin`
- [ ] Configure nodes and links from the data model
- [ ] Enable arrow-based or marker-based navigation between nodes
- [ ] Add transition animations between panoramas

### 2.3 Navigation UI
- [ ] Add a floor selector (tabs or dropdown) to jump between floors
- [ ] Add a minimap or floor plan overlay showing current position
- [ ] Add a room/location search feature
- [ ] Add breadcrumb trail showing navigation history

### 2.4 Information Overlays
- [ ] Add info markers on points of interest (e.g., "Computer Lab – capacity 40")
- [ ] Support rich tooltips or side panels with text, images, and links
- [ ] Add room-specific metadata (capacity, equipment, schedule)

---

## Phase 3 – User Experience

### 3.1 Onboarding
- [ ] Add a splash/landing page with building overview
- [ ] Add guided tour mode (auto-play through a pre-defined route)
- [ ] Add usage instructions (how to navigate, click, drag)

### 3.2 Responsive Design
- [ ] Test and optimize for mobile devices (touch gestures)
- [ ] Ensure navigation controls are usable on small screens
- [ ] Test on tablets for kiosk mode usage

### 3.3 Accessibility
- [ ] Add keyboard navigation support
- [ ] Add ARIA labels to interactive elements
- [ ] Provide text alternatives for visual content

### 3.4 Performance
- [ ] Implement lazy loading for panorama images
- [ ] Add loading indicators / progress bars
- [ ] Use thumbnail previews while full images load
- [ ] Consider WebP/AVIF formats for smaller file sizes

---

## Phase 4 – Deployment & Sharing

### 4.1 Build & Hosting
- [ ] Configure production build (`vite build`)
- [ ] Set up deployment (e.g., Vercel, Netlify, GitHub Pages, or internal server)
- [ ] Configure a custom domain if needed
- [ ] Set up CI/CD pipeline for automated deploys

### 4.2 Embedding & Sharing
- [ ] Support embedding as an iframe for the school website
- [ ] Generate shareable links to specific rooms/locations (deep linking via URL params)
- [ ] Add QR codes for physical signage that link to specific tour starting points

### 4.3 Analytics (Optional)
- [ ] Track which rooms are most viewed
- [ ] Track tour completion rates
- [ ] Identify drop-off points

---

## Phase 5 – Enhancements (Future)

- [ ] Multi-language support (e.g., English / Indonesian)
- [ ] VR mode using the already-installed `@photo-sphere-viewer/stereo-plugin`
- [ ] Audio narration for guided tours
- [ ] Admin panel to manage nodes, markers, and content without code changes
- [ ] Integration with a CMS or backend API for dynamic content
- [ ] Before/after comparison (e.g., renovation progress)
- [ ] Seasonal updates (different photos for events or decorations)

---

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 7 |
| 360 Viewer | Photo Sphere Viewer 5 |
| Styling | Tailwind CSS 4 + Ant Design 5 |
| Routing | React Router 7 |
| State/Data | Local JSON (upgrade to API later) |
| Deployment | TBD (Vercel / Netlify recommended) |

---

## Immediate Next Steps

1. **Capture panoramas** – Photograph all key building locations
2. **Build the node map** – Define the tour graph (locations + connections)
3. **Implement Virtual Tour plugin** – Replace the current hardcoded viewer360 page
4. **Add a landing page** – Welcome screen with building overview and "Start Tour" button
5. **Deploy a preview** – Get a shareable URL for stakeholder feedback

---

## File Structure (Proposed)

```
360-viewer/
├── public/
│   └── assets/
│       ├── img/            # Full-size panoramas
│       ├── thumbs/         # Thumbnail versions
│       ├── icons/          # Navigation & marker icons
│       └── floor-plans/    # Floor plan images/SVGs
├── src/
│   ├── data/
│   │   └── tourNodes.js    # Tour configuration (nodes, links, markers)
│   ├── components/
│   │   ├── TourViewer.jsx  # Main virtual tour component
│   │   ├── FloorSelector.jsx
│   │   ├── Minimap.jsx
│   │   ├── InfoPanel.jsx
│   │   └── SearchBar.jsx
│   ├── pages/
│   │   ├── Landing.jsx     # Welcome / start page
│   │   ├── Tour.jsx        # Virtual tour page
│   │   └── About.jsx       # Info about the building
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   └── BUILDING_TOUR_PLAN.md
└── README.md
```
