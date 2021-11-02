export interface Confirm {
  show?: boolean
  type?: string
  id?: string | string[]
  title?: string
  body?: string
}

export interface SelectedCategory {
  category?: string
  item?: string
}

export interface SelectedComponent {
  icon: string
  name: string
  path: string
  permission: any[]
  title: string
  toggle: boolean
}
