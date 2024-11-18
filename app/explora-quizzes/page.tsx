import BannerHome from '@/components/banner/BannerHome';
import { BannerQuizzesInfo } from '@/components/banner/banner-home.info';
import Container from '@/components/container/Container';
import What from '@/components/what/What';
import { whatInfoQuizzes } from '@/components/what/whatCard.info';
import Zigzag from '@/components/zigzag/Zigzag';
import { zigzagInfoQuizzes } from '@/components/zigzag/zigzag.info';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Crea y comparte quizzes o cuestionarios online gratis | Quizzes o cuestionarios interactivos para amigos y estudiantes | Webtheek",
    description: "Crea quizzes o cuestionarios online gratis de manera rápida y sencilla para compartir con amigos, estudiantes o compañeros de clase. Webtheek te permite diseñar quizzes personalizados para una experiencia de aprendizaje y diversión interactiva.",
};

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
