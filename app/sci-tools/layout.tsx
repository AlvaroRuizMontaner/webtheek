import AppLayout from '@/layouts/AppLayout';

export default function SciToolsLayout({children}: {children: JSX.Element}): JSX.Element {
  return (
    <>
      <AppLayout>
        {children}
      </AppLayout>
    </>
  );
}