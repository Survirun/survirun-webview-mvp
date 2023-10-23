import { css } from "@emotion/react";

interface ProgressBar {
  width?: number;
  height?: number;
  max?: number;
  value?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

export const UpProgress = ({
  width = 50,
  height = 100,
  max = 100,
  value = 100,
  color = "#F1D0CC",
  bgColor = "#F2F2F2",
  className,
}: ProgressBar) => {
  return (
    <progress
      max={max}
      value={value}
      css={css`
        appearance: none;
        transform: rotate(-90deg);
        width: ${height}px;
        height: ${width}px;
        transform-origin: top left;
        margin-top: ${height}px;
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
