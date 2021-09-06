import classNames from 'classnames';
import { useId } from 'hooks';
import './index.css';

function Monogram({ highlight, className, ...props }) {
  const id = useId();
  const clipId = `monogram-clip-${id}`;

  return (
    <svg
      aria-hidden
      className={classNames('monogram', className)}
      width="40"
      height="45"
      viewBox="0 0 40 45"
      {...props}
    >

      <defs>

        <clipPath id={clipId}>

<path transform="translate(0.000000,44.000000) scale(0.100000,-0.100000)" d="M81 344 c13 -14 42 -40 63 -57 31 -25 37 -27 27 -10 -18 35 -13 37
20 9 17 -15 44 -33 60 -42 35 -18 59 -9 32 12 -15 11 -15 13 -2 8 13 -4 25 9
47 50 l30 56 -29 0 c-25 0 -33 -8 -61 -56 l-31 -56 -18 23 c-10 13 -26 39 -36
57 -16 30 -21 32 -72 32 l-54 0 24 -26z"/>
<path transform="translate(0.000000,44.000000) scale(0.100000,-0.100000)" d="M95 260 c11 -13 40 -36 65 -52 26 -17 35 -27 21 -23 l-23 7 26 -43
c14 -24 29 -45 34 -47 4 -1 20 22 34 52 l27 53 -25 12 c-35 16 -40 14 -19 -9
18 -20 17 -20 -31 1 -27 12 -67 33 -89 47 -39 25 -40 25 -20 2z"/>

        </clipPath>
      </defs>

      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className="monogram__highlight" width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
}

export default Monogram;
