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
import {
  ArrayTweetResult,
  CoinDataTableProps,
  Modal,
  PieChartData,
} from "../utils/interface";
import { createColumnHelper } from "@tanstack/react-table";
import DataTableModal from "../table/modal";
import { toast } from "react-toastify";
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
        <div className="flex items-center justify-center flex-col space-y-4">
          <h3 className="font-extrabold text-xl md:text-2xl">
            Top Coins By Day
          </h3>
          {!modal && startDate && setStartDate && (
            <DateSelector startDate={startDate} setStartDate={setStartDate} />
          )}
          {data === undefined || data.length === 0 ? (
            <NoData data={data} columns={columns} />
          ) : (
            <DataTable data={data} columns={columns} />
          )}
        </div>
      </>
    );
  }
);

const CoinByDayTwt = ({ openModal, isOpen, coin, closeModal }: Modal) => {
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const dateFormat = formatDate(startDate);
  const twitterUrl = process.env.REACT_APP_TWITTER_BY_DAY;
  const [noDuplicateData, setNoDuplicateData] = useState<ArrayTweetResult[]>(
    []
  );
  const [duplicateData, setDuplicateData] = useState<ArrayTweetResult[]>([]);
  const [pieChartData, setPieChartData] = useState<PieChartData>({
    series: [0],
    labels: [""],
  });
  const { data, error, loading } = useFetch(twitterUrl || "", {
    date: dateFormat,
  });

  useEffect(() => {
    if (data) {
      const twitterResult = extractTwitterSentimentByDay(data);
      if (twitterResult !== null) {
        const arrayData = insertArrayData(twitterResult);
        const noDuplicateData = removeDuplicate(arrayData) || [];
        const duplicateData = duplicateCoins(arrayData, coin || "") || [];
        const pieChartData = formatCoinSentimentByDayPieChart(noDuplicateData);
        setNoDuplicateData(noDuplicateData);
        setDuplicateData(duplicateData);
        setPieChartData(pieChartData);
      }
    }
  }, [coin, data]);

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
              <span
                className="cursor-pointer hover:text-white"
                onClick={(event) => {
                  event.stopPropagation();
                  openModal(row.coin);
                }}
              >
                View More
              </span>
            );
          } else {
            return (
              <a
                href={row.twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                {row.twitterUser}
              </a>
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

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <div className="flex-1 flex items-center justify-center space-y-4">
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
      </div>
      {noDuplicateData.length > 0 && noDuplicateData !== undefined && (
        <div className="flex-1 flex items-center justify-center flex-col space-y-6">
          <h3 className="font-extrabold text-xl md:text-2xl mt-4">
            Top Coins By Day (Pie Chart)
          </h3>
          <PieChart series={pieChartData.series} labels={pieChartData.labels} />
        </div>
      )}
      <DataTableModal
        data={duplicateData}
        columns={columns}
        isOpen={isOpen}
        closeModal={closeModal}
        coin={coin}
      />
    </div>
  );
};

export { CoinDataTable, CoinByDayTwt };
