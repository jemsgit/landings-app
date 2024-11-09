import { useEffect } from "react";
import Head from "next/head";
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

const channelName = "habr_for_dev";
const inviteLink = "https://t.me/+_DbI2le7Z3IzNzdi";

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
    title: "Лучшие статьи с Habr",
    benefit:
      "Получайте отобранные лучшие статьи с Habr, чтобы не пропустить ничего важного из мира разработки.",
  },
  {
    title: "Актуальные новости технологий",
    benefit:
      "Будьте в курсе последних новостей IT-индустрии и современных технологий, следуя за свежими публикациями.",
  },
  {
    title: "Разнообразие тем и языков",
    benefit:
      "Читайте материалы по различным языкам программирования, фреймворкам и методологиям разработки.",
  },
  {
    title: "Обзор новых инструментов",
    benefit:
      "Узнавайте о новых инструментах и сервисах, которые помогут вам упростить рабочие процессы и улучшить качество кода.",
  },
  {
    title: "Советы от экспертов",
    benefit:
      "Ознакомьтесь с рекомендациями и кейсами опытных разработчиков для профессионального роста.",
  },
  {
    title: "Обновления популярных технологий",
    benefit:
      "Следите за обновлениями популярных технологий и фреймворков, чтобы оставаться на гребне волны.",
  },
];

export default function HabrForDev({ lastPosts, channelInfo }: ChannelProps) {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Telegram канал HabrForDev</title>
        <meta
          name="description"
          content="Телеграм канал c лучшими статьями с Habr.ru"
        />
        <meta property="og:image" content="/og_images/habr_for_dev.png" />
      </Head>
      <ChannelHeader
        channelInfo={{
          ...channelInfo,
          description: "Телеграм канал c лучшими статьями с Habr.ru",
          link: "https://t.me/habr_for_dev",
          inviteLink,
        }}
      />

      <main className={styles.mainContent}>
        <Benefits benefits={benefits} title="Почему HabrForDev" />
        <section className={styles.join}>
          <p>Будь в курсе технологий с HabrForDev</p>
          <a href="https://t.me/habr_for_dev" className={styles.subscribeLink}>
            Подписаться
          </a>
        </section>
        <LastPosts
          lastPosts={lastPosts}
          channelName="HabrForDev"
          avatar={channelInfo.avatarUrl}
        />
      </main>
      <ContactSection />
    </div>
  );
}
