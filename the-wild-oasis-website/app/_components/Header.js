import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

function Header() {
  return (
    <header className='px-8 py-5 border-b border-primary-900'>
      <div className='flex items-center justify-between mx-auto max-w-7xl'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
