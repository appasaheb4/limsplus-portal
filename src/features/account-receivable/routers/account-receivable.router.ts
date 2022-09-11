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
  icon: 'Icons.Iconmd.MdAccountBalance',
  children: [
    {
      path: '/account-receivable/transaction-details',
      name: 'Transaction Details',
      icon: 'Icons.IconGr.GrTransaction',
      component: TransactionDetails,
    },
    {
      path: '/account-receivable/payment',
      name: 'Payment',
      icon: 'Icons.IconGr.GrTransaction',
      component: Payment,
    },
    {
      path: '/account-receivable/open-batch',
      name: 'Open Batch',
      icon: 'Icons.Iconmd.MdOutlineBatchPrediction',
      component: OpenBatch,
    },
    {
      path: '/account-receivable/receipt',
      name: 'Receipt',
      icon: 'Icons.IconBs.BsReceipt',
      component: Receipt,
    },
  ],
};
