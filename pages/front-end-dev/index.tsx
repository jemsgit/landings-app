import { getSubscriberCount } from "@/app/lib/telegram-bot";
import LastPosts, { Post } from "../../app/components/LastPosts/LastPosts";
import {
  fetchChannelInfo,
  fetchLastPostsFromTelegram,
} from "../../app/lib/telegram";

import styles from "./styles.module.css";
import Benefits from "@/app/components/Benefits/Benefits";

interface Info {
  avatarUrl: string;
  title: string;
  username: string;
  subscribersCount: number;
}

interface ChannelProps {
  lastPosts: Post[];
  channelInfo: Info;
}

const channelName = "front_end_dev";

export async function getStaticProps() {
  const lastPosts = await fetchLastPostsFromTelegram(channelName);
  const channelInfo = await fetchChannelInfo(channelName);
  const subscribersCount = await getSubscriberCount(channelName);

  return {
    props: {
      lastPosts,
      channelInfo: { ...channelInfo, subscribersCount },
    },
    revalidate: 60 * 60, // Revalidate every 60 minutes
  };
}

const benefits = [
  {
    title: "Будьте в курсе последних тенденций",
    benefit:
      "Получайте актуальную информацию о трендах, фреймворках и технологиях фронтенд-разработки.",
    description:
      "Будьте впереди в быстро развивающемся мире фронтенда благодаря своевременным обновлениям по новым инструментам, библиотекам и лучшим практикам.",
  },
  {
    title: "Подробные руководства и обучающие материалы",
    benefit:
      "Освойте фронтенд-разработку с пошаговыми туториалами и практическими руководствами.",
    description:
      "Учитесь с помощью исчерпывающих уроков, которые объясняют сложные концепции и помогают создавать реальные проекты.",
  },
  {
    title: "Подборка инструментов и ресурсов",
    benefit:
      "Откройте для себя тщательно отобранные инструменты для повышения продуктивности и улучшения рабочего процесса.",
    description:
      "Экономьте время и находите нужные инструменты, библиотеки и расширения, выбранные фронтенд-разработчиками для фронтенд-разработчиков.",
  },
  {
    title: "Эксклюзивные статьи от экспертов",
    benefit:
      "Получайте уникальный контент, написанный для разработчиков любого уровня.",
    description:
      "Наши статьи охватывают как базовые навыки, так и продвинутые техники, помогая вам развиваться от новичка до эксперта.",
  },
  {
    title: "Участвуйте в сообществе из 29,000 разработчиков",
    benefit:
      "Станьте частью растущего сообщества единомышленников, увлечённых фронтендом.",
    description:
      "Присоединяйтесь к более чем 29,000 разработчиков, делитесь знаниями, задавайте вопросы и получайте поддержку на своём пути в мире фронтенда.",
  },
  {
    title: "Регулярные обновления и уведомления",
    benefit:
      "Не пропустите ни одной важной информации с частыми и качественными публикациями.",
    description:
      "Поддерживайте свои знания в актуальном состоянии с ежедневными обновлениями, охватывающими широкий спектр тем по фронтенду.",
  },
  {
    title: "Доступ к передовым инструментам",
    benefit:
      "Узнавайте о новейших и самых эффективных инструментах сразу после их выхода.",
    description:
      "Получайте рекомендации по новейшим инструментам, которые изменят подходы к разработке.",
  },
  {
    title: "Полезные советы для эффективной разработки",
    benefit: "Повышайте продуктивность с помощью полезных советов и методик.",
    description:
      "Открывайте для себя небольшие, но мощные советы и лайфхаки, которые помогут оптимизировать кодинг и управление проектами.",
  },
];

export default function FrontEndDev({ lastPosts, channelInfo }: ChannelProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <section className={styles.headerSection}>
          <img src={channelInfo.avatarUrl} alt="logo" />
          <div>
            <h1>{channelInfo.title}</h1>
            <span className={styles.details}>
              Телеграм канал о фронт энд разработке
            </span>
            <a href="https://t.me/front_end_dev">https://t.me/front_end_dev</a>
          </div>
        </section>
        <div className={styles.headerAdditonWrapper}>
          <section className={styles.headerAdditon}>
            <span className={styles.subscribersCount}>
              {channelInfo.subscribersCount}
            </span>
            <span>подписчиков</span>
          </section>
          <a href="https://t.me/front_end_dev" className={styles.subscribeLink}>
            Подписаться
          </a>
        </div>
      </header>
      <main className={styles.mainContent}>
        <Benefits benefits={benefits} />

        <LastPosts
          lastPosts={lastPosts}
          channelName="FrontEndDev"
          avatar={channelInfo.avatarUrl}
        />
      </main>
      <footer className="cta">
        <button className="subscribe-button">Subscribe Now</button>
      </footer>
    </div>
  );
}
