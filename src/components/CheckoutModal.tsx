import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  CreditCard, 
  Lock, 
  Download 
} from "lucide-react";

interface CheckoutModalProps {
  showCheckout: boolean;
  purchaseCompleted: boolean;
  buyerName: string;
  setBuyerName: (name: string) => void;
  buyerEmail: string;
  setBuyerEmail: (email: string) => void;
  paymentMethod: "cc" | "mp";
  setPaymentMethod: (method: "cc" | "mp") => void;
  formError: string;
  handleProcessSimulatedPayment: (e: React.FormEvent) => void;
  handleQuickClose: () => void;
}

function CheckoutModal({
  showCheckout,
  purchaseCompleted,
  buyerName,
  setBuyerName,
  buyerEmail,
  setBuyerEmail,
  paymentMethod,
  setPaymentMethod,
  formError,
  handleProcessSimulatedPayment,
  handleQuickClose
}: CheckoutModalProps) {
  return (
    <AnimatePresence>
      {showCheckout && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          {/* Backdrop filter overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleQuickClose}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
          />

          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.25 }}
              className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-lg border border-stone-200"
            >
              
              {/* Header title */}
              <div className="bg-[#1b3d2b] text-[#f7f5f0] px-6 py-5 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-amber-300" />
                  <div>
                    <h3 className="font-serif font-semibold text-white leading-none">Inscripción Segura</h3>
                    <p className="text-[10px] text-emerald-300 font-sans mt-0.5">Soporta tarjetas locales e indirectamente Mercado Pago</p>
                  </div>
                </div>
                <button 
                  onClick={handleQuickClose}
                  className="cursor-pointer text-[#a5cca8] hover:text-white font-sans text-xl bg-transparent border-none"
                >
                  ✕
                </button>
              </div>

              {/* Simulated payment step or delivered success screen */}
              {!purchaseCompleted ? (
                /* Form Input Step */
                <form onSubmit={handleProcessSimulatedPayment} className="p-6 md:p-8 space-y-6">
                  
                  {/* Brief cart order summary */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/50 text-xs space-y-2">
                    <div className="flex justify-between font-serif text-sm font-semibold text-stone-900">
                      <span>Heladera Inteligente™ Completa + Recetarios</span>
                      <span className="text-[#2c5e43]">$17.900 ARS</span>
                    </div>
                    <p className="text-stone-700">Incluye acceso de por vida a la App Web Heladera Inteligente y garantía incondicional.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1 font-sans">
                        Tu Nombre Completo
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ingresá tu nombre..."
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 text-sm focus:outline-none focus:border-[#2c5e43] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1 font-sans">
                        Tu Casilla de Correo (Donde recibirás el archivo)
                      </label>
                      <input
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 text-sm focus:outline-none focus:border-[#2c5e43] transition-all"
                      />
                    </div>

                    {/* Payment method selection layout */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-2 font-sans">
                        Elegí Método de Pago (Simulación)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("cc")}
                          className={`cursor-pointer border p-3 rounded-xl flex items-center gap-2 justify-center transition-all bg-transparent ${
                            paymentMethod === "cc" 
                            ? "border-[#2c5e43] bg-emerald-50/20 text-[#2c5e43] font-semibold" 
                            : "border-stone-200 text-stone-700 hover:border-stone-300"
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          <span className="text-xs font-sans">Tarjeta de Crédito</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("mp")}
                          className={`cursor-pointer border p-3 rounded-xl flex items-center gap-2 justify-center transition-all bg-transparent ${
                            paymentMethod === "mp" 
                            ? "border-[#2c5e43] bg-emerald-50/20 text-[#2c5e43] font-semibold" 
                            : "border-stone-200 text-stone-700 hover:border-stone-300"
                          }`}
                        >
                          <span className="font-serif font-bold text-xs">Mercado Pago</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {formError && (
                    <p className="text-xs text-red-600 font-semibold">{formError}</p>
                  )}

                  {/* Submit payment buttons */}
                  <div className="space-y-3.5">
                    <button
                      type="submit"
                      className="cursor-pointer w-full bg-[#2c5e43] text-stone-50 hover:bg-[#204531] transition-all py-3 px-6 rounded-xl font-serif font-semibold text-base flex items-center justify-center gap-2 shadow-lg border-none"
                    >
                      <Lock className="w-4 h-4 text-amber-300" />
                      <span>Confirmar Pago de $17.900 ARS</span>
                    </button>

                    <div className="flex justify-center items-center gap-2 text-[11px] text-stone-400">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Conexión de simulación cifrada SSL de 256 bits</span>
                    </div>
                  </div>

                </form>
              ) : (
                /* Success Delivery Screen */
                <div className="p-6 md:p-8 space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto text-3xl animate-bounce">
                    ✓
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-serif font-semibold text-stone-900">
                      ¡Inscripción confirmada, {buyerName}!
                    </h4>
                    <p className="text-stone-700 text-sm">
                      Enviamos un correo electrónico a <strong className="text-stone-800 font-semibold">{buyerEmail}</strong> con tus credenciales exclusivas. Podés descargar todo el contenido directamente desde aquí hoy:
                    </p>
                  </div>

                  {/* List of downloadable links representing final products */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left divide-y divide-stone-200 text-xs">
                    
                    <div className="py-2.5 flex justify-between items-center text-stone-850">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-stone-900 font-serif">1) Guía Premium de Heladera Inteligente (PDF)</p>
                        <p className="text-[10px] text-stone-700">Guía de planificación completa + Planillas de Alacena</p>
                      </div>
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); alert("Simulando descarga de la Guía de Heladera Inteligente..."); }}
                        className="p-1 px-2.5 bg-[#2c5e43] hover:bg-[#1c3a2a] text-stone-50 rounded flex items-center gap-1.5 transition-all text-[11px] font-sans no-underline font-medium"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar</span>
                      </a>
                    </div>

                    <div className="py-2.5 flex justify-between items-center text-stone-850">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-stone-900 font-serif">2) Recetario Desinflamatorio Premium</p>
                        <p className="text-[10px] text-stone-700">Bono Premium #5 (Gluten free & Dairy free)</p>
                      </div>
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); alert("Simulando descarga de Recetario Desinflamatorio..."); }}
                        className="p-1 px-2.5 bg-[#2c5e43] hover:bg-[#1c3a2a] text-stone-50 rounded flex items-center gap-1.5 transition-all text-[11px] font-sans no-underline font-medium"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar</span>
                      </a>
                    </div>

                    <div className="py-2.5 flex justify-between items-center text-stone-850">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-stone-900 font-serif">3) El Recetario Express 15 Minutos + SOS</p>
                        <p className="text-[10px] text-stone-700">Bonos #3 y #4 en un cuadernillo unificado</p>
                      </div>
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); alert("Simulando descarga del Recetario Express..."); }}
                        className="p-1 px-2.5 bg-[#2c5e43] hover:bg-[#1c3a2a] text-stone-50 rounded flex items-center gap-1.5 transition-all text-[11px] font-sans no-underline font-medium"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar</span>
                      </a>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#2c5e43] font-medium font-serif italic bg-emerald-50 py-2 rounded-lg">
                    *El Bono #1 (App Web) ya está desbloqueado de forma gratuita. ¡La podés seguir usando arriba en vivo cuando quieras!
                  </p>

                  <button
                    onClick={handleQuickClose}
                    className="cursor-pointer w-full bg-stone-950 text-stone-200 hover:bg-stone-800 transition-all py-3.5 rounded-xl text-sm font-semibold border-none"
                  >
                    Volver a la página principal
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default React.memo(CheckoutModal);
