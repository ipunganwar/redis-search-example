"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<{
    result: string;
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) {
        return setSearchResult(undefined);
      }

      const res = await fetch(`/api/search?q=${input}`);
    };

    fetchData();
  }, [input]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-zinc-900"
      />
    </div>
  );
}
