import { toast } from "react-toastify";
import { formatDate, useFetch } from "../utils/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { CoinByDateYTProps, CoinByDayDataYt } from "../utils/interface";
import { CoinDataTable } from "../twitter/coinsByDayTWT";
import { TopicContainer, TwitterTableName } from "../twitter/twitterStyle";
import DataTableModal from "../table/modal";

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
  const { data, error } = useFetch(apiUrl, { date: formattedDate });
  let parseData: CoinByDateYTProps[] = [];

  // console.log("selected coin: ", selectedCoinYt);

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
          <TwitterTableName
            onClick={() => openCoinByDateModalYt(info.row.original.coin)}
          >
            View More
          </TwitterTableName>
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
          <TwitterTableName href={youtubeLink} target="_blank">
            {row.title}
          </TwitterTableName>
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

  if (data) {
    parseData = JSON.parse(data);
    console.log("yt data: ", parseData);
  }

  let parseVideoData: CoinByDateYTProps[] = [];
  if (videoFetchData) {
    parseVideoData = JSON.parse(videoFetchData);
    // console.log("fetch parse data: ", parseVideoData);
  }

  if (error) {
    console.error("Error fetching coin by day yt data: ", error);
    toast.error(error);
  }

  return (
    <>
      <TopicContainer>
        <CoinDataTable
          data={parseData}
          columns={columns}
          startDate={ytSelectedDate}
          setStartDate={setYtSelectedData}
          modal={false}
        />
      </TopicContainer>
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
