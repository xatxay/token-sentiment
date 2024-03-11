/** @jsxImportSource @emotion/react */
import { toast } from "react-toastify";
import { extractPollData, useFetch } from "../../utils/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { PollExtract } from "../../utils/interface";
import PollBar from "./pollBar";
import { PollDescription, PollDescriptionContainer } from "./pollStyle";
import { BackgroundTable, TwitterTableName } from "../twitterStyle";
import { DataTable } from "../../table/dataTable";
import { useEffect, useState } from "react";
import { fadeIn } from "../../globalStyle/fadeIn";

const SentimentPolls = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { data, error, loading } = useFetch(
    String(process.env.REACT_APP_SENTIMENT_POLLS)
  );
  const colors = ["red", "green", "gray"];
  const description = ["Lower", "Higher", "Neutral"];
  let dataExtracted: PollExtract[] = [];

  if (data) {
    const parseData = JSON.parse(data);
    dataExtracted = extractPollData(parseData);
  }

  if (error) {
    console.error("Error fetching polls data: ", error);
    toast.error(error);
  }

  useEffect(() => {
    if (!loading && data) {
      setIsLoaded(true);
    }
  }, [data, loading]);

  const columnHelper = createColumnHelper<PollExtract>();
  const columns = [
    columnHelper.accessor("timestamp", {
      header: "Date",
      cell: (info) => new Date(Number(info.getValue())).toDateString(),
    }),
    columnHelper.accessor("tweet_text", {
      header: "Question",
      cell: (info) => {
        const row = info.row.original;
        return (
          <TwitterTableName
            href={row.tweet_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.tweet_text}
          </TwitterTableName>
        );
      },
    }),
    columnHelper.accessor("poll_dict", {
      header: "Result",
      cell: (info) => {
        const pollData = info.row.original.poll_dict;
        return (
          <div>
            <PollBar values={pollData} colors={colors} />
          </div>
        );
      },
    }),
  ];
  return (
    <>
      <div css={isLoaded ? fadeIn : undefined}>
        <BackgroundTable poll={true}>
          <h3>Poll Questions</h3>
          <PollDescriptionContainer>
            {colors.map((color, index) => (
              <>
                <span>{description[index]}:</span>
                <PollDescription color={color} key={index} />
              </>
            ))}
          </PollDescriptionContainer>
          <DataTable data={dataExtracted} columns={columns} />
        </BackgroundTable>
      </div>
    </>
  );
};

export default SentimentPolls;
