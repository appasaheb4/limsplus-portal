import { gql } from '@apollo/client';

export const COMPANY_LIST = gql`
  mutation ($input: BannerInput!) {
    banners(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        title
        image
        status
        environment
      }
    }
  }
`;

export const CREATE_COMPANY = gql`
  mutation ($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_COMPANY = gql`
  mutation ($input: RemoveBannerInput!) {
    removeBanner(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation ($input: UpdateBannerInput!) {
    updateBanner(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation ($input: UpdateBannerInput!) {
    updateBannerImage(input: $input) {
      success
      message
    }
  }
`;

export const FILTER = gql`
  mutation ($input: BannerInput!) {
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
        status
        environment
      }
    }
  }
`;
