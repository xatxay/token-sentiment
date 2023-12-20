# Token Sentiment

This project was my rework for [Token Sentiment Website](https://token-sentiment.com/). ([Video Demo](https://youtu.be/zu_Y2wRAhIE))

![image](https://github.com/xatxay/token-sentiment/assets/29783278/dc7b25a8-84bf-47ce-9a68-63096a366528)
![image](https://github.com/xatxay/token-sentiment/assets/29783278/6265168f-f657-457f-80a5-09fa4e928fe7)

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/xatxay/token-sentiment.git
cd token-sentiment
npm install
```

## Available Scripts

**Note: Input the api links in the .env file before running.**

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Improvement

-Use OpenAI speech to text to analyze youtube and tiktok videos.\
-Better sentiment score format (suggestion: -100 for most bearish 0 neutral and 100 for most bullish).\
-Use Chatgpt to analyze the data and give sentiment score (suggestion).\
-Script to fetch the followers every 24hrs.\
-Better login/authentication (use jwt with expiration so it doesn't have to call the api every refresh) .\
-Create a script to fetch twitter followers every 24hrs.\
-Change coin sentiment data to JSON format.\
-Have an option to put header/params to query specific coin data from the api instead of query all of coins data.\
-Change format for backend data handling.\
-Some data is outdated or invalid.\
