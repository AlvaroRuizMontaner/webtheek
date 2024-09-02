/** @type {import('next').NextConfig} */
const nextConfig = {
    // Esto permite importar svgs como componentes en Next que luego pueden colorearse (importante poner fill: currentColor en el svg de origen)
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
  };
  
  export default nextConfig;