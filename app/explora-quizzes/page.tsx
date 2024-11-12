import BannerHome from '@/components/banner/BannerHome';
import { BannerQuizzesInfo } from '@/components/banner/banner-home.info';
import Container from '@/components/container/Container';
import What from '@/components/what/What';
import { whatInfoQuizzes } from '@/components/what/whatCard.info';
import Zigzag from '@/components/zigzag/Zigzag';
import { zigzagInfoQuizzes } from '@/components/zigzag/zigzag.info';
import 'swiper/css';


export default function ExploraQuizzes() {

  return (
    <>
      <BannerHome {...BannerQuizzesInfo} />
        <Container>
          <What whatInfo={whatInfoQuizzes} />
        </Container>
      <Zigzag info={zigzagInfoQuizzes} />
      <hr />
    </>
  );
}
