import { useTranslation } from "react-i18next";

export const translateStatus = (status) => {
    const { t } = useTranslation();
      if (status === 'All') return t('order.filter.all');
      if (status === 'Pending') return t('order.filter.pending');
      if (status === 'Processing') return t('order.filter.processing');
      if (status === 'Delivered') return t('order.filter.delivered');
      return status; // Default return if no match
};
    
export const translateNotificationTabBar = (text) => {
    const { t } = useTranslation();
    if (text === 'All') return t('notification.header_tab.all');
    if (text === 'Order') return t('notification.header_tab.order');
    if (text === 'Promotion') return t('notification.header_tab.promotion');
      return text;
}