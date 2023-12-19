/** @jsxImportSource @emotion/react */
import { toast } from "react-toastify";
import { extractPollData, useFetch } from "../utils/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { PollExtract } from "../utils/interface";
import PollBar from "./pollBar";
import { PollDescription, PollDescriptionContainer } from "./pollStyle";
import { BackgroundTable } from "../twitter/twitterStyle";
import { DataTable } from "../table/dataTable";
import { useEffect, useState } from "react";
import { fadeIn } from "../globalStyle/fadeIn";

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
    console.log("polls data: ", parseData);
    dataExtracted = extractPollData(parseData);
    console.log("extract: ", dataExtracted);
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
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("poll_dict", {
      header: "Result",
      cell: (info) => {
        const pollData = info.row.original.poll_dict;
        console.log("dataasdasd: ", pollData);
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
                <PollDescription color={color} />
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
