import ICalendarLink from "react-icalendar-link"
import classNames from "classnames"

import styles from "./Hero.module.css"

const event = {
  title: "😘 Steph and Matt's Wedding!",
  description: "Wedding and Reception at Middleton Lodge Estate",
  startTime: "2022-10-09T12:30:00",
  endTime: "2022-10-09T23:59:00",
  location: `Middleton Lodge Estate \\, DL10 6NJ`,
  url: "https://stephandmattswedding.co.uk/",
}

const raw = `
BEGIN:VALARM
TRIGGER:-P7D
ACTION:DISPLAY
DESCRIPTION:😘 Steph and Matt's Wedding!
END:VALARM
`

export const Hero: React.FC = () => {
  return (
    <div id="hero" className={styles.background}>
      <img
        src="leaf-watermark.png"
        alt="Fig leaf"
        className={classNames(styles.leaf, styles.leaf1)}
      />
      <img
        src="leaf-watermark.png"
        alt="Fig leaf"
        className={classNames(styles.leaf, styles.leaf2)}
      />
      <img
        src="leaf-watermark.png"
        alt="Fig leaf"
        className={classNames(styles.leaf, styles.leaf3)}
      />

      <div className={styles.wrapper}>
        <h1 className={styles.header}>
          Steph <span className={styles.amp}>&amp;</span> Matt
        </h1>
        <h2 className={styles.header2}>We're getting married!</h2>
        <h2 className={styles.header2}>Sunday 9th October 2022 - 1.30pm</h2>

        <ICalendarLink
          event={event}
          className={styles.cta}
          filename="Wedding of Stephanie Wharton and Matthew McClatchie.ics"
          rawContent={raw}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="200"
            height="200"
          >
            <path d="M7 1a1 1 0 0 0-1 1v1H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V2a1 1 0 0 0-2 0v1H8V2a1 1 0 0 0-1-1zM5 8h14v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8z" />
          </svg>
          Add to Calendar
        </ICalendarLink>
      </div>
    </div>
  )
}

export default Hero
