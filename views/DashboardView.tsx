import BannerHome from '@/components/banner/BannerHome';
import { BannerHomeInfo } from '@/components/banner/banner-home.info';
import Container from '@/components/container/Container';
import What from '@/components/what/What';
import { whatInfo } from '@/components/what/whatCard.info';
import Zigzag from '@/components/zigzag/Zigzag';
import { zigzagInfoHome } from '@/components/zigzag/zigzag.info';
import { renderPageSeo, seoHome } from '@/seo';
import Head from 'next/head';

export default function DashboardView() {

  return (
    <>
      <Head>{renderPageSeo(seoHome, "index")}</Head>
      <BannerHome {...BannerHomeInfo} />
        <Container>
          <What whatInfo={whatInfo} />
        </Container>
      <Zigzag info={zigzagInfoHome} />
      <hr />
    </>
  );
}
