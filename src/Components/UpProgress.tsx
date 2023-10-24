import { css } from "@emotion/react";

interface ProgressBar {
  width?: number;
  max?: number;
  value?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

export const UpProgress = ({
  width = 50,
  max = 100,
  value = 100,
  color = "#F1D0CC",
  bgColor = "#F2F2F2",
  className,
}: ProgressBar) => {
  return (
    <div
      css={css`
      position: relative;
        display: block;
        width: ${width}px;
        height: 100%;
        background-color: ${bgColor};
        border-radius: 10px;
      `}
      className={`${className}`}
    >
      <div
        css={css`
        position: absolute;
        bottom: 0;
          background-color: ${color};
          width: ${width}px;
          height: ${value/max*100}%;
          border-radius: 10px;
          transition: height 0.3s ease-out;
        `}
      >
        
      </div>
    </div>
  );
};
