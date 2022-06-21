import { useState } from "react"
import classNames from "classnames"
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form"
import { SIMPLE_EMAIL_REGEX } from "../../utils/email"
import styles from "./Rsvp.module.css"

interface RsvpProps {
  id: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  trigger: (id?: string) => Promise<boolean>
  handleRemove: (id: string) => void
  getValues: (field: string) => string | boolean
  index: number
}

export const Rsvp: React.FC<RsvpProps> = ({
  id,
  register,
  errors,
  trigger,
  handleRemove,
  getValues,
  index,
}) => {
  const [attending, setAttending] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(true)

  const handleAttending = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttending(event.target.value === "true" ? true : false)
    trigger(`${id}.attending`)
  }

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  const guestName = Boolean(getValues(`${id}.name`))
    ? getValues(`${id}.name`)
    : `Guest ${index + 1}`
  const guestAttending = getValues(`${id}.attending`)

  return (
    <fieldset
      key={id}
      className={classNames(styles.wrap, {
        [styles.wrapExpanded]: expanded,
      })}
    >
      <button
        className={classNames(styles.toggle, {
          [styles.toggleExpanded]: expanded,
        })}
        type="button"
        onClick={handleExpand}
      >
        {expanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="252"
            height="252"
            version="1.1"
            viewBox="252 252 252 252"
          >
            <path d="m413.89 321.37 46.09-46.09 16.742 16.742-46.09 46.09h25.879v23.68h-66.301v-66.301h23.68zm-75.773 109.27-46.09 46.094-16.746-16.746 46.09-46.094h-25.879v-23.684h66.305v66.309h-23.68z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="252"
            height="252"
            viewBox="252 252 252 252"
          >
            <path d="m447.04 321.71-46.09 46.09-16.746-16.742 46.094-46.09h-25.879v-23.68h66.301v66.301h-23.68zM304.97 430.29l46.094-46.094 16.746 16.746-46.098 46.094h25.883v23.684h-66.309v-66.312h23.684z" />
          </svg>
        )}
      </button>

      {!expanded && (
        <div>
          <p>
            <strong>{guestName} </strong>
            {guestAttending === "true" && "will be attending."}
            {guestAttending === "false" &&
              "will unfortunately not be attending."}
            {!guestAttending && "has not decided if they're attending yet..."}
          </p>

          {errors && (
            <p>
              There is a problem with the info for this guest, please review...
            </p>
          )}
        </div>
      )}

      <button
        className={styles.remove}
        type="button"
        onClick={() => handleRemove(id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
        </svg>
      </button>

      <div
        className={classNames(styles.fields, {
          [styles.fieldsExpanded]: expanded,
          [styles.fieldsCollapsed]: !expanded,
        })}
      >
        <div className={styles.field}>
          <label htmlFor={`${id}.name`}>Guest name</label>

          <input
            type="text"
            id={`${id}.name`}
            {...register(`${id}.name`, { required: true })}
          />
          {errors?.name && (
            <p className={styles.errorText}>👆 Guest name is required</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${id}.email`}>Email</label>
          <input
            type="email"
            id={`${id}.email`}
            {...register(`${id}.email`, {
              required: true,
              pattern: SIMPLE_EMAIL_REGEX,
            })}
          />

          {errors?.email?.type === "required" && (
            <p className={styles.errorText}>👆 Guest email is required</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className={styles.errorText}>
              🤔 Please check the email, it doesn't look quite right...
            </p>
          )}
        </div>

        <div className={classNames(styles.field, styles.fieldRadio)}>
          <div>
            <label className={styles.fieldRadioLabel}>
              Will they be attending?
            </label>
            {errors?.attending && (
              <p className={styles.errorText}>
                Please select an option &nbsp;👉
              </p>
            )}
          </div>

          <div className={styles.fieldRadioInputs}>
            <input
              {...register(`${id}.attending`, { required: true })}
              type="radio"
              value="true"
              id={`${id}.attending.yes`}
              onChange={handleAttending}
            />
            <label htmlFor={`${id}.attending.yes`}>🎉 &nbsp;Yes</label>

            <input
              {...register(`${id}.attending`, { required: true })}
              type="radio"
              value="false"
              id={`${id}.attending.no`}
              onChange={handleAttending}
            />
            <label htmlFor={`${id}.attending.no`}>😢 &nbsp;No</label>
          </div>
        </div>

        {attending && (
          <>
            <div
              className={classNames(
                styles.field,
                styles.fieldRadio,
                styles.fieldRadioLong
              )}
            >
              <div>
                <label className={styles.fieldRadioLabel}>
                  Meal preference
                </label>
                {errors?.meal && (
                  <p className={styles.errorText}>
                    Please select your preference &nbsp;👆
                  </p>
                )}
              </div>

              <div className={styles.fieldRadioInputs}>
                <input
                  {...register(`${id}.meal`, { required: true })}
                  type="radio"
                  value="Meat"
                  id={`${id}.meal.meat`}
                />
                <label htmlFor={`${id}.meal.meat`}>Meat</label>

                <input
                  {...register(`${id}.meal`, { required: true })}
                  type="radio"
                  value="Veggie"
                  id={`${id}.meal.veggie`}
                />
                <label htmlFor={`${id}.meal.veggie`}>Veggie</label>

                <input
                  {...register(`${id}.meal`, { required: true })}
                  type="radio"
                  value="Vegan"
                  id={`${id}.meal.vegan`}
                />
                <label htmlFor={`${id}.meal.vegan`}>Vegan</label>

                <input
                  {...register(`${id}.meal`, { required: true })}
                  type="radio"
                  value="Kids"
                  id={`${id}.meal.kids`}
                />
                <label htmlFor={`${id}.meal.kids`}>Kids</label>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${id}.dietary`}>Dietary requirements</label>

              <input
                type="text"
                id={`${id}.dietary`}
                {...register(`${id}.dietary`)}
                placeholder="Allergies, intollerances, etc..."
              />
            </div>

            <div className={styles.field}>
              <label htmlFor={`${id}.song`}>Reception song request</label>

              <input
                type="text"
                id={`${id}.song`}
                {...register(`${id}.song`)}
                placeholder="What would you love to hear?"
              />
            </div>
          </>
        )}
      </div>
    </fieldset>
  )
}
