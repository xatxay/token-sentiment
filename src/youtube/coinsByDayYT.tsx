import { toast } from "react-toastify";
import { formatDate, useFetch } from "../utils/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { CoinByDateYTProps, CoinByDayDataYt } from "../utils/interface";
import { CoinDataTable } from "../twitter/coinsByDayTWT";
import DataTableModal from "../table/modal";
import { useEffect, useState } from "react";

const CoinByDayYT = ({
  openCoinByDateModalYt,
  closeCoinByDateModalYt,
  isOpenYtModal,
  selectedCoinYt,
  ytSelectedDate,
  setYtSelectedData,
  videoFetchData,
}: CoinByDayDataYt) => {
  const apiUrl = String(process.env.REACT_APP_YOUTUBE_COIN_BY_DAY);
  const formattedDate = formatDate(ytSelectedDate);
  const { data, error } = useFetch(apiUrl);
  const [parseData, setParseData] = useState<CoinByDateYTProps[]>([]);

  useEffect(() => {
    if (data) {
      const currentData: CoinByDateYTProps[] = JSON.parse(data);
      console.log("formatted date: ", formattedDate);
      setParseData(currentData.filter((data) => data.date === formattedDate));
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
      header: "Views",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("date", {
      header: "More Details",
      cell: (info) => {
        return (
          <span
            className="hover:text-white"
            onClick={() => openCoinByDateModalYt(info.row.original.coin)}
          >
            View More
          </span>
        );
      },
    }),
  ];

  const modalColumns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => {
        const row = info.row.original;
        const youtubeLink = `${String(process.env.REACT_APP_YOUTUBE_LINK)}${
          row.id
        }`;
        return (
          <a
            rel="noreferrer"
            className="hover:text-white"
            href={youtubeLink}
            target="_blank"
          >
            {row.title}
          </a>
        );
      },
    }),

    columnHelper.accessor("sentiment", {
      header: "Sentiment",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("views", {
      header: "Views",
      cell: (info) => info.getValue(),
    }),
  ];

  let parseVideoData: CoinByDateYTProps[] = [];
  if (videoFetchData) {
    parseVideoData = JSON.parse(videoFetchData);
  }

  if (error) {
    console.error("Error fetching coin by day yt data: ", error);
    toast.error(error);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <CoinDataTable
          data={parseData}
          columns={columns}
          startDate={ytSelectedDate}
          setStartDate={setYtSelectedData}
          modal={false}
        />
      </div>
      <DataTableModal
        data={parseVideoData}
        columns={modalColumns}
        isOpen={isOpenYtModal}
        closeModal={closeCoinByDateModalYt}
      />
    </>
  );
};

export default CoinByDayYT;
