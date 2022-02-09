import { useState } from "react"
import { useForm } from "react-hook-form"
import { SIMPLE_EMAIL_REGEX } from "../../utils/email"

export const ContactForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm()
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("initial")

  const onSubmit = async (data: any) => {
    setFetchStatus("pending")

    try {
      await fetch(`${process.env.REACT_APP_CLOUDFRONT_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      setFetchStatus("success")
      reset()
    } catch (error) {
      console.log("error", error)
      setFetchStatus("error")
    }
  }

  return (
    <div>
      {fetchStatus === "pending" && <p>Is currently loading...</p>}

      {fetchStatus === "success" && <p>Form submitted successfully</p>}

      {fetchStatus === "error" && (
        <p>
          There was a problem, please check the form and try again, or contact
          Matt or Steph
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name", { required: true })} />
          {errors?.name && "name is required"}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register("email", {
              required: true,
              pattern: SIMPLE_EMAIL_REGEX,
            })}
          />

          {errors?.email?.type === "required" && "email is required"}
          {errors?.email?.type === "pattern" && "doesn't look quite right"}
        </div>

        <div>
          <label htmlFor="question">Question</label>
          <textarea id="question" {...register("message")}></textarea>
        </div>

        <button disabled={fetchStatus === "pending"} type="submit">
          click
        </button>
      </form>
    </div>
  )
}

export default ContactForm
