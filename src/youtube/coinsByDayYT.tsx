import { toast } from "react-toastify";
import {
  formatDate,
  formatYoutubeDataPieChart,
  useFetch,
} from "../utils/utils";
import { createColumnHelper } from "@tanstack/react-table";
import {
  CoinByDateYTProps,
  CoinByDayDataYt,
  PieChartData,
} from "../utils/interface";
import { CoinDataTable, DataTableWithPieChart } from "../twitter/coinsByDayTWT";
import { useEffect, useState } from "react";

const CoinByDayYT = ({
  // openCoinByDateModalYt,
  // closeCoinByDateModalYt,
  // isOpenYtModal,
  // selectedCoinYt,
  ytSelectedDate,
  setYtSelectedData,
  videoFetchData,
  handleRowClicked,
  selectedCoin,
}: CoinByDayDataYt) => {
  const apiUrl = String(process.env.REACT_APP_YOUTUBE_COIN_BY_DAY);
  const formattedDate = formatDate(ytSelectedDate);
  const { data, error } = useFetch(apiUrl);
  const [parseData, setParseData] = useState<CoinByDateYTProps[]>([]);
  const [parseVideoData, setParseVideoData] = useState<CoinByDateYTProps[]>([]);
  const [allDate, setAllDate] = useState<Date[]>([]);
  const [ytPieChartData, setYtPieChartData] = useState<PieChartData>({
    series: [0],
    labels: [""],
  });
  const ytMaxDate = new Date();

  useEffect(() => {
    if (data) {
      const currentData: CoinByDateYTProps[] = JSON.parse(data);
      const filterData = currentData
        .filter((data) => data.date === formattedDate)
        .sort((a, b) => Number(b.total_views) - Number(a.total_views));
      const pieChartData = formatYoutubeDataPieChart(filterData);
      setYtPieChartData(pieChartData);
      setParseData(filterData);
      const dates = currentData.map((d) => d.date);
      const localTimezoneDates = Array.from(new Set(dates)).map((dateStr) => {
        const parts = dateStr.split("-").map((part) => parseInt(part, 10));
        const year = parts[0];
        const month = parts[1] - 1;
        const day = parts[2];
        return new Date(year, month, day);
      });

      setAllDate(localTimezoneDates);
    }
  }, [data, formattedDate]);

  useEffect(() => {
    console.log("youtube parse data: ", parseData);
  }, [parseData]);

  const columnHelper = createColumnHelper<CoinByDateYTProps>();
  const columns = [
    columnHelper.accessor("coin", {
      header: "Coin",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("num_videos", {
      header: "Numbers of Videos",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("sentiment", {
      header: "Sentiment",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("total_views", {
      header: "Total Views",
      cell: (info) => info.getValue(),
    }),
  ];

  useEffect(() => {
    if (videoFetchData) {
      console.log("if video data: ", videoFetchData);
      setParseVideoData(JSON.parse(videoFetchData));
    }
  }, [videoFetchData]);

  useEffect(() => {
    console.log("video data: ", parseVideoData);
  }, [parseVideoData]);

  if (error) {
    console.error("Error fetching coin by day yt data: ", error);
    toast.error(error);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        {parseData !== undefined && parseData.length > 0 ? (
          <DataTableWithPieChart
            data={parseData}
            columns={columns}
            coin={selectedCoin}
            startDate={ytSelectedDate}
            setStartDate={setYtSelectedData}
            maxDate={ytMaxDate}
            series={ytPieChartData.series}
            labels={ytPieChartData.labels}
            handleRowClicked={handleRowClicked}
            selectedCoin={selectedCoin}
            expandYoutubeTableBody={true}
            youtubeExpandData={parseVideoData}
            allDate={allDate}
          />
        ) : (
          <div className="space-y-4 flex-1 flex items-center justify-center flex-col">
            <h3 className="font-extrabold text-xl md:text-2xl">
              Top Coins By Day
            </h3>
            <CoinDataTable
              data={parseData}
              columns={columns}
              startDate={ytSelectedDate}
              setStartDate={setYtSelectedData}
              allDate={allDate}
              handleRowClicked={handleRowClicked}
              selectedCoin={selectedCoin}
              expandYoutubeTableBody={true}
              youtubeExpandData={parseVideoData}
              setParseVideoData={setParseVideoData}
            />
          </div>
        )}
      </div>
      {/* <DataTableModal
        data={parseVideoData}
        columns={modalColumns}
        isOpen={isOpenYtModal}
        closeModal={closeCoinByDateModalYt}
      /> */}
    </>
  );
};

export default CoinByDayYT;
