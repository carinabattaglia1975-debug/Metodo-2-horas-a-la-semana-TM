import React from "react";
import { 
  ShieldCheck, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Lock,
  CreditCard,
  CheckCircle2
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
    <div className="w-full bg-stone-50 text-stone-800" id="sales-page">
      


      {/* 2) SECCIÓN DE PRECIO & CTA FINAL (OFERTA INCREÍBLE) */}
      <section className="bg-stone-900 text-stone-100 py-16 px-4 border-t border-stone-850 relative overflow-hidden" id="oferta-cierre">
        <div className="absolute -top-40 -left-40 w-[380px] h-[385px] bg-[#2c5e43]/15 rounded-full blur-3xl select-none pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[380px] h-[385px] bg-emerald-950/15 rounded-full blur-3xl select-none pointer-events-none" />
        
        <div className="max-w-2xl mx-auto text-center relative z-10 space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#a1cca5] uppercase bg-[#2c5e43]/40 px-3.5 py-1 rounded-full border border-[#2c5e43]/50">
              ACCESO INSTANTÁNEO DE POR VIDA
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white tracking-tight pt-1">
              Hacé que la hora de la cena vuelva a ser un placer
            </h2>
            <p className="text-stone-300 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
              Adquirí hoy la versión Premium de por vida. Planificá tus opciones al instante, reducí el desperdicio al 100% y olvidate de la fatiga de decidir qué comer todos los días.
            </p>
          </div>

          {/* Gran bloque de precio e insignias */}
          <div className="bg-stone-950/70 border border-stone-800 p-6 md:p-8 rounded-3xl max-w-md mx-auto space-y-6 shadow-xl">
            
            <div className="space-y-1">
              <span className="text-stone-400 text-xs line-through block tracking-wide">Valor real: $78.000 ARS</span>
              <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider font-mono">¡Oferta Especial de Lanzamiento!</p>
              <h3 className="text-4xl md:text-5xl font-serif font-black text-white py-1">
                $17.900 ARS
              </h3>
              <p className="text-[10px] text-stone-400 font-sans">Pago único. Sin suscripciones ni costos extra mensuales ocultos.</p>
            </div>

            <div className="pt-2 border-t border-stone-800/85 text-left space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-stone-250">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Acceso completo de por vida a la App Web</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-250">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Manual de Usuario de Heladera Inteligente (PDF)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-250">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Recetario Express incorporado + Planillas</span>
              </div>
            </div>

            {/* Gran Botón de Compra */}
            <button
              onClick={handlePurchase}
              className="cursor-pointer w-full bg-[#2c5e43] hover:bg-emerald-700 text-stone-50 border-none px-6 py-4 rounded-xl font-serif font-bold text-base md:text-lg tracking-wide shadow-xl shadow-emerald-950/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              <span>Quiero mi Heladera Inteligente</span>
            </button>

            {/* Security badges */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 font-mono pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pago Seguro</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                <span>Garantía Protegida</span>
              </span>
            </div>

          </div>

          {/* 3) GARANTÍA DE CONFANZA DE 7 DÍAS */}
          <div className="bg-emerald-950/20 border border-emerald-900/40 p-6 rounded-2xl max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-5 text-left shadow-inner">
            <div className="p-3 bg-emerald-900/40 rounded-xl text-emerald-400 shrink-0">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-semibold text-white text-sm sm:text-base">Garantía Incondicional de 7 Días</h4>
              <p className="text-stone-300 text-xs leading-relaxed">
                Probá el sistema Heladera Inteligente™ por una semana completa. Si no sentís que te ahorra horas de indecisión, simplifica tus cenas y reduce tu desperdicio diario, escribinos un mail y te reembolsamos el 100% de tu dinero de inmediato. Sin preguntas ni vueltas.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PIE DE PÁGINA */}
      <footer className="bg-stone-950 text-stone-450 py-10 px-4 border-t border-stone-850 text-xs text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-serif text-stone-300">Heladera Inteligente™ - Todos los derechos reservados © {new Date().getFullYear()}</p>
          <p className="max-w-2xl mx-auto text-stone-500 text-[10px] leading-relaxed">
            Este sitio web no forma parte de Meta Platforms, Inc. ni está aprobado por Meta. Todos los nombres de productos, logotipos y marcas son propiedad de sus respectivos dueños. Aureva Studio SAS. Support: aurevastudio2@gmail.com
          </p>
        </div>
      </footer>

    </div>
  );
};
