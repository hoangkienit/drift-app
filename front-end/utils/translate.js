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

export const translateRestaurantCategory = (text) => {
    const { t } = useTranslation();
    if (text === 'fast_food') return t('merchant.create_restaurant.fast_food');
    if (text === 'casual_dining') return t('merchant.create_restaurant.casual_dining');
    if (text === 'fine_dining') return t('merchant.create_restaurant.fine_dining');
    if (text === 'cafe') return t('merchant.create_restaurant.cafe');
    if (text === 'bakery') return t('merchant.create_restaurant.bakery');
    if (text === 'other') return t('merchant.create_restaurant.other');
  return text;
}