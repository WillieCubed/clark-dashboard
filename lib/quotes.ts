import type { SupabaseClient } from '@supabase/supabase-js';
import React from 'react';

/**
 * A quotation spoken by someone.
 */
export type BaseQuote = {
  /**
   * The unique ID of the quote.
   */
  id: number;
  /**
   * A timestamp of when the quote was created.
   */
  created: Date;
  /**
   * The raw text of the quote.
   */
  content: string;
  /**
   * The name of the user who spoke this quote.
   */
  attribution: string;
  /**
   * The UUID of the user who submitted the quote.
   */
  submitter: string;
};

/**
 * A quotation associated with a Clarkie user account.
 */
export type ClarkQuote = BaseQuote & {
  /**
   * The user ID of the Clarkie who made the quote.
   */
  clarkieAttribution: string;
};

export type Quote =
  // | ClarkQuote
  BaseQuote;

const TABLE_NAME_QUOTE_RECORDS = 'quotes';

export type AddableQuote = Omit<Quote, 'id'>;

/**
 * A hook to access and modify quotes.
 */
export function useQuotes(supabaseClient: SupabaseClient) {
  const [quotes, setQuotes] = React.useState<Quote[]>([]);

  /**
   * Get all quotes from the database.
   *
   * @param abortController A controller to stop the insertion
   * @return A list of all quotes
   */
  async function getQuotes(abortController: AbortController): Promise<Quote[]> {
    console.log('Fetching quotes');
    const result = await supabaseClient
      .from(TABLE_NAME_QUOTE_RECORDS)
      .select('id, created, content, attribution, clarkieAttribution (name)')
      .abortSignal(abortController.signal);
    console.log(result);
    const { data, error } = result;
    if (error || !data) {
      if (abortController.signal.aborted) {
        // No need to log
        return [];
      }
      console.error(error);
      return [];
    }

    console.log(data);
    return data.map((data) => {
      return {
        ...data,
        created: new Date(data.created),
      };
    });
  }

  /**
   * Add a quote to the database.
   *
   * @param quote The quote to insert
   * @param abortController A controller to stop the insertion
   * @return The added quote
   */
  async function addQuote(
    quote: AddableQuote,
    abortController: AbortController
  ): Promise<Quote> {
    const result = await supabaseClient
      .from(TABLE_NAME_QUOTE_RECORDS)
      .insert(quote)
      .abortSignal(abortController.signal);
    const { data, error } = result;
    if (error || !data) {
      if (!abortController.signal.aborted) {
        console.error(error);
        // No need to log otherwise
      }
    }
    const addedQuotes = data as Quote[];
    const addedQuote = addedQuotes[0];
    addedQuote.created = new Date(addedQuote.created);
    return addedQuote;
  }

  React.useEffect(() => {
    // Refresh on hook load
    return refreshQuotes();
  }, []);

  const refreshQuotes = () => {
    const abortController = new AbortController();
    getQuotes(abortController).then(setQuotes);
    return () => {
      abortController.abort();
    };
  };

  const submitQuote = (quote: AddableQuote) => {
    const abortController = new AbortController();
    addQuote(quote, abortController)
      .then((quote: Quote) => {
        setQuotes([...quotes, quote]);
      })
      .catch((error) => {
        console.error('Could not submit quote', error);
      });
    return () => {
      abortController.abort();
    };
  };

  return {
    quotes,
    submitQuote,
    refreshQuotes,
  };
}
