import React from 'react';

type LogoSVGProps = {
  size?: number;
  color?: string;
  className?: string;
};

const LogoSVG = ({ size, color, className }: LogoSVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_1016_16235)">
        <path
          d="M42.9512 27.4866L57.2404 13.0067L50.9563 6.63574L36.4461 21.343V0H27.5572V21.3362L13.0471 6.63235L6.76292 13.0034L21.0521 27.4832H0V36.7189H8.44361C11.9791 36.7189 15.3706 35.3103 18.2465 32.6391L22.3545 28.8205L22.4449 28.7391C22.86 28.3521 23.2919 27.9924 23.7305 27.6631C24.9458 26.7399 26.2582 26.0237 27.6275 25.5383C28.6654 25.1684 29.7368 24.9307 30.8048 24.8323C31.6116 24.761 32.4118 24.7644 33.1885 24.8425C34.2632 24.9511 35.3346 25.1955 36.3658 25.5723C37.6983 26.061 38.9738 26.7636 40.159 27.6631C40.5675 27.9652 40.9893 28.3182 41.4447 28.7357L45.6464 32.6391C48.5189 35.307 51.9071 36.7189 55.4459 36.7189H63.9966V27.4832H42.9479L42.9512 27.4866Z"
          fill={color}
        />
        <path
          d="M42.9512 27.4866L57.2404 13.0067L50.9563 6.63574L36.4461 21.343V0H27.5572V21.3362L13.0471 6.63235L6.76292 13.0034L21.0521 27.4832H0V36.7189H8.44361C11.9791 36.7189 15.3706 35.3103 18.2465 32.6391L22.3545 28.8205L22.4449 28.7391C22.86 28.3521 23.2919 27.9924 23.7305 27.6631C24.9458 26.7399 26.2582 26.0237 27.6275 25.5383C28.6654 25.1684 29.7368 24.9307 30.8048 24.8323C31.6116 24.761 32.4118 24.7644 33.1885 24.8425C34.2632 24.9511 35.3346 25.1955 36.3658 25.5723C37.6983 26.061 38.9738 26.7636 40.159 27.6631C40.5675 27.9652 40.9893 28.3182 41.4447 28.7357L45.6464 32.6391C48.5189 35.307 51.9071 36.7189 55.4459 36.7189H63.9966V27.4832H42.9479L42.9512 27.4866Z"
          fill={color}
        />
        <path
          d="M52.406 55.747L34.424 39.9163C32.9777 38.6435 30.8316 38.6435 29.3853 39.9163L11.4033 55.747L5.57446 48.9416L22.7463 33.8237C27.9992 29.2007 35.8067 29.2007 41.0597 33.8237L58.2315 48.9416L52.4027 55.747H52.406Z"
          fill={color}
        />
        <path
          d="M52.406 55.747L34.424 39.9163C32.9777 38.6435 30.8316 38.6435 29.3853 39.9163L11.4033 55.747L5.57446 48.9416L22.7463 33.8237C27.9992 29.2007 35.8067 29.2007 41.0597 33.8237L58.2315 48.9416L52.4027 55.747H52.406Z"
          fill={color}
        />
        <path
          d="M36.3523 63.7575H27.4634V52.2409C27.4634 49.7529 29.4521 47.7367 31.9061 47.7367C34.3602 47.7367 36.3489 49.7529 36.3489 52.2409V63.7575H36.3523Z"
          fill={color}
        />
        <path
          d="M36.3523 63.7575H27.4634V52.2409C27.4634 49.7529 29.4521 47.7367 31.9061 47.7367C34.3602 47.7367 36.3489 49.7529 36.3489 52.2409V63.7575H36.3523Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1016_16235">
          <rect width={size} height={size} fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LogoSVG;

// Add defualt propes for LogoSVG
LogoSVG.defaultProps = {
  size: 64,
  color: '#ffffff',
};