interface Props {}

function ChannelHeader(props: Props) {
  const {} = props;

  return (
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
  );
}

export default ChannelHeader;
