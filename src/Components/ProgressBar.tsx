import { css } from '@emotion/react'

interface ProgressBar {
  max?: number;
  value?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

export const ProgressBar = ({ max = 100, value = 100, color="#F1D0CC", bgColor ="#F2F2F2", className }: ProgressBar) => {
  return (
    <progress
      max={max}
      value={value}
      css={css`
        appearance: none;
        &::-webkit-progress-bar {
          background: ${bgColor};
          border-radius: 10px;
        }
        &::-webkit-progress-value {
          border-radius: 10px;
          background: ${color};
        }
      `}
      className={`${className}`}
    />
  );
};
