import type { Metadata } from "next";
import ResourceLibrary from '@/components/resource-library/ResourceLibrary';

export const metadata: Metadata = {
  title: "Resource Library - Alan Hirsch",
  description: "Access free lead magnets, premium toolkits, customizable templates, and curated reading lists to support your missional journey.",
};

export default function ResourcesPage() {
  return <ResourceLibrary />;
}
