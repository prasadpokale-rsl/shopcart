import Toolbar from './Toolbar';

interface HeaderProps {
  count: number;
}

export default function Header({ count }: HeaderProps) {
  return (
    <header className="header">
      <h1>ShopCart</h1>
      <Toolbar count={count} />
    </header>
  );
}
