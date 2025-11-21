// https://www.builder.io/c/docs/using-your-api-key
export const environment = {
  production: false,
  baseUrl: 'https://eqpdmj6im2klvloxuliqf4s2he0shnfw.lambda-url.us-east-1.on.aws',
  builderApiKey: 'b921442d76744459bd6fe2f22b8ea598',

  // SEO Configuration
  seo: {
    baseUrl: 'http://localhost:4200',
    siteName: 'A&V Traditions',
    defaultTitle: 'A&V Traditions - Comercio Internacional de Productos Colombianos',
    defaultDescription:
      'Comercio global con confianza local. Exportamos productos agrícolas colombianos de alta calidad al mundo.',
    defaultImage: '/logo-with-name.png',
    twitterHandle: '@avtraditions', // Actualizar cuando tengan Twitter
  },

  // Analytics Configuration
  analytics: {
    googleAnalyticsId: 'G-MEXTXVKSQL', // ID real de Google Analytics corregido
    enableDebug: true, // Solo para development
    enablePerformanceMonitoring: true,
  },

  //Endpoints
  mail: {
    contact: '/contact',
  },
};
