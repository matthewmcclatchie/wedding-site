interface Rsvp {
  name: string
  email: string
  attending: boolean
  song?: string
  meal?: string
  dietary?: string
  question?: string
}

type FetchStatus = "initial" | "pending" | "success" | "error"
