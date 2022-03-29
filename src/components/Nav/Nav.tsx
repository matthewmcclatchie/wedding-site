import { useState } from "react"
import classNames from "classnames"

import styles from "./Nav.module.css"

export const Nav: React.FC = () => {
  const [navVisible, setNavVisible] = useState<boolean>(false)

  const handleNavVisible = () => {
    setNavVisible(!navVisible)
  }

  const handleLinkClick = () => {
    setNavVisible(false)
  }

  return (
    <nav
      className={classNames(styles.nav, {
        [styles.navOpen]: navVisible,
      })}
    >
      <button onClick={handleNavVisible} className={styles.trigger}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={styles.navArrow}
        >
          <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
        </svg>
        {navVisible ? "Close" : "Menu"}
      </button>

      <ul>
        <li>
          <a onClick={handleLinkClick} href="#venue">
            Venue
          </a>
        </li>
        <li>
          <a onClick={handleLinkClick} href="#rsvp">
            RSVP
          </a>
        </li>
        <li>
          <a onClick={handleLinkClick} href="#accommodation">
            Accommodation
          </a>
        </li>
        <li>
          <a onClick={handleLinkClick} href="#order">
            The day
          </a>
        </li>
        <li>
          <a onClick={handleLinkClick} href="#gifts">
            Gifts
          </a>
        </li>
        <li>
          <a onClick={handleLinkClick} href="#contact">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}
