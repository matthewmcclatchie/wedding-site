import React, { useState } from "react"
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form"

interface RsvpProps {
  id: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  trigger: (id: string) => Promise<boolean>
}

export const Rsvp: React.FC<RsvpProps> = ({
  id,
  register,
  errors,
  trigger,
}) => {
  const [attending, setAttending] = useState<boolean>(false)

  const handleAttending = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttending(event.target.value === "true" ? true : false)
    trigger(`${id}.attending`)
  }

  return (
    <fieldset key={id}>
      <div>
        <label htmlFor={`${id}.name`}>Name</label>
        <input
          id={`${id}.name`}
          {...register(`${id}.name`, { required: true })}
        />
        {errors?.name && "name is required"}
      </div>
      <div>
        <label htmlFor={`${id}.email`}>Email</label>
        <input
          id={`${id}.email`}
          {...register(`${id}.email`, { required: true })}
        />
        {errors?.email && "email is required"}
      </div>
      <div>
        <label>Attending</label>

        <label htmlFor={`${id}.attending.yes`}>I will be attending</label>
        <input
          {...register(`${id}.attending`, { required: true })}
          type="radio"
          value="true"
          id={`${id}.attending.yes`}
          onChange={handleAttending}
        />

        <label htmlFor={`${id}.attending.no`}>I won't be attending</label>
        <input
          {...register(`${id}.attending`, { required: true })}
          type="radio"
          value="false"
          id={`${id}.attending.no`}
          onChange={handleAttending}
        />

        {errors?.attending && "please select an option"}
      </div>

      {attending && (
        <>
          <div>
            <label>Meal type</label>

            <label htmlFor={`${id}.meal.meat`}>Meat</label>
            <input
              {...register(`${id}.meal`, { required: true })}
              type="radio"
              value="Meat"
              id={`${id}.meal.meat`}
            />

            <label htmlFor={`${id}.meal.vegetarian`}>Vegetarian</label>
            <input
              {...register(`${id}.meal`, { required: true })}
              type="radio"
              value="Vegetarian"
              id={`${id}.meal.vegetarian`}
            />

            <label htmlFor={`${id}.meal.vegan`}>Vegan</label>
            <input
              {...register(`${id}.meal`, { required: true })}
              type="radio"
              value="Vegan"
              id={`${id}.meal.vegan`}
            />

            <label htmlFor={`${id}.meal.childrens`}>Childrens</label>
            <input
              {...register(`${id}.meal`, { required: true })}
              type="radio"
              value="Childrens"
              id={`${id}.meal.childrens`}
            />

            {errors?.meal && "please select an option"}
          </div>

          <div>
            <label htmlFor={`${id}.dietary`}>Dietary requirements</label>
            <input id={`${id}.dietary`} {...register(`${id}.dietary`)} />
          </div>

          <div>
            <label htmlFor={`${id}.song`}>Song</label>
            <input id={`${id}.song`} {...register(`${id}.song`)} />
          </div>

          <div>
            <label htmlFor={`${id}.question`}>Question</label>
            <input id={`${id}.question`} {...register(`${id}.question`)} />
          </div>
        </>
      )}
    </fieldset>
  )
}
