import AppLayout from '@/layouts/AppLayout';

export default function SolvableQuizLayout({children}: {children: JSX.Element}): JSX.Element {
  return (
    <>
      <AppLayout>
        {children}
      </AppLayout>
    </>
  );
}
