import { gql } from "@apollo/client"

export const UPDATE_SHORTCUT_MENU = gql`
  mutation($input: UserInput!) {
    updateShortcutMenu(input: $input) {
      success
      message
      data
    }
  }
`
