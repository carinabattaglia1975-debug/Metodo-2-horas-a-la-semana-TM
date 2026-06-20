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
        El test no miente: Estás tirando una fortuna por mes en comida tirada a la basura. Frená el desperdicio HOY.
      </h2>
      <p className="text-stone-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
        Ya viste a dónde se va tu plata. Es momento de automatizar tus cenas, usar lo que ya tenés en casa y cocinar rico en segundos, sin descargar nada.
      </p>
    </div>
  ), []);

  const heroSection = useMemo(() => (
    <div className="max-w-xl mx-auto overflow-hidden rounded-2xl border border-stone-200/80 shadow-md bg-stone-100/50">
      <img 
        src="/chatgpt_hero.webp" 
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
    <div className="bg-gradient-to-br from-stone-900 to-stone-950 p-6 md:p-8 rounded-3xl border border-stone-800 max-w-xl mx-auto space-y-5 text-white shadow-lg">
      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
        <h3 className="text-white font-serif font-extrabold text-sm sm:text-base tracking-tight flex items-center gap-2">
          <span>🛡️</span> ¿Qué te llevás hoy con tu acceso de por vida?
        </h3>
        <span className="text-[9px] font-mono font-bold tracking-widest text-[#a7f3d0] uppercase bg-emerald-950/80 border border-emerald-900 px-2.5 py-0.5 rounded-full inline-block">
          Acceso Vitalicio
        </span>
      </div>
      
      <ul className="grid gap-4 text-xs md:text-sm text-stone-300">
        <li className="flex items-start gap-3 bg-stone-900/50 p-3 rounded-xl border border-stone-800 hover:border-emerald-900 transition-colors">
          <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
          <span><strong className="text-white block font-serif tracking-tight mb-0.5">1. Módulo Inteligente de Recetas:</strong> armás ideas con lo que ya tenés, sin descargar nada.</span>
        </li>
        <li className="flex items-start gap-3 bg-stone-900/50 p-3 rounded-xl border border-stone-800 hover:border-emerald-900 transition-colors">
          <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
          <span><strong className="text-white block font-serif tracking-tight mb-0.5">2. Listas de Compras por WhatsApp:</strong> generarás listados exactos y los compartís en un toque.</span>
        </li>
        <li className="flex items-start gap-3 bg-stone-900/50 p-3 rounded-xl border border-stone-800 hover:border-emerald-900 transition-colors">
          <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
          <span><strong className="text-white block font-serif tracking-tight mb-0.5">3. Filtros por Perfil Alimentario:</strong> recetas para keto, vegano, celíaco o diabético.</span>
        </li>
        <li className="flex items-start gap-3 bg-stone-900/50 p-3 rounded-xl border border-stone-800 hover:border-emerald-900 transition-colors">
          <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
          <span><strong className="text-white block font-serif tracking-tight mb-0.5">4. Control de Vencimientos:</strong> alertas antes de que se arruine cualquier alimento.</span>
        </li>
        <li className="flex items-start gap-3 bg-stone-900/50 p-3 rounded-xl border border-stone-800 hover:border-emerald-900 transition-colors">
          <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
          <span><strong className="text-white block font-serif tracking-tight mb-0.5">5. Soporte técnico vía email:</strong> te ayudamos si algo no funciona como esperamos.</span>
        </li>
        <li className="flex items-start gap-3 bg-emerald-950/45 p-3 rounded-xl border border-emerald-900/60 hover:border-emerald-800 transition-colors">
          <span className="text-emerald-400 shrink-0 text-base">🎁</span>
          <span><strong className="text-emerald-300 block font-serif tracking-tight mb-0.5">BONO: Recetario Desinflamatorio</strong> solo para los primeros 200 compradores.</span>
        </li>
      </ul>
    </div>
  ), []);

  const bonusCard = useMemo(() => (
    <div className="bg-emerald-50/60 border-2 border-emerald-600/35 p-6 rounded-3xl max-w-xl mx-auto space-y-4 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-bl-xl">
        Bono Especial
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-28 sm:w-36 shrink-0 overflow-hidden rounded-xl border border-stone-200 shadow-md bg-white">
          <img 
            src="/input_file_1.webp" 
            alt="Recetario Desinflamatorio" 
            width={144}
            height={200}
            className="w-full h-auto object-cover block"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>

        <div className="text-center sm:text-left space-y-2 flex-1 pt-1">
          <h4 className="font-serif font-black text-stone-900 text-sm sm:text-base tracking-tight flex items-center justify-center sm:justify-start gap-1.5">
            <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>BONO DE URGENCIA: Recetario Desinflamatorio (PDF)</span>
          </h4>
          <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
            Platos ultra rápidos y deliciosos sin gluten ni lácteos para depurar tu cuerpo y optimizar tu digestión. Te lo llevás gratis únicamente hoy.
          </p>
        </div>
      </div>

      <div className="pt-2.5 border-t border-emerald-600/15 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-stone-900 uppercase tracking-wider text-[10px]">Cupos de bonificación para hoy:</span>
          <span className="text-emerald-700 font-extrabold text-xs animate-pulse bg-emerald-100 px-2 py-0.5 rounded-md">
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
          <p className="text-[10px] text-stone-400 leading-normal">
            {currentPurchase.name} ({currentPurchase.location}) adquirió el acceso de por vida + Bono de Urgencia <strong>{currentPurchase.time}</strong>.
          </p>
        </div>
      </div>
    </div>
  ), [showNotification, currentPurchase]);

  const testimonialsMarquee = useMemo(() => (
    <div className="space-y-4 w-full overflow-hidden py-4 max-w-xl mx-auto">
      <div className="flex items-center gap-2 text-stone-700 justify-center">
        <MessageSquare className="w-4 h-4 text-emerald-600" />
        <h4 className="text-[10px] uppercase font-mono font-bold tracking-widest text-stone-500">Testimonios reales (Mantené presionado para pausar)</h4>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none z-10" />

        <div className="flex w-max gap-4 animate-marquee py-2 hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {TESTIMONIALS.map((t, idx) => (
            <div key={`t1-${idx}`} className="w-[280px] sm:w-[300px] shrink-0 bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
              <p className="text-xs text-stone-600 italic leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-[10px] font-bold text-stone-900 mt-2 font-mono uppercase tracking-wide">— {t.author}, {t.city}</p>
            </div>
          ))}
          {TESTIMONIALS.map((t, idx) => (
            <div key={`t2-${idx}`} className="w-[280px] sm:w-[300px] shrink-0 bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
              <p className="text-xs text-stone-600 italic leading-relaxed">
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

          <div className="space-y-1">
            <span className="text-stone-300 text-xs line-through block mt-1">Valor real: $78.000 ARS</span>
            <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider font-mono">Oferta única de lanzamiento (77% de descuento)</p>
            <div className="flex items-center justify-center gap-2.5 py-1">
              <h3 className="text-4xl md:text-5xl font-serif font-black text-white">
                $17.900 ARS
              </h3>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
                77% OFF
              </span>
            </div>
            <p className="text-[10px] text-stone-300 uppercase tracking-widest leading-loose">Solo un pago • Sin suscripciones mensuales</p>
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
          <div className="flex items-center justify-center gap-4 text-[9px] text-stone-400 font-mono">
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
          <p className="text-stone-300 text-[11px] leading-relaxed">
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
      <section className="py-12 px-4 md:px-8 max-w-3xl mx-auto space-y-10">
        
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
