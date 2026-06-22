import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  ShieldCheck, 
  Check, 
  ShoppingBag, 
  Lock,
  CreditCard,
  MessageSquare,
  Sparkles,
  Gift,
  Bell
} from "lucide-react";

interface SalesCopyProps {
  onCtaclick: () => void;
  onOpenCheckout: (price: number, productName: string) => void;
}

// Recent Purchases Simulation Data
const SIMULATED_PURCHASES = [
  { name: "Carina B.", location: "CABA", time: "hace 2 minutos" },
  { name: "Estela M.", location: "Rosario", time: "hace 4 minutos" },
  { name: "Gisela S.", location: "Córdoba", time: "hace 7 minutos" },
  { name: "Milagros F.", location: "Mendoza", time: "hace 9 minutos" },
  { name: "Patricia D.", location: "La Plata", time: "hace 11 minutos" },
  { name: "Romina P.", location: "Mar del Plata", time: "hace 14 minutos" },
  { name: "Clara T.", location: "San Isidro", time: "hace 16 minutos" },
  { name: "Mariela G.", location: "Tucumán", time: "hace 19 minutos" }
];

const TESTIMONIALS = [
  {
    text: "Estaba hinchada y cansada de tirar comida podrida. El recetario del bono es oro puro y la app me solucionó la hora de la cena en 2 minutos usando lo que ya tengo.",
    author: "Clara R.",
    city: "Buenos Aires"
  },
  {
    text: "Con el quiz entendí los miles de pesos que perdía. Compré la app y en una semana ya amorticé lo que pagué. Cocino con lo que hay sin gastar de más.",
    author: "Martín O.",
    city: "Santa Fe"
  },
  {
    text: "Tengo tres chicos y era un caos organizar la comida con platos sanos. Con las listas de WhatsApp mi marido compra exacto lo que falta y no repetimos platos.",
    author: "Sofía G.",
    city: "Córdoba"
  },
  {
    text: "Me detectaron celiaquía hace poco y estaba perdidísima. Los filtros de perfil alimentario me salvaron la vida, como rico y seguro todos los días.",
    author: "Laura M.",
    city: "Mendoza"
  },
  {
    text: "La función de alertas de vencimiento es adictiva. No volví a tirar ni un yogur ni un pedazo de queso. Compra súper recomendada.",
    author: "Diego A.",
    city: "Rosario"
  }
];

const SalesCopyComponent: React.FC<SalesCopyProps> = ({ onCtaclick, onOpenCheckout }) => {
  // Bonus seats countdown starting around 18 and randomly going down to 7, stays there
  const [bonusSeats, setBonusSeats] = useState(() => {
    const stored = localStorage.getItem("bonus_seats_left_count");
    if (stored) {
      const parsed = parseInt(stored, 10);
      return parsed >= 7 && parsed <= 35 ? parsed : 18;
    }
    return 18;
  });

  // Recent Purchase Toast Notification State
  const [currentPurchaseIndex, setCurrentPurchaseIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    localStorage.setItem("bonus_seats_left_count", bonusSeats.toString());
  }, [bonusSeats]);

  // Tick down bonus seats
  useEffect(() => {
    const interval = setInterval(() => {
      setBonusSeats((prev) => {
        if (prev <= 7) return 7;
        const decrement = Math.random() > 0.82 ? 1 : 0;
        return prev - decrement;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Cycle recent purchases
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setCurrentPurchaseIndex((prev) => (prev + 1) % SIMULATED_PURCHASES.length);
        setShowNotification(true);
      }, 500); // fade transition
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const handlePurchase = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onOpenCheckout(17900, "Heladera Inteligente™ + Bono Recetario");
  }, [onOpenCheckout]);

  const currentPurchase = SIMULATED_PURCHASES[currentPurchaseIndex];

  // MEMOIZED STRUCTURAL SECTIONS TO ENSURE ULTRA-FAST CARGA AND PREVENT RE-RENDERS
  const titleSection = useMemo(() => (
    <div className="text-center space-y-4">
      <span className="text-xs font-bold tracking-widest text-[#1b3d2b] uppercase bg-emerald-100 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse fill-emerald-700" />
        <span>Resultado del Test</span>
      </span>
      <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-950 tracking-tight leading-tight max-w-2xl mx-auto">
        El test no miente: Cada mes se te va más plata de la que imaginás en alimentos que no llegás a consumir. Frená el desperdicio hoy!
      </h2>
      <p className="text-stone-700 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
        Ya viste a dónde se va tu plata. Es momento de automatizar tus cenas, usar lo que ya tenés en casa y cocinar rico en segundos, sin descargar nada.
      </p>
    </div>
  ), []);

  const heroSection = useMemo(() => (
    <div className="max-w-xl mx-auto overflow-hidden rounded-2xl border border-stone-200/80 shadow-md bg-stone-100/50">
      <img 
        src="https://i.postimg.cc/qqpTHHwG/Chat-GPT-Image-3-jun-2026-19-49-16.webp" 
        alt="Heladera Inteligente App Preview" 
        width={576}
        height={432}
        className="w-full h-auto object-cover block"
        referrerPolicy="no-referrer"
        loading="eager"
        {...({ fetchPriority: "high" } as any)}
      />
    </div>
  ), []);

  const includedSection = useMemo(() => (
    <div className="max-w-xl mx-auto bg-stone-900 text-stone-100 p-6 sm:p-7 rounded-3xl shadow-xl border border-stone-850 text-left space-y-5">
      <div className="flex items-center justify-between gap-3 border-b border-stone-850 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-sky-400 text-sm">🔵</span>
          <h3 className="font-serif font-black text-white text-base sm:text-md tracking-tight">
            ¿Qué te llevás hoy con tu acceso de por vida?
          </h3>
        </div>
        <span className="text-[9px] font-bold tracking-wider text-[#d1fae5] uppercase bg-[#1e442f] px-2 py-0.5 rounded-sm border border-emerald-800">
          ACCESO VITALICIO
        </span>
      </div>

      <div className="space-y-4">
        {/* Item 1 */}
        <div className="flex items-start gap-2.5">
          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          <p className="text-xs sm:text-xs leading-relaxed">
            <strong className="text-white font-bold font-serif">1. Módulo Inteligente de Recetas:</strong>{" "}
            <span className="text-stone-300">armás ideas con lo que ya tenés, sin descargar nada.</span>
          </p>
        </div>

        {/* Item 2 */}
        <div className="flex items-start gap-2.5">
          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          <p className="text-xs sm:text-xs leading-relaxed">
            <strong className="text-white font-bold font-serif">2. Listas de Compras por WhatsApp:</strong>{" "}
            <span className="text-stone-300">generarás listados exactos y los compartís en un toque.</span>
          </p>
        </div>

        {/* Item 3 */}
        <div className="flex items-start gap-2.5">
          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          <p className="text-xs sm:text-xs leading-relaxed">
            <strong className="text-white font-bold font-serif">3. Filtros por Perfil Alimentario:</strong>{" "}
            <span className="text-stone-300">recetas para keto, vegano, celíaco o diabético.</span>
          </p>
        </div>

        {/* Item 4 */}
        <div className="flex items-start gap-2.5">
          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          <p className="text-xs sm:text-xs leading-relaxed">
            <strong className="text-white font-bold font-serif">4. Control de Vencimientos:</strong>{" "}
            <span className="text-stone-300">alertas antes de que se arruine cualquier alimento.</span>
          </p>
        </div>

        {/* Item 5 */}
        <div className="flex items-start gap-2.5">
          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          <p className="text-xs sm:text-xs leading-relaxed">
            <strong className="text-white font-bold font-serif">5. Soporte técnico vía email:</strong>{" "}
            <span className="text-stone-300">te ayudamos si algo no funciona como esperamos.</span>
          </p>
        </div>
      </div>

      {/* BONO box inside the card corresponding to the screenshot */}
      <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-2xl flex items-start gap-2.5">
        <Gift className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
        <div className="text-xs leading-relaxed">
          <p className="text-emerald-400 font-extrabold uppercase tracking-wide text-[10px]">
             BONO: Recetario Desinflamatorio
          </p>
          <p className="text-emerald-100/70 text-[10px]">
            solo para los primeros 200 compradores.
          </p>
        </div>
      </div>
    </div>
  ), []);

  const bonusCard = useMemo(() => (
    <div className="bg-gradient-to-br from-emerald-50 to-stone-50 border-2 border-emerald-500/30 p-6 sm:p-8 rounded-3xl max-w-xl mx-auto space-y-5 shadow-lg relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-bl-2xl shadow-sm">
        REGALO EXCLUSIVO
      </div>

      <div className="space-y-3 pt-2">
        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5 text-emerald-700" />
          <span>¡Bono regalo 100% gratis hoy!</span>
        </span>

        <h4 className="font-serif font-black text-emerald-950 text-base sm:text-lg tracking-tight leading-snug">
          Recetario Desinflamatorio (PDF) — de Regalo
        </h4>

        <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
          Platos ultra rápidos y deliciosos sin gluten ni lácteos para depurar tu cuerpo, deshincharte y optimizar tu digestión en menos de 15 minutos. Te lo llevás gratis únicamente comprando hoy.
        </p>

        <div className="bg-emerald-600/5 border border-emerald-200/50 p-3 sm:p-4 rounded-2xl flex items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <p className="text-stone-500 line-through text-[11px]">Valor de lista: $12.500 ARS</p>
            <p className="text-emerald-800 font-extrabold text-[12px]">Sin costo para vos hoy</p>
          </div>
          <span className="font-black text-emerald-700 uppercase tracking-widest text-[11px] bg-emerald-100 px-3 py-1 rounded-lg">REGALO GRATUITO</span>
        </div>
      </div>

      <div className="pt-4 border-t border-emerald-600/10 space-y-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1.5 text-xs">
          <span className="font-bold text-stone-900 uppercase tracking-wider text-[9px]">CUPOS DE BONIFICACIÓN DISPONIBLES:</span>
          <span className="text-emerald-700 font-extrabold text-[11px] bg-emerald-100 px-2.5 py-0.5 rounded-sm self-start sm:self-auto uppercase">
            ¡Solo quedan {bonusSeats} de 200 lugares!
          </span>
        </div>
        
        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-600 h-full rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${(bonusSeats / 200) * 100}%` }}
          />
        </div>
      </div>
    </div>
  ), [bonusSeats]);

  const creadoraSection = null;

  const notificationSection = useMemo(() => (
    <div className="max-w-xl mx-auto transition-all duration-500">
      <div className={`bg-stone-900 text-stone-100 p-3 rounded-2xl border border-stone-850 flex items-center gap-3 shadow-md text-left transition-all duration-500 ${
        showNotification ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      }`}>
        <div className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
          <Bell className="w-3.5 h-3.5 animate-bounce" />
        </div>
        <div className="text-xs leading-none">
          <p className="text-stone-100 font-bold mb-0.5">
            🎉 Compra reciente en tiempo real
          </p>
          <p className="text-[10px] text-stone-300 leading-normal">
            {currentPurchase.name} ({currentPurchase.location}) adquirió el acceso de por vida + Bono de regalo <strong>{currentPurchase.time}</strong>.
          </p>
        </div>
      </div>
    </div>
  ), [showNotification, currentPurchase]);

  const testimonialsMarquee = useMemo(() => (
    <div className="space-y-4 w-full overflow-hidden py-4 max-w-xl mx-auto">
      <div className="flex items-center gap-2 text-stone-700 justify-center">
        <MessageSquare className="w-4 h-4 text-emerald-600" />
        <h4 className="text-[10px] uppercase font-mono font-bold tracking-widest text-stone-700">Testimonios reales (Mantené presionado para pausar)</h4>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none z-10" />

        <div className="flex w-max gap-4 animate-marquee py-2 hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {TESTIMONIALS.map((t, idx) => (
            <div key={`t1-${idx}`} className="w-[280px] sm:w-[300px] shrink-0 bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
              <p className="text-xs text-stone-700 italic leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-[10px] font-bold text-stone-900 mt-2 font-mono uppercase tracking-wide">— {t.author}, {t.city}</p>
            </div>
          ))}
          {TESTIMONIALS.map((t, idx) => (
            <div key={`t2-${idx}`} className="w-[280px] sm:w-[300px] shrink-0 bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
              <p className="text-xs text-stone-700 italic leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-[10px] font-bold text-stone-900 mt-2 font-mono uppercase tracking-wide">— {t.author}, {t.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ), []);

  const pricingSection = useMemo(() => (
    <section className="bg-stone-950 text-stone-100 py-16 px-4 border-t border-stone-900 relative overflow-hidden" id="oferta-cierre">
      <div className="absolute -top-40 -left-40 w-[380px] h-[385px] bg-[#2c5e43]/15 rounded-full blur-3xl select-none pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[380px] h-[385px] bg-emerald-900/15 rounded-full blur-3xl select-none pointer-events-none" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-6">
        
        <div className="space-y-2">
          <span className="text-[10px] font-black tracking-widest text-[#d1fae5] uppercase bg-[#1e442f] px-3.5 py-1 rounded-full border border-emerald-800">
            UN SOLO PAGO • ACCESO DE POR VIDA
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-white tracking-tight">
            Llevate la App Premium hoy y frená el desperdicio
          </h2>
        </div>

        {/* Tarjeta de checkout premium */}
        <div className="bg-stone-900/90 border border-stone-800 p-6 md:p-8 rounded-3xl max-w-sm mx-auto space-y-6 shadow-2xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-full tracking-wider uppercase whitespace-nowrap">
            ¡INCLUYE EL BONO RECETARIO!
          </div>

          <div className="space-y-3">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-stone-400 text-xs sm:text-sm line-through font-medium">
                Antes: $69.900 ARS
              </span>
              <span className="text-emerald-400 font-extrabold text-xs tracking-wide">
                (más de un 70% de descuento)
              </span>
            </div>
            
            <div className="py-2 text-center">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block mb-1">PRECIO DE HOY:</span>
              <h3 className="text-5xl md:text-6xl font-serif font-black text-emerald-400 tracking-tight leading-none drop-shadow-[0_4px_12px_rgba(52,211,153,0.18)]">
                $17.900 ARS
              </h3>
            </div>
            
            <p className="text-[10px] text-stone-300 uppercase tracking-widest leading-loose font-medium">Solo un pago • Sin suscripciones mensuales</p>
          </div>

          {/* Gran botón de compra Shopify */}
          <button
            onClick={handlePurchase}
            className="cursor-pointer w-full bg-emerald-600 hover:bg-emerald-700 text-stone-50 border-none px-6 py-4 rounded-xl font-serif font-black text-md md:text-lg tracking-wide shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            <span>QUIERO MI ACCESO + EL BONO</span>
          </button>

          {/* Sellos de Seguridad */}
          <div className="flex items-center justify-center gap-4 text-[9px] text-stone-300 font-mono">
            <span className="flex items-center gap-1">
              <Lock className="w-3 text-emerald-500" />
              <span>Pago Seguro SSL</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CreditCard className="w-3 text-emerald-500" />
              <span>Garantía Oficial</span>
            </span>
          </div>

        </div>

        {/* GARANTÍA DE 7 DÍAS EN 2 LÍNEAS */}
        <div className="max-w-md mx-auto text-center pt-2 space-y-1">
          <p className="text-stone-100 text-xs font-bold flex items-center justify-center gap-1.5 leading-tight">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Garantía incondicional de satisfacción por 7 días.</span>
          </p>
          <p className="text-stone-200 text-[11px] leading-relaxed">
            Si no sentís que la app te simplifica las cenas o te evita tirar comida, nos escribís y te reembolsamos el 100% de tu dinero al instante, sin vueltas. <span className="font-semibold text-stone-200">(El acceso a la plataforma se bloquea automáticamente al realizarse la devolución).</span>
          </p>
        </div>

      </div>
    </section>
  ), [handlePurchase]);

  const footerSection = useMemo(() => (
    <footer className="bg-stone-950 text-stone-350 py-10 px-4 border-t border-stone-900 text-xs text-center">
      <div className="max-w-4xl mx-auto space-y-3">
        <p className="font-serif text-stone-200">Heladera Inteligente™ - Todos los derechos reservados © {new Date().getFullYear()}</p>
        <p className="max-w-2xl mx-auto text-stone-400 text-[10px] leading-relaxed">
          Este sitio web no forma parte de Facebook, Instagram ni Meta Platforms, Inc. Todos los nombres de productos y marcas son propiedad de sus respectivos owners. Aureva Studio SAS. Soporte directo: aurevastudio2@gmail.com
        </p>
      </div>
    </footer>
  ), []);

  return (
    <div className="w-full bg-stone-50 text-stone-800 font-sans" id="sales-page">
      
      {/* SECCIÓN PRINCIPAL: HOOK & BENEFICIOS */}
      <section className="py-12 px-4 md:px-8 max-w-3xl mx-auto space-y-12">
        
        {titleSection}

        {heroSection}

        {includedSection}

        {bonusCard}

        {notificationSection}

        {testimonialsMarquee}

      </section>

      {pricingSection}

      {footerSection}

    </div>
  );
};

export const SalesCopy = React.memo(SalesCopyComponent);
