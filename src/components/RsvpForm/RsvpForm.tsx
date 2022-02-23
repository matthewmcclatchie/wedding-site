import classNames from "classnames"
import { nanoid } from "nanoid"
import { useState } from "react"
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

  return (
    <section className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.intro}>
          <h2 className={styles.title}>RSVP</h2>
          <p>
            We'd love to have our numbers confirmed by{" "}
            <strong>June 2022</strong>.
          </p>
          <p>Please respond for each member of your party in the form.</p>
          <p>Contact Matt or Steph if you have any problems.</p>
          <p>We can't wait to see you!</p>
        </div>

        <div className={styles.main}>
          {fetchStatus === "pending" && <p>Is currently loading...</p>}

          {fetchStatus === "success" && <p>RSVPs submitted successfully</p>}

          {fetchStatus === "error" && (
            <p>
              There was a problem, please check the form and try again, or
              contact Matt or Steph
            </p>
          )}

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
                <button
                  className={styles.controlSubmit}
                  disabled={fetchStatus === "pending"}
                  type="submit"
                >
                  {rsvps.length > 1
                    ? `Send ${rsvps.length} RSVPs`
                    : "Send RSVP"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RsvpForm
