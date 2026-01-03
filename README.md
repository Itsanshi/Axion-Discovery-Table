🧾 Token Trading Table – Frontend Task

A pixel-perfect frontend implementation of Axiom Trade’s Token Discovery Table built using Next.js 14 App Router, TypeScript, and Tailwind CSS.
The goal of this project is to replicate the UI, interactions, and performance characteristics of the original product with high accuracy, smooth UX, and clean architecture.

📌 Objective

Build a high-performance, reusable, and visually accurate token discovery table that matches Axiom Trade’s UI with ≤ 2px visual difference, supports real-time price updates, and demonstrates strong frontend engineering fundamentals.

✨ Core Features
Token Table

Implemented all token columns:

New Pairs
Final Stretch
Migrated
Sorting support across relevant columns
Responsive table layout down to 320px width
Interactions & UX
Hover effects and click actions
Popover, Tooltip, and Modal implementations
Smooth micro-interactions with zero layout shift
Real-Time Updates
WebSocket mock for live price updates
Animated numeric transitions (no color flashing)
Optimized rendering for frequent updates
Loading & Error States
Skeleton loaders
Shimmer effects
Progressive loading
Error boundaries for graceful failure handling
Visual Accuracy
Pixel-perfect UI matching the source website
Verified with visual regression testing
Maximum allowed difference: ≤ 2px

🛠️ Tech Stack

Framework: Next.js 14 (App Router)
Language: TypeScript (strict mode)
Styling: Tailwind CSS
State Management: Redux Toolkit
Data Fetching & Caching: React Query
UI & Accessibility: Radix UI,Headless UI, shadcn/ui
Performance: Memoized components, Optimized rendering paths, No layout shifts < 100ms user interactions


🚀 Performance

Lighthouse score ≥ 90 on both mobile and desktop
Memoization to prevent unnecessary re-renders
Optimized WebSocket updates
No CLS (Cumulative Layout Shift)


Every component is designed to be extendable and reusable across the application.
