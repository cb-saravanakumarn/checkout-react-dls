import { cx } from '../../utils/cx';

export interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return <span className={cx('cb-loader', className)} aria-hidden="true" />;
}
