import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Video from "../components/Video/Video";

// Setup/teardown
// https://reactjs.org/docs/testing-recipes.html#setup--teardown
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// Mock data
const mockDataYouTube = {
  type: "youTube",
  videoUrl: "3m6d99GDARE",
  transcript: {
    blocks: [
      {
        key: "d3ktl",
        text: "Polkaroo",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
  caption: {
    blocks: [
      {
        key: "d3ktl",
        text: "Polkaroo YouTube video",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
  credit: {
    blocks: [
      {
        key: "d3ktl",
        text: "Polkadot Door",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
};

const mockDataBrightcove = {
  type: "brightcove",
  brightcoveAccountId: "",
  brightcoveVideoId: "",
  transcript: "",
  credit: "",
  caption: "",
};

xdescribe("Video", () => {
  // Test that placeholder video icon renders when no video uploaded
  it("renders Video without any given data", () => {
    render(<Video />);

    expect(screen.getByTestId("video")).toBeInTheDocument();
  });

  // Test that YouTube video renders when YouTube data provided
  it("renders Video with given data (YouTube)", () => {
    render(
      <Video
        type={mockDataYouTube.type}
        videoUrl={mockDataYouTube.videoUrl}
        transcript={mockDataYouTube.transcript}
        credit={mockDataYouTube.credit}
        caption={mockDataYouTube.caption}
      />
    );

    expect(screen.getByTestId("youTubePlayer")).toBeInTheDocument();
    expect(screen.getByTestId("videoTranscript")).not.toHaveTextContent(
      "Humpty"
    );
    expect(screen.getByTestId("videoTranscript")).toHaveTextContent("Polkaroo");
    expect(screen.getByTestId("videoCaption")).not.toHaveTextContent("Dumpty");
    expect(screen.getByTestId("videoCaption")).toHaveTextContent(
      "Polkaroo YouTube video"
    );
    expect(screen.getByTestId("videoCredit")).not.toHaveTextContent("Bibble");
    expect(screen.getByTestId("videoCredit")).toHaveTextContent(
      "Polkadot Door"
    );
  });

  // Test that Brightcove video renders when account ID/video ID provided
});
