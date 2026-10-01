import Link from "next/link";

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <h1>React 練習專案</h1>

        <p>
          歡迎光臨我的頁面
        </p>

        <Link href="/accounting" className="start-link">
          點此開始
        </Link>
      </section>
    </main>
  );
}