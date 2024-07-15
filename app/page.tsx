"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) {
        return setSearchResult(undefined);
      }

      const res = await fetch(`/api/search?q=${input}`);
      const data = (await res.json()) as {
        results: string[];
        duration: number;
      };
      setSearchResult(data);
    };

    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-5xl tracking-tight font-bold">SpeedSearch ⚡️</h1>
        <p className="text-zinc-600 text-lg max-w-prose text-center">
          A high-performance API built with Hono, Next.js and Cloudflare.
          <br />
          Type a query below and get your results in miliseconds.
        </p>

        <div className="max-w-md w-full">
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search countries..."
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {searchResult?.results.length === 0 && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}

              {searchResult?.results && (
                <CommandGroup heading="Results">
                  {searchResult?.results.map((result, index) => (
                    <CommandItem key={index} value={result} onSelect={setInput}>
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {searchResult?.results && (
                <>
                  <div className="h-px w-full bg-zinc-200" />
                  <p className="p-2 text-xs text-zinc-500">
                    Found {searchResult.results.length} results in{" "}
                    {searchResult.duration.toFixed(0)}ms
                  </p>
                </>
              )}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  );
}
