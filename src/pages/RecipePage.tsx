import { useParams, useNavigate } from "react-router-dom";
import { RECIPES } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = RECIPES.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--warm-cream)]">
        <span className="text-6xl mb-4">🥣</span>
        <p className="text-[var(--warm-brown)] text-lg mb-6">Рецепт не найден</p>
        <Button onClick={() => navigate("/")} className="bg-[var(--warm-terracotta)] text-white rounded-2xl">
          На главную
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--warm-cream)]">
      {/* Header */}
      <div className={`${recipe.color} pt-10 pb-16 px-4 relative`}>
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[var(--warm-brown)]/70 hover:text-[var(--warm-brown)] transition-colors mb-6 text-sm font-medium"
          >
            <Icon name="ArrowLeft" size={18} />
            Назад к рецептам
          </button>

          <div className="text-6xl mb-4">{recipe.emoji}</div>
          <h1 className="font-caveat text-4xl md:text-5xl text-[var(--warm-brown)] mb-3">
            {recipe.title}
          </h1>
          <p className="text-[var(--warm-brown)]/70 text-lg mb-5">{recipe.desc}</p>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/80 text-[var(--warm-brown)] border-0 px-3 py-1">
              <Icon name="Baby" size={14} className="mr-1" />
              {recipe.age}
            </Badge>
            <Badge className="bg-white/80 text-[var(--warm-brown)] border-0 px-3 py-1">
              <Icon name="Clock" size={14} className="mr-1" />
              {recipe.time}
            </Badge>
            <Badge className="bg-white/80 text-[var(--warm-brown)] border-0 px-3 py-1">
              <Icon name="ChefHat" size={14} className="mr-1" />
              {recipe.difficulty}
            </Badge>
            <Badge className="bg-white/80 text-[var(--warm-brown)] border-0 px-3 py-1">
              <Icon name="UtensilsCrossed" size={14} className="mr-1" />
              {recipe.portions}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 mb-6">
          {/* Ingredients */}
          <h2 className="font-caveat text-3xl text-[var(--warm-brown)] mb-4 flex items-center gap-2">
            <span>🛒</span> Ингредиенты
          </h2>
          <ul className="space-y-2 mb-2">
            {recipe.ingredients.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--warm-brown)]/80">
                <span className="w-6 h-6 rounded-full bg-[var(--warm-peach)] flex items-center justify-center text-xs text-[var(--warm-terracotta)] font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 mb-6">
          <h2 className="font-caveat text-3xl text-[var(--warm-brown)] mb-4 flex items-center gap-2">
            <span>👩‍🍳</span> Приготовление
          </h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[var(--warm-terracotta)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[var(--warm-brown)]/80 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Tip */}
        {recipe.tip && (
          <div className="bg-[var(--warm-honey)]/20 border border-[var(--warm-honey)]/40 rounded-3xl p-6 mb-8 flex gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-semibold text-[var(--warm-brown)] mb-1">Совет от мамы</p>
              <p className="text-[var(--warm-brown)]/70 text-sm leading-relaxed">{recipe.tip}</p>
            </div>
          </div>
        )}

        {/* Back button */}
        <div className="pb-12 text-center">
          <Button
            onClick={() => navigate("/")}
            className="bg-[var(--warm-terracotta)] hover:bg-[var(--warm-terracotta)]/90 text-white rounded-2xl px-8"
            size="lg"
          >
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Все рецепты
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
