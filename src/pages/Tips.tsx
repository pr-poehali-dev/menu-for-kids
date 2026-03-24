import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const ARTICLES = [
  {
    id: 1,
    emoji: "🍽️",
    title: "Почему ребёнок плохо ест?",
    short: "Разбираемся в причинах и перестаём переживать",
    color: "bg-orange-50",
    content: [
      {
        heading: "Это нормально",
        text: "Большинство детей 3–5 лет проходят через период избирательного питания. Это не каприз и не болезнь — так работает их развитие. Новые вкусы и текстуры могут пугать.",
      },
      {
        heading: "Маленький желудок",
        text: "Желудок ребёнка в 3 года размером с его кулачок. Малышу просто не нужно столько еды, сколько кажется нам. Порция в 3–4 столовые ложки — это уже полноценный приём пищи.",
      },
      {
        heading: "Перекусы сбивают аппетит",
        text: "Сок, печенье, фрукты между едой — всё это снижает аппетит к основному приёму пищи. Попробуйте убрать перекусы за 1,5–2 часа до еды.",
      },
      {
        heading: "Что делать",
        text: "Не заставляйте, не уговаривайте, не отвлекайте мультиками. Просто ставьте еду на стол, создавайте спокойную атмосферу и убирайте тарелку через 20 минут без комментариев.",
      },
    ],
  },
  {
    id: 2,
    emoji: "🌈",
    title: "Еда как игра: хитрости сервировки",
    short: "Как сделать тарелку привлекательной для малыша",
    color: "bg-yellow-50",
    content: [
      {
        heading: "Цвет решает всё",
        text: "Яркие овощи на тарелке притягивают взгляд. Морковные кружочки, зелёный горошек, красный перец — дети едят глазами. Чем красочнее, тем интереснее.",
      },
      {
        heading: "Формочки для печенья",
        text: "Звёздочка из хлеба, сердечко из ломтика сыра, цветок из огурца — простые формочки превращают обычную еду в маленький праздник.",
      },
      {
        heading: "Смешные рожицы",
        text: "Выложите на тарелке рожицу: два горошка-глаза, морковный нос, полукруг из фасоли — рот. Дети едят такое с удовольствием, потому что это игра.",
      },
      {
        heading: "Маленькие тарелки",
        text: "Большая пустая тарелка пугает. Маленькая полная — радует. Купите детскую посуду с любимым персонажем — «на дне тарелки прячется мишка».",
      },
    ],
  },
  {
    id: 3,
    emoji: "⏰",
    title: "Режим питания: основа аппетита",
    short: "Почему распорядок дня важнее рецептов",
    color: "bg-green-50",
    content: [
      {
        heading: "Желудок живёт по часам",
        text: "Если кормить в одно время каждый день, желудок начинает вырабатывать желудочный сок заранее — ребёнок приходит к столу уже с аппетитом.",
      },
      {
        heading: "Оптимальный режим",
        text: "Завтрак в 8:00, второй завтрак в 10:30, обед в 13:00, полдник в 16:00, ужин в 19:00. Между приёмами пищи — только вода. Никаких перекусов.",
      },
      {
        heading: "Не торопите",
        text: "Дайте ребёнку 20–25 минут на еду. Не торопите, не отвлекайте. Спокойная обстановка — главное условие хорошего аппетита.",
      },
      {
        heading: "Совместные обеды",
        text: "Дети едят лучше, когда вся семья за столом. Не кормите отдельно — садитесь вместе. Ребёнок видит, что взрослые едят то же самое и с удовольствием.",
      },
    ],
  },
  {
    id: 4,
    emoji: "🥦",
    title: "Как ввести новый продукт",
    short: "Метод 15 знакомств без слёз и уговоров",
    color: "bg-teal-50",
    content: [
      {
        heading: "Правило 15 раз",
        text: "Исследования показывают: чтобы ребёнок принял новый вкус, нужно предложить его минимум 10–15 раз. Не пробуйте один раз и не сдавайтесь — это только начало.",
      },
      {
        heading: "Маленькие порции",
        text: "Первый раз — буквально одна ложка или кусочек размером с ноготь. Цель не съесть, а познакомиться. Хвалите за любой контакт с едой: понюхал, попробовал, лизнул — уже победа.",
      },
      {
        heading: "Смешивайте с любимым",
        text: "Новый овощ в любимом супе, новый фрукт рядом с привычным. Так знакомый вкус «представляет» незнакомый.",
      },
      {
        heading: "Не называйте еду невкусной",
        text: "Никогда не говорите «сам не люблю, но ешь». Дети копируют отношение взрослых к еде. Если мама морщится от брокколи — ребёнок тоже будет.",
      },
    ],
  },
  {
    id: 5,
    emoji: "👨‍🍳",
    title: "Готовим вместе",
    short: "Почему дети едят то, что приготовили сами",
    color: "bg-rose-50",
    content: [
      {
        heading: "Собственный труд вкуснее",
        text: "Ребёнок, который участвовал в приготовлении, с большей вероятностью попробует блюдо. Это работает даже с нелюбимыми продуктами.",
      },
      {
        heading: "Что можно доверить малышу",
        text: "3–4 года: помыть овощи, помешать кашу, насыпать крупу. 4–5 лет: нарезать банан пластиковым ножом, украсить тарелку, разложить ингредиенты.",
      },
      {
        heading: "Кухня как пространство знаний",
        text: "Рассказывайте, что вы делаете. «Это морковь, она помогает видеть в темноте». «Мы добавляем масло, чтобы каша была мягкой». Дети обожают объяснения.",
      },
      {
        heading: "Не бойтесь беспорядка",
        text: "Да, будет мука на полу. Да, он разольёт молоко. Это цена вовлечённости — и она того стоит. Совместная готовка укрепляет и аппетит, и отношения.",
      },
    ],
  },
  {
    id: 6,
    emoji: "💊",
    title: "Когда обратиться к врачу",
    short: "Признаки, которые требуют внимания педиатра",
    color: "bg-purple-50",
    content: [
      {
        heading: "Это просто малоежка",
        text: "Если ребёнок активен, хорошо развивается, нормально набирает рост и вес — скорее всего, всё в порядке. Малоежка ≠ больной ребёнок.",
      },
      {
        heading: "Стоит показаться врачу",
        text: "Если ребёнок теряет вес, стал вялым, жалуется на боли в животе после еды, сильно срыгивает или у него появилась сыпь после новых продуктов.",
      },
      {
        heading: "Пищевые страхи",
        text: "Если ребёнок ест менее 20 видов продуктов, паникует при виде незнакомой еды, не может есть в новом месте — это повод обратиться к детскому психологу или нутрициологу.",
      },
      {
        heading: "Анализы",
        text: "Иногда плохой аппетит — следствие дефицита железа или цинка. Простой анализ крови покажет, нужна ли коррекция питания или добавки.",
      },
    ],
  },
];

const Tips = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<number | null>(null);

  const active = ARTICLES.find((a) => a.id === activeId);

  return (
    <div className="min-h-screen bg-[var(--warm-cream)]">
      {/* Header */}
      <div className="bg-[var(--warm-peach)]/50 pt-10 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => activeId ? setActiveId(null) : navigate("/")}
            className="flex items-center gap-2 text-[var(--warm-brown)]/70 hover:text-[var(--warm-brown)] transition-colors mb-6 text-sm font-medium"
          >
            <Icon name="ArrowLeft" size={18} />
            {activeId ? "Все советы" : "На главную"}
          </button>

          <div className="text-5xl mb-3">💡</div>
          <h1 className="font-caveat text-4xl md:text-5xl text-[var(--warm-brown)] mb-2">
            {active ? active.title : "Советы маме"}
          </h1>
          <p className="text-[var(--warm-brown)]/60 text-lg">
            {active ? active.short : "Проверенные способы помочь малоежке полюбить еду"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 pb-16">
        {!active ? (
          /* Article list */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARTICLES.map((a) => (
              <div
                key={a.id}
                onClick={() => setActiveId(a.id)}
                className={`${a.color} rounded-3xl p-6 cursor-pointer shadow-sm hover:shadow-md transition-all recipe-card`}
              >
                <div className="text-4xl mb-3">{a.emoji}</div>
                <h2 className="font-caveat text-2xl text-[var(--warm-brown)] mb-1">{a.title}</h2>
                <p className="text-sm text-[var(--warm-brown)]/60 mb-4">{a.short}</p>
                <div className="flex items-center gap-1 text-xs text-[var(--warm-terracotta)] font-medium">
                  <span>Читать</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Article detail */
          <div className="space-y-4">
            {active.content.map((block, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[var(--warm-terracotta)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-caveat text-xl text-[var(--warm-brown)] mb-1">{block.heading}</h3>
                    <p className="text-[var(--warm-brown)]/70 leading-relaxed text-sm">{block.text}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                onClick={() => setActiveId(null)}
                variant="outline"
                size="lg"
                className="border-[var(--warm-honey)] text-[var(--warm-brown)] hover:bg-[var(--warm-peach)] rounded-2xl"
              >
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Все советы
              </Button>
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="bg-[var(--warm-terracotta)] hover:bg-[var(--warm-terracotta)]/90 text-white rounded-2xl"
              >
                <Icon name="ChefHat" size={18} className="mr-2" />
                Рецепты
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tips;
