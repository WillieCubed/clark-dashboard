import { Quote } from '../lib/quotes';

/**
 * A single quote with an author and text.
 */
function QuoteItem({ content, attribution, created }: Quote) {
  const timestamp = created.toLocaleDateString("en-US");
  return (
    <blockquote className="p-2">
      <p className="font-bold">{content}</p>
      <figcaption className=''>—{attribution}, {timestamp}</figcaption>
    </blockquote>
  );
}

/**
 * Component properties for QuoteList
 */
interface QuoteListProps {
  quotes: Quote[];
}

/**
 * A list of quotes.
 */
export default function QuoteList({ quotes }: QuoteListProps) {
  const quoteItems = quotes.map((quote) => {
    return (
      <QuoteItem key={quote.id} {...quote} />
    )
  });
  return (
    <div className="p-4">
      {quoteItems}
    </div>
  );
}