import {gql} from '@apollo/client';

export const LIST_REPORT_SECTION = gql`
  query {
    reportSections {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        srNo
        section
        documentType
        dateOfEntry
        lastUpdated
      }
    }
  }
`;
