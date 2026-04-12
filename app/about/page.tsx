import type { Metadata } from "next";

import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "About Us | MIRCHLY",
  description:
    "Learn about Mirchly's modern heritage food philosophy, chef-led recipes, and premium subscription experience.",
};

export default function About() {
  return <AboutPage />;
}
