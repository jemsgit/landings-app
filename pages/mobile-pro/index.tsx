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

const channelName = "mobile_dvlp";
const inviteLink = "https://t.me/+Bi2FbTFYU0g3MTcy";

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
    title: "Свежие статьи по мобильной разработке",
    benefit:
      "Будьте в курсе последних новостей и технологий мобильной разработки с актуальными статьями.",
  },
  {
    title: "Подробные обучающие материалы",
    benefit:
      "Изучайте лучшие практики мобильной разработки с помощью детализированных туториалов для всех уровней.",
  },
  {
    title: "Полезные инструменты и библиотеки",
    benefit:
      "Открывайте для себя полезные инструменты и репозитории, которые упростят и ускорят разработку мобильных приложений.",
  },
  {
    title: "Применение на практике",
    benefit:
      "Учитесь сразу применять новые знания в проектах, чтобы улучшить навыки и добиться высоких результатов.",
  },
  {
    title: "Обновления платформ и фреймворков",
    benefit:
      "Следите за обновлениями популярных мобильных платформ и фреймворков, чтобы оставаться на передовой технологий.",
  },
  {
    title: "Советы по оптимизации",
    benefit:
      "Получайте советы по улучшению производительности мобильных приложений и оптимизации кода.",
  },
];

export default function MobilePro({ lastPosts, channelInfo }: ChannelProps) {
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
          description: "Телеграм канал о мобильной разработке",
          link: "https://t.me/mobile_dvlp",
          inviteLink,
        }}
      />

      <main className={styles.mainContent}>
        <Benefits benefits={benefits} title="Почему Mobile Pro" />
        <section className={styles.join}>
          <p>Создавай лучшие приложения с Mobile Pro</p>
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
      <ContactSection />
    </div>
  );
}
