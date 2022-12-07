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
    fill="none"
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
    fill="none"
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
    fill="none"
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

// Kebab
icons["kebab"] = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
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

export default icons;
