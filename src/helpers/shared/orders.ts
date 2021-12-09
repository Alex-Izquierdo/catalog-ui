import { CATALOG_API_BASE } from '../../utilities/constants';
import { PortfolioItem } from '@redhat-cloud-services/catalog-client';
import { OrderDetail } from '../../redux/reducers/order-reducer';

export const getOrderIcon = ({ orderItems }: OrderDetail): string | undefined =>
  orderItems &&
  orderItems[0] &&
  `${CATALOG_API_BASE}/portfolio_items/${orderItems[0].portfolio_item_id}/icon`;

export const getOrderPortfolioName = (
  { orderItems, id }: OrderDetail,
  portfolioItems: PortfolioItem[]
): string => {
  const portfolioItem =
    orderItems[0] &&
    portfolioItems.find(({ id }) => orderItems[0].portfolio_item_id === id);
  return portfolioItem ? portfolioItem.name : `Order ${id}`;
};

const getIOrderPlatformId = (
  { orderItems }: OrderDetail,
  portfolioItems: PortfolioItem[]
): {
  orderPlatform?: string;
  orderPortfolio?: string;
} => {
  const portfolioItem =
    orderItems[0] &&
    portfolioItems.find(({ id }) => orderItems[0].portfolio_item_id === id);
  return portfolioItem
    ? {
        orderPlatform: portfolioItem.service_offering_source_ref,
        orderPortfolio: portfolioItem.portfolio_id
      }
    : {};
};

const getSOrderPlatformId = (
  order: OrderDetail
): {
  orderPlatform?: string;
  orderPortfolio?: string;
} => {
  console.log('Debug - order: ', order);
  const orderItem = order?.extra_data?.orderItems[0];
  const portfolioItem = orderItem?.extra_data.portfolio_item;
  return portfolioItem
    ? {
        orderPlatform: portfolioItem.service_offering_source_ref,
        orderPortfolio: portfolioItem.portfolio_id
      }
    : {};
};

export const getOrderPlatformId = (
  order: OrderDetail,
  portfolioItems: PortfolioItem[]
): {
  orderPlatform?: string;
  orderPortfolio?: string;
} =>
  window.catalog?.standalone
    ? getSOrderPlatformId(order)
    : getIOrderPlatformId(order, portfolioItems);
