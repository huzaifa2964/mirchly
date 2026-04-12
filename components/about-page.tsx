"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChefHat, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Meals designed", value: "120+" },
  { label: "Cities served", value: "8" },
  { label: "Average prep time", value: "6 min" },
  { label: "Satisfaction rate", value: "98%" },
];

const pillars = [
  {
    icon: ChefHat,
    title: "Chef-Led Craft",
    description:
      "Every recipe is built like a kitchen system: spice bloom, texture balance, finish, and reheating performance are engineered together.",
  },
  {
    icon: ShieldCheck,
    title: "Clean Nutrition",
    description:
      "High protein, balanced macros, and ingredient transparency. We keep the panel clean without flattening the flavor profile.",
  },
  {
    icon: Truck,
    title: "Cold-Chain Delivery",
    description:
      "Freshly packed meals move through a controlled logistics flow so texture, aroma, and integrity arrive intact.",
  },
  {
    icon: Sparkles,
    title: "Modern Heritage",
    description:
      "We translate classic South Asian comfort food into a premium subscription format that feels fast, polished, and current.",
  },
];

const timeline = [
  {
    year: "2021",
    title: "Concept",
    text: "Mirchly started as a belief that heritage food could live in a premium DTC format without compromise.",
  },
  {
    year: "2023",
    title: "Recipe Lab",
    text: "We refined the menu architecture, portioning, and reheating system across dozens of test kitchens and tastings.",
  },
  {
    year: "2026",
    title: "Growth",
    text: "Today we serve a growing customer base with subscription meals that feel restaurant-level but fit real-life schedules.",
  },
];

export function AboutPage() {
  return (
    <div className="relative overflow-x-clip bg-[#0a0a0a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,77,0,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,215,0,0.1),transparent_28%)]" />

      <main className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-black/45 px-5 py-3 backdrop-blur-md">
          <BrandLogo compact className="scale-90 origin-left sm:scale-100" />
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Back Home</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/#pricing">Start Subscription</Link>
            </Button>
          </div>
        </header>

        <section className="grid items-end gap-8 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-8"
          >
            <Badge>About Us</Badge>
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.24em] text-white/45">Mirchly</p>
              <h1 className="font-display text-5xl leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
                We turn heritage meals into a premium everyday ritual.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/68">
                MIRCHLY is a modern direct-to-consumer food brand built for people who want real flavor, clean macros, and a beautiful subscription experience. We blend the warmth of South Asian home cooking with the speed, consistency, and polish of a luxury consumer brand.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/#menu">
                  Explore the Menu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/#weekly">See This Week&apos;s Meals</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="grid gap-4"
          >
            <Card className="overflow-hidden p-0">
              <div className="grid min-h-[280px] grid-cols-2">
                <div className="border-r border-white/10 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#FFD700]">Brand Promise</p>
                  <p className="mt-4 font-display text-4xl leading-none text-white">Luxury in the box. Familiarity in the first bite.</p>
                </div>
                <div className="flex flex-col justify-end bg-[linear-gradient(180deg,rgba(255,77,0,0.13),rgba(0,0,0,0.12))] p-6">
                  <p className="text-sm text-white/60">Built for busy professionals, health-conscious households, and anyone who wants exceptional dinner without compromise.</p>
                </div>
              </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-6">
                    <p className="text-4xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/55">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="py-6 lg:py-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <Badge>What We Stand For</Badge>
              <h2 className="mt-4 font-display text-4xl text-white">The standards behind the taste</h2>
            </div>
            <p className="max-w-xl text-sm text-white/60">
              The brand is not just a menu. It is a system for delivery, consistency, and emotional connection across every order.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <pillar.icon className="h-5 w-5 text-[#FFD700]" />
                    <CardTitle className="font-display text-2xl">{pillar.title}</CardTitle>
                    <CardDescription className="text-sm leading-6 text-white/65">{pillar.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Card className="p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[#FFD700]">Our Story</p>
            <h2 className="mt-4 font-display text-4xl text-white">A heritage-first food company designed for modern life.</h2>
            <p className="mt-5 text-white/68 leading-8">
              We believe the best food experiences are deeply cultural, operationally excellent, and emotionally reassuring. That is why Mirchly focuses on flavor memory, texture, visual presentation, and the convenience people need during their busiest weeks.
            </p>
            <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
              {[
                "Recipes shaped with chef discipline and customer feedback",
                "Premium packaging that protects aroma and presentation",
                "High-protein meals calibrated for energy and consistency",
                "A polished subscription experience with flexible plans",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-white/78">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#FF4D00]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-5">
            {timeline.map((item) => (
              <Card key={item.year}>
                <CardHeader className="flex flex-row items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-display text-2xl text-[#FFD700]">
                    {item.year.slice(-2)}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">{item.year}</p>
                    <CardTitle className="mt-1 font-display text-3xl">{item.title}</CardTitle>
                    <CardDescription className="mt-2 text-sm leading-7 text-white/65">{item.text}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-20 pt-6 lg:pt-10">
          <Card className="overflow-hidden border-white/15 bg-gradient-to-r from-white/[0.05] to-white/[0.02] p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#FFD700]">Why Mirchly</p>
                <h2 className="mt-4 font-display text-4xl text-white">We are building the most premium South Asian meal subscription brand in the market.</h2>
                <p className="mt-4 max-w-3xl text-white/68 leading-8">
                  That means obsessing over the product, the service, the packaging, the digital experience, and the way the brand feels in your home. If something can be made more elegant, faster, or more useful, we make it happen.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
