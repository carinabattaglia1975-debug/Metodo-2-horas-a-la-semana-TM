import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Users, 
  Check, 
  Gift, 
  AlertTriangle,
  Flame,
  Clock,
  Sparkles,
  ShoppingBag,
  Mail,
  Instagram
} from "lucide-react";
import { FAQ, Testimonial } from "../types";

interface SalesCopyProps {
  onCtaclick: () => void;
  onOpenCheckout: (price: number, productName: string) => void;
  seatsLeft: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Laura G.",
    role: "Abogada (trabaja 9h)",
    rating: 5,
    comment: "Cocinar a la noche después de estar todo el día en el tribunal era mi tortura. Con la Heladera Inteligente™, mi relación con la cocina cambió por completo.",
    before: "Llegaba agotada, pensaba qué comer por 30 minutos.",
    after: "Ingreso mis ingredientes y en 5 minutos tengo un menú caliente resuelto.",
    avatarSeed: "laura"
  },
  {
    id: "2",
    name: "Mariela T.",
    role: "Contadora y Madre",
    rating: 5,
    comment: "Lo que más odiaba era la bendita pregunta de '¿Qué cocino hoy?'. Esta app destruye esa fatiga de decisión diaria.",
    before: "Abría la heladera vacía de ideas y con un montón de culpa.",
    after: "Cargo lo que tengo, la app me resuelve el menú en segundos y listo.",
    avatarSeed: "mariela"
  },
  {
    id: "3",
    name: "Camila R.",
    role: "Programadora Frontend",
    rating: 5,
    comment: "La guía de planificación que acompaña a la app es una obra de ingeniería del tiempo. Inteligente y súper ágil.",
    before: "Múltiples compras duplicadas por falta de planificación.",
    after: "Compro solo lo que necesito y la app me ayuda a optimizar todo.",
    avatarSeed: "camila"
  },
  {
    id: "4",
    name: "Sofía V.",
    role: "Médica de Guardia",
    rating: 5,
    comment: "Encontrar comida sana con mi horario rotativo era utópico. La app me sugiere platos deliciosos con lo que hay al instante.",
    before: "Comiendo ultraprocesados rápidos en el sanatorio.",
    after: "Platos organizados que se combinan al momento. Comida real.",
    avatarSeed: "sofia"
  }
];

const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "¿Qué es exactamente la Heladera Inteligente™?",
    answer: "Es un sistema interactivo compuesto por nuestra App Web Inteligente Premium junto con manuales prácticos y recetarios estructurados que te permiten gestionar tus alimentos reales, ver recetas instantáneas creadas con lo que ya tenés en casa, y automatizar toda tu planificación semanal para reducir tu desperdicio y tu fatiga de decisión diaria."
  },
  {
    id: "faq-2",
    question: "¿Tengo que pasarme todo el domingo cocinando?",
    answer: "Para nada. Ese es el gran error del \"batch cooking\" tradicional que te deja agotada lavando vajilla. Con nuestro sistema optimizado por bloques, vas a cocinar de forma secuenciada y ágil para dejar listos \"módulos\" super versátiles que se combinan solos en la app."
  },
  {
    id: "faq-3",
    question: "¿Qué recibo exactamente al realizar el pago?",
    answer: "Recibís acceso inmediato a tu casilla de correo electrónico. Allí tendrás tu cuenta con acceso exclusivo de por vida a la App Web Heladera Inteligente™ junto con la descarga de la Guía Premium de Alimentos y Alacena, la Lista de Compras Inteligente y los recetarios diseñados para simplificar tu mes de corrido."
  },
  {
    id: "faq-4",
    question: "¿La app web 'Heladera Inteligente' requiere instalación?",
    answer: "No. Es una aplicación web moderna que se abre con un solo toque desde cualquier navegador en celular, tablet o computadora. No ocupa espacio en tu almacenamiento ni requiere actualizaciones molestas."
  },
  {
    id: "faq-5",
    question: "¿Funciona bien en teléfonos celulares?",
    answer: "Sí, está totalmente adaptada para pantallas móviles. Podés cargar tus ingredientes con una sola mano parado frente a tu heladera real a las 8 PM y ver los menús al instante."
  },
  {
    id: "faq-6",
    question: "¿Cómo crea menús con lo que tengo?",
    answer: "Cargás de manera muy fácil e intuitiva los ingredientes de tu heladera organizados por secciones (Proteínas, Verduras, Hidratos, etc.). La aplicación procesa la información y te diseña recomendaciones de menús súper fáciles basadas enteramente en lo disponible para reducir tu desperdicio."
  },
  {
    id: "faq-7",
    question: "¿Cuánto tiempo me ahorro usando la App?",
    answer: "Vas a reducir el tiempo de decisión diaria a cero y ahorrar aproximadamente de 10 a 14 horas semanales de dar vueltas pensando qué cenar o yendo al supermercado a hacer compras de último momento."
  },
  {
    id: "faq-8",
    question: "¿Qué pasa si no tengo experiencia previa en la cocina?",
    answer: "Es ideal para principiantes. El método no requiere técnicas gourmet avanzadas. El foco está puesto en la eficiencia del tiempo, la organización de las tareas en la cocina y la combinación lógica de alimentos sencillos."
  },
  {
    id: "faq-9",
    question: "¿Tengo algún tipo de garantía?",
    answer: "Sí, tenés una garantía incondicional de reembolso por 7 días. Si usás la app y sentís que la Heladera Inteligente™ no aporta claridad, valor y un sistema totalmente aplicable para simplificar tu semana, nos escribís y te devolvemos el 100% de tu dinero sin preguntas."
  },
  {
    id: "faq-10",
    question: "¿Dónde puedo pedir ayuda o soporte técnico si lo necesito?",
    answer: "Brindamos soporte directo vía correo electrónico en aurevastudio2@gmail.com o a través de nuestra cuenta oficial de Instagram @cocina_quetransforma."
  }
];

export const SalesCopy: React.FC<SalesCopyProps> = ({ onCtaclick, onOpenCheckout, seatsLeft }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Bono #1: App Web",
      tagline: "Heladera Inteligente™",
      description: "Cargás tus sobras e ingredientes y la app te diseña menús express automáticos con base en tus recursos actuales. ¡La paz mental hecha software!",
      webpImage: "https://i.postimg.cc/sDBgN4W5/Chat-GPT-Image-29-may-2026-12-45-17.webp",
      fallbackImage: "https://i.postimg.cc/sDBgN4W5/Chat-GPT-Image-29-may-2026-12-45-17.webp",
      badge: "Estrella"
    },
    {
      title: "Bono #2: Lista Súper",
      tagline: "Lista de Supermercado Inteligente",
      description: "La lista clasificada que te ayuda a no comprar de más, ahorrar dinero y salir del súper en menos de 15 minutos sin caer en tentaciones.",
      webpImage: "https://i.postimg.cc/4xWmcF8F/bono2-lista-super-esp.webp",
      fallbackImage: "https://i.postimg.cc/4xWmcF8F/bono2-lista-super-esp.webp",
      badge: "Práctico"
    },
    {
      title: "Bono #3: Recetario",
      tagline: "Recetario Express 15 Minutos (20 Recetas)",
      description: "20 recetas ultra rápidas y nutritivas totalmente integradas con tu Heladera Inteligente, diseñadas para que cocines sin esfuerzo físico ni cansancio.",
      webpImage: "https://i.postimg.cc/JhQ5fH0v/bono2-recetario-15m.webp",
      fallbackImage: "https://i.postimg.cc/JhQ5fH0v/bono2-recetario-15m.webp",
      badge: "Express"
    },
    {
      title: "Bono #4: Plan SOS",
      tagline: "Plan SOS “Heladera Vacía”",
      description: "¿Llegó el domingo tarde, no organizaste nada y no hay un alma en la heladera? Este plan de emergencia te ayuda a armar un plato rico y nutritivo en minutos usando lo mínimo que encuentres en el fondo de los estantes.",
      webpImage: "https://i.postimg.cc/vmvtJxTC/bono4-plan-sos.webp",
      fallbackImage: "https://i.postimg.cc/vmvtJxTC/bono4-plan-sos.webp",
      badge: "Salvavidas"
    },
    {
      title: "Bono #5: Desinflamatorio",
      tagline: "Recetario Desinflamatorio para Semanas Inteligentes",
      description: "18 recetas libres de gluten y lácteos seleccionadas para nutrir de verdad, desinflamar el cuerpo de forma natural y recuperar alto nivel de bienestar.",
      webpImage: "https://i.postimg.cc/Z0ztg48y/input-file-1.webp",
      fallbackImage: "https://i.postimg.cc/Z0ztg48y/input-file-1.webp",
      badge: "Salud"
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="w-full bg-stone-50 text-stone-800" id="sales-page">
      
      {/* 2) PARA QUIÉN ES / PARA QUIÉN NO ES */}
      <section className="py-10 px-4 md:px-8 max-w-5xl mx-auto border-t border-stone-200/50 mt-2" id="audiencia">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-widest text-[#2c5e43] uppercase bg-emerald-100/60 px-3 py-1 rounded-full">
            ¿Es esto para vos?
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mt-3 tracking-tight text-stone-900">
            Analizá tu rutina: ¿Te sentís identificada?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Para quién SÍ */}
          <div className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
                <CheckCircle2 className="w-6 h-6 text-[#2c5e43]" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900">Esto es para vos si...</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start text-stone-800 text-sm md:text-base">
                <span className="text-emerald-700 mt-1 font-bold">✔</span>
                <span>Vivís a mil por el trabajo y necesitás que la cena de la semana sea una acción rápida de minutos, no un problema a resolver.</span>
              </li>
              <li className="flex gap-3 items-start text-stone-800 text-sm md:text-base">
                <span className="text-emerald-700 mt-1 font-bold">✔</span>
                <span>Querés comer bien y casero, pero te niegas por completo a pasar tus pocas horas libres pegada a las hornallas.</span>
              </li>
              <li className="flex gap-3 items-start text-stone-800 text-sm md:text-base">
                <span className="text-emerald-700 mt-1 font-bold">✔</span>
                <span>Sentís que el verdadero desgaste no es cocinar, sino el sufrimiento mental de abrir la heladera y pensar "¿qué hago hoy?".</span>
              </li>
              <li className="flex gap-3 items-start text-stone-800 text-sm md:text-base">
                <span className="text-emerald-700 mt-1 font-bold">✔</span>
                <span>Estás cansada de tirar comida y gastar de más en el súper por culpa de la falta de organización.</span>
              </li>
            </ul>
          </div>

          {/* Para quién NO */}
          <div className="bg-white p-8 rounded-2xl border border-red-50 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-50 rounded-lg text-red-600">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900">No es para vos si...</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start text-stone-800 text-sm md:text-base">
                <span className="text-red-600 mt-1 font-bold">✖</span>
                <span>Estás buscando un plan médico, dieta clínica estricta o un asesoramiento nutricional personalizado.</span>
              </li>
              <li className="flex gap-3 items-start text-stone-800 text-sm md:text-base">
                <span className="text-red-600 mt-1 font-bold">✖</span>
                <span>Querés cocinar platos ultra gourmet, técnicas de alta cocina o recetas de 40 pasos todos los días.</span>
              </li>
              <li className="flex gap-3 items-start text-stone-800 text-sm md:text-base">
                <span className="text-red-600 mt-1 font-bold">✖</span>
                <span>No estás dispuesta a regalarte 2 horas el fin de semana, y queres seguir perdiendo tiempo y paciencia todos los días de lunes a viernes.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3) EL PROBLEMA */}
      <section className="bg-stone-900 py-12 px-4 text-stone-100 relative overflow-hidden" id="problema">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[#a1cca5] uppercase text-xs font-semibold tracking-wider bg-[#2c5e43]/40 px-3 py-1 rounded-full border border-[#2c5e43]">
            La Carga Mental Invisible
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium mt-4 mb-4 leading-tight max-w-2xl mx-auto text-stone-100">
            El problema no es que no te guste cocinar. <br/>
            <span className="text-[#a1cca5]">El verdadero problema es decidir.</span>
          </h2>
          <p className="text-stone-300 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Volver a casa después de un día agotador de 10 horas de trabajo es tremendo. Abrir la heladera, quedarte mirando las estanterías de forma vacía, pensar qué comprar a último momento o qué improvisar te termina de quemar la cabeza.
          </p>
          <p className="text-stone-300 text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Eso no es falta de voluntad: es que estás harta de pensar qué cocinar. Terminás pidiendo un delivery carísimo, comiendo cualquier porquería congelada o cocinando el mismo plato aburrido de siempre. La Heladera Inteligente™ corta este bucle de raíz convirtiendo la comida en una acción fácil de resolver en minutos.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center gap-6 justify-center bg-stone-800/80 p-6 rounded-2xl border border-stone-800 backdrop-blur max-w-xl mx-auto">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#1b3d2b] border-2 border-stone-900 flex items-center justify-center font-bold text-xs">A</div>
              <div className="w-10 h-10 rounded-full bg-[#2c5e43] border-2 border-stone-900 flex items-center justify-center font-bold text-xs">M</div>
              <div className="w-10 h-10 rounded-full bg-[#3d7a57] border-2 border-stone-900 flex items-center justify-center font-bold text-xs font-mono">F</div>
            </div>
            <div className="text-left">
              <p className="text-sm text-stone-200 font-serif font-medium">Basta de decidir a las 8 de la noche.</p>
              <p className="text-xs text-stone-200">Sumate a más de 12.000 personas con la semana resuelta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4) QUÉ ES LA HELADERA INTELIGENTE™ */}
      <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto" id="metodo">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-widest text-[#2c5e43] uppercase bg-emerald-100/60 px-3 py-1 rounded-full">
            El Sistema
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mt-3 tracking-tight text-stone-900">
            ¿Cómo funciona el Sistema Heladera Inteligente™ y por qué cambia tu vida?
          </h2>
          <p className="text-stone-700 mt-4 max-w-2xl mx-auto leading-relaxed">
            No es un conjunto de recetas irreales. Es un software interactivo inteligente acompañado de guías estratégicas que transforma tu heladera real en opciones deliciosas disponibles al instante, ahorrándote horas de indecisión.
          </p>
        </div>

        {/* Las 4 columnitas de cómo funciona */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="relative rounded-xl overflow-hidden mb-4 border border-stone-200/60 shadow-inner">
                <img 
                  src="https://i.postimg.cc/vDwFjbrW/paso1-plan.webp" 
                  alt="1. Plan Simple" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover"
                  width="300"
                  height="128"
                />
                <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-orange-100/90 backdrop-blur-sm text-orange-850 flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                  1
                </div>
              </div>
              <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">1. Plan Simple</h3>
              <p className="text-stone-700 text-xs leading-relaxed">
                Elegís combinaciones base rápidas sin enroscarte ni complicarte con ingredientes raros. Menos es más.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="relative rounded-xl overflow-hidden mb-4 border border-stone-200/60 shadow-inner">
                <img 
                  src="https://i.postimg.cc/6qjz20Qm/paso2-compra.webp" 
                  alt="2. Compra Inteligente" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover"
                  width="300"
                  height="128"
                />
                <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-emerald-100/90 backdrop-blur-sm text-[#2c5e43] flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                  2
                </div>
              </div>
              <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">2. Compra Inteligente</h3>
              <p className="text-stone-700 text-xs leading-relaxed">
                Armás tu lista del súper optimizada paso a paso. Comprás exactamente lo que vas a usar, sin gastar de más ni tirar comida.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="relative rounded-xl overflow-hidden mb-4 border border-stone-200/60 shadow-inner">
                <img 
                  src="https://i.postimg.cc/136csPp1/paso3-prep.webp" 
                  alt="3. Preparación Express" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover"
                  width="300"
                  height="128"
                />
                <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-blue-100/90 backdrop-blur-sm text-blue-800 flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                  3
                </div>
              </div>
              <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">3. Preparación Express</h3>
              <p className="text-stone-700 text-xs leading-relaxed">
                Organizás el horno, las hornallas y la tabla de picar en un orden de tareas inteligente para cocinar todas las bases juntas en un único momento de 2 horas seguidas.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="relative rounded-xl overflow-hidden mb-4 border border-stone-200/60 shadow-inner">
                <img 
                  src="https://i.postimg.cc/8zWBNDhV/paso4-semana.webp" 
                  alt="4. Semana Resuelta" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover"
                  width="300"
                  height="128"
                />
                <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-purple-100/90 backdrop-blur-sm text-purple-800 flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                  4
                </div>
              </div>
              <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">4. Semana Resuelta</h3>
              <p className="text-stone-700 text-xs leading-relaxed">
                Tenés tus bases listas (proteínas cocidas, vegetales cortados, hidratos a mano). Entre semana solo servís, combinás, calentás y disfrutás en 10 minutos.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Intermedio (Botón 2 - CTA Link to Offer) */}
        <div className="mt-8 text-center">
          <button 
            onClick={onCtaclick}
            className="cursor-pointer inline-flex items-center gap-2 bg-[#2c5e43] hover:bg-[#1e442f] text-white px-8 py-4.5 rounded-xl font-medium tracking-wide text-lg shadow-lg transition-all transform hover:scale-[1.02] border-none"
          >
            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
            <span>Quiero mi Heladera Inteligente™</span>
          </button>
          <p className="text-xs text-stone-700 font-medium mt-2">Acceso instantáneo de por vida a la App Heladera Inteligente en tu navegador</p>
        </div>
      </section>

      {/* 5) EL MECANISMO ÚNICO (BONO #1) INTRO TO DEMO */}
      <section className="bg-[#1b3d2b] text-[#f7f5f0] py-10 px-4 md:px-8" id="explicacion-bono1">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-900 text-[#a5cca8] text-xs font-semibold px-3 py-1 rounded-full border border-emerald-800 mb-4 animate-pulse">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Bono #1 Estrella Incluido</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 leading-tight text-white animate-fade-in">
                La Heladera Inteligente™ que te devuelve tu tiempo libre:
              </h2>
              <p className="text-[#d8e5d9] mb-4 text-sm md:text-base leading-relaxed">
                Olvidate de instalar aplicaciones pesadas o tener que renegar con las tiendas de descargas. Este bono estrella te brinda una aplicación web interactiva que cargás directo con un simple enlace en tu teléfono o computadora.
              </p>
              <p className="text-[#d8e5d9] mb-6 text-sm md:text-base leading-relaxed">
                Simplemente marcas qué alimentos tenés listos por secciones y nuestra aplicación procesa el inventario por vos para mostrarte menús de cena o almuerzo listos con base en tus sobras de manera ágil.
              </p>

              <div className="space-y-3.5 mb-8 text-[#f7f5f0]/95 font-sans text-sm md:text-base">
                <div className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold">✅</span>
                  <span>Cargás ingredientes en 30 segundos</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold">✅</span>
                  <span>Te genera menús automáticamente</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold">✅</span>
                  <span>Te avisa ANTES de que algo se venza</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold">✅</span>
                  <span>Lista de compras inteligente (una sola ida al súper)</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold">✅</span>
                  <span>Funciona desde cualquier dispositivo (sin instalación)</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 p-6 rounded-2xl border border-emerald-800/60 shadow-2xl relative">
              {/* Fake visual helper imitating 3-5 screenshots of the app */}
              <div className="absolute -top-3 -right-3 bg-[#2c5e43] text-stone-100 text-xs px-2.5 py-1 rounded-full font-sans tracking-wide shadow">
                Vista de Celular
              </div>
              
              <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950">
                {/* Simulated Screen header */}
                <div className="bg-stone-900 px-4 py-3 flex items-center justify-between border-b border-stone-800 text-xs text-stone-400 select-none">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  </div>
                  <div className="bg-stone-950 px-3 py-0.5 rounded text-stone-500 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    app.heladera-inteligente.com
                  </div>
                  <Users className="w-3.5 h-3.5" />
                </div>

                {/* Simulated Mock screenshot 1 */}
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#2c5e43] text-stone-100 text-xs flex items-center justify-center">1</div>
                    <span className="text-xs font-semibold text-stone-200">Inventariar Alimentos</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-[#2c5e43]/20 border border-[#2c5e43]/40 rounded-lg text-left">
                      <p className="text-[10px] text-emerald-400">Proteínas</p>
                      <p className="text-xs text-stone-200">🍗 Pollo Cocido</p>
                      <p className="text-[10px] text-stone-400">Suficiente</p>
                    </div>
                    <div className="p-2 bg-[#2c5e43]/20 border border-[#2c5e43]/40 rounded-lg text-left">
                      <p className="text-[10px] text-emerald-400">Verduras</p>
                      <p className="text-xs text-stone-200">🌿 Espinaca</p>
                      <p className="text-[10px] text-stone-400">Medio</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-stone-800">
                    <div className="w-6 h-6 rounded-full bg-[#2c5e43] text-stone-100 text-xs flex items-center justify-center">2</div>
                    <span className="text-xs font-semibold text-stone-200">Creación de Menús</span>
                  </div>
                  <div className="p-3 bg-stone-900 border border-stone-800 rounded-lg text-center">
                    <div className="inline-flex items-center gap-1 text-xs text-amber-300 font-serif mb-1">
                      <Sparkles className="w-3 h-3 fill-amber-300" />
                      <span>Sugerencia IA</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-serif font-medium">Pollo Saltado de Espinacas & Arroz</p>
                    <div className="flex justify-center gap-2 mt-2 text-[9px] text-stone-400">
                      <span>⏱ 10 Min</span>
                      <span>•</span>
                      <span>🔥 Dificultad Cero</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-[#a5cca8] mt-4 font-mono">
                *Captura real de la aplicación web responsive provista a continuación.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto" id="contenido">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-widest text-[#2c5e43] uppercase bg-emerald-100/60 px-3 py-1 rounded-full">
            El Paquete Completo
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mt-3 tracking-tight text-stone-900">
            ¿Qué recibís al comprar el Pack de la Heladera Inteligente™ hoy?
          </h2>
          <p className="text-stone-700 mt-2 text-sm md:text-base max-w-xl mx-auto">
            Acceso absoluto e inmediato a todo el material para optimizar tus comidas, tu presupuesto y ganar paz mental.
          </p>
        </div>

        {/* INTERACTIVE MOCKUP SHOWCASE */}
        <div className="mb-8 bg-white border border-stone-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold tracking-wide text-[#2c5e43] uppercase bg-emerald-50 px-3 py-1 rounded-full">
              Vista del Producto Real
            </span>
            <h3 className="text-2xl font-serif font-medium text-stone-900 mt-2">
              Explorá lo que vas a recibir hoy mismo
            </h3>
            <p className="text-xs text-stone-700 font-medium mt-1">
              Hacé clic en las pestañas para ver los mockups de alta definición de cada material incluido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            {/* Left: Tab Selectors */}
            <div className="md:col-span-5 flex flex-col gap-3 w-full">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`cursor-pointer w-full text-left p-3.5 md:p-4 rounded-2xl border transition-all flex items-start gap-3 bg-transparent hover:border-emerald-250 outline-none ${
                    activeTab === idx
                      ? "border-[#2c5e43] bg-[#2c5e43]/5 shadow-sm font-medium"
                      : "border-stone-200/80 hover:bg-stone-50/50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif font-bold text-sm shrink-0 ${
                    activeTab === idx ? "bg-[#2c5e43] text-white" : "bg-stone-100 text-stone-700"
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                      <span className="font-serif font-semibold text-stone-950 text-sm leading-tight break-words">{tab.title}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase w-fit shrink-0 ${
                        tab.badge === "Estrella"
                          ? "bg-amber-100 text-amber-800"
                          : tab.badge === "Premium"
                          ? "bg-red-100 text-red-800"
                          : "bg-emerald-100 text-emerald-850"
                      }`}>
                        {tab.badge}
                      </span>
                    </div>
                    <p className="text-stone-700 text-xs mt-1 leading-snug break-words">{tab.tagline}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Mockup Display Container */}
            <div className="md:col-span-7 flex flex-col gap-4 w-full">
              <div className="relative bg-stone-100 p-2 rounded-2xl border border-stone-200 overflow-hidden shadow-inner flex items-center justify-center min-h-[280px] md:min-h-[380px]">
                <picture className="w-full flex items-center justify-center">
                  <source srcSet={tabs[activeTab].webpImage} type="image/webp" />
                  <img
                    src={tabs[activeTab].fallbackImage}
                    alt={tabs[activeTab].title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="rounded-xl object-contain w-full h-[280px] md:h-[360px] transition-all duration-300"
                    width="500"
                    height="360"
                  />
                </picture>
              </div>

              <div className="bg-emerald-50/20 border border-emerald-100/50 p-4 rounded-xl">
                <span className="text-[10px] font-bold text-[#2c5e43] uppercase tracking-wider block font-sans">
                  {tabs[activeTab].tagline}
                </span>
                <p className="text-stone-700 text-xs md:text-sm mt-1 leading-relaxed">
                  {tabs[activeTab].description}
                </p>
                
                {/* High-Converting Tab Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-emerald-100/40">
                  <button
                    type="button"
                    onClick={onCtaclick}
                    className="cursor-pointer w-full bg-[#2c5e43] text-white hover:bg-[#1e442f] px-5 py-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 shadow-sm transition-all border-none"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
                    <span>Quiero mi Heladera Inteligente™</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Producto Principal */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-[#2c5e43]/20 shadow-sm flex flex-col lg:flex-row justify-between gap-6 hover:border-[#2c5e43]/40 transition-all">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-[#2c5e43]/10 text-[#2c5e43] text-xs font-semibold px-2.5 py-0.5 rounded">
                  EBOOK PRINCIPAL
                </div>
                <h3 className="text-xl font-serif font-medium text-stone-900">Manual del Usuario: Heladera Inteligente™ (PDF)</h3>
                <p className="text-stone-700 text-sm max-w-xl">
                  Toda la metodología detallada para planificar la base de tus comidas, armar la lista de compras del súper secuenciada de forma lógica y gestionar tus recursos en casa. Incluye plantillas de planificación descargables y check-lists.
                </p>
              </div>
              <div className="text-xs text-stone-700 border-t border-stone-200 pt-3">
                🍳 <strong>Guía Interactiva Multipantalla:</strong> Disfrutala en tablets, teléfonos y computadoras con un diseño de planos visuales.
              </div>
            </div>
            
            {/* Embedded Thumbnail */}
            <div className="lg:w-1/4 flex flex-col justify-center items-center bg-stone-50/50 rounded-xl p-2 border border-stone-200">
              <img 
                src="https://i.postimg.cc/G384ZKFM/input-file-2.webp" 
                alt="Heladera Inteligente Mockup Preview" 
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full max-h-[120px] object-contain rounded"
                width="250"
                height="120"
              />
            </div>

            <div className="text-left lg:text-right mt-2 lg:mt-0 lg:border-l lg:border-stone-200 lg:pl-8 flex flex-col justify-center lg:min-w-[140px]">
              <span className="text-stone-700 text-xs line-through block">Valor regular: $17.900 ARS</span>
              <span className="text-[#2c5e43] font-serif font-medium text-lg">Invalorable</span>
            </div>
          </div>

          {/* Bono 1 */}
          <div id="detalle-bono1" className="scroll-mt-20 bg-white p-6 md:p-8 rounded-2xl border border-stone-200/90 border-l-4 border-l-[#2c5e43] shadow-md shadow-emerald-950/5 flex flex-col lg:flex-row justify-between gap-6 hover:shadow-lg hover:shadow-emerald-950/10 transition-all">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-850 text-xs font-semibold px-2.5 py-0.5 rounded font-sans uppercase tracking-wider">
                  🎁 REGALO DE LANZAMIENTO • BONO #1 ESTRELLA
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-900">App Web “Heladera Inteligente” (Acceso Vitalicio)</h3>
                <p className="text-stone-700 text-sm max-w-xl">
                  La aplicación web inteligente interactiva que se abre con un enlace seguro. Cargás lo que tenés en la heladera y te sugiere combinaciones fáciles con tus sobras para eliminar las dudas de cocina de lunes a viernes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 text-xs text-[#2c5e43]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✦</span>
                    <span className="text-stone-700 font-medium">Filtro instantáneo por ingredientes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✦</span>
                    <span className="text-stone-700 font-medium">Asistente express de combinaciones</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✦</span>
                    <span className="text-stone-700 font-medium">Acceso directo sin instalaciones</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✦</span>
                    <span className="text-stone-700 font-medium">Soporte y actualizaciones gratis</span>
                  </div>
                </div>
              </div>
              <div className="border border-stone-200 rounded-xl overflow-hidden w-full max-w-lg shadow-sm">
                <picture>
                  <source srcSet="https://i.postimg.cc/sDBgN4W5/Chat-GPT-Image-29-may-2026-12-45-17.webp" type="image/webp" />
                  <img 
                    src="https://i.postimg.cc/sDBgN4W5/Chat-GPT-Image-29-may-2026-12-45-17.webp" 
                    alt="App Web Heladera Inteligente Real Screenshot" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full object-cover max-h-[160px] hover:scale-102 transition-transform duration-500"
                    width="500"
                    height="160"
                  />
                </picture>
              </div>
            </div>
            <div className="text-left lg:text-right mt-2 lg:mt-0 lg:border-l lg:border-stone-200 lg:pl-8 flex flex-col justify-center lg:min-w-[140px]">
              <span className="text-stone-700 text-xs line-through block">Por separado: $42.900 ARS</span>
              <span className="text-[#2c5e43] font-serif font-bold text-lg block mt-1 animate-pulse">⚡ GRATIS HOY</span>
            </div>
          </div>

          {/* Bono 2 */}
          <div id="detalle-bono2" className="scroll-mt-20 bg-white p-6 md:p-8 rounded-2xl border border-stone-200/90 border-l-4 border-l-emerald-600 shadow-md shadow-emerald-950/5 flex flex-col lg:flex-row justify-between gap-6 hover:shadow-lg transition-all">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-850 text-xs font-semibold px-2.5 py-0.5 rounded font-sans uppercase tracking-wider">
                  🎁 REGALO DE LANZAMIENTO • BONO #2
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-900">Lista de Supermercado Inteligente</h3>
                <p className="text-stone-700 text-sm max-w-xl">
                  Un casillero clasificado por góndolas y categorías que te ayuda a no comprar de más, no duplicar ingredientes que ya tenés durmiendo en la alacena y disminuir el tiempo dentro del supermercado a la mitad.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 text-xs text-[#2c5e43]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="text-stone-700 font-medium">Clasificación exacta por pasillos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="text-stone-700 font-medium">Cero duplicados innecesarios</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="text-stone-700 font-medium">Lista optimizada para celular</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="text-stone-700 font-medium">Formato listo para imprimir</span>
                  </div>
                </div>
              </div>
              <div className="border border-stone-200 rounded-xl overflow-hidden w-full max-w-lg shadow-sm">
                <picture>
                  <source srcSet="https://i.postimg.cc/4xWmcF8F/bono2-lista-super-esp.webp" type="image/webp" />
                  <img 
                    src="https://i.postimg.cc/4xWmcF8F/bono2-lista-super-esp.webp" 
                    alt="Bono #2: Lista de Supermercado Inteligente" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full object-cover max-h-[160px] hover:scale-102 transition-transform duration-500"
                    width="500"
                    height="160"
                  />
                </picture>
              </div>
            </div>
            <div className="text-left lg:text-right mt-2 lg:mt-0 lg:border-l lg:border-stone-200 lg:pl-8 flex flex-col justify-center lg:min-w-[140px]">
              <span className="text-stone-700 text-xs line-through block">Por separado: $4.500 ARS</span>
              <span className="text-[#2c5e43] font-serif font-bold text-lg block mt-1">✓ GRATIS HOY</span>
            </div>
          </div>

          {/* Bono 3 */}
          <div id="detalle-bono3" className="scroll-mt-20 bg-white p-6 md:p-8 rounded-2xl border border-stone-200/90 border-l-4 border-l-blue-600 shadow-md flex flex-col lg:flex-row justify-between gap-6 hover:shadow-lg transition-all">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-750 text-xs font-semibold px-2.5 py-0.5 rounded font-sans uppercase tracking-wider">
                  🎁 REGALO DE LANZAMIENTO • BONO #3
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-900">Recetario Express 15 Minutos (20 Recetas)</h3>
                <p className="text-stone-700 text-sm max-w-xl">
                  Para cuando el cansancio te gana y no querés saber nada con la cocina. 20 ideas frías o templadas que consisten solo en mezclar tus bases hechas de forma express y sentarte a comer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 text-xs text-blue-800">
                  <div className="flex items-center gap-1.5">
                    <span className="text-blue-500">✦</span>
                    <span className="text-stone-700 font-medium">Armado express en frío</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-blue-500">✦</span>
                    <span className="text-stone-700 font-medium">Olvidate de prender el fuego</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-blue-500">✦</span>
                    <span className="text-stone-700 font-medium">Recetas nutritivas y proteicas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-blue-500">✦</span>
                    <span className="text-stone-700 font-medium">Ingredientes comunes de todos los días</span>
                  </div>
                </div>
              </div>
              <div className="border border-stone-200 rounded-xl overflow-hidden w-full max-w-lg shadow-sm">
                <picture>
                  <source srcSet="https://i.postimg.cc/JhQ5fH0v/bono2-recetario-15m.webp" type="image/webp" />
                  <img 
                    src="https://i.postimg.cc/JhQ5fH0v/bono2-recetario-15m.webp" 
                    alt="Bono #3: Recetario Express 15 Minutos" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full object-cover max-h-[160px] hover:scale-102 transition-transform duration-500"
                    width="500"
                    height="160"
                  />
                </picture>
              </div>
            </div>
            <div className="text-left lg:text-right mt-2 lg:mt-0 lg:border-l lg:border-stone-200 lg:pl-8 flex flex-col justify-center lg:min-w-[140px]">
              <span className="text-stone-700 text-xs line-through block">Por separado: $8.500 ARS</span>
              <span className="text-[#2c5e43] font-serif font-bold text-lg block mt-1">✓ GRATIS HOY</span>
            </div>
          </div>

          {/* Bono 4 */}
          <div id="detalle-bono4" className="scroll-mt-20 bg-white p-6 md:p-8 rounded-2xl border border-stone-200/90 border-l-4 border-l-purple-600 shadow-md flex flex-col lg:flex-row justify-between gap-6 hover:shadow-lg transition-all">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-855 text-xs font-semibold px-2.5 py-0.5 rounded font-sans uppercase tracking-wider">
                  🎁 REGALO DE LANZAMIENTO • BONO #4
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-900">Plan SOS “Heladera Vacía”</h3>
                <p className="text-stone-700 text-sm max-w-xl">
                  ¿Llegó el domingo tarde, no organizaste nada y no hay un alma en la heladera? Este plan de emergencia te ayuda a armar un plato rico y nutritivo en minutos usando lo mínimo que encuentres en el fondo de los estantes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 text-xs text-purple-850">
                  <div className="flex items-center gap-1.5">
                    <span className="text-purple-500 font-bold">✓</span>
                    <span className="text-stone-700 font-medium font-sans">Tu salvación para los días de olvido</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-purple-500 font-bold">✓</span>
                    <span className="text-stone-700 font-medium font-sans">Comidas completas con ingredientes básicos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-purple-500 font-bold">✓</span>
                    <span className="text-stone-700 font-medium font-sans">Platos súper baratos de armar</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-purple-500 font-bold">✓</span>
                    <span className="text-stone-700 font-medium font-sans">Te ahorrás el gasto de un delivery apurado</span>
                  </div>
                </div>
              </div>
              <div className="border border-stone-200 rounded-xl overflow-hidden w-full max-w-lg shadow-sm">
                <picture>
                  <source srcSet="https://i.postimg.cc/vmvtJxTC/bono4-plan-sos.webp" type="image/webp" />
                  <img 
                    src="https://i.postimg.cc/vmvtJxTC/bono4-plan-sos.webp" 
                    alt="Bono #4: Plan SOS Heladera Vacía" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full object-cover max-h-[160px] hover:scale-102 transition-transform duration-500"
                    width="500"
                    height="160"
                  />
                </picture>
              </div>
            </div>
            <div className="text-left lg:text-right mt-2 lg:mt-0 lg:border-l lg:border-stone-200 lg:pl-8 flex flex-col justify-center lg:min-w-[140px]">
              <span className="text-stone-700 text-xs line-through block">Por separado: $6.900 ARS</span>
              <span className="text-[#2c5e43] font-serif font-bold text-lg block mt-1">✓ GRATIS HOY</span>
            </div>
          </div>

          {/* Bono Premium 5 */}
          <div id="detalle-bono5" className="scroll-mt-20 bg-[#fffefb] p-6 md:p-8 rounded-2xl border border-amber-300 border-l-4 border-l-amber-500 shadow-lg shadow-amber-500/10 flex flex-col lg:flex-row justify-between gap-6 hover:shadow-xl hover:shadow-amber-500/15 transition-all relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 bg-amber-500 text-amber-950 font-bold text-[9px] uppercase px-6 py-1 rotate-45 translate-x-6 translate-y-2 shadow">
              ¡NUEVO!
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-0.5 rounded font-sans uppercase tracking-wider">
                  🚨 CORONACIÓN PREMIUM • BONO #5
                </div>
                <h3 className="text-xl font-serif font-medium text-[#2c5e43]">Recetario Desinflamatorio para Semanas Inteligentes</h3>
                <p className="text-stone-700 text-sm max-w-xl leading-relaxed">
                  18 recetas prácticas que se resuelven en un rango de 15 a 25 minutos. Especialmente diseñadas con opciones deliciosas libre de gluten y libre de lácteos. Incluye plantilla de menú ejemplo de 5 días de corrido y guía rápida para días infinitamente caóticos. Totalmente compatible con la dinámica de tu Heladera Inteligente™.
                </p>
              </div>
              <div className="text-xs text-[#2c5e43] bg-emerald-50 rounded-xl p-3 border border-emerald-1050/50">
                ⭐ <strong>Experiencia de Lectura Premium:</strong> Guías paso a paso con fotos en alta definición y un diseño tan cuidado que vas a sentir que tenés el libro real en tus manos.
              </div>
            </div>
            
            {/* Embedded 3D Book Cover */}
            <div className="lg:w-1/4 flex flex-col justify-center items-center bg-[#fcfcfa] rounded-xl p-3 border border-stone-200/80 shadow-inner">
              <picture className="w-full flex items-center justify-center">
                <source srcSet="https://i.postimg.cc/Z0ztg48y/input-file-1.webp" type="image/webp" />
                <img 
                  src="https://i.postimg.cc/Z0ztg48y/input-file-1.webp" 
                  alt="Recetario Desinflamatorio 3D Cookbook Mockup" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[150px] object-contain hover:scale-105 transition-all duration-300"
                  width="250"
                  height="150"
                />
              </picture>
            </div>

            <div className="text-left lg:text-right mt-2 lg:mt-0 lg:border-l lg:border-stone-200 lg:pl-8 flex flex-col justify-center lg:min-w-[140px]">
              <span className="text-stone-700 text-xs line-through block">Por separado: $15.500 ARS</span>
              <span className="text-amber-700 font-serif font-bold text-lg block mt-1">✓ GRATIS HOY</span>
            </div>
          </div>
        </div>

        {/* Cierre / Anclaje de Valor */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-stone-200 shadow-sm text-center max-w-3xl mx-auto">
          <p className="text-stone-800 uppercase text-xs font-semibold tracking-wider">Anclaje de Valor Real</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-3">
            <div>
              <p className="text-sm text-stone-700 font-medium">Valor de los Bonos por separado</p>
              <p className="text-2xl font-serif text-red-600 line-through font-semibold">$78.300 ARS</p>
            </div>
            <div className="hidden sm:block text-stone-300 text-2xl font-light">|</div>
            <div>
              <p className="text-sm text-[#2c5e43] font-medium">Llevate todo hoy por solo</p>
              <p className="text-3xl md:text-4xl font-serif text-[#2c5e43] font-bold">$17.900 ARS</p>
            </div>
          </div>
          <p className="text-xs text-stone-600 mt-4">Un solo pago • Acceso de por vida • Sin costos de membresía mensuales</p>
        </div>
      </section>

      {/* 7) BONOS POR CUPO */}
      <section className="bg-amber-50 border-y border-amber-100 py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-850 text-xs font-semibold px-3 py-1 rounded-full animate-bounce">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Cupos Estrictos</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-amber-950">
            Los bonos gratuitos están limitados por cupos
          </h2>
          <p className="text-amber-900 text-sm max-w-xl mx-auto">
            Los servidores de la App Web “Heladera Inteligente” tienen límites de recursos de almacenamiento. Por lo tanto, garantizamos estos 5 bonos premium únicamente para los primeros <strong className="font-bold">200 accesos</strong>.
          </p>

          <div className="max-w-md mx-auto bg-white p-5 rounded-2xl border border-stone-200 shadow-md mt-6 space-y-3 text-left animate-fade-in">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-800 font-semibold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block animate-ping"></span>
                <span>🔥 Solo quedan <strong className="text-red-600 font-bold">{seatsLeft} de 200 cupos</strong> al precio de lanzamiento</span>
              </span>
              <span className="text-stone-700 font-bold font-mono">{Math.round(((200 - seatsLeft) / 200) * 100)}% completado</span>
            </div>
            <div className="w-full bg-[#f0ede6] h-3.5 rounded-full overflow-hidden shadow-inner border border-stone-200 p-[2px]">
              <div 
                className={`${seatsLeft > 30 ? "bg-emerald-600" : seatsLeft >= 15 ? "bg-amber-500" : "bg-red-600"} h-full rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${((200 - seatsLeft) / 200) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8) TESTIMONIOS */}
      <section className="py-12 bg-stone-100 px-4 md:px-8 border-t border-stone-200" id="testimonios">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-widest text-[#2c5e43] uppercase bg-emerald-100/60 px-3 py-1 rounded-full">
              Resultados Real
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mt-3 tracking-tight text-stone-900">
              Qué dicen mujeres reales que trabajan muchas horas
            </h2>
            <p className="text-stone-700 mt-2 max-w-xl mx-auto">
              Testimonios auténticos y sin filtros de profesionales y madres que adoptaron la preparación por bloques de 2 horas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-stone-700 font-serif italic text-sm md:text-base leading-relaxed mb-6">
                    "{t.comment}"
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-4 mt-auto">
                  <div className="grid grid-cols-1 gap-2.5 mb-4 text-xs">
                    <div className="bg-red-50 p-2.5 rounded-lg border border-red-100/45 flex gap-2">
                      <span className="text-red-500 font-bold">Antes:</span>
                      <span className="text-stone-700">{t.before}</span>
                    </div>
                    <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-1050/45 flex gap-2">
                      <span className="text-emerald-700 font-bold">Ahora:</span>
                      <span className="text-stone-700">{t.after}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#2c5e43] font-serif font-bold text-sm flex items-center justify-center capitalize select-none">
                      {t.avatarSeed.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-stone-900">{t.name}</h3>
                      <p className="text-[10px] text-stone-700 font-sans">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN SOBRE LA CREADORA */}
      <section className="py-12 px-4 md:px-8 bg-[#fbfbfa]" id="sobre-creadora">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Beautiful portrait of woman holding tablet */}
            <div className="relative group">
              <div className="absolute inset-0 bg-[#2c5e43]/5 rounded-3xl blur-2xl group-hover:bg-[#2c5e43]/10 transition-all"></div>
              <img 
                src="https://i.postimg.cc/1XK6fc9G/Chat-GPT-Image-27-may-2026-17-09-10-(1).webp" 
                alt="Nutricionista y Creadora de Heladera Inteligente™" 
                loading="lazy"
                referrerPolicy="no-referrer"
                className="relative rounded-3xl border border-stone-200 shadow-xl object-cover w-full h-[380px] md:h-[480px] hover:scale-[1.01] transition-transform duration-300"
                width="500"
                height="480"
              />
            </div>
            
            {/* Right: Creator text and skills */}
            <div className="space-y-6">
              <span className="text-xs font-semibold tracking-widest text-[#2c5e43] uppercase bg-emerald-100/60 px-3 py-1 rounded-full">
                La Creadora
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 tracking-tight leading-tight">
                La mente profesional detrás de <span className="text-[#2c5e43]">Heladera Inteligente™</span>
              </h2>
              <h3 className="text-2xl font-serif font-semibold text-[#2c5e43] mt-1">
                Laura Martínez
              </h3>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                Desarrollé esta metodología cansada de ver cómo mis pacientes luchaban diariamente con la misma frustración: llegar a casa de noche después de trabajar un montón de horas y tener que resolver la cena sin planificación frente a una heladera desordenada.
              </p>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                Este sistema une mis dos grandes pasiones y formaciones para simplificarte la vida: la rigurosidad científica de una <strong>Licenciada en Nutrición</strong> para garantizar platos balanceados, y la velocidad y agilidad práctica de una <strong>Chef de cocina profesional</strong> con más de 15 años de experiencia organizando procesos de cocina eficientes.
              </p>
              
              <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                  <h4 className="font-serif font-semibold text-stone-900 text-sm">Nutricionista</h4>
                  <p className="text-xs text-stone-500 mt-1">Especializada en alimentación práctica para mujeres ocupadas.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                  <h4 className="font-serif font-semibold text-[#2c5e43] text-sm">Chef Profesional</h4>
                  <p className="text-xs text-stone-500 mt-1">Con 15 años de trayectoria simplificando recetas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10) GARANTÍA */}
      <section className="bg-white py-12 px-4 border-y border-stone-200" id="garantia">
        <div className="max-w-4xl mx-auto bg-stone-50 rounded-3xl p-8 md:p-12 border border-stone-200 flex flex-col md:flex-row items-center gap-8 md:gap-12 hover:shadow-lg transition-all">
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-[#2c5e43] flex-shrink-0 animate-bounce">
            <ShieldCheck className="w-16 h-16" />
          </div>
          <div className="space-y-4 text-left">
            <span className="text-xs font-semibold tracking-wider text-[#2c5e43] uppercase bg-emerald-100/60 px-2.5 py-0.5 rounded">
              Garantía de Satisfacción Asegurada
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-stone-900 leading-tight">
              PROBALO SIN RIESGO POR 7 DÍAS
            </h2>
            <p className="text-stone-700 text-sm md:text-base leading-relaxed">
              Poné a prueba el método: descargá los PDF, entrá a la app web y planificá tu semana. Si en los primeros 7 días ves que esto no es para vos o no te da el orden que buscabas, nos escribís un correo y te reintegramos el 100% de tu inversión.
            </p>
            <p className="text-stone-700 text-sm md:text-base leading-relaxed font-medium">
              Así de simple. No te hacemos preguntas ni te pedimos explicaciones.
            </p>
          </div>
        </div>
      </section>

      {/* 9) PRECIO + CTA DE CIERRE */}
      <section className="bg-stone-900 py-16 px-4 text-center relative overflow-hidden text-stone-100 rounded-3xl mt-4 mb-16 shadow-2xl" id="oferta-cierre">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-950/15 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="text-amber-400 font-serif font-medium tracking-widest text-xs uppercase bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20 inline-block">
            OFERTA IRREPETIBLE • BONOS EXCLUSIVOS LIMITADOS
          </span>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-serif font-medium leading-tight text-white max-w-2xl mx-auto">
              Todo esto es tuyo hoy por una fracción de su valor real
            </h2>
            <p className="text-stone-300 text-sm md:text-base max-w-2xl mx-auto">
              Al sumarte a la Heladera Inteligente™ Premium, desbloqueás el sistema de organización definitivo y el paquete completo de herramientas premium para transformar tu alimentación y liberar tus tardes de lunes a viernes:
            </p>
          </div>

          {/* EL STACK DE VALOR: DETALLE DE LO QUE INCLUYE (ALTA CONVERSIÓN) */}
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
            <div className="bg-stone-950/40 border border-stone-800/80 p-5 rounded-2xl flex gap-3.5 items-start hover:border-emerald-700/50 transition-all">
              <span className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 font-serif font-bold text-xs shrink-0">PDF</span>
              <div>
                <h4 className="font-serif font-semibold text-white text-base">Guía Táctica de la Heladera Inteligente completa</h4>
                <p className="text-stone-400 text-xs mt-1">El plan estratégico paso a paso detallado para aprender a pre-preparar, acoplar y combinar tus comidas en solo 2 horas semanales.</p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="text-[10px] bg-stone-850 px-2 py-0.5 rounded text-stone-300 font-mono">Valor: $17.900 ARS</span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">INCLUIDO</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-950/40 border border-stone-850 p-5 rounded-2xl flex gap-3.5 items-start hover:border-emerald-700/50 transition-all relative overflow-hidden">
              <span className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 font-serif font-bold text-xs shrink-0">APP</span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-semibold text-white text-base">Bono #1: App Web</h4>
                  <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded uppercase">Estrella</span>
                </div>
                <h5 className="text-[11px] font-semibold text-[#a5cca8] mt-0.5">Heladera Inteligente™</h5>
                <p className="text-stone-400 text-xs mt-1">Nuestra herramienta inteligente para cargar tus sobras actuales e ingredientes disponibles, creando menús express automáticos en segundos.</p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="text-[10px] bg-stone-850 px-2 py-0.5 rounded text-stone-300 font-mono">Valor: $42.900 ARS</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">¡GRATIS DE POR VIDA!</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-950/40 border border-stone-800/80 p-5 rounded-2xl flex gap-3.5 items-start hover:border-emerald-700/50 transition-all">
              <span className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 font-serif font-bold text-xs shrink-0">B2</span>
              <div>
                <h4 className="font-serif font-semibold text-white text-base">Bono #2: Lista Súper Inteligente</h4>
                <p className="text-stone-400 text-xs mt-1">El listado clasificado que te enseña a comprar de manera organizada, eliminando compras duplicada, ahorrando dinero y saliendo del súper en 15 min.</p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="text-[10px] bg-stone-850 px-2 py-0.5 rounded text-stone-300 font-mono">Valor: $4.500 ARS</span>
                  <span className="text-[10px] font-semibold text-[#a5cca8] bg-[#2c5e43]/20 px-2 py-0.5 rounded">¡GRATIS!</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-950/40 border border-stone-800/80 p-5 rounded-2xl flex gap-3.5 items-start hover:border-emerald-700/50 transition-all">
              <span className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 font-serif font-bold text-xs shrink-0">B3</span>
              <div>
                <h4 className="font-serif font-semibold text-white text-base">Bono #3: Recetario Express 15 Minutos</h4>
                <p className="text-stone-400 text-xs mt-1">20 recetas ultra-rápidas, ricas y equilibradas diseñadas especialmente para ensamblar al instante con tu Heladera Inteligente.</p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="text-[10px] bg-stone-850 px-2 py-0.5 rounded text-stone-300 font-mono">Valor: $8.500 ARS</span>
                  <span className="text-[10px] font-semibold text-[#a5cca8] bg-[#2c5e43]/20 px-2 py-0.5 rounded">¡GRATIS!</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-950/40 border border-stone-800/80 p-5 rounded-2xl flex gap-3.5 items-start hover:border-emerald-700/50 transition-all">
              <span className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 font-serif font-bold text-xs shrink-0">B4</span>
              <div>
                <h4 className="font-serif font-semibold text-white text-base">Bono #4: Plan SOS "Heladera Vacía"</h4>
                <p className="text-stone-400 text-xs mt-1">El protocolo de emergencia definitivo que te permite armar platos exquisitos y nutritivos con lo básico que encuentres al fondo de tus estantes.</p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="text-[10px] bg-stone-850 px-2 py-0.5 rounded text-stone-300 font-mono">Valor: $6.900 ARS</span>
                  <span className="text-[10px] font-semibold text-[#a5cca8] bg-[#2c5e43]/20 px-2 py-0.5 rounded">¡GRATIS!</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-950/40 border border-[#2c5e43]/40 p-5 rounded-2xl flex gap-3.5 items-start hover:border-emerald-700/50 transition-all">
              <span className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 font-serif font-bold text-xs shrink-0">B5</span>
              <div>
                <h4 className="font-serif font-semibold text-white text-base">Bono #5: Recetario Desinflamatorio</h4>
                <p className="text-stone-400 text-xs mt-1">18 recetas Gourmet sin gluten ni lácteos para desintoxicar tu cuerpo de manera natural y sostenible sin perder nada de sabor.</p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="text-[10px] bg-stone-850 px-2 py-0.5 rounded text-stone-300 font-mono">Valor: $15.500 ARS</span>
                  <span className="text-[10px] font-semibold text-[#a5cca8] bg-[#2c5e43]/20 px-2 py-0.5 rounded">¡GRATIS!</span>
                </div>
              </div>
            </div>
          </div>

          {/* CUADRO COMPARATIVO DE PRECIO */}
          <div className="bg-stone-950 border border-stone-800 p-8 rounded-3xl max-w-md mx-auto space-y-4 shadow-2xl relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-950 text-[10px] font-sans font-bold px-4 py-1 rounded-full shadow-md tracking-wider uppercase">
              DESCUENTO DEL 81% ACTIVADO
            </div>

            <div className="space-y-2 pt-2 text-left text-xs">
              <div className="flex justify-between items-center text-stone-400 pb-2 border-b border-stone-900">
                <span>Suscripción Heladera Inteligente™ Premium</span>
                <span>$17.900 ARS</span>
              </div>
              <div className="flex justify-between items-center text-stone-400 pb-2 border-b border-stone-900">
                <span>Suma de los 5 Bonos de Lanzamiento</span>
                <span className="line-through text-stone-500">$78.300 ARS</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400 pb-2 border-b border-stone-900">
                <span>Bonos de Lanzamiento Desbloqueados</span>
                <span className="font-semibold font-mono">¡GRATIS ($0.00)!</span>
              </div>
              <div className="flex justify-between items-center text-stone-400 pb-2 border-b border-stone-900">
                <span>Valor Real de la Propuesta</span>
                <span className="font-mono line-through text-red-400">$96.200 ARS</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-3 gap-2 border-t border-stone-900">
              <div className="text-center sm:text-left">
                <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold font-sans">VALOR TOTAL DE HOY</span>
                <span className="text-[10px] text-stone-400 font-sans block">Acceso inmediato sin suscripciones</span>
              </div>
              <div className="text-center sm:text-right">
                <span className="text-4xl md:text-5xl font-serif text-amber-300 font-extrabold tracking-tight block">$17.900 ARS</span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded inline-block mt-1">Ahorrás $78.300 ARS (81% Off)</span>
              </div>
            </div>
          </div>

          {/* Cupos progress bar in closing CTA */}
          <div className="max-w-md mx-auto bg-stone-950 p-4 rounded-xl border border-stone-800 text-left space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-300 font-semibold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block animate-ping"></span>
                <span>🔥 Solo quedan <strong className="text-red-500 font-extrabold">{seatsLeft} de 200 cupos</strong> al precio de lanzamiento</span>
              </span>
              <span className="text-stone-450 font-bold font-mono text-stone-400">{Math.round(((200 - seatsLeft) / 200) * 100)}% completado</span>
            </div>
            <div className="w-full bg-stone-900 h-3 rounded-full overflow-hidden shadow-inner p-[1px]">
              <div 
                className={`${seatsLeft > 30 ? "bg-emerald-600" : seatsLeft >= 15 ? "bg-amber-500" : "bg-red-600"} h-full rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${((200 - seatsLeft) / 200) * 100}%` }}
              />
            </div>
          </div>

          <div className="pt-4 text-center">
            <a
              href="https://aureva-studio-2.myshopify.com/cart/54628348264820:1"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline cursor-pointer bg-emerald-600 text-white hover:bg-emerald-700 border-none px-10 py-5 rounded-xl font-serif font-bold text-lg md:text-xl tracking-wide shadow-2xl shadow-emerald-950/15 transition-all transform hover:scale-[1.01] active:scale-[0.99] inline-flex items-center justify-center gap-2.5 mx-auto animate-pulse"
            >
              <ShoppingBag className="w-5 h-5 text-white animate-pulse shrink-0" />
              <span>Quiero mi Heladera Inteligente™</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-4 justify-center text-xs text-stone-400 pt-2 font-sans font-medium">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" /> Pago Único Seguro</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" /> Acceso Inmediato en tu Email</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" /> Soporte por Aureva Studio</span>
          </div>
        </div>
      </section>

      {/* 11) PREGUNTAS FRECUENTES + SOPORTE */}
      <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto" id="faq">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-widest text-[#2c5e43] uppercase bg-emerald-100/60 px-3 py-1 rounded-full">
            Ayuda
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold mt-3 tracking-tight text-stone-900">
            Preguntas frecuentes y Soporte
          </h2>
          <p className="text-stone-700 mt-2 max-w-md mx-auto">
            ¿Tenés alguna duda sobre el funcionamiento del método o de la app inteligente? Aquí tenés las respuestas rápidas.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div 
                key={i} 
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all hover:border-stone-300"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="cursor-pointer w-full px-6 py-5 text-left flex justify-between items-center bg-white text-stone-850 hover:bg-stone-50/50 border-none transition-all"
                >
                  <span className="font-sans font-semibold text-stone-900 text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-500" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-stone-700 text-sm md:text-base leading-relaxed bg-stone-50 border-t border-stone-100/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Canales de soporte oficiales */}
        <div className="mt-8 bg-white border border-stone-200 rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-sans font-bold text-stone-950 mb-2">¿Todavía tenés alguna duda?</h3>
          <p className="text-sm text-stone-700 mb-6">
            Escribinos en cualquiera de nuestros canales oficiales oficiales y te responderemos en minutos:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="mailto:aurevastudio2@gmail.com" 
              className="flex items-center gap-2.5 text-sm font-medium text-[#2c5e43] hover:underline"
            >
              <Mail className="w-5 h-5 text-[#2c5e43]" />
              <span>aurevastudio2@gmail.com</span>
            </a>
            <span className="hidden sm:inline-block text-stone-300">|</span>
            <a 
              href="https://instagram.com/cocina_quetransforma" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2.5 text-sm font-medium text-[#2c5e43] hover:underline"
            >
              <Instagram className="w-5 h-5 text-[#2c5e43]" />
              <span>@cocina_quetransforma</span>
            </a>
          </div>
        </div>
      </section>

      {/* PIE DE PÁGINA */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 border-t border-stone-800 text-xs md:text-sm text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-serif text-stone-200">Heladera Inteligente™ - Todos los derechos reservados © {new Date().getFullYear()}</p>
          <p className="max-w-2xl mx-auto text-stone-500 text-[11px] leading-relaxed">
            Este sitio web no forma parte de Meta Platforms, Inc. ni está aprobado por Meta. Todos los nombres de productos, logotipos y marcas son propiedad de sus respectivos dueños. Aureva Studio SAS.
          </p>
        </div>
      </footer>

    </div>
  );
};
