import express from "express";
import path from "path";
import dotenv from "dotenv";
import compression from "compression";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable gzip/deflate compression to minimize asset transfer size
app.use(compression());

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is not defined or is placeholder. Using fallback local recipe engine.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Preset local recipes to fallback when API key is missing or for rapid testing
const LOCAL_FALLBACK_RECIPES = [
  {
    id: "fb-1",
    name: "Wraps Rápidos de Proteína y Vegetales",
    description: "Una solución perfecta de 10 minutos ensamblando tus bases listas. Sano, ligero y saciante.",
    cookingTime: "10 min",
    prepMinutes: 10,
    usedIngredients: ["Pollo cocido", "Espinaca", "Salsa y Condimentos"],
    additionalIngredients: ["Tortillas de trigo o fajitas", "Pizca de sal"],
    instructions: [
      "Calentá un poco tus tortillas en una sartén limpia.",
      "Desmechá el pollo cocido y mezclalo con un chorrito de tu salsa o aderezo preferido.",
      "Colocá las hojas de espinaca lavadas en la base de la tortilla, sumá el pollo sazonado.",
      "Enrollá firmemente y serví de inmediato. ¡Listo!"
    ]
  },
  {
    id: "fb-2",
    name: "Bowl Energético Método 2H",
    description: "La magia de tener un hidrato cocido y una proteína listos. Una combinación equilibrada que reduce la decisión a cero.",
    cookingTime: "8 min",
    prepMinutes: 8,
    usedIngredients: ["Pollo cocido", "Arroz integral cocido", "Zanahoria rallada"],
    additionalIngredients: ["Semillas de sésamo", "Aceite de oliva o salsa soja"],
    instructions: [
      "Calentá el arroz integral cocido en el microondas durante 1 minuto.",
      "Serví en un tazón/bowl ancho creando tres bloques visuales: el arroz, el pollo desmechado templado y la zanahoria rallada.",
      "Condimentá por encima con un toque de aceite de oliva o salsa de soja.",
      "Disfrutá frío o templado. Un almuerzo completo en minutos y sin ensuciar."
    ]
  },
  {
    id: "fb-3",
    name: "Salteado Express de Nutrientes",
    description: "Convertí cualquier base de proteínas e hidratos en un salteado caliente y crujiente para coronar el día.",
    cookingTime: "12 min",
    prepMinutes: 12,
    usedIngredients: ["Proteínas", "Vegetales", "Hidratos de Carbono"],
    additionalIngredients: ["Diente de ajo picado", "Aceite para saltear"],
    instructions: [
      "Calentá una sartén o wok con unas gotitas de aceite a fuego medio-alto.",
      "Agregá tus vegetales pre-cortados o rallados; saltealos por 3 minutos hasta que estén tiernos pero crocantes.",
      "Incorporá los hidratos cocidos y la proteína desmechada/en cubos.",
      "Remové constantemente por 4 minutos más y sazoná al gusto antes de apagar el fuego."
    ]
  }
];

// POST Endpoint to generate recipe suggestions based on fridge items
app.post("/api/generate-recipes", async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "No se proporcionaron ingredientes para analizar." });
    }

    const ai = getAIClient();
    
    // Format ingredients for the prompt
    const formattedIngredients = ingredients
      .map((i: any) => `- ${i.name} (${i.category}): Cantidad: ${i.quantity}`)
      .join("\n");

    if (!ai) {
      // Return high-fidelity local fallback recipes tailored to ingredients provided as much as possible
      const matchedLocalRecipes = LOCAL_FALLBACK_RECIPES.map(recipe => {
        // Adapt usedIngredients list if user has relevant items
        const matchedUsed = recipe.usedIngredients.map(fallbackCategory => {
          const matchingUserItem = ingredients.find((userItem: any) => {
            if (fallbackCategory.toLowerCase() === "proteínas" && userItem.category === "Proteínas") return true;
            if (fallbackCategory.toLowerCase() === "vegetales" && userItem.category === "Verduras") return true;
            if (fallbackCategory.toLowerCase() === "hidratos de carbono" && userItem.category === "Hidratos") return true;
            return userItem.name.toLowerCase().includes(fallbackCategory.toLowerCase()) || 
                   fallbackCategory.toLowerCase().includes(userItem.name.toLowerCase());
          });
          return matchingUserItem ? matchingUserItem.name : fallbackCategory;
        });

        return {
          ...recipe,
          usedIngredients: matchedUsed
        };
      });

      return res.json({ 
        recipes: matchedLocalRecipes, 
        source: "local-engine",
        message: "Mostrando sugerencias inteligentes de nuestra base optimizada (Método 2H™)."
      });
    }

    // Call Gemini API to create recipes
    const prompt = `Actúa como un chef y especialista en planificación del Método 2H™, un sistema diseñado para personas cansadas que trabajan 8-10 horas y quieren resolver de lunes a viernes cocinando solo 2 horas el fin de semana. El Método 2H se basa en tener 'bases listas' (proteínas cocidas, hidratos listos, verduras lavadas/cortadas, aderezos listos) que se juntan de forma rápida en menos de 15 minutos sin improvisar ni ensuciar.

El usuario tiene estos ingredientes disponibles en su heladera:
${formattedIngredients}

Genera exactamente 3 recetas fáciles, prácticas e integradoras utilizando PRINCIPALMENTE estos ingredientes disponibles y condimentos simples de alacena.
Cada receta debe poder prepararse o ensamblarse en un máximo de 15 minutos en total.

Reglas del Método 2H™:
1. El tiempo de cocción/ensamble debe ser muy breve (8-15 mins).
2. Pocos pasos de instrucciones (máximo 4 pasos sencillos y claros).
3. Utilizar ingredientes que el usuario ya declaró tener.
4. Si falta algún ingrediente crítico que sea opcional, ponlo en "additionalIngredients" (por ejemplo: aceite, sal, tortilla, queso de alacena).

Devuelve el resultado en formato JSON estrictamente de acuerdo con el schema provisto.`;

    // Run with a 5.5-second race timeout for maximum responsiveness, fallback instantly to the local engine when Gemini lag occurs.
    const apiCallPromise = ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres el motor culinario detrás de la App Web Heladera Inteligente del Método 2H. Creas platos rápidos, balanceados y deliciosos con los ingredientes exactos que el usuario posee.",
        responseMimeType: "application/json",
        temperature: 0.25,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recipes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING, description: "Nombre atractivo de la receta express" },
                  description: { type: Type.STRING, description: "Breve descripción de por qué esta combinación del Método 2H funciona para el cansancio post-trabajo" },
                  cookingTime: { type: Type.STRING, description: "Tiempo aproximado, ej. '12 min'" },
                  prepMinutes: { type: Type.INTEGER, description: "Minutos estimados en número puro como 12" },
                  usedIngredients: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Ingredientes del refrigerador del usuario que se utilizaron"
                  },
                  additionalIngredients: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Ingredientes básicos extra de alacena (sal, pimienta, aceite, salsa soja)"
                  },
                  instructions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Pasos prácticos de ensamblado para comer YA (máximo 4 pasos)"
                  }
                },
                required: ["id", "name", "description", "cookingTime", "prepMinutes", "usedIngredients", "additionalIngredients", "instructions"]
              }
            }
          },
          required: ["recipes"]
        }
      }
    });

    const timeoutPromise = new Promise<any>((_, reject) => {
      setTimeout(() => reject(new Error("Timeout de comunicación con la IA")), 5500);
    });

    const response = await Promise.race([apiCallPromise, timeoutPromise]);
 
    const text = response.text;
    if (!text) {
      throw new Error("No se recibió respuesta de texto del motor inteligente.");
    }
 
    const data = JSON.parse(text.trim());
    return res.json({ 
      recipes: data.recipes || [], 
      source: "gemini-ai",
      message: "¡Sugerencias generadas con Inteligencia Artificial basadas en tu heladera!"
    });
 
  } catch (error: any) {
    console.error("Error generating recipes:", error);
    // Secure type checking to prevent any nested TypeError from breaking the response
    const safeIngredients = Array.isArray(req.body?.ingredients) ? req.body.ingredients : [];
    
    const adaptedFallback = LOCAL_FALLBACK_RECIPES.map(recipe => {
      const matchedUsed = recipe.usedIngredients.map(fallbackCategory => {
        const matchingUserItem = safeIngredients.find((userItem: any) => {
          if (!userItem || typeof userItem.name !== "string") return false;
          if (fallbackCategory.toLowerCase() === "proteínas" && userItem.category === "Proteínas") return true;
          if (fallbackCategory.toLowerCase() === "vegetales" && userItem.category === "Verduras") return true;
          if (fallbackCategory.toLowerCase() === "hidratos de carbono" && userItem.category === "Hidratos") return true;
          return userItem.name.toLowerCase().includes(fallbackCategory.toLowerCase()) || 
                 fallbackCategory.toLowerCase().includes(userItem.name.toLowerCase());
        });
        return matchingUserItem ? matchingUserItem.name : fallbackCategory;
      });
 
      return {
        ...recipe,
        usedIngredients: matchedUsed
      };
    });
 
    return res.json({ 
      recipes: adaptedFallback, 
      source: "local-engine",
      message: "Mostrando sugerencias inteligentes de nuestra base optimizada (Método 2H™) como alternativa de respaldo."
    });
  }
});

// Configure Vite middleware in development, or serve built assets in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        // Force no-cache on HTML files to always request the latest bundled links
        if (filePath.endsWith(".html") || filePath.includes("index.html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        } else if (filePath.includes("/assets/") || filePath.match(/\.[a-f0-9]{8,10}\.(js|css)$/)) {
          // If the asset is in /assets/ or features a content-hash in the filename, cache it forever (1 year)
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (filePath.match(/\.(webp|png|jpg|jpeg|gif|svg|ico)$/i)) {
          // Cache image files for 30 days for maximum page load efficiency
          res.setHeader("Cache-Control", "public, max-age=2592000, must-revalidate");
        } else {
          // General static files cached for 7 days
          res.setHeader("Cache-Control", "public, max-age=604800, must-revalidate");
        }
      }
    }));
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from dist/ with optimal caching.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Método 2H Server is booting up...`);
    console.log(`Server actively running on port ${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
