import Footer from '@/components/footer/Footer';

export default function Layout({children}: {children: JSX.Element}): JSX.Element {
  return (
    <>
        {children}
        <Footer />
    </>
  );
}
