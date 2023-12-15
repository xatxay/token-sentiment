import { toast } from "react-toastify";
import { sentimentFormatted, useFetch } from "../utils/utils";
import {
  BackgroundTable,
  RightContainer,
  TwitterTableName,
} from "./twitterStyle";
import {
  SentimentByInfluencer,
  SentimentByUserProps,
  TwitterInfluencers,
} from "../utils/interface";
import { ChangeEvent, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../table/dataTable";
import { DropDownMenu, DropDownOptions } from "../table/dropdownStyle";

const SentimentByUser = () => {
  const defaultUser = "Awawat_Trades";
  const [username, setUsername] = useState<string>(defaultUser);
  const apiUrl = String(process.env.REACT_APP_SENTIMENT_BY_USER);
  const apiUrlInfluencers = String(process.env.REACT_APP_SENTIMENT_USERS);
  const { data, error, loading } = useFetch(apiUrl, { username: username });
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
          return <TwitterTableName>{formattedSentiment}</TwitterTableName>;
        },
      }),
      columnHelper.accessor("tweet_url", {
        header: "Link",
        cell: (info) => {
          return (
            <TwitterTableName
              href={info.row.original.tweet_url}
              target="_blank"
            >
              Link
            </TwitterTableName>
          );
        },
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columnHelper, username]
  );

  if (!loading && parseData.length === 0) {
    console.log("no data: ", parseData);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || userError) {
    toast.error(error || userError);
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
      <RightContainer>
        <BackgroundTable>
          <h3>Sentiment By User</h3>
          {data && data.length > 0 ? (
            <>
              <DropDownMenu value={username} onChange={handleSelectUser}>
                {twitterInfluencers.map((influencer) => {
                  return (
                    <DropDownOptions key={influencer} value={influencer}>
                      {influencer}
                    </DropDownOptions>
                  );
                })}
              </DropDownMenu>
              <DataTable data={data} columns={columns} />
            </>
          ) : (
            <>
              <DropDownMenu value={username} onChange={handleSelectUser}>
                {twitterInfluencers.map((influencer) => {
                  return (
                    <DropDownOptions key={influencer} value={influencer}>
                      {influencer}
                    </DropDownOptions>
                  );
                })}
              </DropDownMenu>
              <h1>Please select a different user</h1>
            </>
          )}
        </BackgroundTable>
      </RightContainer>
    </>
  );
};

export default SentimentByUser;
