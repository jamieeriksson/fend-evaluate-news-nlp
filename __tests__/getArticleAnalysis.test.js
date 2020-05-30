import regeneratorRuntime from "regenerator-runtime";
import { getArticleAnalysis } from "../src/client/js/getArticleAnalysis";
import { analyze } from "../src/client/main";

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

  await expect(getArticleAnalysis("http://invalid url.com")).rejects.toThrow();
});
