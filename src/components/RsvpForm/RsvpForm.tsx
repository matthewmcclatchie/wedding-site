import { nanoid } from "nanoid"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Rsvp } from "../Rsvp"

export const RsvpForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    trigger,
    reset,
    formState: { errors },
  } = useForm()
  const [rsvps, setRsvps] = useState<string[]>([])

  const onSubmit = (data: any) => {
    console.log(data)
    reset()
  }

  const addRsvp = () => {
    setRsvps([...rsvps, nanoid()])
  }

  return (
    <div className="App">
      <button onClick={addRsvp}>add rsvp</button>

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

        <button type="submit">click</button>
      </form>
    </div>
  )
}

export default RsvpForm
