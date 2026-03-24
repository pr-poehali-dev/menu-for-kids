import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

const MEALS = ["Завтрак", "Второй завтрак", "Обед", "Полдник", "Ужин"];

const MEAL_ICONS: Record<string, string> = {
  "Завтрак": "☀️",
  "Второй завтрак": "🍎",
  "Обед": "🥣",
  "Полдник": "🧃",
  "Ужин": "🌙",
};

const MENU: Record<string, Record<string, { dish: string; recipe?: number; tip?: string }>> = {
  "Понедельник": {
    "Завтрак": { dish: "Гречневая каша с маслом", recipe: 3, tip: "Можно добавить банан" },
    "Второй завтрак": { dish: "Яблоко или груша" },
    "Обед": { dish: "Рисовый суп с фрикадельками", recipe: 6 },
    "Полдник": { dish: "Кефир с печеньем" },
    "Ужин": { dish: "Паровые котлетки из индейки", recipe: 2, tip: "С тушёными овощами" },
  },
  "Вторник": {
    "Завтрак": { dish: "Молочный суп с вермишелью", recipe: 8 },
    "Второй завтрак": { dish: "Банан" },
    "Обед": { dish: "Суп-пюре из тыквы и моркови", recipe: 1 },
    "Полдник": { dish: "Творожок с ягодами" },
    "Ужин": { dish: "Паровая рыбка с картофельным пюре", recipe: 9 },
  },
  "Среда": {
    "Завтрак": { dish: "Овсяная каша на молоке", tip: "С мёдом или вареньем" },
    "Второй завтрак": { dish: "Морковные палочки с йогуртом" },
    "Обед": { dish: "Овощное рагу с кроликом", recipe: 4 },
    "Полдник": { dish: "Кисель с булочкой" },
    "Ужин": { dish: "Творожная запеканка с изюмом", recipe: 5 },
  },
  "Четверг": {
    "Завтрак": { dish: "Гречневая каша с маслом", recipe: 3 },
    "Второй завтрак": { dish: "Стакан молока с печеньем" },
    "Обед": { dish: "Рисовый суп с фрикадельками", recipe: 6 },
    "Полдник": { dish: "Яблочное пюре" },
    "Ужин": { dish: "Макароны с томатным соусом", recipe: 7, tip: "Можно добавить тёртый сыр" },
  },
  "Пятница": {
    "Завтрак": { dish: "Молочный суп с вермишелью", recipe: 8 },
    "Второй завтрак": { dish: "Груша или персик" },
    "Обед": { dish: "Суп-пюре из тыквы и моркови", recipe: 1 },
    "Полдник": { dish: "Кефир с бананом" },
    "Ужин": { dish: "Паровые котлетки из индейки", recipe: 2 },
  },
  "Суббота": {
    "Завтрак": { dish: "Блинчики с творогом", tip: "Без сахара, со сметаной" },
    "Второй завтрак": { dish: "Свежие ягоды или фрукты" },
    "Обед": { dish: "Овощное рагу с кроликом", recipe: 4 },
    "Полдник": { dish: "Ряженка с сухариками" },
    "Ужин": { dish: "Паровая рыбка с картофельным пюре", recipe: 9 },
  },
  "Воскресенье": {
    "Завтрак": { dish: "Творожная запеканка с изюмом", recipe: 5 },
    "Второй завтрак": { dish: "Стакан сока и банан" },
    "Обед": { dish: "Рисовый суп с фрикадельками", recipe: 6 },
    "Полдник": { dish: "Молоко с печеньем" },
    "Ужин": { dish: "Гречневая каша с паровой котлеткой", recipe: 3 },
  },
};

const WeeklyMenu = () => {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState("Понедельник");

  const dayMenu = MENU[activeDay];

  return (
    <div className="min-h-screen bg-[var(--warm-cream)]">
      {/* Header */}
      <div className="bg-[var(--warm-peach)]/60 pt-10 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[var(--warm-brown)]/70 hover:text-[var(--warm-brown)] transition-colors mb-6 text-sm font-medium"
          >
            <Icon name="ArrowLeft" size={18} />
            На главную
          </button>

          <div className="text-5xl mb-3">📅</div>
          <h1 className="font-caveat text-4xl md:text-5xl text-[var(--warm-brown)] mb-2">
            Меню на неделю
          </h1>
          <p className="text-[var(--warm-brown)]/60 text-lg max-w-xl">
            Готовый план питания для детей 3–5 лет — сбалансированное меню на каждый день
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="bg-white/80 text-[var(--warm-brown)] border-0">
              <Icon name="Baby" size={13} className="mr-1" /> 3–5 лет
            </Badge>
            <Badge className="bg-white/80 text-[var(--warm-brown)] border-0">
              <Icon name="UtensilsCrossed" size={13} className="mr-1" /> 5 приёмов пищи
            </Badge>
            <Badge className="bg-white/80 text-[var(--warm-brown)] border-0">
              <Icon name="Leaf" size={13} className="mr-1" /> Без острого и жареного
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 pb-16">
        {/* Day tabs */}
        <div className="bg-white rounded-3xl shadow-sm p-2 mb-6 flex flex-wrap gap-1">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-1 min-w-[90px] py-2 px-3 rounded-2xl text-sm font-medium transition-all ${
                activeDay === day
                  ? "bg-[var(--warm-terracotta)] text-white shadow-sm"
                  : "text-[var(--warm-brown)]/70 hover:bg-[var(--warm-peach)]"
              }`}
            >
              {day.slice(0, 2) === "Во" ? "Вс" :
               day.slice(0, 2) === "Вт" ? "Вт" :
               day.slice(0, 2) === "Ср" ? "Ср" :
               day.slice(0, 2) === "Че" ? "Чт" :
               day.slice(0, 2) === "Пя" ? "Пт" :
               day.slice(0, 2) === "Су" ? "Сб" : "Пн"}
              <span className="hidden sm:inline"> · {day}</span>
            </button>
          ))}
        </div>

        {/* Day title */}
        <h2 className="font-caveat text-3xl text-[var(--warm-brown)] mb-4">{activeDay}</h2>

        {/* Meals */}
        <div className="space-y-3">
          {MEALS.map((meal, i) => {
            const item = dayMenu[meal];
            return (
              <div
                key={meal}
                className={`bg-white rounded-3xl p-5 shadow-sm flex items-start gap-4 ${
                  item.recipe ? "cursor-pointer hover:shadow-md transition-shadow" : ""
                }`}
                onClick={() => item.recipe && navigate(`/recipe/${item.recipe}`)}
              >
                <div className="w-10 h-10 rounded-2xl bg-[var(--warm-peach)] flex items-center justify-center text-lg flex-shrink-0">
                  {MEAL_ICONS[meal]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-[var(--warm-brown)]/50 uppercase tracking-wide">
                      {meal}
                    </span>
                    {i === 2 && (
                      <Badge className="bg-[var(--warm-honey)]/30 text-[var(--warm-brown)] border-0 text-xs">
                        Главный приём
                      </Badge>
                    )}
                  </div>
                  <p className="text-[var(--warm-brown)] font-medium">{item.dish}</p>
                  {item.tip && (
                    <p className="text-xs text-[var(--warm-brown)]/50 mt-0.5">💡 {item.tip}</p>
                  )}
                </div>
                {item.recipe && (
                  <div className="flex items-center gap-1 text-xs text-[var(--warm-terracotta)] font-medium flex-shrink-0">
                    <span className="hidden sm:inline">Рецепт</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Print button */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => window.print()}
            variant="outline"
            size="lg"
            className="border-[var(--warm-honey)] text-[var(--warm-brown)] hover:bg-[var(--warm-peach)] rounded-2xl print:hidden"
          >
            <Icon name="Printer" size={18} className="mr-2" />
            Распечатать меню
          </Button>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="bg-[var(--warm-terracotta)] hover:bg-[var(--warm-terracotta)]/90 text-white rounded-2xl print:hidden"
          >
            <Icon name="ChefHat" size={18} className="mr-2" />
            Все рецепты
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyMenu;
