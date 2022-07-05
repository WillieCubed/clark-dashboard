import { Quote } from '../lib/quotes';

/**
 * A single quote with an author and text.
 */
function QuoteItem({ content, attribution, created }: Quote) {
  const timestamp = created.toLocaleDateString('en-US');
  return (
    <blockquote className="py-2">
      <p className="font-bold text-lg">{content}</p>
      <figcaption className="mt-1 text-sm">
        — {attribution}, {timestamp}
      </figcaption>
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
    return <QuoteItem key={quote.id} {...quote} />;
  });
  return <div>{quoteItems}</div>;
}
