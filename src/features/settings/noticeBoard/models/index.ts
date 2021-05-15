export interface NoticeBoard {
  _id?: string
  lab?: string
  header?: string
  message?: string
  action?: "login" | "logout"
}
