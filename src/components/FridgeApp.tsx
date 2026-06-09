import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  RefreshCw, 
  Check, 
  HelpCircle, 
  AlertCircle, 
  Egg, 
  ChefHat, 
  RotateCcw, 
  ShoppingBag, 
  TrendingUp, 
  ChevronRight,
  Flame,
  Info,
  Clock
} from "lucide-react";
import { Ingredient, GeneratedRecipe } from "../types";

const CATEGORIES = ["Proteínas", "Verduras", "Hidratos", "Salsas y Condimentos", "Otros"] as const;
const QUANTITIES = ["Poco", "Medio", "Suficiente"] as const;

// Curated presets to make it fun and intuitive to play with right away
const METHOD_2H_PRESET: Ingredient[] = [
  { id: "p1", name: "Pollo cocido desmechado", category: "Proteínas", quantity: "Suficiente" },
  { id: "p2", name: "Huevo duro picado", category: "Proteínas", quantity: "Medio" },
  { id: "p3", name: "Espinaca cruda lavada", category: "Verduras", quantity: "Suficiente" },
  { id: "p4", name: "Zanahoria rallada", category: "Verduras", quantity: "Medio" },
  { id: "p5", name: "Arroz integral cocido", category: "Hidratos", quantity: "Suficiente" },
  { id: "p6", name: "Fideos tirabuzón hervidos", category: "Hidratos", quantity: "Poco" },
  { id: "p7", name: "Salsa de tomate casera", category: "Salsas y Condimentos", quantity: "Medio" },
  { id: "p8", name: "Pesto listo de albahaca", category: "Salsas y Condimentos", quantity: "Poco" }
];

const SOS_VACIA_PRESET: Ingredient[] = [
  { id: "sos1", name: "Un huevo crudo", category: "Proteínas", quantity: "Poco" },
  { id: "sos2", name: "Restito de cebolla", category: "Verduras", quantity: "Poco" },
  { id: "sos3", name: "Arroz blanco de anteayer", category: "Hidratos", quantity: "Poco" },
  { id: "sos4", name: "Cilantro o perejil marchito", category: "Otros", quantity: "Poco" }
];

const DEFAULT_INGREDIENTS: Ingredient[] = [
  { id: "d1", name: "Pollo cocido desmechado", category: "Proteínas", quantity: "Suficiente" },
  { id: "d2", name: "Espinaca tierna lavada", category: "Verduras", quantity: "Medio" },
  { id: "d3", name: "Arroz integral cocido", category: "Hidratos", quantity: "Suficiente" },
  { id: "d4", name: "Salsa marinara espesa", category: "Salsas y Condimentos", quantity: "Poco" }
];

// Pre-compiled recipes for the initial DEFAULT_INGREDIENTS
const DEFAULT_PRESET_RECIPES: GeneratedRecipe[] = [
  {
    id: "d-rec-1",
    name: "Bowl rápido de pollo y arroz",
    description: "La combinación clásica recomendada. Teniendo las bases listas en casa, solo templas y disfrutas de un plato caliente, equilibrado y reconfortante.",
    cookingTime: "6 min",
    prepMinutes: 6,
    usedIngredients: ["Pollo cocido desmechado", "Arroz integral cocido", "Espinaca tierna lavada", "Salsa marinara espesa"],
    additionalIngredients: ["Pizca de sal", "Un chorrito de aceite de oliva"],
    instructions: [
      "Calentá el arroz integral y el pollo desmechado en el microondas durante 90 segundos.",
      "En un plato hondo o bowl, creá una cama con las hojas de espinaca cruda limpia.",
      "Colocá el arroz y pollo calientes sobre la espinaca para que esta se entibie suavemente.",
      "Bañá con la salsa marinara (previamente templada) y un hilo de aceite de oliva. ¡A comer!"
    ]
  },
  {
    id: "d-rec-2",
    name: "Salteado Express 'Marinara Rustica'",
    description: "Una cena caliente y reconfortante en una sola sartén, aprovechando al máximo la salsa espesa con tus hojas verdes.",
    cookingTime: "8 min",
    prepMinutes: 8,
    usedIngredients: ["Pollo cocido desmechado", "Espinaca tierna lavada", "Salsa marinara espesa"],
    additionalIngredients: ["Queso rallado si tenés", "Pizca de orégano"],
    instructions: [
      "Poné una sartén a fuego medio con unas gotitas de aceite.",
      "Agregá el pollo cocido y la salsa marinara espesa para que tomen temperatura por 3 minutos.",
      "Sumá las hojas de espinaca tierna y remové despacio por 2 minutos hasta que la espinaca se reduzca un poco.",
      "Serví caliente y espolvoreá con orégano o un restito de queso. Comer solo o sobre tostada."
    ]
  },
  {
    id: "d-rec-3",
    name: "Cazuelita de Arroz Enriquecido",
    description: "Ideal para simular un plato elaborado usando arroz ya cocido y un aderezo de tomate marinara en minutos.",
    cookingTime: "7 min",
    prepMinutes: 7,
    usedIngredients: ["Arroz integral cocido", "Salsa marinara espesa", "Pollo cocido desmechado"],
    additionalIngredients: ["Ajo picado de alacena (opcional)"],
    instructions: [
      "Sartenear el diente de ajo picado con un chorrito de aceite por 1 minuto.",
      "Incorporar el arroz integral cocido y revolver bien para que absorba el aroma del ajo.",
      "Añadir el pollo desmechado y la salsa marinara espesa.",
      "Pintar con un toque de sal, tapar y calentar a fuego corona por 4 minutos antes de servir."
    ]
  }
];

// Pre-compiled recipes for the METHOD_2H_PRESET
const METHOD_PRESET_RECIPES: GeneratedRecipe[] = [
  {
    id: "m-rec-1",
    name: "Pasta Express al Pesto con Pollo",
    description: "Una exquisitez que toma exactamente 5 minutos usando tus fideos tirabuzón y pollo cocido que preparaste el fin de semana.",
    cookingTime: "5 min",
    prepMinutes: 5,
    usedIngredients: ["Fideos tirabuzón hervidos", "Pollo cocido desmechado", "Espinaca cruda lavada", "Pesto listo de albahaca"],
    additionalIngredients: ["Un chorrito de agua para diluir el pesto (si es necesario)", "Nueces picadas de alacena (opcional)"],
    instructions: [
      "Templá los fideos tirabuzón hervidos y el pollo desmechado juntos en el microondas durante 1 minuto.",
      "Mezclá en un tazón hondo el pesto de albahaca con un chorrito de agua caliente para aligerarlo.",
      "Agregá la pasta, el pollo y las hojas de espinaca cruda cortadas en tiras.",
      "Remové enérgicamente para que el calor residual cocine levemente las espinacas con el pesto. ¡Exquisito!"
    ]
  },
  {
    id: "m-rec-2",
    name: "Bowl Arcoíris de Arroz y Huevo",
    description: "Una base fresca, llena de color y sumamente nutritiva. El huevo cocido picado aporta grasa saludable de forma inmediata.",
    cookingTime: "6 min",
    prepMinutes: 6,
    usedIngredients: ["Arroz integral cocido", "Zanahoria rallada", "Espinaca cruda lavada", "Huevo duro picado"],
    additionalIngredients: ["Aceite de girasol", "Gotas de limón"],
    instructions: [
      "Calentá el arroz integral cocido y servilo a un lado del plato/bowl.",
      "Colocá al lado la espinaca fresca cortada y la zanahoria rallada.",
      "Coroná con el huevo duro picado frío en el medio.",
      "Aliñá con gotitas de limón, aceite de girasol o de oliva, y sal a gusto. Sano, rápido y completo."
    ]
  },
  {
    id: "m-rec-3",
    name: "Guisillo Express de Domingo por la Noche",
    description: "Para esos días en los que querés algo reconfortante y caliente antes de irte a dormir sin tener que lavar ollas pesadas.",
    cookingTime: "10 min",
    prepMinutes: 10,
    usedIngredients: ["Pollo cocido desmechado", "Arroz integral cocido", "Salsa de tomate casera", "Huevo duro picado"],
    additionalIngredients: ["Condimento para pizza o provenzal de alacena"],
    instructions: [
      "Calentá en una ollita pequeña la salsa de tomate casera junto con el pollo desmechado por 4 minutos.",
      "Involucrar el arroz integral cocido para que absorba bien la salsa de tomate.",
      "Revolvé a fuego medio-bajo durante 3 minutos adicionales.",
      "Serví bien caliente en un plato hondo con el huevo duro picado encima. ¡Delicioso!"
    ]
  }
];

// Pre-compiled recipes for the SOS_VACIA_PRESET
const SOS_PRESET_RECIPES: GeneratedRecipe[] = [
  {
    id: "sos-rec-1",
    name: "Arroz Chaufa Veloz de Emergencia (SOS)",
    description: "La técnica definitiva de cocina express para salvar un arroz de anteayer utilizando cebolla y huevo batido en un wok ultra-caliente.",
    cookingTime: "8 min",
    prepMinutes: 8,
    usedIngredients: ["Arroz blanco de anteayer", "Un huevo crudo", "Restito de cebolla", "Cilantro o perejil marchito"],
    additionalIngredients: ["Salsa de soja", "Aceite común"],
    instructions: [
      "Picar finamente el restito de cebolla. Batir el huevo rápido en una taza.",
      "Calentar una sartén o wok al máximo con un chorro de aceite. Saltear la cebolla picada por 2 minutos.",
      "Tirar el huevo batido y romperlo de inmediato con la espátula para formar un revuelto rápido.",
      "Incorporar el arroz blanco frío de anteayer. Agregar un buen chorro de salsa soja y saltear todo por 3 minutos. Decorar con cilantro fresco picadito."
    ]
  },
  {
    id: "sos-rec-2",
    name: "Revuelto de Arroz y Huevo a la Cebolla",
    description: "Un plato de comfort-food simple, económico y rapidísimo para cuando no compraste nada y tu heladera está en números rojos.",
    cookingTime: "7 min",
    prepMinutes: 7,
    usedIngredients: ["Arroz blanco de anteayer", "Un huevo crudo", "Restito de cebolla"],
    additionalIngredients: ["Pizca de sal", "Orégano seco de alacena"],
    instructions: [
      "Rehogar la cebolla finamente picada en una sartén mediana con aceite a fuego medio hasta que esté transparente (3 mins).",
      "Agregar el arroz blanco de anteayer y saltearlo por 2 minutos para que pierda la rigidez del frío.",
      "Hacer un hueco en el centro de la sartén, clavar el huevo crudo enteramente ahí y mezclar todo vigorosamente por 2 minutos.",
      "Condimentar con sal y abundante orégano de alacena antes de apagar el fuego."
    ]
  },
  {
    id: "sos-rec-3",
    name: "Tortillita Express Salvavidas",
    description: "El huevo crudo unifica los restos de hidratos para crear una pieza dorada y crocante que saca el hambre con facilidad.",
    cookingTime: "9 min",
    prepMinutes: 9,
    usedIngredients: ["Un huevo crudo", "Arroz blanco de anteayer", "Restito de cebolla", "Cilantro o perejil marchito"],
    additionalIngredients: ["Aceite", "Sal y pimienta"],
    instructions: [
      "En un plato, batir el huevo con sal, pimienta y las hojas del cilantro picadas.",
      "Dorar la cebolla bien chiquita en una sartén pequeña por 3 minutos. Retirarla y mezclarla con el huevo y el arroz.",
      "Volver a aceitar un poco la sartén y verter la mezcla compacta al fuego.",
      "Cocinar por 3 minutos de un lado a fuego medio, dar vuelta con ayuda de un plato chico y dorar por 2 minutos mas. ¡Cena milagrosa lista!"
    ]
  }
];

interface FridgeAppProps {
  onCtaclick?: () => void;
}

export const FridgeApp: React.FC<FridgeAppProps> = ({ onCtaclick }) => {
  // Construct a sorted cache key based on current list of ingredients
  const getCacheKey = (items: Ingredient[]) => {
    return [...items]
      .map(i => `${i.name.trim().toLowerCase()}:${i.category}:${i.quantity}`)
      .sort()
      .join("|");
  };

  const [ingredients, setIngredients] = useState<Ingredient[]>(DEFAULT_INGREDIENTS);
  
  // Form state for creating a new ingredient
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientCategory, setNewIngredientCategory] = useState<typeof CATEGORIES[number]>("Proteínas");
  const [newIngredientQuantity, setNewIngredientQuantity] = useState<typeof QUANTITIES[number]>("Medio");

  // App UI execution-state
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [recipes, setRecipes] = useState<GeneratedRecipe[]>([]);
  const [sourceType, setSourceType] = useState<"local" | "ai" | "">("");
  const [apiMessage, setApiMessage] = useState("");
  const [errorText, setErrorText] = useState("");
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);

  // Cache state to cache previous recipe generations for blazing-fast/instant response speeds
  const [recipesCache, setRecipesCache] = useState<Record<string, { recipes: GeneratedRecipe[], sourceType: "local" | "ai", apiMessage: string }>>({});

  // Loading screen messages to give high-fidelity responsive feel
  const loadingMessages = [
    "Revisando tus estantes virtuales...",
    "Clasificando tus bases de proteínas e hidratos...",
    "Consultando el motor de inteligencia artificial...",
    "Reduciendo tus decisiones diarias a cero...",
    "¡Preparando tus sugerencias express listas para servir!"
  ];

  // Load static cache and default recipes on mount
  useEffect(() => {
    const defaultKey = getCacheKey(DEFAULT_INGREDIENTS);
    const methodKey = getCacheKey(METHOD_2H_PRESET);
    const sosKey = getCacheKey(SOS_VACIA_PRESET);

    setRecipesCache({
      [defaultKey]: {
        recipes: DEFAULT_PRESET_RECIPES,
        sourceType: "local",
        apiMessage: "Sugerencias inteligentes listas para servir."
      },
      [methodKey]: {
        recipes: METHOD_PRESET_RECIPES,
        sourceType: "local",
        apiMessage: "¡Menús listos al instante de tu base optimizada!"
      },
      [sosKey]: {
        recipes: SOS_PRESET_RECIPES,
        sourceType: "local",
        apiMessage: "Receteas express para rescatar tu heladera en domingos de emergencia."
      }
    });

    // Directly present default recipes on mount
    setRecipes(DEFAULT_PRESET_RECIPES);
    setSourceType("local");
    setApiMessage("Mostrando recetas pre-cargadas para tus ingredientes de ejemplo.");
    if (DEFAULT_PRESET_RECIPES.length > 0) {
      setActiveRecipeId(DEFAULT_PRESET_RECIPES[0].id);
    }
  }, []);

  // Quick optimization: faster step updates (700ms instead of 1400ms) for high percieved performance
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => {
          if (prev >= loadingMessages.length - 1) return prev;
          return prev + 1;
        });
      }, 700);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngredientName.trim()) return;

    const newItem: Ingredient = {
      id: "ing-" + Date.now(),
      name: newIngredientName.trim(),
      category: newIngredientCategory,
      quantity: newIngredientQuantity
    };

    setIngredients(prev => [...prev, newItem]);
    setNewIngredientName("");
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(prev => prev.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    setIngredients([]);
    setRecipes([]);
    setSourceType("");
  };

  const loadPreset = (type: "metodo" | "sos" | "default") => {
    setErrorText("");
    if (type === "metodo") {
      setIngredients(METHOD_2H_PRESET);
      setRecipes(METHOD_PRESET_RECIPES);
      setSourceType("local");
      setApiMessage("¡Menús listos al instante de tu base optimizada!");
      if (METHOD_PRESET_RECIPES.length > 0) {
        setActiveRecipeId(METHOD_PRESET_RECIPES[0].id);
      }
    } else if (type === "sos") {
      setIngredients(SOS_VACIA_PRESET);
      setRecipes(SOS_PRESET_RECIPES);
      setSourceType("local");
      setApiMessage("Recetas express para rescatar tu heladera en domingos de emergencia.");
      if (SOS_PRESET_RECIPES.length > 0) {
        setActiveRecipeId(SOS_PRESET_RECIPES[0].id);
      }
    } else {
      setIngredients(DEFAULT_INGREDIENTS);
      setRecipes(DEFAULT_PRESET_RECIPES);
      setSourceType("local");
      setApiMessage("Mostrando recetas pre-cargadas para tus ingredientes de ejemplo.");
      if (DEFAULT_PRESET_RECIPES.length > 0) {
        setActiveRecipeId(DEFAULT_PRESET_RECIPES[0].id);
      }
    }
  };


  const triggerGenerateRecipes = async () => {
    if (ingredients.length === 0) {
      setErrorText("Por favor, agrega al menos un ingrediente para que la IA pueda crear sugerencias.");
      return;
    }

    const cacheKey = getCacheKey(ingredients);
    if (recipesCache[cacheKey]) {
      const cached = recipesCache[cacheKey];
      setRecipes(cached.recipes);
      setSourceType(cached.sourceType);
      setApiMessage(cached.apiMessage);
      if (cached.recipes.length > 0) {
        setActiveRecipeId(cached.recipes[0].id);
      }
      return;
    }

    setLoading(true);
    setErrorText("");
    setRecipes([]);
    setSourceType("");
    setApiMessage("");

    try {
      const response = await fetch("/api/generate-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients })
      });

      const data = await response.json();
      if (response.ok) {
        const recipesList = data.recipes || [];
        const finalSource = data.source === "gemini-ai" ? "ai" : "local";
        const msg = data.message || "";

        setRecipes(recipesList);
        setSourceType(finalSource);
        setApiMessage(msg);

        // Save generated result in cache for instant UI response next time
        setRecipesCache(prev => ({
          ...prev,
          [cacheKey]: {
            recipes: recipesList,
            sourceType: finalSource,
            apiMessage: msg
          }
        }));

        if (recipesList.length > 0) {
          setActiveRecipeId(recipesList[0].id);
        }
      } else {
        throw new Error(data.error || "Fallo en la comunicación con el motor de IA.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "No pudimos conectar con los servidores de la IA. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-stone-900 text-stone-100 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl" id="app-demo-live">
      {/* App Mobile Header */}
      <div className="bg-[#1b3d2b] py-6 px-6 md:px-8 border-b border-[#204a34] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-amber-400 text-stone-950 text-[10px] font-bold uppercase rounded-full tracking-wider font-sans">
              Acceso Completo
            </span>
            <span className="text-[11px] text-emerald-300 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Demo en Vivo
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-white tracking-tight mt-1 flex items-center gap-2">
            <ChefHat className="text-amber-300 w-6 h-6" />
            <span>App “Heladera Inteligente”</span>
          </h2>
          <p className="text-stone-300 text-xs md:text-sm mt-0.5">
            Cargá lo que tenés en tu heladera hoy y creá menús con decisión cero.
          </p>
        </div>

        {/* Preset quick buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => loadPreset("metodo")}
            className="cursor-pointer bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800 text-xs py-1.5 px-3 rounded-lg border border-emerald-700/50 transition-all flex items-center gap-1 font-medium"
            title="Carga la base típica de una heladera abastecida"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Heladera Completa (Muestra)</span>
          </button>
          
          <button
            onClick={() => loadPreset("sos")}
            className="cursor-pointer bg-[#3a201c] text-red-200 hover:bg-[#4d2c27] text-xs py-1.5 px-3 rounded-lg border border-red-950/50 transition-all flex items-center gap-1 font-medium"
            title="Carga pocos ingredientes sirviendo de escenario SOS"
          >
            <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
            <span>SOS Heladera Vacía</span>
          </button>
          
          <button
            onClick={handleClearAll}
            className="cursor-pointer bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs py-1.5 px-2.5 rounded-lg border border-stone-700 transition-all flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Vaciar todo</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-stone-800 w-full min-w-0 overflow-hidden">
        
        {/* Left column (5 Columns) - Fridge Inventory loader */}
        <div className="lg:col-span-5 p-4 sm:p-6 md:p-8 space-y-6 w-full min-w-0 overflow-hidden">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-amber-300 flex items-center gap-2">
            <span>1. Cargá tus alimentos</span>
            <span className="text-stone-500 font-normal font-sans lowercase text-xs">({ingredients.length} listos)</span>
          </h3>

          {/* Form to submit custom item */}
          <form onSubmit={handleAddIngredient} className="space-y-3 bg-stone-950/50 p-4 rounded-xl border border-stone-800/60 shadow-inner">
            <div className="grid grid-cols-1 gap-2.5">
              <div>
                <label 
                  htmlFor="new-ingredient-name" 
                  className="block text-[11px] text-stone-400 uppercase font-medium tracking-wider mb-1 font-sans"
                >
                  Nombre del Alimento
                </label>
                <input
                  id="new-ingredient-name"
                  type="text"
                  placeholder="Ej. Pollo hervido, Espinaca lavada, Arroz cocido..."
                  value={newIngredientName}
                  onChange={(e) => setNewIngredientName(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-stone-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label 
                    htmlFor="new-ingredient-category" 
                    className="block text-[11px] text-stone-400 uppercase font-medium tracking-wider mb-1"
                  >
                    Sección / Categoría
                  </label>
                  <select
                    id="new-ingredient-category"
                    value={newIngredientCategory}
                    onChange={(e) => setNewIngredientCategory(e.target.value as any)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-stone-100 text-sm focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label 
                    htmlFor="new-ingredient-quantity" 
                    className="block text-[11px] text-stone-400 uppercase font-medium tracking-wider mb-1"
                  >
                    Cantidad Disponible
                  </label>
                  <select
                    id="new-ingredient-quantity"
                    value={newIngredientQuantity}
                    onChange={(e) => setNewIngredientQuantity(e.target.value as any)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-stone-100 text-sm focus:outline-none"
                  >
                    {QUANTITIES.map((qty) => (
                      <option key={qty} value={qty}>{qty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-[#2c5e43] text-stone-100 hover:bg-[#1b3d2b] transition-all py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar a la Heladera</span>
            </button>
          </form>

          {/* List of active inventory inside the fridge */}
          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
            {ingredients.length === 0 ? (
              <div className="py-12 px-4 rounded-xl border border-dashed border-stone-800 text-center text-stone-500 space-y-2">
                <p className="text-sm font-sans font-medium">La Heladera está completamente vacía.</p>
                <p className="text-xs">Usa los botones rápidos de arriba o agrega ingredientes individuales para simular tu compra.</p>
              </div>
            ) : (
              <div className="grid gap-2">
                <AnimatePresence initial={false}>
                  {ingredients.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-center justify-between p-3 bg-stone-950/40 border border-stone-800/80 rounded-xl hover:border-stone-700/60 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-2.5 w-2.5 relative">
                          <span className={`${
                            item.quantity === "Suficiente" ? "bg-emerald-500" :
                            item.quantity === "Medio" ? "bg-amber-400" : "bg-orange-500"
                          } animate-ping absolute inline-flex h-full w-full rounded-full opacity-60`}></span>
                          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                            item.quantity === "Suficiente" ? "bg-emerald-500" :
                            item.quantity === "Medio" ? "bg-amber-400" : "bg-orange-500"
                          }`}></span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-stone-100 font-serif leading-tight">{item.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-stone-400 font-sans">{item.category}</span>
                            <span className="text-[9px] text-stone-500 font-sans">•</span>
                            <span className={`text-[10px] font-sans font-medium ${
                              item.quantity === "Suficiente" ? "text-emerald-400" :
                              item.quantity === "Medio" ? "text-amber-300" : "text-orange-400"
                            }`}>Cantidad: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveIngredient(item.id)}
                        className="cursor-pointer p-1.5 text-stone-500 hover:text-red-400 bg-transparent border-none opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all rounded"
                        title="Eliminar de mi heladera"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={triggerGenerateRecipes}
              disabled={loading || ingredients.length === 0}
              className={`cursor-pointer w-full py-4 px-6 rounded-xl font-serif font-medium text-stone-950 text-base flex items-center justify-center gap-2 shadow-lg transition-all ${
                ingredients.length === 0 
                ? "bg-stone-800 text-stone-600 border border-stone-700 cursor-not-allowed" 
                : "bg-amber-400 hover:bg-amber-300 text-stone-900 border-none transform hover:scale-[1.01] active:scale-[0.99]"
              }`}
            >
              <Sparkles className="w-5 h-5 fill-stone-900" />
              <span>{loading ? "Analizando heladera..." : "Crear menú con lo que tengo"}</span>
            </button>
            <p className="text-[10px] text-stone-400 text-center mt-2.5">
              Genera sugerencias en segundos aplicando el motor inteligente de cocina sin desperdicios.
            </p>
          </div>

          {errorText && (
            <div className="p-3.5 bg-red-950/40 border border-red-900/60 rounded-xl text-xs text-red-200 flex gap-2.5 items-start">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>{errorText}</span>
            </div>
          )}
        </div>

        {/* Right column (7 Columns) - Output menu planner */}
        <div className="lg:col-span-7 p-4 sm:p-6 md:p-8 bg-stone-950/40 flex flex-col justify-between w-full min-w-0 overflow-hidden">
          <div className="w-full min-w-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-amber-300 flex items-center flex-wrap gap-2 mb-6">
              <span>2. Menús & Recetas Generadas</span>
              {recipes.length > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  sourceType === "ai" ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "bg-emerald-950 text-[#a5cca8] border border-emerald-900"
                }`}>
                  {sourceType === "ai" ? "Conexión Inteligente IA" : "Motor Base Optimizado"}
                </span>
              )}
            </h3>

            {/* Simulated Loading State */}
            {loading ? (
              <div className="py-24 flex flex-col justify-center items-center text-center space-y-6 w-full min-w-0">
                <div className="w-16 h-16 relative">
                  <div className="w-16 h-16 rounded-full border-4 border-stone-800 border-t-[#2c5e43] animate-spin"></div>
                  <ChefHat className="text-amber-400 w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <p className="text-sm font-serif font-medium text-stone-100">Bono #1 Heladera Inteligente</p>
                  <p className="text-xs text-amber-300/90 font-mono animate-pulse min-h-[16px]">
                    {loadingMessages[loadingStep]}
                  </p>
                </div>
              </div>
            ) : recipes.length === 0 ? (
              /* Initial empty state */
              <div className="py-20 text-center max-w-sm mx-auto space-y-4 w-full">
                <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center border border-stone-800 mx-auto text-stone-400">
                  <ChefHat className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-serif font-medium text-stone-200">Decisión cero lista para vos</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Presioná el botón <strong className="text-stone-300">"Crear menú con lo que tengo"</strong> a la izquierda para simular el funcionamiento estrella del software. El motor interpretará tus sobras reales.
                  </p>
                </div>

                <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl text-left text-[11px] text-stone-400 space-y-1">
                  <span className="font-semibold text-stone-200 block uppercase tracking-wider text-[9px] text-[#2c5e43]">Tip de Evaluación</span>
                  <span>Podés presionar la opción <strong>"Heladera Llena"</strong> o de lo contrario el <strong>"SOS Heladera Vacía"</strong> en la cabecera para ver cómo cambia la App instantáneamente con diferentes escenarios de compra.</span>
                </div>
              </div>
            ) : (
              /* Success results menu list */
              <div className="space-y-6 w-full min-w-0 overflow-hidden">
                {apiMessage && (
                  <div className="p-3 bg-emerald-950/20 border border-emerald-900/60 rounded-xl text-xs text-[#a5cca8] flex items-center gap-2 w-full min-w-0 break-words">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{apiMessage}</span>
                  </div>
                )}

                {/* Main Tab bar of Recipes */}
                <div className="flex border-b border-stone-800 gap-2 pb-px overflow-x-auto max-w-full">
                  {recipes.map((item, index) => {
                    const isActive = activeRecipeId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveRecipeId(item.id)}
                        className={`cursor-pointer whitespace-nowrap px-4 py-2 text-xs font-serif font-medium rounded-t-lg transition-all border-b-2 bg-transparent ${
                          isActive 
                          ? "border-amber-400 text-amber-300 font-bold bg-stone-900/40" 
                          : "border-transparent text-stone-400 hover:text-stone-200"
                        }`}
                      >
                        Opcion #{index + 1}: {item.name.split(" ").slice(0, 3).join(" ")}...
                      </button>
                    );
                  })}
                </div>

                {/* Active recipe detailed card */}
                {recipes.filter(r => r.id === activeRecipeId).map((item) => (
                  <div key={item.id} className="space-y-4 w-full min-w-0 overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-stone-800/60 pb-3 w-full min-w-0">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-lg md:text-xl font-serif text-white font-semibold tracking-tight break-words">{item.name}</h4>
                        <p className="text-xs text-stone-400 font-sans italic mt-1 leading-relaxed break-words">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-3 py-1 rounded text-xs text-stone-200">
                        <Clock className="w-3.5 h-3.5 text-amber-300" />
                        <span>Tiempo: <strong className="text-amber-300">{item.cookingTime}</strong></span>
                      </div>
                    </div>

                    {/* Ingredients detail block split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0 overflow-hidden">
                      {/* Uses from fridge */}
                      <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 w-full min-w-0 overflow-hidden break-words">
                        <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block mb-2 font-sans">
                          Aprovechas de tu Heladera
                        </span>
                        <ul className="space-y-1.5 list-none pl-0">
                          {item.usedIngredients.map((u, i) => (
                            <li key={i} className="text-xs text-stone-200 flex items-center gap-1.5 break-words">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                              <span>{u}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Uses from pantry */}
                      <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 w-full min-w-0 overflow-hidden break-words">
                        <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider block mb-2 font-sans">
                          Completar de tu Alacena / Condimentos
                        </span>
                        <ul className="space-y-1.5 list-none pl-0">
                          {item.additionalIngredients.map((u, i) => (
                            <li key={i} className="text-xs text-stone-300 flex items-center gap-1.5 break-words">
                              <span className="text-amber-400 text-[10px] flex-shrink-0">✚</span>
                              <span>{u}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Steps instructions list */}
                    <div className="space-y-2 w-full min-w-0">
                      <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block mb-1.5 font-sans">
                        Paso a paso del armado exprés
                      </span>
                      <ol className="space-y-2 list-none pl-0">
                        {item.instructions.map((step, idx) => (
                          <li key={idx} className="bg-stone-900/60 border border-stone-800/40 p-3 rounded-lg flex gap-3 text-xs leading-relaxed text-stone-300 w-full min-w-0 overflow-hidden break-words">
                            <span className="w-5 h-5 rounded-full bg-[#1b3d2b] border border-emerald-800 text-emerald-300 font-serif font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="flex-1 min-w-0 break-words">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-2 text-[11px] text-stone-500 bg-stone-950 px-3.5 py-2.5 rounded-lg border border-stone-800 flex items-start gap-2 w-full min-w-0 break-words">
                      <Info className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong>¡Cero estrés!</strong> Al tener estas bases resueltas (proteínas, hidratos y vegetales cortados) de antemano el fin de semana, comer comida nutritiva casera deja de requerir esfuerzo físico.</span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Prompting users to scroll or unlock the eBook with full-package */}
          <div className="border-t border-stone-800 pt-6 mt-8">
            <div className="bg-[#1c3527]/40 border border-[#2b523c]/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-xs text-stone-300 leading-relaxed font-serif font-medium">
                  <strong>¿Querés automatizar la organización de tu cocina para siempre?</strong>
                </p>
                <p className="text-[10px] text-stone-400 leading-normal mt-0.5">
                  La Heladera Inteligente™ te da sugerencias instantáneas. Llevate hoy la versión Premium con acceso prioritario de por vida, guías de compra inteligente, recetarios avanzados y el libro de estrategias para optimizar tu alacena de la forma más rápida y económica.
                </p>
              </div>
              <button
                onClick={() => {
                  if (onCtaclick) {
                    onCtaclick();
                  } else {
                    const element = document.getElementById("oferta-cierre");
                    element?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="cursor-pointer bg-white text-stone-950 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-stone-100 transition-all font-sans flex-shrink-0 flex items-center gap-1.5 border-none"
              >
                <span>Ver Precio de Lanzamiento</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-950" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
