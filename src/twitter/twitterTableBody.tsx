import React from "react";
import { ArrayTweetResult } from "../utils/interface";

interface TwitterTableBodyProps {
  data: ArrayTweetResult[];
}

export const TwitterTableBody = ({ data }: TwitterTableBodyProps) => {
  return (
    <>
      {data.length > 0 &&
        data.map((d, index) => (
          <React.Fragment key={index}>
            <tr
              key={index}
              className="cursor-pointer hover:bg-gray-800"
              onClick={() => window.open(d.twitterUrl, "_blank")}
            >
              <td className="p-1 md:p-2 text-xs md:text-sm text-center border-2 border-gray-500 white bg-zinc-800">
                {d.coin}
              </td>
              <td
                // colSpan={2}
                className="p-1 md:p-2 text-xs md:text-sm text-center border-2 border-gray-500 text-white bg-zinc-800"
              >
                <span>{d.twitterUser}</span>
              </td>
              <td className="p-1 md:p-2 text-xs md:text-sm text-center border-2 border-gray-500 white bg-zinc-800">
                {d.coinSentiment}
                {/* {Object.keys(d.allCoinsSentiment).length > 1 &&
                  `(also ${Object.entries(d.allCoinsSentiment)
                    .filter(([key]) => key !== d.coin)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")})`} */}
              </td>
            </tr>
          </React.Fragment>
        ))}
    </>
  );
};
