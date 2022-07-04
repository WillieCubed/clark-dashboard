import React from 'react';
import { useSupabase } from '../../lib/hooks/supabase';
import type { AddableQuote } from '../../lib/quotes';

const QUOTE_CONTENT_PLACEHOLDER = 'Bunnies are kind of cute.';
const QUOTE_AUTHOR_PLACEHOLDER = 'Temoc Claus';

/**
 * Component properties for a QuoteAddBlock.
 */
interface QuoteAddBlockProps {
  /**
   * A callback called when a quote submission is finalized.
   */
  onQuoteSubmit: (quote: AddableQuote) => void;
}

/**
 * A component to add a quote.
 */
export default function QuoteAddBlock({ onQuoteSubmit }: QuoteAddBlockProps) {
  const authSession = useSupabase();
  const [content, setContent] = React.useState('');
  const [timestamp, setTimestamp] = React.useState('');
  const [author, setAuthor] = React.useState(''); // TODO: Add support for Clarkie authors

  const isValidSubmission = () => {
    return content.trim().length !== 0;
  };

  const submitQuote = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!authSession || !authSession.user) {
      console.debug('Cannot submit quote; user not signed in.');
      return;
    }
    onQuoteSubmit({
      content,
      created: new Date(timestamp),
      attribution: author,
      submitter: authSession.user.id,
    });
  };

  const handleContentUpdate = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleAuthorUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleTimestampUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimestamp(event.target.value);
  };

  return (
    <div className="rounded-lg shadow-sm bg-white dark:bg-slate-900 p-4 my-4">
      <h1 className="mt-2 mb-4 font-bold font-display text-2xl">
        Submit a Quote
      </h1>
      <form onSubmit={submitQuote}>
        <div>
          <label className="font-semibold" htmlFor="quoteContent">
            Quote content
          </label>
          <textarea
            className="w-full p-2 mt-2 rounded-md resize-none bg-slate-50"
            name="content"
            id="quoteContent"
            rows={4}
            placeholder={QUOTE_CONTENT_PLACEHOLDER}
            value={content}
            onChange={handleContentUpdate}
          />
        </div>
        <div className="my-2">
          <label className="font-semibold" htmlFor="quoteAuthor">
            Quote author
          </label>
          <input
            type="text"
            className="w-full p-2 mt-2 rounded-md resize-none bg-slate-50"
            name="attribution"
            id="quoteAuthor"
            placeholder={QUOTE_AUTHOR_PLACEHOLDER}
            value={author}
            onChange={handleAuthorUpdate}
          />
        </div>
        <div className="my-2 flex">
          <label
            className="inline-block mr-4 font-semibold align-middle"
            htmlFor="quoteTimestamp"
          >
            Quote Timestamp
          </label>
          <input
            type="datetime-local"
            className="inline-block flex-1 p-2 mt-2 rounded-md resize-none bg-slate-50"
            name="timestamp"
            id="quoteTimestamp"
            value={timestamp}
            onChange={handleTimestampUpdate}
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 shadow-md hover:shadow-lg disabled:shadow-none bg-secondary disabled:bg-gray-200 font-bold text-white rounded-md transition ease-in duration-150"
          disabled={!isValidSubmission}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
