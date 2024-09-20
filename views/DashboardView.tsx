import BannerHome from '@/components/banner/BannerHome';
import Container from '@/components/container/Container';
import What from '@/components/what/What';
import Zigzag from '@/components/zigzag/Zigzag';
import { zigzagInfoHome } from '@/components/zigzag/zigzag.info';
import { renderPageSeo, seoHome } from '@/seo';
import Head from 'next/head';
import 'swiper/css';


export default function DashboardView() {

  return (
    <>
      <Head>{renderPageSeo(seoHome, "index")}</Head>
        <BannerHome />
        <Container>
          <What />
        </Container>
        <Zigzag info={zigzagInfoHome} />
      <hr />
    </>
  );
}
