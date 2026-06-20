import React from "react";
import { 
  ShieldCheck, 
  Check, 
  ShoppingBag, 
  Lock,
  CreditCard,
  MessageSquare
} from "lucide-react";

interface SalesCopyProps {
  onCtaclick: () => void;
  onOpenCheckout: (price: number, productName: string) => void;
  seatsLeft: number;
}

export const SalesCopy: React.FC<SalesCopyProps> = ({ onCtaclick, onOpenCheckout, seatsLeft }) => {
  const handlePurchase = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenCheckout(17900, "Heladera Inteligente™ Completa");
  };

  return (
    <div className="w-full bg-stone-50 text-stone-800 font-sans" id="sales-page">
      
      {/* 1) SECCIÓN CENTRAL: HOOK DIRECTO & BENEFICIOS */}
      <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto space-y-10">
        
        {/* HEADLINE DE RESPUESTA DIRECTA */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100 px-3 py-1 rounded-full">
            El quiz no miente
          </span>
          <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-stone-900 tracking-tight leading-tight max-w-2xl mx-auto">
            Dejá de tirar plata: Transformá esos ingredientes por vencer en cenas tremendas en 2 minutos.
          </h2>
          <p className="text-stone-650 text-sm max-w-lg mx-auto">
            Ya viste cuántos miles de pesos se te escurren entre los dedos por mes. Es momento de resolverlo de forma simple y automática.
          </p>
        </div>

        {/* 3 BULLETS DE BENEFICIOS PRINCIPALES */}
        <div className="grid md:grid-cols-3 gap-6 pt-2">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
            <span className="text-2xl mb-2 block">💸</span>
            <h3 className="text-sm font-serif font-bold text-stone-900 mb-1.5 font-sans">Ahorrás al 100%</h3>
            <p className="text-stone-600 text-xs leading-relaxed font-sans">
              Chau a tirar comida vencida o vegetales podridos. Optimizás hasta el último ingrediente de tu heladera.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
            <span className="text-2xl mb-2 block">⚡</span>
            <h3 className="text-sm font-serif font-bold text-stone-900 mb-1.5 font-sans">Cenas en 10 minutos</h3>
            <p className="text-stone-600 text-xs leading-relaxed font-sans">
              Elegís lo que tenés disponible en casa y la app te da combinaciones ricas al instante, listas para comer.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
            <span className="text-2xl mb-2 block">🧠</span>
            <h3 className="text-sm font-serif font-bold text-stone-900 mb-1.5 font-sans">Adiós a la fatiga mental</h3>
            <p className="text-stone-600 text-xs leading-relaxed font-sans">
              Cortás de raíz el estrés diario de estar parado frente a la heladera pensando qué cocinar después de trabajar.
            </p>
          </div>
        </div>

        {/* ¿QUÉ INCLUYE? (MAX 5 ÍTEMS) */}
        <div className="bg-stone-100 p-6 md:p-8 rounded-2xl border border-stone-200/60 max-w-2xl mx-auto space-y-5">
          <h3 className="text-base font-serif font-bold text-stone-900 tracking-tight flex items-center gap-2 font-sans">
            <span className="text-stone-500">🔥</span> ¿Qué te llevás hoy? (Acceso inmediato)
          </h3>
          
          <ul className="grid gap-3.5 text-xs text-stone-750">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Acceso Ilimitado de por Vida</strong> a la App Web Heladera Inteligente™.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Manual del Usuario Definitivo (PDF)</strong> con la guía táctica de organización.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Recetario Express 15 Minutos</strong> con 20 ideas prácticas e integradas.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Soporte Prioritario</strong> directo vía email o por Instagram @cocina_quetransforma.</span>
            </li>
          </ul>
        </div>

        {/* TESTIMONIOS (REALES CON PLACEHOLDERS) */}
        <div className="space-y-4 max-w-2xl mx-auto pt-4">
          <div className="flex items-center gap-2 text-stone-800 justify-center">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs uppercase font-bold tracking-wider font-sans">Lo que dicen en instagram</h4>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white p-4.5 rounded-xl border border-stone-200 shadow-2xs text-left">
              <p className="text-xs text-stone-600 italic">
                &ldquo;Estaba harta de comprar verduras de oferta para después tirarlas podridas el viernes. Ahora pongo en la app lo que tengo y ceno tremendo en minutos. Me cambió la vida.&rdquo;
              </p>
              <p className="text-[10px] font-bold text-stone-900 mt-2 font-sans">— Sofía R., CABA</p>
            </div>
            <div className="bg-white p-4.5 rounded-xl border border-stone-200 shadow-2xs text-left">
              <p className="text-xs text-stone-600 italic">
                &ldquo;No más delivery carísimo a las 9 de la noche porque no se me caía una idea. La app me dice qué armar con lo que hay de verdad. ¡Ahorré muchísima plata este mes!&rdquo;
              </p>
              <p className="text-[10px] font-bold text-stone-900 mt-2 font-sans">— Juan Ignacio M., Belgrano</p>
            </div>
          </div>
        </div>

      </section>

      {/* 2) SECCIÓN DE PRECIO & CTA FINAL (OFERTA INCREÍBLE) */}
      <section className="bg-stone-900 text-stone-100 py-12 px-4 border-t border-stone-850 relative overflow-hidden" id="oferta-cierre">
        <div className="absolute -top-40 -left-40 w-[380px] h-[385px] bg-[#2c5e43]/15 rounded-full blur-3xl select-none pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[380px] h-[385px] bg-emerald-950/15 rounded-full blur-3xl select-none pointer-events-none" />
        
        <div className="max-w-2xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-[#a1cca5] uppercase bg-[#2c5e43]/40 px-3 py-0.5 rounded-full border border-[#2c5e43]/50">
              ACCESO INSTANTÁNEO • SIN SUSCRIPCIONES
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight pt-1">
              Un único pago. Sin cuotas mensuales ni costos ocultos.
            </h2>
          </div>

          {/* Bloque de precio súper enfocado */}
          <div className="bg-stone-950/70 border border-stone-800 p-6 md:p-8 rounded-2xl max-w-sm mx-auto space-y-5 shadow-xl">
            
            <div className="space-y-0.5">
              <span className="text-stone-400 text-xs line-through block tracking-wide">Valor real: $78.000 ARS</span>
              <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider font-mono">Oferta única por hoy</p>
              <h3 className="text-4xl md:text-5xl font-serif font-black text-white py-1">
                $17.900 ARS
              </h3>
            </div>

            {/* Botón de Compra Direct Response CTA */}
            <button
              onClick={handlePurchase}
              className="cursor-pointer w-full bg-emerald-600 hover:bg-emerald-700 text-stone-50 border-none px-6 py-4 rounded-xl font-serif font-bold text-base md:text-lg tracking-wide shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              <span>QUIERO MI ACCESO AHORA</span>
            </button>

            {/* Certificados */}
            <div className="flex items-center justify-center gap-4 text-[9px] text-stone-400 font-mono">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pago Seguro</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                <span>Shopify</span>
              </span>
            </div>

          </div>

          {/* 3) GARANTÍA EN DOS LÍNEAS */}
          <div className="max-w-lg mx-auto text-center pt-2 space-y-1">
            <p className="text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantía incondicional de satisfacción por 7 días.</span>
            </p>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Si el sistema no te convence o sentís que no te simplifica las cenas, nos escribís a aurevastudio2@gmail.com y te devolvemos el 100% de tu dinero al instante.
            </p>
          </div>

        </div>
      </section>

      {/* PIE DE PÁGINA */}
      <footer className="bg-stone-950 text-stone-450 py-10 px-4 border-t border-stone-850 text-xs text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-serif text-stone-300">Heladera Inteligente™ - Todos los derechos reservados © {new Date().getFullYear()}</p>
          <p className="max-w-2xl mx-auto text-stone-500 text-[10px] leading-relaxed">
            Este sitio web no forma parte de Meta Platforms, Inc. ni está aprobado por Meta. Aureva Studio SAS. Soporte directo: aurevastudio2@gmail.com
          </p>
        </div>
      </footer>

    </div>
  );
};
