import { useForm } from "react-hook-form"
import { SIMPLE_EMAIL_REGEX } from "../../utils/email"

export const ContactForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    reset()
  }

  return (
    <div className="App">
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

        <button type="submit">click</button>
      </form>
    </div>
  )
}

export default ContactForm
