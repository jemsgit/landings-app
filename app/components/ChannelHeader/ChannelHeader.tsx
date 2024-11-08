import { numberWithSpace } from "@/app/utils/number";
import styles from "./ChannelHeader.module.css";
import { pluralize } from "@/app/utils/formatters";

interface Info {
  avatarUrl: string;
  title: string;
  subscribersCount: number;
  link: string;
  description: string;
  inviteLink: string;
}

interface ChannelHeaderProps {
  channelInfo: Info;
}

function ChannelHeader({ channelInfo }: ChannelHeaderProps) {
  const { title, avatarUrl, subscribersCount, link, description, inviteLink } =
    channelInfo;
  return (
    <div
      className={styles.headerWrapper}
      style={{
        backgroundImage: `url("${avatarUrl}")`,
        backgroundSize: "cover",
      }}
    >
      <header className={styles.header}>
        <section className={styles.headerSection}>
          <img src={avatarUrl} alt="logo" />
          <div>
            <h1>{title}</h1>
            <span className={styles.details}>{description}</span>
            <a href={link}>{link}</a>
          </div>
        </section>
        <div className={styles.headerAdditonWrapper}>
          <section className={styles.headerAdditon}>
            <span className={styles.subscribersCount}>
              {numberWithSpace(subscribersCount)}
            </span>
            <span>
              {pluralize(subscribersCount, [
                "подписчик",
                "подписчика",
                "подписчиков",
              ])}
            </span>
          </section>
          <a href={inviteLink} className={styles.subscribeLink}>
            Подписаться
          </a>
        </div>
      </header>
    </div>
  );
}

export default ChannelHeader;
