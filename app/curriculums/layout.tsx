/* import Redirect from '@/components/Redirect'; */
import AppLayout from '@/layouts/AppLayout';

export default function Layout({children}: {children: JSX.Element}): JSX.Element {
  return (
    <>
      <AppLayout>
        {children}
        {/* <Redirect /> Provisional */}
      </AppLayout>
    </>
  );
}
