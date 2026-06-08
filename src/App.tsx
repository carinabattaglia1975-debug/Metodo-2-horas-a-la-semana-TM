import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Clock, 
  Download, 
  ShoppingBag, 
  CreditCard, 
  BookmarkCheck, 
  Star,
  Users,
  Flame,
  ChefHat
} from "lucide-react";

// Lazy-load heavier components to optimize initial mobile bundle size, paint speeds, and TBT
const SalesCopy = React.lazy(() => import("./components/SalesCopy").then((m) => ({ default: m.SalesCopy })));
const FridgeApp = React.lazy(() => import("./components/FridgeApp").then((m) => ({ default: m.FridgeApp })));
const CheckoutModal = React.lazy(() => import("./components/CheckoutModal"));

export default function App() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  
  // Keep track of viewport intersection to lazily load & mount the FridgeApp component
  const [loadFridge, setLoadFridge] = useState(false);
  const fridgeContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadFridge(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } // Load early for a seamless UX before they scroll all the way down
    );

    const el = fridgeContainerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Checkout form state
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cc" | "mp">("cc");
  const [formError, setFormError] = useState("");

  const [seatsLeft, setSeatsLeft] = useState(() => {
    const stored = localStorage.getItem("seats_left_count");
    if (stored) {
      const parsed = parseInt(stored, 10);
      // Ensure we keep it within correct boundaries [12, 47]
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
        // Ticks down on random chance every 20 seconds to feel alive but not too fast
        const decrement = Math.random() > 0.85 ? 1 : 0;
        return prev - decrement;
      });
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Simulated buyer tracking from session
  useEffect(() => {
    // If user accepted email, prefill
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

  const scrollToFridgeDemo = () => {
    const element = document.getElementById("seccion-app-inteligente");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToOffer = () => {
    const element = document.getElementById("oferta-cierre");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      
      {/* 15-Minute Infinite Scroller Banner */}
      <div className="relative w-full overflow-hidden bg-emerald-950 text-emerald-100 py-2 text-xs font-medium select-none z-50 border-b border-emerald-900/40">
        <div className="flex whitespace-nowrap min-w-full">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center justify-around gap-8 min-w-full animate-marquee uppercase tracking-wider">
            <span>🔒 PAGO 100% SEGURO CON MERCADO PAGO • 🚀 OFERTA DE LANZAMIENTO LIMITADA • 🔥 SOLO QUEDAN {seatsLeft} DE 200 CUPOS • 🔒 PAGO 100% SEGURO CON MERCADO PAGO • 🚀 OFERTA DE LANZAMIENTO LIMITADA • 🔥 SOLO QUEDAN {seatsLeft} DE 200 CUPOS •</span>
          </div>
          {/* Track 2 (Duplicate for flawless infinite tiling) */}
          <div className="flex shrink-0 items-center justify-around gap-8 min-w-full animate-marquee uppercase tracking-wider" aria-hidden="true">
            <span>🔒 PAGO 100% SEGURO CON MERCADO PAGO • 🚀 OFERTA DE LANZAMIENTO LIMITADA • 🔥 SOLO QUEDAN {seatsLeft} DE 200 CUPOS • 🔒 PAGO 100% SEGURO CON MERCADO PAGO • 🚀 OFERTA DE LANZAMIENTO LIMITADA • 🔥 SOLO QUEDAN {seatsLeft} DE 200 CUPOS •</span>
          </div>
        </div>
      </div>

      {/* Floating Sticky Top Bar (Aesthetic & Purposeful) */}
      <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-stone-200/60 px-6 py-2.5 md:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#2c5e43] flex items-center justify-center font-serif font-bold text-white text-base">
            2H
          </div>
          <span className="font-serif font-semibold text-stone-900 tracking-tight text-base">
            Método 2H™
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700">
          <a href="#audiencia" className="hover:text-stone-950 transition-colors">¿Para quién?</a>
          <a href="#metodo" className="hover:text-stone-950 transition-colors">El Sistema</a>
          <a href="#seccion-app-inteligente" className="hover:text-stone-950 transition-colors">Ver App Web (Bono 1)</a>
          <a href="#testimonios" className="hover:text-stone-950 transition-colors">Testimonios</a>
          <a href="#faq" className="hover:text-stone-950 transition-colors text-stone-700">Soporte</a>
        </nav>

        <button 
          onClick={scrollToOffer}
          className="cursor-pointer bg-emerald-600 text-stone-50 hover:bg-emerald-700 border-none text-xs md:text-sm font-medium py-2 px-4.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Quiero mi Método 2H + Heladera Inteligente</span>
        </button>
      </header>

      {/* 1) HÉROE (HERO SECTION) */}
      <section 
        className="relative pt-3 pb-10 md:pt-4 md:pb-16 px-4 md:px-8 border-b border-stone-200/60 overflow-hidden" 
        id="hero"
      >
        {/* Optimized background WebP image with media fallback to avoid render-blocking/network congestion on mobile */}
        <picture className="absolute inset-0 w-full h-full select-none pointer-events-none z-0">
          <source srcSet="https://i.postimg.cc/sDBgN4W5/Chat-GPT-Image-29-may-2026-12-45-17.webp" media="(max-width: 768px)" type="image/webp" />
          <img 
            src="https://i.postimg.cc/sDBgN4W5/Chat-GPT-Image-29-may-2026-12-45-17.webp" 
            alt="" 
            loading="eager" 
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
            width="1920"
            height="1080"
          />
        </picture>
        {/* Soft, premium light overlay to ensure maximum readability of the typography */}
        <div className="absolute inset-0 bg-white/92 backdrop-blur-[1px] z-5" />
        
        {/* Alert block moved to the very top to minimize vertical whitespace ("aire arriba") */}
        <div className="relative z-10 max-w-6xl mx-auto pt-1 pb-2">
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-xl max-w-xl mx-auto md:mx-0 shadow-sm animate-pulse">
            <p className="text-red-700 font-bold text-xs sm:text-sm md:text-sm tracking-wide">
              ⚠️ Si son las 6PM y todavía no sabés qué cocinar... esto termina HOY
            </p>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12 items-center py-1 md:py-2">
          
          {/* Col 1: Sales Text Copy */}
          <div className="md:col-span-7 space-y-5 text-center md:text-left">
            

            <div className="inline-flex items-center gap-1.5 bg-emerald-100/60 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/50">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
              <span>OFERTA DE LANZAMIENTO - DESCUENTO LIMITADO</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-serif font-bold text-stone-950 tracking-tight leading-tight">
              Basta de perder <span className="text-emerald-700">tiempo pensando qué cocinar</span> cada noche.
            </h1>

            {/* Prominent Bundle Image under the headline, with reduced size - optimized with fetchPriority="high" for mobile LCP */}
            <div className="my-4 max-w-[320px] mx-auto md:mx-0">
              <img 
                src="https://i.postimg.cc/NM8BLnk9/input-file-3-(1).webp" 
                alt="Bono 1 al 5 + Método Heladera Inteligente" 
                referrerPolicy="no-referrer"
                fetchPriority="high"
                className="w-full h-auto rounded-2xl shadow-md border border-stone-200/60 hover:shadow-lg hover:scale-[1.01] transition-all duration-350"
                width="320"
                height="320"
              />
            </div>

            {/* Text placed below the image, with reduced font size */}
            <div className="space-y-1.5 text-center md:text-left max-w-xl">
              <p className="text-[#2c5e43] text-xs sm:text-sm md:text-base font-sans font-semibold leading-snug">
                Método 2H™ + App Heladera Inteligente: el sistema que resuelve automáticamente todas tus comidas semanales dedicando solo 2 horas un día
              </p>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-left shadow-sm">
              <span className="text-xs md:text-sm text-amber-950 font-medium font-sans leading-relaxed block">
                ⚠️ Mientras leés esto, hay mujeres perdiendo 14 horas semanales solo decidiendo qué cocinar. <strong className="text-stone-950">¿Hasta cuándo vas a ser una de ellas?</strong>
              </span>
            </div>

            {/* Core Pain points block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white border border-stone-200/70 rounded-xl text-left flex gap-2 items-start shadow-sm">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs md:text-sm text-stone-700 leading-snug">Menos improvisación post-trabajo</span>
              </div>
              <div className="p-3 bg-white border border-[#2c5e43]/15 bg-emerald-50/20 rounded-xl text-left flex gap-2 items-start shadow-sm">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs md:text-sm text-stone-700 leading-snug font-medium">Menos delivery</span>
              </div>
              <div className="p-3 bg-white border border-stone-200/70 rounded-xl text-left flex gap-2 items-start shadow-sm">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs md:text-sm text-stone-700 leading-snug">Menos gasto en productos que se te vencen</span>
              </div>
              <div className="p-3 bg-white border border-[#2c5e43]/15 bg-emerald-50/20 rounded-xl text-left flex gap-2 items-start shadow-sm">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs md:text-sm text-stone-700 leading-snug font-medium">Más paz mental (decisión cero)</span>
              </div>
            </div>

            {/* Cupos progress bar in Hero left column */}
            <div className="space-y-2 bg-stone-100/70 border border-stone-200/55 p-4 rounded-xl max-w-md mx-auto md:mx-0 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-800 font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block animate-ping"></span>
                  <span>🔥 Solo quedan <strong className="text-red-700 font-extrabold">{seatsLeft} de 200 cupos</strong> al precio de lanzamiento</span>
                </span>
                <span className="text-stone-700 font-bold font-mono">{Math.round(((200 - seatsLeft) / 200) * 100)}% completado</span>
              </div>
              <div className="w-full bg-[#e8e5de] h-2.5 rounded-full overflow-hidden shadow-inner p-[1px]">
                <div 
                  className={`${seatsLeft > 30 ? "bg-emerald-600" : seatsLeft >= 15 ? "bg-amber-500" : "bg-red-600"} h-full rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${((200 - seatsLeft) / 200) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3.5 pt-2">
              <button
                onClick={scrollToOffer}
                className="cursor-pointer w-full sm:w-auto bg-[#2c5e43] hover:bg-[#1e442f] text-white border-none px-8 py-4.5 rounded-xl font-serif font-semibold text-lg md:text-xl tracking-wide shadow-xl shadow-emerald-950/15 hover:shadow-emerald-950/25 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Quiero mi Método 2H + Heladera Inteligente</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 text-xs text-stone-700 font-sans">
                <span className="text-emerald-700 font-semibold font-sans">Acceso de por vida sin cuotas mensuales</span>
                <span>•</span>
                <span className="text-red-600 font-semibold font-sans">Ahorro de Lanzamiento del 78%</span>
                <span>•</span>
                <span className="flex items-center gap-0.5"><Clock className="w-3.5 h-3.5 text-stone-550" /> Acceso inmediato</span>
                <span>•</span>
                <span className="flex items-center gap-0.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Garantía de 7 días</span>
              </div>
            </div>
          </div>

          {/* Col 2: CSS Smartphone Mockup */}
          <div className="md:col-span-5 flex justify-center w-full">
            <div className="relative group max-w-sm md:max-w-none w-full md:w-[100%]">
              {/* Background ambient glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-[#1b3d2b] rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              
              {/* Real CSS smartphone chassis */}
              <div className="relative border-8 border-stone-800 rounded-[3rem] bg-stone-950 p-3 shadow-2xl w-full aspect-[9/18.5] max-w-[300px] mx-auto overflow-hidden duration-500 hover:scale-[1.02] transform">
                
                {/* Smartphone camera notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-stone-900 rounded-full z-30 flex items-center justify-end px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-950 border border-stone-800 shrink-0" />
                </div>

                <div className="h-full bg-stone-950 rounded-[2.2rem] overflow-hidden flex flex-col pt-6 font-sans select-none text-left">
                  {/* Internal topbar */}
                  <div className="bg-stone-900 border-b border-stone-800/80 px-4 py-2 flex items-center justify-between text-[9px] text-stone-400 select-none">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0"></span>
                      <span className="font-semibold text-stone-300">Heladera Inteligente</span>
                    </div>
                    <span className="font-mono text-stone-500">8:15 PM</span>
                  </div>

                  {/* App Screen Content */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-stone-950 scrollbar-none text-stone-200">
                    {/* Visual Ahorro Banner */}
                    <div className="bg-[#2c5e43]/20 border border-[#2c5e43]/40 p-2.5 rounded-xl flex items-center gap-2">
                      <div className="bg-[#2c5e43] text-stone-50 p-1.5 rounded-lg flex items-center justify-center shrink-0">
                        <Clock className="w-3.5 h-3.5 text-emerald-200" />
                      </div>
                      <div>
                        <p className="text-[9px] text-emerald-400 font-mono font-medium leading-none mb-0.5">ESTADÍSTICAS</p>
                        <p className="text-[11px] font-semibold text-white leading-tight font-sans">⏰ Ahorraste 2h 30min esta semana</p>
                      </div>
                    </div>

                    {/* Loaded Ingredients List */}
                    <div className="bg-stone-900 border border-stone-800 p-2.5 rounded-xl space-y-1.5">
                      <p className="text-[9px] text-stone-400 font-bold tracking-wider uppercase">Ingredientes Cargados (Bases)</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800/30">🍗 Pollo Desmechado</span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800/30">🌿 Espinaca</span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800/30">🍚 Arroz</span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800/30">🥩 Ternera</span>
                      </div>
                    </div>

                    {/* Weekly Auto Menu */}
                    <div className="bg-stone-900 border border-stone-800 p-2.5 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] text-stone-400 font-bold tracking-wider uppercase">Menú de 7 Días Automático</p>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1 py-0.2 rounded font-bold uppercase shrink-0">Activo</span>
                      </div>
                      <div className="space-y-1 text-[10.5px]">
                        <div className="flex justify-between items-center py-0.5 border-b border-stone-800/40 gap-2">
                          <span className="text-stone-400 font-medium font-serif shrink-0">Lunes</span>
                          <span className="text-white text-right flex-1 min-w-0 truncate pl-3" title="Wok de pollo & arroz">Wok de pollo & arroz</span>
                        </div>
                        <div className="flex justify-between items-center py-0.5 border-b border-stone-800/40 gap-2">
                          <span className="text-stone-400 font-medium font-serif shrink-0">Martes</span>
                          <span className="text-white text-right flex-1 min-w-0 truncate pl-3" title="Bowl de garbanzos, espinaca y palta">Bowl de garbanzos, espinaca y palta</span>
                        </div>
                        <div className="flex justify-between items-center py-0.5 border-b border-stone-800/40 gap-2">
                          <span className="text-stone-400 font-medium font-serif shrink-0">Miércoles</span>
                          <span className="text-white text-right flex-1 min-w-0 truncate pl-3" title="Ensalada templada de cuscús y vegetales asados">Ensalada templada de cuscús y vegetales asados</span>
                        </div>
                        <div className="flex justify-between items-center py-0.5 border-b border-stone-800/40 gap-2">
                          <span className="text-stone-400 font-medium font-serif shrink-0">Jueves</span>
                          <span className="text-white text-right flex-1 min-w-0 truncate pl-3" title="Omelette energético de espinaca y queso">Omelette energético de espinaca y queso</span>
                        </div>
                        <div className="flex justify-between items-center py-0.5 border-b border-stone-800/40 gap-2">
                          <span className="text-stone-400 font-medium font-serif shrink-0">Viernes</span>
                          <span className="text-white text-right flex-1 min-w-0 truncate pl-3" title="Fajitas integrales de atún y hojas verdes">Fajitas integrales de atún y hojas verdes</span>
                        </div>
                        <div className="flex justify-between items-center py-0.5 border-b border-stone-800/40 gap-2">
                          <span className="text-stone-400 font-medium font-serif shrink-0">Sábado</span>
                          <span className="text-white text-right flex-1 min-w-0 truncate pl-3" title="Salteado express de pollo (o tofu) y vegetales">Salteado express de pollo (o tofu) y vegetales</span>
                        </div>
                        <div className="flex justify-between items-center py-0.5 gap-2">
                          <span className="text-stone-400 font-medium font-serif shrink-0">Domingo</span>
                          <span className="text-amber-300 font-medium font-sans text-right flex-1 min-w-0 truncate pl-3" title="✨ SOS Heladera Vacía">✨ SOS Heladera Vacía</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Refresh Action inside mock */}
                  <div className="bg-stone-900 border-t border-stone-800/80 p-2 shrink-0">
                    <div className="bg-[#2c5e43] text-stone-100 text-[10px] font-semibold py-1.5 px-3 rounded-xl shadow-lg border-none flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                      <span>Volver a planificar</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5) APP EMBEDDED SHOWCASE (MECANISMO ÚNICO EN VIVO) */}
      <section className="py-10 px-4 md:px-8 max-w-6xl mx-auto" id="seccion-app-inteligente">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-semibold tracking-widest text-[#2c5e43] uppercase bg-emerald-100/60 px-3 py-1 rounded-full">
            Bono #1 Gratis • Acceso al Simulador
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-stone-950">
            Experimentá el Cambio Hoy Mismo
          </h2>
          <p className="text-stone-700 text-sm max-w-xl mx-auto">
            Creamos la Heladera Inteligente™, una herramienta interactiva que te ayuda a organizar todas tus comidas de la semana usando los ingredientes que ya tenés en casa.
          </p>
        </div>

        {/* Live App Widget */}
        <div ref={fridgeContainerRef} className="min-h-[350px]">
          {loadFridge ? (
            <React.Suspense fallback={
              <div className="w-full bg-stone-100 border border-stone-200/60 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
                <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-stone-700 font-serif text-xs">Iniciando simulador de Heladera Inteligente™...</p>
              </div>
            }>
              <FridgeApp onCtaclick={scrollToOffer} />
            </React.Suspense>
          ) : (
            <div className="w-full bg-stone-100 border border-stone-200/60 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-stone-700 font-serif text-xs">Iniciando simulador de Heladera Inteligente™...</p>
            </div>
          )}
        </div>
      </section>

      {/* RENDER DYNAMIC COPY AND TRUST MODULES */}
      <React.Suspense fallback={
        <div className="py-20 text-center flex flex-col items-center justify-center">
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

      {/* HIGH-FIDELITY INTERACTIVE CHECKOUT & DELIVERY MODAL DIALOG */}
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
