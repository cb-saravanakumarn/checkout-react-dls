export interface AgreementProps {
  children: React.ReactNode;
  collapsed?: boolean;
}

export function Agreement({ children, collapsed }: AgreementProps) {
  return (
    <div className={collapsed ? 'cb-agreement cb-agreement--collapsed' : 'cb-agreement'}>
      {collapsed ? <button className="cb-agreement__toggle" type="button">View agreement</button> : <div className="cb-agreement__content">{children}</div>}
    </div>
  );
}
