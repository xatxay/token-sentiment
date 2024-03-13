import React from "react";
import { CoinByDateYTProps } from "../utils/interface";

interface YoutubeTableBodyProps {
  data: CoinByDateYTProps[];
}

export const YoutubeTableBody = ({ data }: YoutubeTableBodyProps) => {
  console.log("table body: ", data);
  return (
    <>
      {data.length > 0 &&
        data.map((d, index) => (
          <React.Fragment key={index}>
            <tr
              key={index}
              className="cursor-pointer hover:bg-gray-800"
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_YOUTUBE_LINK}${d.id}`,
                  "_blank"
                )
              }
            >
              <td
                colSpan={2}
                className="p-1 md:p-2 lg:px-8 text-xs md:text-sm text-center border-2 border-gray-500 text-white bg-zinc-800"
              >
                {d.title}
              </td>
              <td className="p-1 md:p-2 lg:px-8 text-xs md:text-sm text-center border-2 border-gray-500 white bg-zinc-800">
                {d.sentiment}{" "}
              </td>
              <td className="p-1 md:p-2 lg:px-8 text-xs md:text-sm text-center border-2 border-gray-500 white bg-zinc-800">
                {d.views}{" "}
              </td>
            </tr>
          </React.Fragment>
        ))}
    </>
  );
};
//className="p-1 md:p-2 lg:px-8 text-xs md:text-sm lg:text-base font-bold text-center border-2 border-gray-500"
