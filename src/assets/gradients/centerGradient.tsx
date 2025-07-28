type TCenterGradient = {
  color?: string;
  className?: string;
};

const CenterGradient = ({ color = "#000000", className }: TCenterGradient) => {
  return (
    <svg
      width="419"
      height="120"
      viewBox="0 0 419 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g opacity="0.33" filter="url(#filter0_f_1_2078)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M211.96 124.309C240.518 129.343 278.274 117.285 292.168 144.216C306.412 171.825 284.447 205.555 268.17 233.258C253.664 257.948 234.626 279.626 208.527 286.573C181.195 293.847 149.489 291.582 131.265 269.698C114.451 249.507 126.596 218.598 128.877 190.924C131.014 164.997 124.037 133.872 143.766 118.055C163.487 102.242 188.348 120.146 211.96 124.309Z"
          fill={color}
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1_2078"
          x="0.501953"
          y="-10.3553"
          width="418.26"
          height="422.652"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="61"
            result="effect1_foregroundBlur_1_2078"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CenterGradient;
