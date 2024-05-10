function ExitIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 md:w-8 md:h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function RightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 md:text-gray-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="map-marker-alt"
      className="w-[14px]"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path
        fill="#88869D"
        d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
      ></path>
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="map-marker-alt"
      className="w-6 h-6"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path
        fill="#E7E7EB"
        d="M236,120H223.66406A96.15352,96.15352,0,0,0,136,32.33618V20a8,8,0,0,0-16,0V32.33618A96.15352,96.15352,0,0,0,32.33594,120H20a8,8,0,0,0,0,16H32.33594A96.15352,96.15352,0,0,0,120,223.66382V236a8,8,0,0,0,16,0V223.66382A96.15352,96.15352,0,0,0,223.66406,136H236a8,8,0,0,0,0-16Zm-40,16h11.59912A80.14164,80.14164,0,0,1,136,207.59912V196a8,8,0,0,0-16,0v11.59912A80.14164,80.14164,0,0,1,48.40088,136H60a8,8,0,0,0,0-16H48.40088A80.14164,80.14164,0,0,1,120,48.40088V60a8,8,0,0,0,16,0V48.40088A80.14164,80.14164,0,0,1,207.59912,120H196a8,8,0,0,0,0,16Zm-28-8a40,40,0,1,1-40-40A40.04552,40.04552,0,0,1,168,128Z"
      ></path>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#616475"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      fill="#E7E7EB"
      className="w-4 h-4 m-auto "
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M29.9,28.6l-13-26c-0.3-0.7-1.4-0.7-1.8,0l-13,26c-0.2,0.4-0.1,0.8,0.2,1.1C2.5,30,3,30.1,3.4,29.9L16,25.1l12.6,4.9 c0.1,0,0.2,0.1,0.4,0.1c0.3,0,0.5-0.1,0.7-0.3C30,29.4,30.1,28.9,29.9,28.6z"></path>{" "}
      </g>
    </svg>
  );
}

export { ExitIcon, RightIcon, LocationIcon, SignalIcon, SearchIcon, ArrowIcon };
