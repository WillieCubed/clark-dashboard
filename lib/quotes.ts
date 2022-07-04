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

const TABLE_NAME_QUOTE_RECORDS = "quotes";

export function useQuotes(supabaseClient: SupabaseClient): Quote[] {
  const [quotes, setQuotes] = React.useState<Quote[]>([]);

  /**
   * Get all quotes from the database.
   *
   * @param abortController A controller to stop the insertion
   * @return A list of all quotes
   */
  async function getQuotes(abortController: AbortController): Promise<Quote[]> {
    console.log('Fetching quotes')
    const result = await supabaseClient.from(TABLE_NAME_QUOTE_RECORDS)
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

  React.useEffect(() => {
    const abortController = new AbortController();
    getQuotes(abortController).then(setQuotes);
    return () => {
      abortController.abort()
    };
  }, [])
  return quotes
}