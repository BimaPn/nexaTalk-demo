"use client"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="rgb(37 99 235)"
        options={{ showSpinner: false }}
        style={`
          #nprogress .bar {
            z-index: 12000 !important;
            background: rgb(37 99 235);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height:3px;
        }
        `}
        shallowRouting
      />
    </>
  )
}

export default ProgressBarProvider
