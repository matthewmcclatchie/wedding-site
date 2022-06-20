import styles from "./Gifts.module.css"

export const Gifts: React.FC = () => {
  return (
    <div id="gifts" className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Gifts</h2>
        </div>

        <div className={styles.info}>
          <p>A little note on gifts...</p>
          <p>
            Having our closest friends and family with us to celebrate our
            wedding is all we need and we really cannot wait. We appreciate that
            some of you are travelling a <em>very</em> long way to be with us
            and it really does mean the world.
          </p>
          <p>
            In terms of things... we've lived together (😮 out of wedlock!) for
            a long time now and are fortunate enough to have pretty much
            everything that we need to get by.
          </p>
          <p>
            We both love travel and have booked our honeymoon for straight after
            the wedding, a road-trip across California.
          </p>
          <p>
            If you do wish to buy us a gift, we have put together a gift list of
            a few things that we hope we'll get lots of use out of at home,
            especially in the future once we're able to move house.
          </p>
          <p>
            In addition, we have included some contributions towards experiences
            which we hope will make our honeymoon a trip we'll never forget.
          </p>
        </div>

        <div className={styles.footer}>
          <a
            href="https://www.weddingshop.com/GiftList/mattandsteph"
            target="_blank"
            rel="noreferrer"
            className={styles.cta}
          >
            View our gift list
          </a>
        </div>
      </div>
    </div>
  )
}

export default Gifts
