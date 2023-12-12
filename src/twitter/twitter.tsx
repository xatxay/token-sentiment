import { useMemo } from "react";
import {
  extractTwitterSentimentByDay,
  formatDate,
  insertArrayData,
  removeDuplicate,
  useFetch,
} from "../utils/utils";
import { TwitterTableName } from "./twitterStyle";
import { CoinDataTable } from "../table/dataTable";
import { ArrayTweetResult, StartDate } from "../utils/interface";
import { Row } from "react-table";
import DataTableModal from "../table/modal";

const Twitter = ({
  startDate,
  setStartDate,
  openModal,
  isOpen,
  coin,
  closeModal,
}: StartDate) => {
  const dateFormat = formatDate(startDate);
  console.log("dateasda: ", dateFormat);
  const twitterUrl = process.env.REACT_APP_TWITTER_BY_DAY;
  let noDuplicateData: ArrayTweetResult[] = [];
  let arrayData: ArrayTweetResult[] = [];
  const { data, error, loading } = useFetch(twitterUrl || "", dateFormat);
  if (data) {
    const twitterResult = extractTwitterSentimentByDay(data);
    console.log("twitter result: ", twitterResult);
    arrayData = insertArrayData(twitterResult);
    console.log("array: ", arrayData);
    noDuplicateData = removeDuplicate(arrayData) || [];
    console.log("no duplicate: ", noDuplicateData);
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
        Cell: ({ row }: { row: Row<ArrayTweetResult> }) => {
          if (row.original.uniqueUser > 1 && openModal) {
            return (
              <TwitterTableName
                onClick={(event) => {
                  event.stopPropagation();
                  openModal(row.original.coin);
                }}
              >
                View More
              </TwitterTableName>
            );
          } else {
            return (
              <TwitterTableName
                href={row.original.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.original.twitterUser}
              </TwitterTableName>
            );
          }
        },
      },
    ],
    [openModal]
  );

  return (
    <>
      <CoinDataTable
        data={noDuplicateData}
        columns={columns}
        isOpen={isOpen || false}
        coin={coin || null}
        closeModal={closeModal}
        modal={false}
        startDate={startDate}
        setStartDate={setStartDate}
      />
      <DataTableModal
        data={arrayData}
        columns={columns}
        isOpen={isOpen}
        closeModal={closeModal}
        coin={coin}
      />
    </>
  );
};

export default Twitter;
