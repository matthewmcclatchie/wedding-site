import { useEffect, useState, useRef } from "react"
import classNames from "classnames"
import { nanoid } from "nanoid"
import { useForm } from "react-hook-form"
import { Rsvp } from "../Rsvp"
import { prepareRsvpData } from "../../utils/rsvp"
import styles from "./RsvpForm.module.css"

export const RsvpForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    trigger,
    reset,
    getValues,
    formState: { errors },
  } = useForm()
  const [rsvps, setRsvps] = useState<string[]>([])
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("initial")
  const hasErrors = Object.keys(errors).length > 0
  const rsvpRef = useRef<HTMLDivElement>(null)

  const executeScroll = () =>
    rsvpRef.current && rsvpRef.current.scrollIntoView()

  const onSubmit = async (data: any) => {
    setFetchStatus("pending")

    try {
      await fetch(`${process.env.REACT_APP_CLOUDFRONT_URL}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prepareRsvpData(data)),
      })

      setFetchStatus("success")
      reset()
    } catch (error) {
      console.log("error", error)
      setFetchStatus("error")
    }
  }

  const addRsvp = () => {
    setRsvps([...rsvps, nanoid()])
  }

  const removeRsvp = (target: string) => {
    setRsvps(rsvps.filter((rsvp) => rsvp !== target))
  }

  const resetForm = () => {
    setFetchStatus("initial")
  }

  useEffect(() => {
    addRsvp()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("hello")
    executeScroll()
  }, [fetchStatus])

  return (
    <section id="rsvp" className={styles.background}>
      <div
        ref={rsvpRef}
        className={classNames(styles.wrapper, {
          [styles.wrapperCentered]: fetchStatus !== "initial",
        })}
      >
        <div className={styles.intro}>
          <h2 className={styles.title}>RSVP</h2>
          <p>
            We'd love to have our numbers confirmed by the beginning of{" "}
            <strong>August.</strong>
          </p>
          <p>
            Please respond for each member of your party in the form, so that we
            can confirm final numbers and any dietary requirements.
          </p>
          <p>Contact Matt or Steph if you have any problems.</p>
          <p>We can't wait to see you!</p>
        </div>

        <div className={styles.main}>
          {fetchStatus === "pending" && (
            <div className={styles.message}>
              <svg
                version="1.1"
                className={styles.messageLoadingIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
              >
                <path
                  id="spinner"
                  d="M40,72C22.4,72,8,57.6,8,40C8,22.4, 22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2 s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6, 28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z"
                ></path>
              </svg>
              <p>
                <strong>Hold on a sec...</strong>
              </p>
            </div>
          )}

          {fetchStatus === "success" && (
            <div className={styles.message}>
              <p>
                🎉 <strong>Thank you very much!</strong>
              </p>
              <p>Your RSVP has been sent.</p>
            </div>
          )}

          {fetchStatus === "error" && (
            <div className={styles.message}>
              <p>Oh no, there was a problem! 😩</p>
              <p>
                Please check the form and try again, or contact Matt or Steph.
              </p>
              <button className={styles.controlSubmit} onClick={resetForm}>
                Try again
              </button>
            </div>
          )}

          {fetchStatus === "initial" && (
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              {rsvps.map((rsvp, index) => {
                return (
                  <Rsvp
                    key={rsvp}
                    id={rsvp}
                    register={register}
                    errors={errors[rsvp]}
                    trigger={trigger}
                    handleRemove={removeRsvp}
                    getValues={getValues}
                    index={index}
                  />
                )
              })}

              {hasErrors && (
                <p className={styles.errors}>
                  Please fix the errors above to submit
                </p>
              )}

              <div
                className={classNames({
                  [styles.controlsMutliple]: Boolean(rsvps.length),
                })}
              >
                <button
                  type="button"
                  className={styles.controlAdd}
                  onClick={addRsvp}
                >
                  {rsvps.length ? "Add another guest" : "Add a guest"}
                </button>

                {Boolean(rsvps.length) && (
                  <button className={styles.controlSubmit} type="submit">
                    {rsvps.length > 1
                      ? `Send ${rsvps.length} RSVPs`
                      : "Send RSVP"}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default RsvpForm
