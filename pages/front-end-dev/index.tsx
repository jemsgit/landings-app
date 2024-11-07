import { getSubscriberCount } from "@/app/lib/telegram-bot";
import LastPosts, { Post } from "../../app/components/LastPosts/LastPosts";
import {
  fetchChannelInfo,
  fetchLastPostsFromTelegram,
} from "../../app/lib/telegram";

import styles from "./styles.module.css";
import Benefits from "@/app/components/Benefits/Benefits";
import { numberWithSpace } from "@/app/utils/number";
import { pluralize } from "@/app/utils/formatters";
import ChannelHeader from "@/app/components/ChannelHeader/ChannelHeader";

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
      <ChannelHeader
        channelInfo={{
          ...channelInfo,
          description: "Телеграм канал о front end разработке",
          link: "https://t.me/front_end_dev",
        }}
      />

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
      <footer className={styles.questionSection}>
        <p>Есть вопросы или предложения?</p>

        <p>
          Напиши мне в Telegram - <a href="https://t.me/jem_jem">Jem Jem</a>
        </p>
      </footer>
    </div>
  );
}
