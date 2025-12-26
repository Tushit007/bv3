import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const API = import.meta.env.VITE_API_BASE_URL || "https://bv2-3byh.onrender.com"
;
console.log("API USED:", API);

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const containerRef = useRef(null);

  // ✅ Fetch articles
  useEffect(() => {
    fetch(`${API}/api/articles`)
      .then((res) => res.json())
      .then((data) => {
        console.log("ARTICLES:", data); // debug (can remove later)
        setArticles(data);
      })
      .catch(console.error);
  }, []);

  // ✅ GSAP only runs when articles exist
  useEffect(() => {
    if (!containerRef.current || articles.length === 0) return;

    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        clearProps: "opacity,transform" // 🔥 IMPORTANT
      }
    );
  }, [articles]);

  return (
    <div className="min-h-screen px-8 py-12 bg-[#0e0e0e]">
      <h1 className="text-4xl font-light mb-12 tracking-wide text-[#c7a76d]">
        BeyondChats Articles
      </h1>

      <div
        ref={containerRef}
        className="grid md:grid-cols-2 gap-8"
      >
        {articles.map((article) => (
          <Link
            key={article._id}
            to={`/article/${article._id}`}
            className="group bg-[#161616] p-6 rounded-xl border border-[#262626]
                       hover:border-[#c7a76d] transition-all duration-500"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-medium group-hover:text-[#c7a76d] transition">
                {article.title}
              </h2>

              <span
                className={`text-xs px-3 py-1 rounded-full uppercase tracking-wide ${
                  article.type === "updated"
                    ? "bg-[#c7a76d] text-black"
                    : "bg-[#262626] text-gray-300"
                }`}
              >
                {article.type}
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {article.content?.replace(/<[^>]+>/g, "").slice(0, 160)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
