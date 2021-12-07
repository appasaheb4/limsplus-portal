import { gql } from "@apollo/client"

export const LIST_PATIENT_MANAGER = gql`
  mutation($input: PatientManagerInput!) {
    patientManagers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        pId
        mobileNo
        birthDate
        title
        firstName
        middleName
        lastName
        sex
        species
        breed
        usualDoctor
        history
        extraData {
          address
          postcode
          city
          state
          country
          email
          isMobileAndWhatsApp
          whatsappNumber
          permanent
          vip
          confidental
          photograph
          signature
          bloodGroup
          height
          weight
          followUp
          comments
          fyiLine
          balance
          accountType
          enteredBy
          status
          environment
        }
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`

export const CREATE_PATIENT_MANAGER = gql`
  mutation($input: CreatePatientManagerInput!) {
    createPatientManager(input: $input) {
      success
      message
    }
  }
`

export const REMOVE_BANNERS = gql`
  mutation($input: RemoveBannerInput!) {
    removeBanner(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_BANNER = gql`
  mutation($input: UpdateBannerInput!) {
    updateBanner(input: $input) {
      success
      message
    }
  }
`

export const UPDATE_BANNER_IMAGE = gql`
  mutation($input: UpdateBannerInput!) {
    updateBannerImage(input: $input) {
      success
      message
    }
  }
`

export const FILTER = gql`
  mutation($input: BannerInput!) {
    filterBanners(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        title
        image
        environment
      }
    }
  }
`
