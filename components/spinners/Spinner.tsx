import React from 'react'
import styles from "./Spinner.module.scss"

type SpinnerProps = {
  color?: "white" | "violet"
  size?: "normal" | "small"
}

export default function Spinner({color="white", size="normal"}: SpinnerProps) {
  return (
    <div className={`${styles["lds-dual-ring"]} ${styles[color]} ${styles[size]}`}></div>
  )
}
