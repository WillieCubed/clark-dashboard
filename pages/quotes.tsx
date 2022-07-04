import type { NextPage } from 'next';
import Head from 'next/head';
import supabase from '../lib/hooks/supabase';
import SiteFooter from '../components/SiteFooter';
import { useQuotes } from '../lib/quotes';
import QuoteList from '../components/QuoteList';

const HomePage: NextPage = () => {
  const quotes = useQuotes(supabase);

  return (
    <>
      <Head>
        <title>Quotes - Clark Summer Research Program</title>
        <meta
          name="description"
          content="See all the amusing things Clarkies have said during the 2022 Clark Summer Research Program."
        />
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="og:site_name"
          content="Clark Summer Research Program Dashboard"
        />
        <meta name="og:title" content="Quote Tracker" />
        <meta name="og:image" content="/meta-thumbnails/clark-quotes.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="" />
      </Head>
      <header className="p-12 text-4xl font-bold text-center bg-blue-200 dark:bg-blue-800">
        Clark Quote Tracker
      </header>
      <main className="min-h-[80vh] lg:mx-auto max-w-xl">
        <QuoteList quotes={quotes} />
      </main>
      <SiteFooter />
    </>
  );
};

export default HomePage;
