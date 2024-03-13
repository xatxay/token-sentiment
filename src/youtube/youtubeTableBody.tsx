import React from "react";
import { CoinByDateYTProps } from "../utils/interface";

interface YoutubeTableBodyProps {
  data: CoinByDateYTProps[];
}

export const YoutubeTableBody = ({ data }: YoutubeTableBodyProps) => {
  return (
    <>
      {data.length > 0 &&
        data.map((d, index) => (
          <React.Fragment key={index}>
            <tr
              key={`${index} + ${d.coin}`}
              className="cursor-pointer hover:bg-gray-800"
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_YOUTUBE_LINK}${d.id}`,
                  "_blank"
                )
              }
            >
              <td
                key={`${d.title} + ${index}`}
                colSpan={2}
                className="p-1 md:p-2 lg:px-8 text-xs md:text-sm text-center border-2 border-gray-500 text-white bg-zinc-800 overflow-x-hidden"
              >
                {d.title}
              </td>
              <td
                key={`${d.sentiment} + ${d.coin} + ${index}`}
                className="p-1 md:p-2 lg:px-8 text-xs md:text-sm text-center border-2 border-gray-500 white bg-zinc-800"
              >
                {d.sentiment}{" "}
              </td>
              <td
                key={`${d.views} + ${index}`}
                className="p-1 md:p-2 lg:px-8 text-xs md:text-sm text-center border-2 border-gray-500 white bg-zinc-800"
              >
                {d.views}{" "}
              </td>
            </tr>
          </React.Fragment>
        ))}
    </>
  );
};
