import { useMemo } from "react";
import {
  duplicateCoins,
  extractTwitterSentimentByDay,
  formatDate,
  insertArrayData,
  removeDuplicate,
  useFetch,
} from "../utils/utils";
import { TwitterTableName } from "./twitterStyle";
import { CoinDataTable } from "../table/dataTable";
import { ArrayTweetResult, StartDate } from "../utils/interface";
import { createColumnHelper } from "@tanstack/react-table";
import DataTableModal from "../table/modal";
import { toast } from "react-toastify";

const Twitter = ({
  startDate,
  setStartDate,
  openModal,
  isOpen,
  coin,
  closeModal,
}: StartDate) => {
  const dateFormat = formatDate(startDate);
  console.log("dateasda: ", dateFormat, coin);
  const twitterUrl = process.env.REACT_APP_TWITTER_BY_DAY;
  let noDuplicateData: ArrayTweetResult[] = [];
  let duplicateData: ArrayTweetResult[] = [];
  const { data, error } = useFetch(twitterUrl || "", dateFormat);
  if (data) {
    const twitterResult = extractTwitterSentimentByDay(data);
    console.log("twitter result: ", twitterResult);
    const arrayData = insertArrayData(twitterResult);
    console.log("array: ", arrayData);
    noDuplicateData = removeDuplicate(arrayData) || [];
    console.log("no duplicate: ", noDuplicateData);
    duplicateData = duplicateCoins(arrayData, coin || "") || [];
  }
  if (error) {
    console.error("Failed fetching twitter data: ", error);
    toast.error(error);
  }

  const columnHelper = createColumnHelper<ArrayTweetResult>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("coin", {
        header: () => "Coin",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("mentions", {
        header: "Mentions",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("uniqueUser", {
        header: "Unique Users",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("sentiments", {
        header: "Sentiment",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("twitterUser", {
        header: "Twitter",
        cell: (info) => {
          const row = info.row.original;
          if (row.uniqueUser > 1 && openModal && !isOpen) {
            return (
              <TwitterTableName
                onClick={(event) => {
                  event.stopPropagation();
                  openModal(row.coin);
                }}
              >
                View More
              </TwitterTableName>
            );
          } else {
            return (
              <TwitterTableName
                href={row.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.twitterUser}
              </TwitterTableName>
            );
          }
        },
      }),
    ],
    [columnHelper, isOpen, openModal]
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
        data={duplicateData}
        columns={columns}
        isOpen={isOpen}
        closeModal={closeModal}
        coin={coin}
      />
    </>
  );
};

export default Twitter;
