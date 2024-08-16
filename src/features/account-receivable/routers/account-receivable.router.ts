import async from '@/layouts/components/async.component';
const TransactionDetails = async(
  () => import('../transaction-details/screens/transaction-details.screen'),
);
const Payment = async(() => import('../payment/screens/payment.screen'));
const OpenBatch = async(
  () => import('../open-batch/screens/open-batch.screen'),
);
const Receipt = async(() => import('../receipt/screens/receipt.screen'));
const BillSummary = async(
  () => import('../bill-summary/screens/bill-summary.screen'),
);

export const accountReceivableRoutes = {
  path: '/account-receivable',
  name: 'Account Receivable',
  title: 'ACCOUNT RECEIVABLE',
  order: 2,
  icon: 'MdAccountBalance',
  children: [
    {
      path: '/account-receivable/transaction-details',
      name: 'Transaction Details',
      icon: 'RiCouponLine',
      component: TransactionDetails,
    },
    {
      path: '/account-receivable/payment',
      name: 'Payment',
      icon: 'BsPiggyBank',
      component: Payment,
    },
    {
      path: '/account-receivable/open-batch',
      name: 'Open Batch',
      icon: 'MdOutlineBatchPrediction',
      component: OpenBatch,
    },
    {
      path: '/account-receivable/receipt',
      name: 'Receipt',
      icon: 'BsReceipt',
      component: Receipt,
    },
    {
      path: '/account-receivable/bill-summary',
      name: 'Bill Summary',
      icon: 'IoReceiptOutline',
      component: BillSummary,
    },
  ],
};
