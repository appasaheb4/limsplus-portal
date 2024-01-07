import { gql } from '@apollo/client';

export const GET_BANNER_LIST_ALL = gql`
  mutation ($input: BannerInput!) {
    bannersListAll(input: $input) {
      success
      message
      data {
        title
        image
        order
        isTitle
      }
    }
  }
`;

export const BANNER_LIST = gql`
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
        order
        isTitle
        companyCode
        status
        environment
      }
    }
  }
`;

export const CREATE_BANNER = gql`
  mutation ($input: CreateBannerInput!) {
    createBanner(input: $input) {
      success
      message
    }
  }
`;

export const REMOVE_BANNERS = gql`
  mutation ($input: RemoveBannerInput!) {
    removeBanner(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_BANNER = gql`
  mutation ($input: UpdateBannerInput!) {
    updateBanner(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_BANNER_IMAGE = gql`
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
        order
        isTitle
        companyCode
        status
        environment
      }
    }
  }
`;
