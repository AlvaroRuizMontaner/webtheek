import BannerHome from '@/components/banner/BannerHome';
import { BannerProjectsInfo } from '@/components/banner/banner-home.info';
import Container from '@/components/container/Container';
import What from '@/components/what/What';
import { whatInfoProjects } from '@/components/what/whatCard.info';
import Zigzag from '@/components/zigzag/Zigzag';
import { zigzagInfoProyectos } from '@/components/zigzag/zigzag.info';
import 'swiper/css';

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
