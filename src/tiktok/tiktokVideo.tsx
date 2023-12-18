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

const TiktokVideo = () => {
  const apiUrl = String(process.env.REACT_APP_TIKTOK_VIDEOS_DATA);
  const { data, error } = useFetch(apiUrl);
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
      <TopicContainer>
        <BackgroundTable>
          <h3>Tiktok Videos</h3>
          <DataTable data={parseData} columns={columns} />
        </BackgroundTable>
      </TopicContainer>
    </>
  );
};

export default TiktokVideo;
