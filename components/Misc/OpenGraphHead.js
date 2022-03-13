import Head from "next/head";
const OpenGraphHead = ({ title, type, url }) => (
  <Head>
    <title>{title}</title>
    <meta
      name="description"
      content="Crossfit club is the best fitness gym in Jammu for men and women. We offer healthy diet plan, modern gym equipments. Gym by Gonny Singh, Mr J&K Gold Medalist"
    />

    {/* facebook */}
    <meta property="og:title" content={title} />
    <meta property="og:type" content={type} />
    <meta
      property="og:image"
      content="https://www.crossfitclub.in/crossfitclub.png"
    />
    <meta property="og:url" content={url} />

    <meta property="og:site_name" content="Crossfit Club Jammu" />

    <meta
      property="og:description"
      content="Crossfit club is the best fitness gym in Jammu for men and women. We offer healthy diet plan, modern gym equipments. Gym by Gonny Singh, Mr J&K Gold Medalist"
    />

    {/* twitter */}
    <meta property="twitter:card" content="Crossfit Club Jammu" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={title} />
    <meta
      property="twitter:description"
      content="Crossfit club is the best fitness gym in Jammu for men and women. We offer healthy diet plan, modern gym equipments. Gym by Gonny Singh, Mr J&K Gold Medalist"
    />
    <meta
      property="twitter:image"
      content="https://www.crossfitclub.in/crossfitclub.png"
    />
    <meta
      property="business:contact_data:street_address"
      content="Sector-C, Sainik Colony"
    />
    <meta property="business:contact_data:locality" content="Jammu" />
    <meta property="business:contact_data:region" content="Jammu and Kashmir" />
    <meta property="business:contact_data:postal_code" content="180011" />
    <meta property="business:contact_data:country_name" content="India" />
  </Head>
);
export default OpenGraphHead;
