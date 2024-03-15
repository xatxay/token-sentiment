import React from "react";
import { YoutubeTableProps } from "../utils/interface";
import { YoutubeTableBody } from "./youtubeTableBody";
import "../App.css";

export const YoutubeTopCoinsTable = ({
  data,
  selectedCoin,
  youtubeExpandData,
  handleRowClicked,
  setParseVideoData,
}: YoutubeTableProps) => {
  return (
    <>
      <table className="custom-lg-width table-fixed">
        <thead>
          <tr>
            <th className="w-1/6 p-1 md:p-2 lg:px-4 text-xs md:text-sm lg:text-base font-medium text-center border-2 border-gray-500">
              Coin
            </th>
            <th className="w-1/3 p-1 md:p-2 lg:px-4 text-xs md:text-sm lg:text-base font-medium text-center border-2 border-gray-500">
              Numbers of Videos
            </th>
            <th className="w-1/5 p-1 md:p-2 lg:px-4 text-xs md:text-sm lg:text-base font-medium text-center border-2 border-gray-500">
              Sentiment
            </th>
            <th className="w-1/3 p-1 md:p-2 lg:px-4 text-xs md:text-sm lg:text-base font-medium text-center border-2 border-gray-500">
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
                <td
                  key={`${d.coin} + ${index}`}
                  className="p-1 md:p-2 lg:px-4 text-xs md:text-sm lg:text-base text-center border-2 border-gray-500 text-gray-400"
                >
                  {d.coin}
                </td>
                <td
                  key={`${d.num_videos} + ${index}`}
                  className="p-1 md:p-2 lg:px-4 text-xs md:text-sm lg:text-base text-center border-2 border-gray-500 text-gray-400"
                >
                  {d.num_videos}
                </td>
                <td
                  key={`${d.sentiment} + ${index}`}
                  className="p-1 md:p-2 lg:px-4 text-xs md:text-sm lg:text-base text-center border-2 border-gray-500 text-gray-400"
                >
                  {parseFloat(d.sentiment).toFixed(2)}
                </td>
                <td
                  key={`${d.total_views} + ${index}`}
                  className="p-1 md:p-2 lg:px-4 text-xs md:text-sm lg:text-base text-center border-2 border-gray-500 text-gray-400"
                >
                  {parseFloat(d.total_views).toLocaleString("en-US")}
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
