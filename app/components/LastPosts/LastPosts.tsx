// app/components/LastPosts.js

export interface Post {
  text: string;
  date: string;
  media: string[];
}

export interface LastPostsProps {
  lastPosts: Post[];
}

export default function LastPosts({ lastPosts }: LastPostsProps) {
  return (
    <section>
      <h2>Последние посты</h2>
      <ul>
        {lastPosts.map((post, index) => (
          <li key={index}>
            <p>{post.text}</p>
            <small>{post.date}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
