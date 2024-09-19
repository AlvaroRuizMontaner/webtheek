import BannerHome from '@/components/banner/BannerHome';
import Container from '@/components/container/Container';
import What from '@/components/what/What';
import { renderPageSeo, seoHome } from '@/seo';
import Head from 'next/head';
import 'swiper/css';


export default function DashboardView() {

  return (
    <>
      <Head>{renderPageSeo(seoHome, "index")}</Head>
      <div className="space-y-16 divide-y-2">
{/*         <section className='flex flex-col mx-auto rounded max-w-[1200px]'>
          <h1 className="text-center headline1 mb-0 font-bold bg-primary-400 text-white font-lato">¿Qué es Webtheek?</h1>

          <div className="flex justify-center p-4 bg-white">
            <h2 className="text-center body1">
              {" "}
              Webtheek es una plataforma que aspira en el futuro a ser una biblioteca de
              recursos web de todo tipo, una webteca.
            </h2>
          </div>
        </section> */}
        <BannerHome />
        <Container>
          <What />
        </Container>
        
      </div>
      <hr />
    </>
  );
}
