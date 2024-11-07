// app/components/LastPosts.js
import styles from "./LastPosts.module.css";
export interface Post {
  text: string;
  date: string;
  media: string[];
}

export interface LastPostsProps {
  lastPosts: Post[];
  channelName: string;
  avatar: string;
  className?: string;
}

export default function LastPosts({
  lastPosts,
  channelName,
  avatar,
  className = "",
}: LastPostsProps) {
  return (
    <section className={className}>
      <h2 className={styles.header}>Последние посты</h2>
      <ul className={styles.postsList}>
        {lastPosts.map((post, index) => (
          <li key={index} className={styles.post}>
            <div className={styles.postHeader}>
              <img src={avatar} /> {channelName}
              <span className={styles.postDate}>{post.date}</span>
            </div>
            <div className={styles.media}>
              {post.media.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Media ${idx}`}
                  className={styles.image}
                />
              ))}
            </div>

            <p className={styles.postText}>{post.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
