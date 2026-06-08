export interface Ingredient {
  id: string;
  name: string;
  category: "Proteínas" | "Verduras" | "Hidratos" | "Salsas y Condimentos" | "Otros";
  quantity: "Poco" | "Medio" | "Suficiente";
}

export interface GeneratedRecipe {
  id: string;
  name: string;
  description: string;
  cookingTime: string;
  prepMinutes: number;
  usedIngredients: string[];
  additionalIngredients: string[];
  instructions: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  before: string;
  after: string;
  avatarSeed: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
