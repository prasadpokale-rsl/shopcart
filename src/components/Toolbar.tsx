import CartBadge from './CartBadge';

interface ToolbarProps {
  count: number;
}

export default function Toolbar({ count }: ToolbarProps) {
  return (
    <div className="toolbar">
      <CartBadge count={count} />
    </div>
  );
}
