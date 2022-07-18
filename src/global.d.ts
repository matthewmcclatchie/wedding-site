interface Rsvp {
  name: string
  email: string
  attending: string
  song?: string
  meal?: string
  dietary?: string
}

type FetchStatus = "initial" | "pending" | "success" | "error"
