import React, { useRef } from 'react';
import {
  GeneflowLabHeader,
  GeneflowLabHeaderBilling,
  GeneflowLabFooter,
  GeneflowLabFooterBilling,
  AarvakDiagnosticCenterHeader,
  AarvakDiagnosticCenterFooter,
} from '@/features/report-builder/report-template/components/molecules/pdf/company';

export const getHeaderAndFooter = (companyCode, details) => {
  switch (companyCode) {
    case 'GENEFLOW':
      return {
        header: <GeneflowLabHeader />,
        footer: <GeneflowLabFooter />,
      };
    case 'COMP0001':
      return {
        header: <AarvakDiagnosticCenterHeader />,
        footer: <AarvakDiagnosticCenterFooter />,
      };
    default:
      break;
  }
};

export const getHeaderAndFooterBilling = (companyCode, details) => {
  switch (companyCode) {
    case 'GENEFLOW':
      return {
        header: <GeneflowLabHeaderBilling />,
        footer: <GeneflowLabFooterBilling />,
      };
    case 'COMP0001':
      return {
        header: <AarvakDiagnosticCenterHeader />,
        footer: <AarvakDiagnosticCenterFooter />,
      };
    default:
      break;
  }
};
