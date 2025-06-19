import EosLayout from '@/layouts/EosLayout';

export default function SciToolsLayout({children}: {children: JSX.Element}): JSX.Element {
  return (
    <>
      <EosLayout>
        {children}
      </EosLayout>
    </>
  );
}