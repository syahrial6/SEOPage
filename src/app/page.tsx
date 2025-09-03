"use client";

import { useState } from "react";
import { analyze } from "./api/api";

import { SEOResult } from "./api/api";
import Results from "./components/results";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState<SEOResult | null>(null);
  const [pageSpeedResponse, setPageSpeedResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
 

  const handlePageSpeed = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${process.env.NEXT_PUBLIC_PAGESPEED_API_KEY}&strategy=mobile`
      );
      setPageSpeedResponse(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching PageSpeed data:", error);
    }
  };
  const handleAnalyze = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }
    try {
      const res = await analyze(url);
      setResponse(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error during analysis:", error);
    }
  };

  const handleFunction = async () => {
    setLoading(true);
    await handleAnalyze();
    await handlePageSpeed();
    setLoading(false);
  };

  return (
    <div className="bg-violet-50 w-full min-h-screen">
      <h1 className="text-4xl text-violet-500 font-bold text-center py-12">
        SEO Analyzer Tool
      </h1>
      <div className="flex justify-center items-center">
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to analyze"
          className="w-1/2 p-3 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          onClick={handleFunction}
          className=" bg-violet-500 text-white px-6 py-3 rounded-lg hover:bg-violet-600 transition-colors"
        >
          Analyze
        </button>
      </div>

      {loading ? (
        <div className="mt-8 text-center">
        <span className="loading loading-spinner text-4xl text-center m-auto text-purple-500"></span>
        <p className="text-2xl text-purple-500">Loading</p>
        </div>
      ) : (
        <Results
          url={url}
          response={response}
          pageSpeedResponse={pageSpeedResponse}
        />
      )}
    </div>
  );
}
