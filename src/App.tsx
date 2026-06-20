import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ShoppingBag, 
  Lock,
  CreditCard
} from "lucide-react";

// Lazy-load heavier components to optimize initial mobile paint speeds and TBT
const SalesCopy = React.lazy(() => import("./components/SalesCopy").then((m) => ({ default: m.SalesCopy })));
const CheckoutModal = React.lazy(() => import("./components/CheckoutModal"));
const FridgeApp = React.lazy(() => import("./components/FridgeApp").then((m) => ({ default: m.FridgeApp })));

export default function App() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  
  // Checkout form state
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cc" | "mp">("cc");
  const [formError, setFormError] = useState("");

  const [seatsLeft, setSeatsLeft] = useState(() => {
    const stored = localStorage.getItem("seats_left_count");
    if (stored) {
      const parsed = parseInt(stored, 10);
      return parsed >= 12 && parsed <= 47 ? parsed : 47;
    }
    return 47;
  });

  useEffect(() => {
    localStorage.setItem("seats_left_count", seatsLeft.toString());
  }, [seatsLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft((prev) => {
        if (prev <= 12) return 12;
        // Ticks down on random chance every 20 seconds
        const decrement = Math.random() > 0.85 ? 1 : 0;
        return prev - decrement;
      });
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setBuyerEmail("carinabattaglia1975@gmail.com");
  }, []);

  const handleOpenCheckout = () => {
    window.open("https://aureva-studio-2.myshopify.com/cart/54628348264820:1", "_blank");
  };

  const handleProcessSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim()) {
      setFormError("Por favor, ingresá tu nombre completo.");
      return;
    }
    if (!buyerEmail.includes("@")) {
      setFormError("Por favor, ingresá un correo electrónico válido.");
      return;
    }
    setPurchaseCompleted(true);
  };

  const handleQuickClose = () => {
    setShowCheckout(false);
    setPurchaseCompleted(false);
    setBuyerName("");
  };

  const scrollToOffer = () => {
    const element = document.getElementById("oferta-cierre");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      
      {/* 1) TOP TICKER BAR: Security & Scarcity */}
      <div className="relative w-full overflow-hidden bg-[#1b3d2b] text-emerald-100 py-2.5 text-[11px] font-sans font-medium tracking-wide z-50 border-b border-emerald-900/10">
        <div className="flex whitespace-nowrap min-w-full">
          {/* Infinite Marquee text simulating a slider */}
          <div className="flex shrink-0 items-center justify-around gap-6 min-w-full animate-marquee uppercase">
            <span>🔒 PAGO 100% SEGURO CON MERCADO PAGO • 🚀 OFERTA DE LANZAMIENTO LIMITADA • 🔥 SOLO QUEDAN {seatsLeft} DE 200 CUPOS AL PRECIO ACTUAL • 🔒 PAGO 100% SEGURO CON MERCADO PAGO • 🚀 OFERTA DE LANZAMIENTO LIMITADA •</span>
          </div>
          {/* Duplicate for flawless infinite scrolling loop */}
          <div className="flex shrink-0 items-center justify-around gap-6 min-w-full animate-marquee uppercase" aria-hidden="true">
            <span>🔒 PAGO 100% SEGURO CON MERCADO PAGO • 🚀 OFERTA DE LANZAMIENTO LIMITADA • 🔥 SOLO QUEDAN {seatsLeft} DE 200 CUPOS AL PRECIO ACTUAL • 🔒 PAGO 100% SEGURO CON MERCADO PAGO • 🚀 OFERTA DE LANZAMIENTO LIMITADA •</span>
          </div>
        </div>
      </div>

      {/* 2) HEADER WITH UNIQUE LOGO & ACTIONS */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-stone-200/60 px-6 py-3 flex items-center justify-between">
        {/* Brand identity with elegant logo design */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center font-serif font-black text-white text-base shadow-sm shrink-0">
            ❄️
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif font-bold text-stone-900 tracking-tight text-base leading-none">
              Heladera Inteligente™
            </span>
            <span className="text-[10px] text-stone-500 font-sans tracking-wide">Planificá tus Comidas</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-stone-600">
          <a href="#simulador" className="hover:text-stone-900 transition-colors">Probar Simulador</a>
          <a href="#oferta-cierre" className="hover:text-stone-900 transition-colors">Ver Oferta</a>
        </nav>

        <button 
          onClick={scrollToOffer}
          className="cursor-pointer bg-[#2c5e43] text-stone-50 hover:bg-[#1e442f] border-none text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Acceder</span>
        </button>
      </header>

      {/* 3) TOP HERO SECTION WITH BIG VIDEO PLAYLIST */}
      <section 
        className="relative pt-8 pb-14 px-4 md:px-8 border-b border-stone-200/60 overflow-hidden bg-gradient-to-b from-stone-50/50 to-white" 
        id="hero"
      >
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-850 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/40">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700 animate-pulse" />
            <span>LANZAMIENTO OFICIAL PREMIUM</span>
          </div>

          {/* HEADLINE */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-serif font-semibold text-stone-950 tracking-tight leading-tight max-w-3xl mx-auto">
            Basta de perder <span className="text-emerald-700">tiempo pensando qué cocinar</span> cada noche
          </h1>

          {/* SUBHEADLINE */}
          <p className="text-stone-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Mira cómo funciona en 2 minutos
          </p>

          {/* PROMINENT INTERACTIVE SIMULATOR CELLPHONE/WIDGET */}
          <div id="simulador" className="pt-2 max-w-4xl mx-auto text-left">
            <React.Suspense fallback={
              <div className="w-full bg-stone-100 border border-stone-200/60 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
                <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-stone-700 font-serif text-xs">Iniciando simulador de Heladera Inteligente™...</p>
              </div>
            }>
              <FridgeApp />
            </React.Suspense>
          </div>

          {/* PRIMARY HERO CTA BUTTON */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              onClick={scrollToOffer}
              className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white border-none px-8 py-4.5 rounded-2xl font-serif font-semibold text-lg md:text-xl tracking-wide shadow-xl shadow-emerald-950/25 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>QUIERO MI ACCESO AHORA</span>
              <ArrowRight className="w-5 h-5 text-white animate-pulse" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-stone-550">
              <span className="flex items-center gap-1">⏱ Acceso de por vida inmediato</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Garantía de 7 días</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4) MIDDLE SALES COPY (COVERS ¿CÓMO FUNCIONA? AND PRICE SELECTORS) */}
      <React.Suspense fallback={
        <div className="py-20 text-center flex flex-col items-center justify-center bg-stone-50">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-stone-700 font-serif text-xs">Cargando programa...</p>
        </div>
      }>
        <SalesCopy 
          onCtaclick={scrollToOffer} 
          onOpenCheckout={handleOpenCheckout}
          seatsLeft={seatsLeft}
        />
      </React.Suspense>

      {/* 5) HIGH-FIDELITY SHOPPING/CHECKOUT DIALOG SYSTEM */}
      <React.Suspense fallback={null}>
        <CheckoutModal
          showCheckout={showCheckout}
          purchaseCompleted={purchaseCompleted}
          buyerName={buyerName}
          setBuyerName={setBuyerName}
          buyerEmail={buyerEmail}
          setBuyerEmail={setBuyerEmail}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          formError={formError}
          handleProcessSimulatedPayment={handleProcessSimulatedPayment}
          handleQuickClose={handleQuickClose}
        />
      </React.Suspense>

    </div>
  );
}
