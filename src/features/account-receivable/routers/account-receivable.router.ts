import async from '@/layouts/components/async.component';
const TransactionDetails = async(
  () => import('../transaction-details/screens/transaction-details.screen'),
);
const Payment = async(() => import('../payment/screens/payment.screen'));
const OpenBatch = async(
  () => import('../open-batch/screens/open-batch.screen'),
);
const Receipt = async(() => import('../receipt/screens/receipt.screen'));

export const accountReceivableRoutes = {
  path: '/account-receivable',
  name: 'Account Receivable',
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
  ],
};
