import { getArticleAnalysis } from "../src/client/js/getArticleAnalysis";
import { checkURL } from "../src/client/js/incorrectURL";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        article: { url: "http://fakeurl.com", title: "Fake Article" },
        sentiment: {
          polarity: "positive",
          polarityConfidence: 0.89,
          subjectivity: "unknown",
          subjectivityConfidence: 0,
        },
      }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("Test getArticleAnalysis function and API call", () => {
  test("it should return an object with Aylien API article analysis results", async () => {
    const article = "http://fakeurl.com";
    const response = await getArticleAnalysis(article);
    const output = {
      article: { url: "http://fakeurl.com", title: "Fake Article" },
      sentiment: {
        polarity: "positive",
        polarityConfidence: 0.89,
        subjectivity: "unknown",
        subjectivityConfidence: 0,
      },
    };

    expect(response).toEqual(output);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("it should handle exception with thrown error", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API failure"));

    await expect(
      getArticleAnalysis("http://invalid url.com")
    ).rejects.toThrow();
  });
});

describe("Test checkURL function", () => {
  test("It should respond true when given url with http://", () => {
    const input = "http://nohttp.com";
    const output = true;

    expect(checkURL(input)).toEqual(output);
  });

  test("It should respond true when given url with https://", () => {
    const input = "https://nohttp.com";
    const output = true;

    expect(checkURL(input)).toEqual(output);
  });

  test("It should respond with false when given url with no https?://", () => {
    const input = "nohttp.com";
    const output = false;

    expect(checkURL(input)).toEqual(output);
  });
});
