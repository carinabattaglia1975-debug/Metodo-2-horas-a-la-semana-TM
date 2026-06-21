import React, { useState, useEffect, useCallback } from "react";
import { 
  ShoppingBag
} from "lucide-react";
import { SalesCopy } from "./components/SalesCopy";

// Lazy-load heavier components to optimize initial mobile paint speeds and TBT
const CheckoutModal = React.lazy(() => import("./components/CheckoutModal"));

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

  const handleOpenCheckout = useCallback(() => {
    window.open("https://aureva-studio-2.myshopify.com/cart/54824443674996:1", "_blank");
  }, []);

  const handleProcessSimulatedPayment = useCallback((e: React.FormEvent) => {
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
  }, [buyerName, buyerEmail]);

  const handleQuickClose = useCallback(() => {
    setShowCheckout(false);
    setPurchaseCompleted(false);
    setBuyerName("");
  }, []);

  const scrollToOffer = useCallback(() => {
    const element = document.getElementById("oferta-cierre");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

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
            <span className="text-[10px] text-stone-800 font-semibold font-sans tracking-wide">Planificá tus Comidas</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-stone-800">
          <a href="#sales-page" className="hover:text-stone-900 transition-colors">Beneficios</a>
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

      {/* 3) MAIN SALES PAGE CONTAINER */}
      <main id="main-content">
        <SalesCopy 
          onCtaclick={scrollToOffer} 
          onOpenCheckout={handleOpenCheckout}
        />
      </main>

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
