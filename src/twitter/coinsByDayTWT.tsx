/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import {
  duplicateCoins,
  extractTwitterSentimentByDay,
  formatCoinSentimentByDayPieChart,
  formatDate,
  insertArrayData,
  removeDuplicate,
  useFetch,
} from "../utils/utils";
import { RightContainer, TwitterTableName } from "./twitterStyle";
import {
  ArrayTweetResult,
  CoinDataTableProps,
  Modal,
  PieChartData,
} from "../utils/interface";
import { createColumnHelper } from "@tanstack/react-table";
import DataTableModal from "../table/modal";
import { toast } from "react-toastify";
import { BackgroundTable, LeftContainer } from "./twitterStyle";
import DateSelector from "../table/datePicker";
import { DataTable } from "../table/dataTable";
import PieChart from "../chart/pieChart";
import NoData from "../table/noData";
import { fadeIn } from "../globalStyle/fadeIn";

const CoinDataTable = React.memo(
  ({
    data,
    columns,
    startDate,
    setStartDate,
    modal,
    poll,
  }: CoinDataTableProps) => {
    return (
      <>
        <LeftContainer>
          <BackgroundTable poll={poll || false}>
            <h3>Top Coins By Day</h3>
            {!modal && startDate && setStartDate && (
              <DateSelector startDate={startDate} setStartDate={setStartDate} />
            )}
            {data.length === 0 ? (
              <NoData data={data} columns={columns} />
            ) : (
              <DataTable data={data} columns={columns} />
            )}
          </BackgroundTable>
        </LeftContainer>
      </>
    );
  }
);

const CoinByDayTwt = ({ openModal, isOpen, coin, closeModal }: Modal) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const dateFormat = formatDate(startDate);
  const twitterUrl = process.env.REACT_APP_TWITTER_BY_DAY;
  let noDuplicateData: ArrayTweetResult[] = [];
  let duplicateData: ArrayTweetResult[] = [];
  let pieChartData: PieChartData = { series: [0], labels: [""] };
  const { data, error, loading } = useFetch(twitterUrl || "", {
    date: dateFormat,
  });

  if (data) {
    const twitterResult = extractTwitterSentimentByDay(data);
    console.log("twitter result: ", twitterResult);
    if (twitterResult !== null) {
      const arrayData = insertArrayData(twitterResult);
      // console.log("array: ", arrayData);
      noDuplicateData = removeDuplicate(arrayData) || [];
      // console.log("no duplicate: ", noDuplicateData);
      duplicateData = duplicateCoins(arrayData, coin || "") || [];
      // console.log("duplicate data: ", duplicateData);
      pieChartData = formatCoinSentimentByDayPieChart(noDuplicateData);
    }
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
              <TwitterTableName href={row.twitterUrl} target="_blank">
                {row.twitterUser}
              </TwitterTableName>
            );
          }
        },
      }),
    ],
    [columnHelper, isOpen, openModal]
  );

  useEffect(() => {
    if (!loading && data) {
      setIsLoaded(true);
    }
  }, [data, loading]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <LeftContainer>
        <div css={isLoaded ? fadeIn : undefined}>
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
        </div>
      </LeftContainer>
      <RightContainer>
        <PieChart series={pieChartData.series} labels={pieChartData.labels} />
      </RightContainer>
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

export { CoinDataTable, CoinByDayTwt };
