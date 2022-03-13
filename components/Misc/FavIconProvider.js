import Head from 'next/head';

const FavIconProvider = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
};

export default FavIconProvider;
