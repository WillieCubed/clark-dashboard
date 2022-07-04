import type { SupabaseClient } from '@supabase/supabase-js';
import React from 'react';

export type BaseQuote = {
  id: string;
  created: Date;
  content: string;
  attribution: string;
  /**
   * The UUID of the user who submitted the quote.
   */
  submitter: string;
};

export type ClarkQuote = BaseQuote & {
  clarkieAttribution: string;
};

export type Quote =
  // | ClarkQuote
  | BaseQuote;

const TABLE_NAME_QUOTE_RECORDS = "quotes";

export function useQuotes(supabaseClient: SupabaseClient): Quote[] {
  const [quotes, setQuotes] = React.useState<Quote[]>([]);

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