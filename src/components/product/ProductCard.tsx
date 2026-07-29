import type { ReactNode } from 'react';
import type { CheckoutProduct } from '../../types/checkout';
import { cx } from '../../utils/cx';
import { QuantityControl } from './QuantityControl';

export interface ProductCardProps {
  product: CheckoutProduct;
  quantityControl?: ReactNode;
  action?: ReactNode;
  loading?: boolean;
  recommended?: boolean;
  className?: string;
}

export function ProductCard({ product, quantityControl, action, loading, recommended, className }: ProductCardProps) {
  const tag = product.tag ?? (product.kind === 'plan' ? 'Plan' : product.kind === 'addon' ? 'Addon' : 'Charge');
  return (
    <section
      className={cx(
        'cb-product-card',
        `cb-product-card--${product.kind}`,
        product.imageUrl && 'cb-product-card--with-image',
        recommended && 'cb-product-card--recommended',
        loading && 'cb-product-card--loading',
        className,
      )}
    >
      {product.imageUrl && <img className="cb-product-card__image" src={product.imageUrl} alt="" />}
      <div className="cb-product-card__body">
        <div className="cb-product-card__header">
          <span className={cx('cb-tag', product.kind === 'plan' ? 'cb-tag--primary' : 'cb-tag--secondary')}>{tag}</span>
          <div className="cb-product-card__heading">
            <h3 className="cb-product-card__title">{product.name}</h3>
            {product.trialTag && <span className="cb-tag cb-tag--outline cb-tag--small">{product.trialTag}</span>}
          </div>
        </div>
        {product.description && <div className="cb-product-card__description">{product.description}</div>}
        {product.metered && <div className="cb-product-card__metered">Usage based billing</div>}
        <div className="cb-product-card__row">
          <div className="cb-product-card__quantity">
            {quantityControl ?? (product.quantity ? <QuantityControl value={product.quantity} invalid={Boolean(product.errorMessage)} errorMessage={product.errorMessage} /> : null)}
          </div>
          <div className="cb-product-card__price">
            {loading ? <span className="cb-checkout-skeleton" /> : product.price}
            {product.billingFrequency && <span className="cb-product-card__frequency">/{product.billingFrequency}</span>}
          </div>
        </div>
        {action && <div className="cb-product-card__actions">{action}</div>}
      </div>
    </section>
  );
}
