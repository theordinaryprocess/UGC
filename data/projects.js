/* ============================================================
   PROJECTS — this is the only file you edit to add a video.

   Each project:
   id          unique short id (no spaces)
   title       what the video is
   brand       brand name (or "Personal" / "Concept" if not a client)
   industry    "tech" | "beauty" | "hospitality" | "lifestyle"
   format      short label, e.g. "9:16 · 30s · organic + paid"
   type        e.g. "Product demo", "Skincare routine", "Room tour"
   objective   one or two sentences — what the content had to do
   deliverables array of strings
   video       path to an mp4 in assets/videos/  (vertical 9:16, H.264, < 20 MB)
               OR leave "" and set driveId (Google Drive file id, shared "anyone with link")
   driveId     "" or the id from drive.google.com/file/d/ID/view
   poster      path to a jpg in assets/posters/ (1080x1920 recommended)
   featured    true = larger tile in the Selected Work layout
   year        "2026"
   ============================================================ */

window.PROJECTS = [
  {
    id: "dalba-morning",
    title: "Morning light, seventh bottle",
    brand: "d'Alba",
    industry: "beauty",
    format: "9:16 · 25s · organic + paid",
    type: "Skincare routine",
    objective: "Show a hero product inside a real morning, not a bathroom shelf. Long-term use made visible.",
    deliverables: ["1 × 25s video", "3 hook variations", "Raw footage"],
    video: "",
    driveId: "",
    poster: "assets/posters/placeholder-beauty.jpg",
    featured: true,
    year: "2026"
  },
  {
    id: "medicube-device",
    title: "The device I actually paid for",
    brand: "Medicube",
    industry: "beauty",
    format: "9:16 · 40s · organic",
    type: "Testimonial",
    objective: "Turn a premium device into a credible daily object: six months in, honest, with results framed as routine rather than miracle.",
    deliverables: ["1 × 40s video", "Voiceover in KO + EN", "Cutdown 15s"],
    video: "",
    driveId: "",
    poster: "assets/posters/placeholder-beauty.jpg",
    featured: false,
    year: "2026"
  },
  {
    id: "dji-bag",
    title: "What is in my bag",
    brand: "DJI",
    industry: "tech",
    format: "9:16 · 30s · organic + paid",
    type: "Aesthetic product film",
    objective: "Introduce a creator tool through the day it enables — commute, café, shoot — with the product as a quiet constant.",
    deliverables: ["1 × 30s video", "2 hook variations", "Raw footage"],
    video: "",
    driveId: "",
    poster: "assets/posters/placeholder-tech.jpg",
    featured: true,
    year: "2026"
  },
  {
    id: "casetify-bare",
    title: "New phone, bare",
    brand: "CASETiFY",
    industry: "tech",
    format: "9:16 · 20s · paid social",
    type: "Problem / solution",
    objective: "A phone with no case is a problem everyone recognises. Resolve it in one cut, with the Seongsu store as the location.",
    deliverables: ["1 × 20s video", "4 hook variations", "Stills"],
    video: "",
    driveId: "",
    poster: "assets/posters/placeholder-tech.jpg",
    featured: false,
    year: "2026"
  },
  {
    id: "hotel-concept",
    title: "Check-in at 4pm",
    brand: "Concept",
    industry: "hospitality",
    format: "9:16 · 45s · organic",
    type: "Hotel experience",
    objective: "A room tour that never shows the room first: arrival, textures, light, the view, then the bed. Built to make a booking feel inevitable.",
    deliverables: ["1 × 45s video", "Voiceover review", "Room tour cutdown"],
    video: "",
    driveId: "",
    poster: "assets/posters/placeholder-hospitality.jpg",
    featured: true,
    year: "2026"
  },
  {
    id: "seongsu-tuesday",
    title: "Seongsu, a Tuesday",
    brand: "Personal",
    industry: "lifestyle",
    format: "9:16 · 35s · organic",
    type: "Travel story",
    objective: "Ordinary Seoul, edited like an editorial. The reference piece for how lifestyle briefs are shot.",
    deliverables: ["1 × 35s video", "Raw footage"],
    video: "",
    driveId: "",
    poster: "assets/posters/placeholder-lifestyle.jpg",
    featured: false,
    year: "2026"
  }
];
