import { useEffect } from "react";
import AOS from "aos";

import { getSubscriberCount } from "@/app/lib/telegram-bot";
import LastPosts, { Post } from "../../app/components/LastPosts/LastPosts";
import {
  fetchChannelInfo,
  fetchLastPostsFromTelegram,
} from "../../app/lib/telegram";

import styles from "./styles.module.css";
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

const channelName = "front_end_dev";
const inviteLink = "https://t.me/+YFZccG334dVmNTEy";

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
          description: "Телеграм канал о front end разработке",
          link: "https://t.me/front_end_dev",
          inviteLink,
        }}
      />

      <main className={styles.mainContent}>
        <Benefits benefits={benefits} title="Почему FrontEndDev" />
        <section className={styles.join}>
          <p>Присоединяйся и становись профессионалом вместе с FrontEndDev</p>
          <a href={inviteLink} className={styles.subscribeLink}>
            Подписаться
          </a>
        </section>
        <LastPosts
          lastPosts={lastPosts}
          channelName="FrontEndDev"
          avatar={channelInfo.avatarUrl}
        />
      </main>
      <ContactSection />
    </div>
  );
}
