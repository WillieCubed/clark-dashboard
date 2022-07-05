import type { NextPage } from 'next';
import Head from 'next/head';
import supabase from '../lib/hooks/supabase';
import SiteFooter from '../components/SiteFooter';
import { useQuotes } from '../lib/quotes';
import QuoteList from '../components/QuoteList';
import QuoteAddBlock from '../components/quotes/QuoteAddForm';

const HomePage: NextPage = () => {
  const { quotes, submitQuote } = useQuotes(supabase);

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
        <meta
          name="og:description"
          content="See all the amusing things Clarkies have said during the 2022 Clark Summer Research Program. Probably safe for work."
        />
        <meta name="og:image" content="/meta-thumbnails/clark-quotes.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="" />
      </Head>
      <header className="p-12 text-4xl font-bold text-center bg-blue-200 dark:bg-blue-800">
        Clark Quote Tracker
      </header>
      <main className="min-h-[80vh] md:mx-auto max-w-xl">
        <div className="">
          <section className="p-4 mt-4">
            <p className="text-lg text-center">
              Out of context? Yep. See what Clarkies are saying here or...
            </p>
            <a
              className="mt-2 block text-lg text-secondary text-center font-bold"
              href="#submit"
            >
              Submit a quote!
            </a>
          </section>
          <section id="list" className="p-4 mt-4 bg-white md:rounded-lg">
            <h1 className="mt-2 mb-4 text-2xl font-bold">All Quotes</h1>
            <QuoteList quotes={quotes} />
          </section>
          <section id="submit" className="mt-4 md:mb-4">
            <QuoteAddBlock onQuoteSubmit={submitQuote} />
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default HomePage;
