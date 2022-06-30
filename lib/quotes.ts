export type BaseQuote = {
  id: string;
  created: Date;
  content: string;
};

export type ExternalQuote = BaseQuote & {
  /**
   * The name of the user who spoke it
   */
  attribution: string;
};

export type ClarkQuote = BaseQuote & {
  userId: string;
};

export type Quote = ExternalQuote | ClarkQuote;

let quote: ExternalQuote;
