import React from "react";
import ReactQuill from "react-quill";

const icons = ReactQuill.Quill.import("ui/icons");

// Add Column
icons["addRow"] = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#0000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" fill="none" />
    <path
      d="M12.5001 15.6836L12.5001 10.9693L17.2144 10.9693L17.2144 9.39788L12.5001 9.39788L12.5001 4.68359L10.9286 4.68359L10.9286 9.39788L6.21436 9.39788L6.21436 10.9693L10.9286 10.9693L10.9286 15.6836L12.5001 15.6836Z"
      fill="#232323"
    />
    <path
      d="M12.4796 19.2142L19.2144 19.2142L19.2144 17.6837L12.4796 17.6836L10.949 17.6837L4.21436 17.6836L4.21436 19.2142L10.949 19.2142L12.4796 19.2142Z"
      fill="#232323"
    />
  </svg>
);

// Add Column
icons["addColumn"] = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" fill="none" />
    <path
      d="M16 13.2857H11.2857V18H9.71429V13.2857H5V11.7143H9.71429V7H11.2857V11.7143H16V13.2857Z"
      fill="#232323"
    />
    <path
      d="M18.5306 13.2652V20H17.0001L17 13.2652L17.0001 11.7346L17 5H18.5306V11.7346V13.2652Z"
      fill="#232323"
    />
  </svg>
);

// Arrow Down
icons["arrowDown"] = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4352_42874)">
      <path
        d="M20 12L18.59 10.59L13 16.17V4H11V16.17L5.42 10.58L4 12L12 20L20 12Z"
        fill="#232323"
      />
    </g>
    <defs>
      <clipPath id="clip0_4352_42874">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// Arrow Up
icons["arrowUp"] = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4352_42873)">
      <path
        d="M4 12L5.41 13.41L11 7.83V20H13V7.83L18.58 13.42L20 12L12 4L4 12Z"
        fill="#232323"
      />
    </g>
    <defs>
      <clipPath id="clip0_4352_42873">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// Arrow Left
icons["arrowLeft"] = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4352_42870)">
      <path
        d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
        fill="#232323"
      />
    </g>
    <defs>
      <clipPath id="clip0_4352_42870">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// Arrow Right
icons["arrowRight"] = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4352_42871)">
      <path
        d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
        fill="#232323"
      />
    </g>
    <defs>
      <clipPath id="clip0_4352_42871">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// Alignment ("align" is default for left-alignment)
icons["align"] = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="#000"
  >
    <path d="M10.6667 10.6667H0V12.4444H10.6667V10.6667ZM10.6667 3.55556H0V5.33333H10.6667V3.55556ZM0 8.88889H16V7.11111H0V8.88889ZM0 16H16V14.2222H0V16ZM0 0V1.77778H16V0H0Z" />
  </svg>
);

icons["center"] = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.55556 10.6667V12.4444H12.4444V10.6667H3.55556ZM0 16H16V14.2222H0V16ZM0 8.88889H16V7.11111H0V8.88889ZM3.55556 3.55556V5.33333H12.4444V3.55556H3.55556ZM0 0V1.77778H16V0H0Z" />
  </svg>
);

icons["right"] = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 16H16V14.2222H0V16ZM5.33333 12.4444H16V10.6667H5.33333V12.4444ZM0 8.88889H16V7.11111H0V8.88889ZM5.33333 5.33333H16V3.55556H5.33333V5.33333ZM0 0V1.77778H16V0H0Z" />
  </svg>
);
icons["top"] = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4206_40253)">
      <path
        d="M4 12.8889H20V11.1111H4V12.8889ZM7.55556 7.55556V9.33333H16.4444V7.55556H7.55556ZM4 4V5.77778H20V4H4Z"
        fill="#232323"
      />
    </g>
    <defs>
      <clipPath id="clip0_4206_40253">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
icons["middle"] = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4207_40256)">
      <path
        d="M4 16.8889H20V15.1111H4V16.8889ZM7.55556 11.5556V13.3333H16.4444V11.5556H7.55556ZM4 8V9.77778H20V8H4Z"
        fill="#232323"
      />
    </g>
    <defs>
      <clipPath id="clip0_4207_40256">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
icons["bottom"] = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4207_40259)">
      <path
        d="M4 19.8889H20V18.1111H4V19.8889ZM7.55556 14.5556V16.3333H16.4444V14.5556H7.55556ZM4 11V12.7778H20V11H4Z"
        fill="#232323"
      />
    </g>
    <defs>
      <clipPath id="clip0_4207_40259">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
// Kebab
icons["kebab"] = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4352_42876)">
      <path
        d="M9.99998 6.66683C10.9166 6.66683 11.6666 5.91683 11.6666 5.00016C11.6666 4.0835 10.9166 3.3335 9.99998 3.3335C9.08331 3.3335 8.33331 4.0835 8.33331 5.00016C8.33331 5.91683 9.08331 6.66683 9.99998 6.66683ZM9.99998 8.3335C9.08331 8.3335 8.33331 9.0835 8.33331 10.0002C8.33331 10.9168 9.08331 11.6668 9.99998 11.6668C10.9166 11.6668 11.6666 10.9168 11.6666 10.0002C11.6666 9.0835 10.9166 8.3335 9.99998 8.3335ZM9.99998 13.3335C9.08331 13.3335 8.33331 14.0835 8.33331 15.0002C8.33331 15.9168 9.08331 16.6668 9.99998 16.6668C10.9166 16.6668 11.6666 15.9168 11.6666 15.0002C11.6666 14.0835 10.9166 13.3335 9.99998 13.3335Z"
        fill="#232323"
      />
    </g>
    <defs>
      <clipPath id="clip0_4352_42876">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default icons;
