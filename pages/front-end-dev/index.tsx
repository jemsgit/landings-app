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
    title: "Будьте в курсе трендов",
    benefit:
      "Получайте актуальную информацию о современных трендах фронтенд-разработки, фреймворках и инструментах",
  },
  {
    title: "Подробные руководства и обучающие материалы",
    benefit:
      "Освойте фронтенд-разработку с пошаговыми туториалами и практическими руководствами.",
  },
  {
    title: "Подборки инструментов и ресурсов",
    benefit:
      "Рассказываем об инструментах для повышения продуктивности и ускорения рабочего процесса.",
  },
  {
    title: "Эксклюзивные статьи от экспертов",
    benefit:
      "Получайте уникальный контент, написанный для разработчиков разного уровня: от начинающих до профессионалов.",
  },
  {
    title: "Доступ к передовым инструментам",
    benefit:
      "Узнавайте о новейших и самых эффективных инструментах сразу после релиза",
  },
  {
    title: "Полезные советы для эффективной разработки",
    benefit: "Повышайте продуктивность с помощью полезных практик и методик.",
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
        <Benefits benefits={benefits} title="Почему FrontEndDev" />
        <section className={styles.join}>
          <p>Присоедняйся и становись профессионалом вместе с FrontEndDev</p>
          <a href="https://t.me/front_end_dev" className={styles.subscribeLink}>
            Подписаться
          </a>
        </section>
        <LastPosts
          lastPosts={lastPosts}
          channelName="FrontEndDev"
          avatar={channelInfo.avatarUrl}
        />
      </main>
      <footer className="cta">
        <p>Остались вопросы? Напиши мне</p>

        <a href="https://t.me/jem_jem">Jem Jem</a>
      </footer>
    </div>
  );
}
