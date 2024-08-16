import React, { useRef } from 'react';
import {
  GeneflowLabHeader,
  GeneflowLabHeaderBilling,
  GeneflowLabFooter,
  GeneflowLabFooterBilling,
  AarvakDiagnosticCenterHeader,
  AarvakDiagnosticCenterFooter,
} from '@/features/report-builder/report-template/components/molecules/pdf/company';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';

export const getHeaderAndFooter = (companyCode, details) => {
  switch (companyCode) {
    case 'GENEFLOW':
      return {
        header: <GeneflowLabHeader data={details} />,
        footer: <GeneflowLabFooter data={details} />,
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
        header: <GeneflowLabHeaderBilling data={details} />,
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

export const getBarCode = (variable: any = 'https://www.limsplus.co.in') => {
  let canvas: any = '';
  canvas = document.createElement('canvas');
  JsBarcode(canvas, variable?.toString(), {
    lineColor: '#000',
    displayValue: true,
    height: 30,
  });
  return canvas.toDataURL();
};

export const getQRCode = (variable: any) => {
  let canvas: any = '';
  canvas = document.createElement('canvas');
  QRCode.toCanvas(canvas, variable?.toString());
  return canvas.toDataURL();
};
