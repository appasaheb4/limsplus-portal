import React, { useRef } from 'react';
import {
  GeneflowLabHeader,
  GeneflowLabFooter,
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
