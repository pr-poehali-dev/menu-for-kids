import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RECIPES } from "@/data/recipes";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/addbc5d3-6502-4ae2-9aa7-2839b5fe8247/files/d493f620-12a3-4516-b21b-a01badb5888f.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Рецепты", href: "#recipes" },
  { label: "По возрастам", href: "#ages" },
  { label: "Советы", href: "#tips" },
  { label: "О проекте", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];


const AGE_GROUPS = [
  { label: "3 года", emoji: "🧒‍♀️", count: 42, color: "bg-pink-100 text-pink-700" },
  { label: "3,5 года", emoji: "👦", count: 38, color: "bg-orange-100 text-orange-700" },
  { label: "4 года", emoji: "🧒", count: 56, color: "bg-amber-100 text-amber-700" },
  { label: "4,5 года", emoji: "🧒‍♂️", count: 44, color: "bg-green-100 text-green-700" },
  { label: "5 лет", emoji: "👧", count: 40, color: "bg-blue-100 text-blue-700" },
];

const TIPS = [
  {
    icon: "Heart",
    title: "Маленькие порции",
    text: "Малоежкам нужно меньше еды, чем нам кажется. Не заставляйте — предлагайте маленькие порции и хвалите за каждый кусочек.",
  },
  {
    icon: "Palette",
    title: "Цвет имеет значение",
    text: "Яркие, разноцветные блюда вызывают интерес. Добавляйте морковь, горошек, кукурузу — и тарелка станет игрой.",
  },
  {
    icon: "Clock",
    title: "Режим питания",
    text: "Кормите в одно и то же время каждый день. Режим снижает тревогу ребёнка и формирует аппетит.",
  },
  {
    icon: "Star",
    title: "Еда как праздник",
    text: "Сервируйте красиво: вырезайте формочкой, раскладывайте смешные рожицы. Это работает даже для самых капризных.",
  },
];

const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem("favorites") || "[]"); } catch { return []; }
  });
  const toggle = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };
  return { favorites, toggle };
};

const Index = () => {
  const navigate = useNavigate();
  const { favorites, toggle } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAge, setSelectedAge] = useState("Все");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Все");
  const [showFavOnly, setShowFavOnly] = useState(false);

  const ages = ["Все", "3–4 года", "3–5 лет", "4–5 лет"];
  const difficulties = ["Все", "Легко", "Просто", "Средне"];

  const filtered = RECIPES.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchAge = selectedAge === "Все" || r.age === selectedAge;
    const matchDiff = selectedDifficulty === "Все" || r.difficulty === selectedDifficulty;
    const matchFav = !showFavOnly || favorites.includes(r.id);
    return matchSearch && matchAge && matchDiff && matchFav;
  });

  return (
    <div className="min-h-screen bg-[var(--warm-cream)] font-golos">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--warm-cream)]/95 backdrop-blur border-b border-[var(--warm-peach)] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <span className="text-2xl">🥣</span>
            <span className="font-caveat text-2xl text-[var(--warm-terracotta)] font-bold leading-none">
              Малоежка
            </span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm text-[var(--warm-brown)] hover:text-[var(--warm-terracotta)] transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden text-[var(--warm-brown)]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[var(--warm-cream)] border-t border-[var(--warm-peach)] px-4 py-3 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[var(--warm-brown)] hover:text-[var(--warm-terracotta)] font-medium py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="pt-16 min-h-screen flex flex-col">
        <div className="relative flex-1 flex flex-col md:flex-row">
          {/* Text side */}
          <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-12 md:py-20 texture-bg">
            <Badge className="self-start mb-4 bg-[var(--warm-honey)] text-[var(--warm-brown)] hover:bg-[var(--warm-honey)] border-0 text-sm px-3 py-1">
              🌟 Для детей от 3 до 5 лет
            </Badge>
            <h1 className="font-caveat text-5xl md:text-7xl text-[var(--warm-brown)] leading-tight mb-4 animate-fade-up">
              Вкусные рецепты<br />
              <span className="text-[var(--warm-terracotta)]">для малоежек</span>
            </h1>
            <p className="text-lg text-[var(--warm-brown)]/70 max-w-md mb-8 animate-fade-up delay-100">
              Нежные блюда как в детском саду — простые, полезные и такие, 
              что даже самый капризный малыш попросит добавки.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-200">
              <Button
                asChild
                size="lg"
                className="bg-[var(--warm-terracotta)] hover:bg-[var(--warm-terracotta)]/90 text-white rounded-2xl shadow-lg"
              >
                <a href="#recipes">Смотреть рецепты</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[var(--warm-honey)] text-[var(--warm-brown)] hover:bg-[var(--warm-peach)] rounded-2xl"
              >
                <a href="#tips">Советы маме</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 animate-fade-up delay-300">
              {[
                { num: "188", label: "рецептов" },
                { num: "5", label: "возрастных групп" },
                { num: "10к+", label: "мам читают" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-caveat text-3xl text-[var(--warm-terracotta)] font-bold">{s.num}</div>
                  <div className="text-sm text-[var(--warm-brown)]/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt="Девочка кушает суп вместе с мамой"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--warm-cream)]/30 to-transparent md:bg-gradient-to-r md:from-[var(--warm-cream)]/40 md:to-transparent" />
            {/* Floating card */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3 animate-float">
              <span className="text-2xl">🥣</span>
              <div>
                <div className="font-semibold text-[var(--warm-brown)] text-sm">Суп как у бабушки</div>
                <div className="text-xs text-[var(--warm-brown)]/60">Съела всю тарелочку!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGE GROUPS */}
      <section id="ages" className="py-16 px-4 bg-[var(--warm-peach)]/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-caveat text-4xl text-[var(--warm-brown)] text-center mb-2">По возрасту</h2>
          <p className="text-center text-[var(--warm-brown)]/60 mb-10">
            Подбираем рецепты под возраст и особенности пищеварения
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {AGE_GROUPS.map((ag) => (
              <button
                key={ag.label}
                className={`${ag.color} rounded-2xl px-6 py-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-all recipe-card cursor-pointer border-0`}
              >
                <span className="text-3xl">{ag.emoji}</span>
                <span className="font-semibold text-sm">{ag.label}</span>
                <span className="text-xs opacity-70">{ag.count} рецептов</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RECIPES */}
      <section id="recipes" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-caveat text-4xl text-[var(--warm-brown)] text-center mb-2">Рецепты</h2>
          <p className="text-center text-[var(--warm-brown)]/60 mb-8">
            Простые и полезные блюда для маленьких гурманов
          </p>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--warm-brown)]/40"
              />
              <input
                type="text"
                placeholder="Найти по названию или ингредиенту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--warm-peach)] bg-white text-[var(--warm-brown)] placeholder:text-[var(--warm-brown)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--warm-honey)] text-sm"
              />
            </div>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="px-4 py-3 rounded-2xl border border-[var(--warm-peach)] bg-white text-[var(--warm-brown)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warm-honey)]"
            >
              {ages.map((a) => <option key={a}>{a}</option>)}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 rounded-2xl border border-[var(--warm-peach)] bg-white text-[var(--warm-brown)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warm-honey)]"
            >
              {difficulties.map((d) => <option key={d}>{d}</option>)}
            </select>
            <button
              onClick={() => setShowFavOnly(!showFavOnly)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-medium transition-colors ${
                showFavOnly
                  ? "bg-rose-50 border-rose-300 text-rose-600"
                  : "border-[var(--warm-peach)] bg-white text-[var(--warm-brown)] hover:bg-[var(--warm-peach)]"
              }`}
            >
              <Icon name="Heart" size={16} className={showFavOnly ? "fill-rose-500 text-rose-500" : ""} />
              Избранное
              {favorites.length > 0 && (
                <span className="bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>

          {/* Recipe Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[var(--warm-brown)]/50">
              <span className="text-5xl">🔍</span>
              <p className="mt-4">Ничего не нашли. Попробуйте другой запрос.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  className={`${recipe.color} rounded-3xl p-6 recipe-card cursor-pointer border border-white/60 shadow-sm`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{recipe.emoji}</span>
                    <button
                      onClick={(e) => toggle(recipe.id, e)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/60 transition-colors"
                    >
                      <Icon
                        name="Heart"
                        size={18}
                        className={favorites.includes(recipe.id) ? "fill-rose-500 text-rose-500" : "text-[var(--warm-brown)]/30"}
                      />
                    </button>
                  </div>
                  <h3 className="font-caveat text-xl text-[var(--warm-brown)] mb-2">{recipe.title}</h3>
                  <p className="text-sm text-[var(--warm-brown)]/70 mb-4 leading-relaxed">{recipe.desc}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs bg-white/70 text-[var(--warm-brown)] border-0">
                      <Icon name="Baby" size={12} className="mr-1" />
                      {recipe.age}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/70 text-[var(--warm-brown)] border-0">
                      <Icon name="Clock" size={12} className="mr-1" />
                      {recipe.time}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/70 text-[var(--warm-brown)] border-0">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs text-[var(--warm-terracotta)] font-medium">
                    <span>Открыть рецепт</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TIPS */}
      <section id="tips" className="py-16 px-4 bg-[var(--warm-peach)]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-caveat text-4xl text-[var(--warm-brown)] text-center mb-2">Советы маме</h2>
          <p className="text-center text-[var(--warm-brown)]/60 mb-10">
            Проверенные способы накормить малоежку без слёз и уговоров
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TIPS.map((tip) => (
              <div
                key={tip.title}
                className="bg-white rounded-3xl p-6 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--warm-peach)] flex items-center justify-center flex-shrink-0">
                  <Icon name={tip.icon} fallback="Star" size={22} className="text-[var(--warm-terracotta)]" />
                </div>
                <div>
                  <h3 className="font-caveat text-xl text-[var(--warm-brown)] mb-1">{tip.title}</h3>
                  <p className="text-sm text-[var(--warm-brown)]/70 leading-relaxed">{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-5xl mb-6 block">🥣</span>
          <h2 className="font-caveat text-4xl text-[var(--warm-brown)] mb-4">О проекте</h2>
          <p className="text-[var(--warm-brown)]/70 leading-relaxed mb-4 max-w-2xl mx-auto">
            «Малоежка» — это сборник рецептов, вдохновлённых меню детских садов. Мы собрали 
            самые нежные, проверенные временем блюда и адаптировали их для домашней кухни.
          </p>
          <p className="text-[var(--warm-brown)]/70 leading-relaxed max-w-2xl mx-auto">
            Каждый рецепт разработан с учётом возраста, пищеварения и вкусовых предпочтений 
            маленьких детей. Без лишних специй, ароматизаторов и добавок — только натуральные 
            и доступные продукты.
          </p>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-16 px-4 bg-[var(--warm-terracotta)]">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="font-caveat text-4xl mb-3">Есть вопросы?</h2>
          <p className="text-white/80 mb-8">
            Напишите нам — с удовольствием поможем подобрать меню для вашего малыша
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-white text-[var(--warm-terracotta)] hover:bg-white/90 rounded-2xl font-semibold"
            >
              <Icon name="Mail" size={18} className="mr-2" />
              Написать нам
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10 rounded-2xl"
            >
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Telegram-сообщество
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 bg-[var(--warm-brown)] text-center text-white/60 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-lg">🥣</span>
          <span className="font-caveat text-white text-lg">Малоежка</span>
        </div>
        <p>© 2026 Малоежка — рецепты для детей с любовью</p>
      </footer>
    </div>
  );
};

export default Index;