"use client";
import WorldMap from "@/components/ui/world-map";
import { motion } from "framer-motion";

export default function WorldMapDemo() {
  return (
    <div className="py-40 bg-paper dark:bg-ink w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl text-ink dark:text-paper">
          Global{" "}
          <span className="text-graphite">
            {"Movement".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-graphite max-w-2xl mx-auto py-4">
          Connect with ministry leaders worldwide. Our movemental platform spans continents, 
          empowering kingdom movements from local churches to global networks.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: {
              lat: 37.7749,
              lng: -122.4194,
            }, // San Francisco
            end: {
              lat: 51.5074,
              lng: -0.1278,
            }, // London
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: -33.8688, lng: 151.2093 }, // Sydney
          },
          {
            start: { lat: -33.8688, lng: 151.2093 }, // Sydney
            end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
          },
          {
            start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
          {
            start: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            end: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
          },
        ]}
      />
    </div>
  );
}
