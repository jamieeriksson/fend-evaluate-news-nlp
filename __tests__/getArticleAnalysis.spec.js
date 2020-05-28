import { TestScheduler } from "jest";

describe("Get Article Analysis function", () => {
  test("it should return an object with Aylien API article analysis results", () => {
    const input =
      "https://ultiworld.com/2020/05/21/callahan-2020-handicapping-the-mens-division/";
    const output = {
      article: {
        url:
          "https://ultiworld.com/2020/05/21/callahan-2020-handicapping-the-mens-division/",
        title: "Callahan 2020: Handicapping The Men's Division",
      },
      sentiment: {
        polarity: "positive",
        subjectivity: "unknown",
        polarityConfidence: 0.8964918851852417,
        subjectivityConfidence: 0,
      },
    };

    expect(getArticleAnalysis(url)
  });
});
