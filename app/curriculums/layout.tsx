import Redirect from '@/components/Redirect';
import CurriculumLayout from '@/layouts/CurriculumLayout';

export default function Layout({children}: {children: JSX.Element}): JSX.Element {
  return (
    <>
      <CurriculumLayout>
        {children}
        <Redirect />
      </CurriculumLayout>
    </>
  );
}
