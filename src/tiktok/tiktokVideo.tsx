/** @jsxImportSource @emotion/react */
import { toast } from "react-toastify";
import {
  BackgroundTable,
  TopicContainer,
  TwitterTableName,
} from "../twitter/twitterStyle";
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
    console.log("video data: ", parseData);
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
        return (
          <TwitterTableName>
            {newSentiment ? newSentiment : "N/A"}
          </TwitterTableName>
        );
      },
    }),
    columnHelper.accessor("video_id", {
      header: "Link",
      cell: (info) => {
        const row = info.row.original;
        const tiktokLink = `https://www.tiktok.com/@${row.username}/video/${row.video_id}`;
        return (
          <TwitterTableName href={tiktokLink} target="_blank">
            View Link
          </TwitterTableName>
        );
      },
    }),
  ];
  return (
    <>
      <div css={isLoaded ? fadeIn : undefined}>
        <TopicContainer>
          <BackgroundTable>
            <h3>Tiktok Videos</h3>
            <DataTable data={parseData} columns={columns} />
          </BackgroundTable>
        </TopicContainer>
      </div>
    </>
  );
};

export default TiktokVideo;
