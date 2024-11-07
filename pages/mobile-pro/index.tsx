import { getSubscriberCount } from "@/app/lib/telegram-bot";
import LastPosts, { Post } from "../../app/components/LastPosts/LastPosts";
import {
  fetchChannelInfo,
  fetchLastPostsFromTelegram,
} from "../../app/lib/telegram";

import styles from "../front-end-dev/styles.module.css";
import Benefits from "@/app/components/Benefits/Benefits";
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

const channelName = "mobile_dvlp";

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
    title: "Актуальные статьи",
    benefit:
      "Получайте свежие статьи по веб-разработке, охватывающие последние технологии и тенденции, чтобы всегда оставаться в курсе.",
  },
  {
    title: "Подробные обучающие материалы",
    benefit:
      "Узнавайте лучшие практики и углубляйтесь в сложные концепции с помощью подробных туториалов, разработанных для любого уровня подготовки.",
  },
  {
    title: "Полезные инструменты и библиотеки",
    benefit:
      "Открывайте для себя полезные инструменты и репозитории, которые помогут ускорить разработку и улучшить качество кода.",
  },
  {
    title: "Практическое применение",
    benefit:
      "Учитесь применять полученные знания на практике и сразу же внедрять их в свои проекты.",
  },
  {
    title: "Тематические подборки и обновления",
    benefit:
      "Следите за регулярными подборками лучших материалов по фронтенду и бэкенду, включая обновления популярных фреймворков и инструментов.",
  },
  {
    title: "Советы по продуктивности",
    benefit:
      "Получайте советы и рекомендации по оптимизации рабочего процесса, чтобы работать эффективнее.",
  },
];

export default function FrontEndDev({ lastPosts, channelInfo }: ChannelProps) {
  return (
    <div className={styles.container}>
      <ChannelHeader
        channelInfo={{
          ...channelInfo,
          description: "Телеграм канал о web разработке",
          link: "https://t.me/mobile_dvlp",
        }}
      />

      <main className={styles.mainContent}>
        <Benefits benefits={benefits} title="Почему Mobile Pro" />
        <section className={styles.join}>
          <p>Присоедняйся и поднимай скилы с Mobile Pro</p>
          <a href="https://t.me/mobile_dvlp" className={styles.subscribeLink}>
            Подписаться
          </a>
        </section>
        <LastPosts
          lastPosts={lastPosts}
          channelName="Mobile Pro"
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
