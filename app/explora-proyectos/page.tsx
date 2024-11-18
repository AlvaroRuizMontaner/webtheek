import BannerHome from '@/components/banner/BannerHome';
import { BannerProjectsInfo } from '@/components/banner/banner-home.info';
import Container from '@/components/container/Container';
import What from '@/components/what/What';
import { whatInfoProjects } from '@/components/what/whatCard.info';
import Zigzag from '@/components/zigzag/Zigzag';
import { zigzagInfoProyectos } from '@/components/zigzag/zigzag.info';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Gestiona tus tareas y proyectos online | Webtheek - Biblioteca de Recursos Web",
    description: "Organiza y gestiona tus tareas y proyectos de forma gratuita con Webtheek. Crea proyectos con tableros organizativos y un backlog para almacenar tareas futuras. Todo lo que necesitas para la gestión eficaz de tareas en un solo lugar."
};

export default function ExploraProyectos() {

  return (
    <>
      <BannerHome {...BannerProjectsInfo} />
        <Container>
          <What whatInfo={whatInfoProjects} />
        </Container>
      <Zigzag info={zigzagInfoProyectos} />
      <hr />
    </>
  );
}
