import type { ReactNode } from 'react';
import type { CheckoutProduct } from '../../types/checkout';
import { cx } from '../../utils/cx';
import { ProductCard } from './ProductCard';

export interface ProductListProps {
  products: CheckoutProduct[];
  renderProduct?: (product: CheckoutProduct) => ReactNode;
  className?: string;
}

export function ProductList({ products, renderProduct, className }: ProductListProps) {
  return (
    <div className={cx('cb-product-list', className)}>
      {products.map((product) => (
        <div className="cb-product-list__item" key={product.id}>
          {renderProduct ? renderProduct(product) : <ProductCard product={product} />}
        </div>
      ))}
    </div>
  );
}
