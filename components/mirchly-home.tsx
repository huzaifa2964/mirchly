"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Flame,
  Leaf,
  Wheat,
  Dumbbell,
  ChevronRight,
  Menu,
  X,
  CalendarDays,
  UtensilsCrossed,
  Truck,
  Users,
} from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

type Meal = {
  name: string;
  subtitle: string;
  spice: "Mild" | "Medium" | "Hot";
  protein: number;
  carbs: number;
  fats: number;
  image: string;
  ingredients: string[];
};

const meals: Meal[] = [
  {
    name: "Nawab Chicken Biryani",
    subtitle: "Slow-cooked saffron rice with smoked chicken",
    spice: "Medium",
    protein: 34,
    carbs: 42,
    fats: 14,
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1400&q=80",
    ingredients: ["Basmati Rice", "Free-Range Chicken", "Saffron", "Brown Onion", "Mint"],
  },
  {
    name: "Hyderabadi Gosht Salan",
    subtitle: "Bold pepper gravy and lamb shoulder",
    spice: "Hot",
    protein: 37,
    carbs: 19,
    fats: 21,
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=1400&q=80",
    ingredients: ["Lamb Shoulder", "Tamarind", "Roasted Peanut", "Sesame", "Dry Chili"],
  },
  {
    name: "Royal Paneer Makhani",
    subtitle: "Silky tomato cashew reduction",
    spice: "Mild",
    protein: 24,
    carbs: 17,
    fats: 18,
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1400&q=80",
    ingredients: ["Paneer", "Tomato", "Cashew", "Kasuri Methi", "Ghee"],
  },
  {
    name: "Kashmiri Chicken Yakhni",
    subtitle: "Yogurt fennel broth and aromatic herbs",
    spice: "Mild",
    protein: 31,
    carbs: 11,
    fats: 13,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1400&q=80",
    ingredients: ["Chicken Thigh", "Greek Yogurt", "Fennel", "Cardamom", "Dill"],
  },
  {
    name: "Karachi Beef Nihari",
    subtitle: "Overnight braised marrow-rich stew",
    spice: "Medium",
    protein: 39,
    carbs: 16,
    fats: 24,
    image:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1400&q=80",
    ingredients: ["Grass-Fed Beef", "Bone Marrow", "Ginger", "Whole Spices", "Lemon"],
  },
  {
    name: "Tandoori Salmon Roast",
    subtitle: "Citrus-brined omega-rich fillet",
    spice: "Medium",
    protein: 33,
    carbs: 9,
    fats: 15,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1400&q=80",
    ingredients: ["Atlantic Salmon", "Yogurt", "Garlic", "Smoked Paprika", "Lime"],
  },
  {
    name: "Chicken Karahi",
    subtitle: "Wok-seared tomatoes, ginger, and green chili",
    spice: "Hot",
    protein: 36,
    carbs: 12,
    fats: 19,
    image: "/dishes/chicken-karahi.jpg",
    ingredients: ["Chicken Thigh", "Tomato", "Ginger", "Green Chili", "Coriander"],
  },
  {
    name: "Smoky BBQ Chicken",
    subtitle: "Char-grilled kebab-style chicken with masala glaze",
    spice: "Medium",
    protein: 38,
    carbs: 14,
    fats: 17,
    image: "/dishes/smoky-bbq-chicken.jpg",
    ingredients: ["Chicken Breast", "Yogurt", "Paprika", "Lemon", "Garlic"],
  },
  {
    name: "Dal Tarka",
    subtitle: "Golden lentils with garlic tempering and ghee",
    spice: "Mild",
    protein: 22,
    carbs: 30,
    fats: 10,
    image: "/dishes/dal-tarka.jpg",
    ingredients: ["Yellow Lentils", "Garlic", "Cumin", "Ghee", "Cilantro"],
  },
  {
    name: "Seekh Kebab Box",
    subtitle: "Tender spiced mince skewers with herb chutney",
    spice: "Medium",
    protein: 35,
    carbs: 10,
    fats: 18,
    image: "/dishes/seekh-kebab-box.jpg",
    ingredients: ["Beef Mince", "Onion", "Mint", "Black Pepper", "Chili Flakes"],
  },
];

const heroMedia = meals.slice(0, 4).map((meal) => meal.image);
const cities = [
  "New York",
  "Chicago",
  "Houston",
  "San Francisco",
  "Seattle",
  "Boston",
  "Atlanta",
  "Los Angeles",
];

const cateringPackages = [
  {
    tier: "Corporate Express",
    guests: "30-75 Guests",
    price: "from $18 / guest",
    features: ["2 mains + 2 sides", "On-time batch delivery", "Eco serveware"],
  },
  {
    tier: "Wedding Signature",
    guests: "80-250 Guests",
    price: "from $28 / guest",
    features: ["4 mains + live station", "Dessert and chai bar", "Floor service team"],
  },
  {
    tier: "Festival Grand",
    guests: "250+ Guests",
    price: "custom quote",
    features: ["Multi-cuisine counters", "Dedicated event captain", "Setup to cleanup"],
  },
];

const cateringFlow = [
  {
    title: "Plan",
    detail: "Share event size, venue, dietary needs, and service style.",
    icon: CalendarDays,
  },
  {
    title: "Curate",
    detail: "Chef curates a desi-forward menu with macros and spice preferences.",
    icon: UtensilsCrossed,
  },
  {
    title: "Execute",
    detail: "Kitchen dispatch, hot-chain logistics, live counters, and floor support.",
    icon: Truck,
  },
  {
    title: "Serve",
    detail: "Guest-first flow with portion control, refill cadence, and wrap-up.",
    icon: Users,
  },
];

export function MirchlyHome() {
  const [activeMedia, setActiveMedia] = useState(0);
  const [billingMonthly, setBillingMonthly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 250, y: 300 });
  const [dragWidth, setDragWidth] = useState(0);
  const [isDraggingMeals, setIsDraggingMeals] = useState(false);
  const [isMealsHovered, setIsMealsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const textParallaxY = useTransform(scrollY, [0, 700], [0, 180]);
  const mediaParallaxY = useTransform(scrollY, [0, 700], [0, 90]);
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const marqueeCities = useMemo(() => [...cities, ...cities], []);
  const topMeals = meals.slice(0, 5);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveMedia((prev) => (prev + 1) % heroMedia.length);
    }, 3200);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!carouselRef.current) {
        return;
      }
      const nextWidth = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
      setDragWidth(Math.max(0, nextWidth));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const orderX = useMotionValue(cursor.x);
  const orderY = useMotionValue(cursor.y);
  const mealsX = useMotionValue(0);

  const setOrderPosition = (nextX: number, nextY: number) => {
    if (!containerRef.current) {
      return;
    }

    const { width, height } = containerRef.current.getBoundingClientRect();
    const buttonSize = 124;
    const safeX = Math.max(12, Math.min(nextX, width - buttonSize - 12));
    const safeY = Math.max(12, Math.min(nextY, height - buttonSize - 12));
    setCursor({ x: safeX, y: safeY });
  };

  useEffect(() => {
    orderX.set(cursor.x);
    orderY.set(cursor.y);
  }, [cursor, orderX, orderY]);

  useAnimationFrame((_, delta) => {
    if (isDraggingMeals || isMealsHovered || dragWidth <= 0) {
      return;
    }

    const speedPxPerMs = 0.035;
    let nextX = mealsX.get() - delta * speedPxPerMs;
    if (nextX <= -dragWidth) {
      nextX = 0;
    }
    mealsX.set(nextX);
  });

  return (
    <div className="relative overflow-x-clip bg-[#0a0a0a] text-white">
      <motion.div style={{ scaleX: progressScaleX }} className="fixed top-0 left-0 z-[70] h-1 w-full origin-left bg-[#FF4D00]" />

      <header className="fixed top-4 left-1/2 z-50 w-[94%] max-w-6xl -translate-x-1/2 rounded-full border border-white/10 bg-black/45 px-5 py-3 backdrop-blur-md md:px-7">
        <nav className="relative flex items-center justify-between">
          <BrandLogo compact className="scale-90 origin-left sm:scale-100" />
          <div className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            <a href="#menu" className="transition hover:text-[#FF4D00]">Menu</a>
            <a href="#weekly" className="transition hover:text-[#FF4D00]">Top Meals</a>
            <a href="#catering" className="transition hover:text-[#FF4D00]">Catering</a>
            <a href="#pricing" className="transition hover:text-[#FF4D00]">Pricing</a>
            <Link href="/about" className="transition hover:text-[#FF4D00]">About Us</Link>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex">Subscribe</Button>
            <button
              type="button"
              aria-label="Open mobile menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-[calc(100%+0.7rem)] right-0 w-64 rounded-2xl border border-white/10 bg-black/90 p-3 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col text-sm text-white/85">
                <a href="#menu" className="rounded-xl px-3 py-2 transition hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Menu</a>
                <a href="#weekly" className="rounded-xl px-3 py-2 transition hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Top Meals</a>
                <a href="#catering" className="rounded-xl px-3 py-2 transition hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Catering</a>
                <a href="#pricing" className="rounded-xl px-3 py-2 transition hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <Link href="/about" className="rounded-xl px-3 py-2 transition hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                <Button size="sm" className="mt-2 w-full">Subscribe</Button>
              </div>
            </motion.div>
          )}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <section className="grid min-h-[82vh] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div style={{ y: textParallaxY }} className="space-y-8">
            <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Desi Soul.
              <br />
              Chef Prepared.
            </h1>
            <p className="max-w-xl text-lg text-white/70">
              Direct-to-consumer meals crafted with old-world spice intelligence and modern performance nutrition. Heat in minutes, taste like home.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg">Build Your Box</Button>
              <Button variant="ghost" size="lg">
                Explore Menu
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            ref={containerRef}
            style={{ y: mediaParallaxY }}
            className="relative h-[480px] overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0f0f0f]"
            onMouseMove={(event) => {
              if (!containerRef.current) {
                return;
              }
              const rect = containerRef.current.getBoundingClientRect();
              setOrderPosition(event.clientX - rect.left - 62, event.clientY - rect.top - 62);
            }}
            onMouseLeave={() => setOrderPosition(250, 300)}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,77,0,0.35),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,215,0,0.22),transparent_38%)]" />
            {heroMedia.map((src, index) => (
              <motion.div
                key={src}
                className="absolute inset-0"
                animate={{ opacity: activeMedia === index ? 1 : 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <Image
                  src={src}
                  alt="Mirchly premium meal"
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
            <motion.a
              href="#pricing"
              style={{ x: orderX, y: orderY }}
              className="absolute flex h-[124px] w-[124px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-6 text-center text-sm font-semibold tracking-[0.14em] text-white backdrop-blur-md transition hover:bg-[#FF4D00]/25 max-sm:right-5 max-sm:bottom-5 max-sm:left-auto max-sm:top-auto"
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              ORDER NOW
            </motion.a>
          </motion.div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.02] py-5">
          <div className="marquee-wrap">
            <div className="marquee-track">
              {marqueeCities.map((city, index) => (
                <span key={`${city}-${index}`} className="mx-5 inline-flex text-lg tracking-[0.15em] text-[#FFD700]/85">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="weekly" className="mt-24">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <h2 className="mt-4 font-display text-4xl text-white">This Week&apos;s Top 5</h2>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsMealsHovered(true)}
            onMouseLeave={() => setIsMealsHovered(false)}
          >
            <motion.div
              drag="x"
              style={{ x: mealsX }}
              dragConstraints={{ left: -dragWidth, right: 0 }}
              onDragStart={() => setIsDraggingMeals(true)}
              onDragEnd={() => setIsDraggingMeals(false)}
              className="flex cursor-grab gap-5 active:cursor-grabbing"
            >
              {topMeals.map((meal) => (
                <Card key={meal.name} className="h-[340px] min-w-[280px] max-w-[280px] overflow-hidden">
                  <div className="relative h-44 w-full">
                    <Image src={meal.image} alt={meal.name} fill className="object-cover" sizes="280px" />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">{meal.name}</CardTitle>
                    <CardDescription>{meal.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between text-sm text-white/80">
                    <span>{meal.protein}g protein</span>
                    <span className="text-[#FFD700]">{meal.spice} spice</span>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="menu" className="mt-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mt-4 font-display text-4xl text-white">Pick Your Signature Stack</h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {meals.map((meal, index) => (
              <Sheet key={meal.name}>
                <SheetTrigger asChild>
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    whileHover={{ scale: 1.03, rotateX: 5, rotateY: -5 }}
                    className="group text-left"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={meal.image}
                          alt={meal.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute right-3 bottom-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs tracking-[0.1em] text-[#FFD700]">
                          {meal.spice}
                        </span>
                      </div>
                      <CardHeader>
                        <CardTitle className="font-display text-2xl">{meal.name}</CardTitle>
                        <CardDescription>{meal.subtitle}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="font-display">{meal.name}</SheetTitle>
                    <SheetDescription>{meal.subtitle}</SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-7">
                    <div className="relative h-44 w-full overflow-hidden rounded-2xl">
                      <Image
                        src={meal.image}
                        alt={meal.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 420px"
                      />
                    </div>

                    <div>
                      <p className="mb-3 text-xs tracking-[0.2em] text-[#FFD700]">INGREDIENTS</p>
                      <div className="flex flex-wrap gap-2">
                        {meal.ingredients.map((item) => (
                          <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/85">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs text-white/60">Protein</p>
                        <p className="mt-1 text-2xl font-semibold text-white">{meal.protein}g</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs text-white/60">Carbs</p>
                        <p className="mt-1 text-2xl font-semibold text-white">{meal.carbs}g</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs text-white/60">Fats</p>
                        <p className="mt-1 text-2xl font-semibold text-white">{meal.fats}g</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-white/60">Spice Level</p>
                      <p className="mt-2 flex items-center gap-2 text-lg text-[#FF4D00]">
                        <Flame className="h-5 w-5" />
                        {meal.spice}
                      </p>
                    </div>

                    <Button className="w-full">Add To My Box</Button>
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </section>

        <section id="catering" className="mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="mt-4 font-display text-4xl text-white">Canteen and Event Service, Professionally Run</h2>
                <p className="mt-2 max-w-2xl text-white/65">
                  We provide full-stack event canteen operations for offices, weddings, and community events with production planning, service staffing, and live station execution.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="mailto:events@mirchly.com">Request Catering Proposal</a>
                </Button>
                <Button variant="ghost" size="lg">Book Tasting Session</Button>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {cateringPackages.map((pkg) => (
                <Card key={pkg.tier} className="p-6">
                  <p className="text-xs tracking-[0.18em] text-[#FFD700]">{pkg.guests}</p>
                  <h3 className="mt-2 font-display text-3xl text-white">{pkg.tier}</h3>
                  <p className="mt-2 text-xl text-[#FF4D00]">{pkg.price}</p>
                  <div className="mt-4 space-y-2 text-sm text-white/75">
                    {pkg.features.map((feature) => (
                      <p key={feature}>• {feature}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-4">
              {cateringFlow.map((step) => (
                <Card key={step.title} className="p-5">
                  <step.icon className="h-5 w-5 text-[#FFD700]" />
                  <p className="mt-3 font-display text-2xl text-white">{step.title}</p>
                  <p className="mt-2 text-sm text-white/70">{step.detail}</p>
                </Card>
              ))}
            </div>
          </section>

        <section id="pricing" className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 sm:p-8">

          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="mt-4 font-display text-4xl text-white">Choose Your Ritual</h2>
              <p className="mt-2 max-w-xl text-white/65">Switch your cadence anytime. Weekly for flexibility, monthly for best value.</p>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-3">
              <span className={`text-sm transition ${billingMonthly ? "text-white/60" : "text-white"}`}>Weekly</span>
              <Switch checked={billingMonthly} onCheckedChange={setBillingMonthly} />
              <span className={`text-sm transition ${billingMonthly ? "text-white" : "text-white/60"}`}>Monthly</span>
            </div>
          </div>

          <motion.div
            key={billingMonthly ? "monthly" : "weekly"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-5 md:grid-cols-3"
          >
            {[
              {
                title: "Starter",
                price: billingMonthly ? "$209" : "$59",
                unit: billingMonthly ? "/month" : "/week",
                copy: "5 meals, curated variety",
                icon: Leaf,
              },
              {
                title: "Performance",
                price: billingMonthly ? "$319" : "$89",
                unit: billingMonthly ? "/month" : "/week",
                copy: "8 meals, high-protein stack",
                icon: Dumbbell,
              },
              {
                title: "Family Feast",
                price: billingMonthly ? "$419" : "$119",
                unit: billingMonthly ? "/month" : "/week",
                copy: "12 meals, crowd favorites",
                icon: Wheat,
              },
            ].map((plan) => (
              <Card key={plan.title} className="relative overflow-hidden p-6">
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#FF4D00]/20 blur-3xl" />
                <plan.icon className="h-5 w-5 text-[#FFD700]" />
                <h3 className="mt-4 font-display text-3xl text-white">{plan.title}</h3>
                <p className="mt-3 text-5xl font-semibold tracking-tight text-white">
                  {plan.price}
                  <span className="ml-1 text-base font-normal text-white/60">{plan.unit}</span>
                </p>
                <p className="mt-3 text-white/65">{plan.copy}</p>
                <Button className="mt-6 w-full">Select Plan</Button>
              </Card>
            ))}
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <BrandLogo className="mb-4" />
            <p className="max-w-xs text-sm leading-6 text-white/65">
              Premium desi meal subscriptions and event canteen operations built for modern families and high-volume gatherings.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm tracking-[0.16em] text-[#FFD700]">Quick Links</h4>
            <div className="space-y-2 text-sm text-white/75">
              <a href="#menu" className="block transition hover:text-[#FF4D00]">Menu</a>
              <a href="#weekly" className="block transition hover:text-[#FF4D00]">Top Meals</a>
              <a href="#catering" className="block transition hover:text-[#FF4D00]">Event Catering</a>
              <a href="#pricing" className="block transition hover:text-[#FF4D00]">Subscriptions</a>
              <Link href="/about" className="block transition hover:text-[#FF4D00]">About MIRCHLY</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm tracking-[0.16em] text-[#FFD700]">Contact</h4>
            <div className="space-y-2 text-sm text-white/75">
              <a href="mailto:hello@mirchly.com" className="block transition hover:text-[#FF4D00]">hello@mirchly.com</a>
              <a href="tel:+12135551219" className="block transition hover:text-[#FF4D00]">+1 (213) 555-1219</a>
              <p>Mon-Sat, 9:00 AM - 8:00 PM</p>
              <p>Serving: NYC, Chicago, Houston, SF</p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm tracking-[0.16em] text-[#FFD700]">Event Desk</h4>
            <div className="space-y-2 text-sm text-white/75">
              <p>Corporate Canteens</p>
              <p>Wedding Catering</p>
              <p>Community & Festival Food Service</p>
              <a href="mailto:events@mirchly.com" className="inline-block pt-1 text-[#FF4D00] transition hover:text-[#ff6d2f]">
                events@mirchly.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/55 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p>© {new Date().getFullYear()} MIRCHLY Foods Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="transition hover:text-[#FF4D00]">Privacy</a>
              <a href="#" className="transition hover:text-[#FF4D00]">Terms</a>
              <a href="#" className="transition hover:text-[#FF4D00]">Food Safety</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
