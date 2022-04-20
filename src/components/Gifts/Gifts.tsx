import styles from "./Gifts.module.css"

export const Gifts: React.FC = () => {
  return (
    <div id="gifts" className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Gifts</h2>
        </div>

        <div className={styles.info}>
          <p>Oh hey! Just a little note on gifts...</p>
          <p>
            Having our closest friends and family with us to celebrate on our
            wedding day is all we need and we really cannot wait. We really
            appreciate that some of you are travelling a{" "}
            <strong>
              <em>very</em>
            </strong>{" "}
            long way to be with us and it really does mean the world - so thank
            you so much.
          </p>
          <p>
            In terms of <em>things...</em> we've lived together (😮 out of
            wedlock!) for a long time now and are fortunate enough to have
            pretty much everything that we need to get by.
          </p>
          <p>So...</p>
          <p>
            You'll know that we love to travel and experience new things, so
            have decided that for a honeymoon, we'd like to do a road-trip
            across California. Neither of us have been to part of America before
            and it feels like a once in a lifetime opportunity for us. We've got
            a good idea of what it will cost and we're funding it ourselves.
          </p>
          <p>
            You being there with us on the day is more than enough. Should
            anybody <em>really</em> want to send a gift, then any contribution
            toward our trip would be heartfeltly appreciated. We hope to have a
            truly unforgetable time and anything on top of what we're saving for
            would honestly be a massive bonus for us.
          </p>
          <p>Thank you very much x</p>
        </div>

        {/* <div className={styles.footer}>
          <a href="#" target="_blank" rel="noreferrer" className={styles.cta}>
            Add to travel fund
          </a>
        </div> */}
      </div>
    </div>
  )
}

export default Gifts
