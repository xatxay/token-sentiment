import { toast } from "react-toastify";
import {
  formatDate,
  formatYoutubeDataPieChart,
  getAllAvailableDate,
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
  ytSelectedDate,
  setYtSelectedData,
  videoFetchData,
  handleRowClicked,
  selectedCoin,
  setVideoFetchData,
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
      const localTimezoneDates = getAllAvailableDate(dates);
      setAllDate(localTimezoneDates);
    }
  }, [data, formattedDate]);

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
      console.log("video fetch string: ", typeof videoFetchData);
      setParseVideoData(JSON.parse(videoFetchData));
      setVideoFetchData("");
    }
  }, [setVideoFetchData, videoFetchData]);

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
            youtubeTable={true}
            setParseVideoData={setParseVideoData}
          />
        ) : (
          <div className="flex items-center justify-center flex-col space-y-4 flex-1 w-full">
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
              maxDate={ytMaxDate}
              youtubeTable={true}
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
