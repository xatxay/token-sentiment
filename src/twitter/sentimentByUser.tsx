import { toast } from "react-toastify";
import { fetchQuery, sentimentFormatted, useFetch } from "../utils/utils";
import {
  SentimentByInfluencer,
  SentimentByUserProps,
  TwitterInfluencers,
} from "../utils/interface";
import { ChangeEvent, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../table/dataTable";
import { useQuery } from "@tanstack/react-query";
import TypewriterEffect from "../globalStyle/typewrite";

const SentimentByUser = () => {
  const defaultUser = "Awawat_Trades";
  const [username, setUsername] = useState<string>(defaultUser);
  const apiUrl = String(process.env.REACT_APP_SENTIMENT_BY_USER);
  const apiUrlInfluencers = String(process.env.REACT_APP_SENTIMENT_USERS);
  const { data, error, isLoading } = useQuery({
    queryKey: ["sentimentByUser", username],
    queryFn: () => fetchQuery(apiUrl, { username }),
  });
  const { data: twitterInfluencers, error: userError } =
    useFetch(apiUrlInfluencers);
  let parseData: SentimentByUserProps[] = [];
  let parseUser: TwitterInfluencers[] = [];
  let influencer: string[] = [];
  if (data) {
    parseData = JSON.parse(data)
      .filter(
        (sentiment: SentimentByUserProps) => sentiment.coin_sentiment !== "{}"
      )
      .sort((a: SentimentByUserProps, b: SentimentByUserProps) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }
  if (twitterInfluencers) {
    parseUser = JSON.parse(twitterInfluencers);
    influencer = parseUser.map((user) => {
      return user.username;
    });
  }

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUsername(event.target.value);
  };

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
          const formattedSentiment = sentimentFormatted(tickerSentiment);
          return <span>{formattedSentiment}</span>;
        },
      }),
      columnHelper.accessor("tweet_url", {
        header: "Link",
        cell: (info) => {
          return (
            <a
              rel="noreferrer"
              className="hover:text-white"
              href={info.row.original.tweet_url}
              target="_blank"
            >
              Link
            </a>
          );
        },
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columnHelper, username]
  );

  if (!isLoading && parseData.length === 0) {
    console.log("no data: ", parseData);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Sentiment user error: ", error);
    toast.error(error.message);
  }

  if (userError) {
    console.error("user error: ", error);
    toast.error(userError);
  }
  return (
    <SentimentByUserPlacement
      data={parseData}
      columns={columns}
      twitterInfluencers={influencer}
      username={username}
      handleSelectUser={handleSelectUser}
    />
  );
};

const SentimentByUserPlacement = ({
  data,
  columns,
  twitterInfluencers,
  username,
  handleSelectUser,
}: SentimentByInfluencer) => {
  return (
    <>
      <div className="flex items-center justify-center flex-col space-y-4">
        <h3 className="font-extrabold text-xl md:text-2xl">
          Sentiment By User
        </h3>
        {data && data.length > 0 ? (
          <>
            <select
              className="bg-gray-400 overflow-hidden max-w-20 md:max-w-44 border-none py-1 lg:py-3 text-xs md:text-base lg:p-3 box-border font-semibold text-gray-800"
              value={username}
              onChange={handleSelectUser}
            >
              {twitterInfluencers.map((influencer) => {
                return (
                  <option
                    className="text-black font-semibold"
                    key={influencer}
                    value={influencer}
                  >
                    {influencer}
                  </option>
                );
              })}
            </select>
            <DataTable data={data} columns={columns} />
          </>
        ) : (
          <>
            <select
              className="bg-gray-400 overflow-hidden max-w-20 md:max-w-44 border-none py-1 lg:py-3 text-xs md:text-base lg:p-3 box-border font-semibold text-gray-800"
              value={username}
              onChange={handleSelectUser}
            >
              {twitterInfluencers.map((influencer) => {
                return (
                  <option
                    className="text-black font-semibold"
                    key={influencer}
                    value={influencer}
                  >
                    {influencer}
                  </option>
                );
              })}
            </select>
            <h3>
              <span>
                No Data For This User
                <br /> <br />
                Please select a different user <TypewriterEffect text=":(" />
              </span>
            </h3>
          </>
        )}
      </div>
    </>
  );
};

export default SentimentByUser;
