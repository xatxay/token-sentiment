import React from "react";
import { YoutubeTableProps } from "../utils/interface";
import { YoutubeTableBody } from "./youtubeTableBody";

export const YoutubeTopCoinsTable = ({
  data,
  selectedCoin,
  youtubeExpandData,
  handleRowClicked,
  setParseVideoData,
}: YoutubeTableProps) => {
  console.log("youtube data expand: ", youtubeExpandData);
  return (
    <>
      <table className="w-[600px] table-fixed">
        <thead>
          <tr>
            <th className="w-1/4 p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base font-semibold text-center border-2 border-gray-500">
              Coin
            </th>
            <th className="w-1/4 p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base font-semibold text-center border-2 border-gray-500">
              Numbers of Videos
            </th>
            <th className="w-1/4 p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base font-semibold text-center border-2 border-gray-500">
              Sentiment
            </th>
            <th className="w-1/4 p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base font-semibold text-center border-2 border-gray-500">
              Total Views
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <React.Fragment key={`${d.id} + ${index}`}>
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-800"
                onClick={() => {
                  if (youtubeExpandData && youtubeExpandData?.length > 0) {
                    setParseVideoData && setParseVideoData([]);
                  }
                  handleRowClicked && handleRowClicked(d.coin);
                }}
              >
                {/* Column widths removed as table-layout: fixed is used */}
                <td
                  key={`${d.coin} + ${index}`}
                  className="p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base text-center border-2 border-gray-500 text-gray-400"
                >
                  {d.coin}
                </td>
                <td
                  key={`${d.num_videos} + ${index}`}
                  className="p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base text-center border-2 border-gray-500 text-gray-400"
                >
                  {d.num_videos}
                </td>
                <td
                  key={`${d.sentiment} + ${index}`}
                  className="p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base text-center border-2 border-gray-500 text-gray-400"
                >
                  {d.sentiment}
                </td>
                <td
                  key={`${d.total_views} + ${index}`}
                  className="p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base text-center border-2 border-gray-500 text-gray-400"
                >
                  {d.total_views}
                </td>
              </tr>
              {selectedCoin && selectedCoin === d.coin ? (
                <YoutubeTableBody data={youtubeExpandData || []} />
              ) : null}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};
