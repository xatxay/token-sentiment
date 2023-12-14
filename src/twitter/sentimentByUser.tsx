import { toast } from "react-toastify";
import { useFetch } from "../utils/utils";
import {
  BackgroundTable,
  RightContainer,
  TwitterPage,
  TwitterTableName,
} from "./twitterStyle";
import { DataTableProps, SentimentByUserProps } from "../utils/interface";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../table/dataTable";

const SentimentByUser = () => {
  const apiUrl = String(process.env.REACT_APP_SENTIMENT_BY_USER);
  const username = "Awawat_Trades";
  const { data, error, loading } = useFetch(apiUrl, { username: username });
  let parseData = null;
  if (data) {
    parseData = JSON.parse(data);
  }
  console.log("parsing data: ", parseData);

  const columnHelper = createColumnHelper<SentimentByUserProps>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: () => "Date",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("coin_sentiment", {
        header: "Sentiment",
        cell: (info) => {
          const tickerSentiment = info.getValue();
          const formatData = Object.entries(tickerSentiment)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");
          return <TwitterTableName>{formatData}</TwitterTableName>;
        },
      }),
      columnHelper.accessor("tweet_url", {
        header: "Link",
        cell: (info) => {
          return (
            <TwitterTableName
              href={info.row.original.tweet_url}
              target="_blank"
            >
              Link
            </TwitterTableName>
          );
        },
      }),
    ],
    [columnHelper]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error(error);
  }
  return <SentimentByUserPlacement data={parseData} columns={columns} />;
};

const SentimentByUserPlacement = ({ data, columns }: DataTableProps) => {
  return (
    <>
      <TwitterPage>
        <RightContainer>
          <BackgroundTable>
            <h3>Sentiment By User</h3>
            {data && data.length > 0 ? (
              <DataTable data={data} columns={columns} />
            ) : (
              <div>no data</div>
            )}
          </BackgroundTable>
        </RightContainer>
      </TwitterPage>
    </>
  );
};

export default SentimentByUser;
