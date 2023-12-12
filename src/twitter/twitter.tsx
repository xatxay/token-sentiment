import { useMemo } from "react";
import {
  extractTwitterSentimentByDay,
  formatDate,
  insertArrayData,
  useFetch,
} from "../utils/utils";
import {
  BackgroundTable,
  LeftContainer,
  RightContainer,
  TopicHeader,
  TwitterPage,
  TwitterTableName,
} from "./twitterStyle";
import DataTable from "../table/dataTable";
import { ArrayTweetResult, StartDate } from "../utils/interface";
import { Row } from "react-table";
import DateSelector from "../table/datePicker";

const Twitter = ({ startDate, setStartDate }: StartDate) => {
  const dateFormat = formatDate(startDate);
  console.log("dateasda: ", dateFormat);
  const twitterUrl = process.env.REACT_APP_TWITTER_BY_DAY;
  let arrayData: ArrayTweetResult[] = [];
  const { data, error, loading } = useFetch(twitterUrl || "", dateFormat);
  if (data) {
    const twitterResult = extractTwitterSentimentByDay(data);
    console.log("twitter result: ", twitterResult);
    arrayData = insertArrayData(twitterResult);
    console.log("array: ", arrayData);
  }

  const columns = useMemo(
    () => [
      {
        Header: "Coin",
        accessor: "coin",
      },
      {
        Header: "Mentions",
        accessor: "mentions",
      },
      {
        Header: "Unique Users",
        accessor: "uniqueUser",
      },
      {
        Header: "Sentiment",
        accessor: "sentiments",
      },

      {
        Header: "Twitter",
        accessor: "twitterUser",
        Cell: ({ row }: { row: Row<ArrayTweetResult> }) => (
          <TwitterTableName
            href={row.original.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.original.twitterUser}
          </TwitterTableName>
        ),
      },
    ],
    []
  );

  return (
    <>
      <TopicHeader>
        <h3>Twitter Sentiment</h3>
      </TopicHeader>
      <TwitterPage>
        <LeftContainer>
          <BackgroundTable>
            <h3>Top Coins By Day</h3>
            <DateSelector startDate={startDate} setStartDate={setStartDate} />
            <DataTable data={arrayData} columns={columns} />
          </BackgroundTable>
        </LeftContainer>
        <RightContainer>
          <BackgroundTable>Testing</BackgroundTable>
        </RightContainer>
      </TwitterPage>
    </>
  );
};

export default Twitter;
