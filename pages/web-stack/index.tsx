import { useEffect } from "react";
import AOS from "aos";

import { getSubscriberCount } from "@/app/lib/telegram-bot";
import LastPosts, { Post } from "../../app/components/LastPosts/LastPosts";
import {
  fetchChannelInfo,
  fetchLastPostsFromTelegram,
} from "../../app/lib/telegram";

import styles from "../front-end-dev/styles.module.css";
import Benefits from "@/app/components/Benefits/Benefits";
import ChannelHeader from "@/app/components/ChannelHeader/ChannelHeader";
import ContactSection from "@/app/components/ContactSection/ContactSection";

import "aos/dist/aos.css";
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

const channelName = "web_stack";
const inviteLink = "https://t.me/+wOflq_y2mV5hNGFi";

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

export default function WebStack({ lastPosts, channelInfo }: ChannelProps) {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <div className={styles.container}>
      <ChannelHeader
        channelInfo={{
          ...channelInfo,
          description: "Телеграм канал о web разработке",
          link: "https://t.me/web_stack",
          inviteLink,
        }}
      />

      <main className={styles.mainContent}>
        <Benefits benefits={benefits} title="Почему WebStack" />
        <section className={styles.join}>
          <p>Присоединяйся и прокачивай скилы с WebStack</p>
          <a href="https://t.me/web_stack" className={styles.subscribeLink}>
            Подписаться
          </a>
        </section>
        <LastPosts
          lastPosts={lastPosts}
          channelName="WebStack"
          avatar={channelInfo.avatarUrl}
        />
      </main>
      <ContactSection />
    </div>
  );
}
