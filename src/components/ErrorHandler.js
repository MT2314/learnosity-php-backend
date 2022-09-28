import * as React from "react";

function ErrorHandler({ error }) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export default ErrorHandler;
