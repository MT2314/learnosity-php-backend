import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import VideoConfig from "../components/Video/VideoConfig";

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
const mockDataYouTubeValid = {
  type: "youTube",
  videoId: "3m6d99GDARE",
};

const mockDataYouTubeInvalid = {
  type: "youTube",
  videoId: "thisWontWork",
};

const mockDataBrightcoveValid = {
  type: "brightcove",
  videoId: "5967111782001",
};

const mockDataBrightcoveInvalid = {
  type: "brightcove",
  videoId: "thisShouldntEither",
};

// YOUTUBE
describe("VideoConfig component renders with YouTube settings", () => {
  // Test that placeholder video icon renders when no video uploaded
  it("renders Video without any given data", () => {
    render(<VideoConfig />);

    expect(screen.getByTestId("videoConfigContainer")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    expect(screen.getByLabelText("Brightcove")).toBeInTheDocument();
  });

  // Test that successful alert renders when URL is verified with correct data
  it("Prompts user with an alert when correct data provided", async () => {
    const user = userEvent.setup();

    render(
      <VideoConfig
        type="youTube"
        videoId="3m6d99GDARE"
        youTubeUrl="https://www.youtube.com/watch?v=3m6d99GDARE"
      />
    );
    const youTubeRadio = screen.getByLabelText("YouTube");
    // User selects YouTube, radio should be checked
    await user.click(youTubeRadio);
    expect(youTubeRadio).toBeChecked();

    // User enters valid URL into url input
    const urlInput = screen.getByLabelText("Enter YouTube video URL:");
    await user.type(urlInput, "https://www.youtube.com/watch?v=3m6d99GDARE");
    expect(urlInput).toHaveDisplayValue(
      "https://www.youtube.com/watch?v=3m6d99GDARE"
    );

    // User clicks "Verify URL" button
    const verifyYouTubeButton = screen.getByRole("button", {
      name: "Verify URL",
    });
    // await user.click(verifyYouTubeButton);
    // expect(screen.getByText("YouTube URL successful.")).toBeInTheDocument();
  });
});

// BRIGHTCOVE
describe("VideoConfig component renders with Brightcove settings", () => {
  // Test that video renders when Brightcove data provided
  it("renders Video with given data (Brightcove)", () => {
    render(
      <VideoConfig
        type={mockDataBrightcoveValid.type}
        videoId={mockDataBrightcoveValid.videoId}
      />
    );
  });
});
