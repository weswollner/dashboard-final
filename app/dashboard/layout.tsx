import TopMenu from '@/app/ui/top-menu';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <TopMenu />
      {children}
      <footer className="footer has-background-white-bis">
        <p className="title">Footer</p>
      </footer>
    </div>
  );
}