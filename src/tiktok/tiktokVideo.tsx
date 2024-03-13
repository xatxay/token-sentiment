/** @jsxImportSource @emotion/react */
import { toast } from "react-toastify";
import { sentimentFormatted, useFetch } from "../utils/utils";
import { TikTokVideo } from "../utils/interface";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../table/dataTable";
import { useEffect, useState } from "react";
import { fadeIn } from "../globalStyle/fadeIn";

const TiktokVideo = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const apiUrl = String(process.env.REACT_APP_TIKTOK_VIDEOS_DATA);
  const { data, error, loading } = useFetch(apiUrl);
  let parseData: TikTokVideo[] = [];

  if (data) {
    parseData = JSON.parse(data)
      .filter((sentiment: TikTokVideo) => sentiment.sentiment_dict !== "{}")
      .sort((a: TikTokVideo, b: TikTokVideo) => {
        return (
          new Date(b.created_time).getTime() -
          new Date(a.created_time).getTime()
        );
      });
  }

  if (error) {
    console.error("Error fetching tiktok video data: ", error);
    toast.error(error);
  }

  useEffect(() => {
    if (!loading && data) {
      setIsLoaded(true);
    }
  }, [data, loading]);

  const columnHelper = createColumnHelper<TikTokVideo>();
  const columns = [
    columnHelper.accessor("created_time", {
      header: "Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("username", {
      header: "Username",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("sentiment_dict", {
      header: "Sentiment",
      cell: (info) => {
        const sentiment = info.getValue();
        const newSentiment = sentimentFormatted(sentiment);
        return <span>{newSentiment ? newSentiment : "N/A"}</span>;
      },
    }),
  ];
  return (
    <>
      <div
        css={isLoaded ? fadeIn : undefined}
        className="flex flex-col items-center justify-center w-full space-y-4"
      >
        <h3 className="font-extrabold text-xl md:text-2xl">Tiktok Videos</h3>
        <DataTable data={parseData} columns={columns} openTiktokLink={true} />
      </div>
    </>
  );
};

export default TiktokVideo;
