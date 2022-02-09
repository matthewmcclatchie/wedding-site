import { nanoid } from "nanoid"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Rsvp } from "../Rsvp"
import { prepareRsvpData } from "../../utils/rsvp"

export const RsvpForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    trigger,
    reset,
    formState: { errors },
  } = useForm()
  const [rsvps, setRsvps] = useState<string[]>([])

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("initial")

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

  return (
    <div>
      <button onClick={addRsvp}>add rsvp</button>

      {fetchStatus === "pending" && <p>Is currently loading...</p>}

      {fetchStatus === "success" && <p>RSVPs submitted successfully</p>}

      {fetchStatus === "error" && (
        <p>
          There was a problem, please check the form and try again, or contact
          Matt or Steph
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {rsvps.map((rsvp) => {
          return (
            <Rsvp
              key={rsvp}
              id={rsvp}
              register={register}
              errors={errors[rsvp]}
              trigger={trigger}
            />
          )
        })}

        <button disabled={fetchStatus === "pending"} type="submit">
          click
        </button>
      </form>
    </div>
  )
}

export default RsvpForm
