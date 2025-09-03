import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import { SEOResult } from "../api/api"; // Adjust the import path as necessary
import { RiErrorWarningFill } from "react-icons/ri";

interface ResultsProps {
  url: string;
  response: SEOResult | null;
  pageSpeedResponse?: any | null;
}

const Results = ({ url, response, pageSpeedResponse }: ResultsProps) => {
  return (
    <div>
      {response ? (
        <div className="mt-8 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-violet-600 mb-4">
            Results
          </h2>

          <p className="text-gray-700">
            Url analyzed: <a className="font-bold">{url}</a>
            <div className=" my-4 gap-12">
              {pageSpeedResponse ? (
                <div className="flex flex-col items-center gap-2">
                <div
                  className={`radial-progress ${Math.round(pageSpeedResponse.lighthouseResult.categories.performance.score*100) > 80 ? "text-green-600" : Math.round(pageSpeedResponse.lighthouseResult.categories.performance.score*100) > 50 ? "text-orange-400" :  "text-red-600"} `}
                  style={{ "--value": pageSpeedResponse.lighthouseResult.categories.performance.score*100 } as React.CSSProperties}
                  aria-valuenow={pageSpeedResponse.lighthouseResult.categories.performance.score*100}
                  role="progressbar"
                >
                  {Math.round(pageSpeedResponse.lighthouseResult.categories.performance.score*100)}%
                </div>
                <p className="text-xl">Score Website Anda</p>
                </div>
              ) : (
                <div>
                <span className="loading loading-spinner text-purple-500"></span>
                <p className="text-purple-500">Sedang Menentukan Score Website Anda</p>
                </div>
              )}
            </div>
            <div className="bg-violet-200 rounded-2xl">
              <div className="flex items-center gap-2 px-4 py-2">
                {response?.meta?.title ? (
                  <div className="flex items-center gap-2">
                    {" "}
                    <FaCheckCircle color="green" size={30} />
                    Title Sudah Bagus
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <IoMdCloseCircle size={30} color="red" /> Title Tidak Ada
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 px-4 py-2">
                {(() => {
                  if (!response?.headings) {
                    return (
                      <div className="flex items-center gap-2">
                        <IoMdCloseCircle size={30} color="red" />
                        Web Tidak Memiliki Heading H1 maupun H2
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex items-center gap-2">
                        <FaCheckCircle color="green" size={30} />
                        Web Memiliki Heading H1 dan H2
                      </div>
                    );
                  }
                })()}
              </div>

              <div className="flex items-center gap-2 px-4 py-2">
                {(() => {
                  if (
                    response?.meta?.description &&
                    response.meta.description.length > 50
                  ) {
                    return (
                      <div className="flex items-center gap-2">
                        <FaCheckCircle color="green" size={30} />
                        Description Sudah Bagus
                      </div>
                    );
                  } else if (response?.meta?.description) {
                    return (
                      <div className="flex items-center gap-2">
                        <RiErrorWarningFill size={30} color="yellow" />
                        Description Kurang Panjang
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex items-center gap-2">
                        <IoMdCloseCircle size={30} color="red" />
                        Description Tidak Ada
                      </div>
                    );
                  }
                })()}
              </div>

              <div className="flex items-center gap-2 px-4 py-2">
                {(() => {
                  if (!response?.links?.internal) {
                    return (
                      <div className="flex items-center gap-2">
                        <IoMdCloseCircle size={30} color="red" />
                        Link Internal Tidak Ada
                      </div>
                    );
                  } else if (response?.links?.internal < 5) {
                    return (
                      <div className="flex items-center gap-2">
                        <RiErrorWarningFill size={30} color="yellow" />
                        Link Internal Terlalu Sedikit
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex items-center gap-2">
                        <FaCheckCircle color="green" size={30} />
                        Link Internal Sudah Bagus
                      </div>
                    );
                  }
                })()}
              </div>

              <div className="flex items-center gap-2 px-4 py-2">
                {(() => {
                  if (!response?.links?.external) {
                    return (
                      <div className="flex items-center gap-2">
                        <IoMdCloseCircle size={30} color="red" />
                        Link External Tidak Ada
                      </div>
                    );
                  } else if (response?.links?.external < 5) {
                    return (
                      <div className="flex items-center gap-2">
                        <RiErrorWarningFill size={30} color="yellow" />
                        Link External Terlalu Sedikit
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex items-center gap-2">
                        <FaCheckCircle color="green" size={30} />
                        Link External Sudah Bagus
                      </div>
                    );
                  }
                })()}
              </div>

              <div className="flex items-center gap-2 px-4 py-2">
                {(() => {
                  if (!response?.images?.total) {
                    return (
                      <div className="flex items-center gap-2">
                        <IoMdCloseCircle size={30} color="red" />
                        Web Tidak Memiliki Gambar
                      </div>
                    );
                  } else if (response?.images?.noAlt !== 0) {
                    return (
                      <div className="flex items-center gap-2">
                        <RiErrorWarningFill size={30} color="yellow" />
                        Ada {response?.images?.noAlt} Gambar Tanpa Alt
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex items-center gap-2">
                        <FaCheckCircle color="green" size={30} />
                        Gambar Sudah Bagus
                      </div>
                    );
                  }
                })()}
              </div>

              <div className="flex items-center gap-2 px-4 py-2">
                {(() => {
                  if (!response?.content.wordCount) {
                    return (
                      <div className="flex items-center gap-2">
                        <IoMdCloseCircle size={30} color="red" />
                        Web Tidak Memiliki Konten
                      </div>
                    );
                  } else if (response?.content.wordCount < 300) {
                    return (
                      <div className="flex items-center gap-2">
                        <RiErrorWarningFill size={30} color="yellow" />
                        Konten Website Anda Terlalu Sedikit
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex items-center gap-2">
                        <FaCheckCircle color="green" size={30} />
                        Konten Website Anda Sudah Bagus
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Results;
