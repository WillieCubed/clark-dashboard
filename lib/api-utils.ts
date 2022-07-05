/**
 * A generic API error.
 */
export type APIError = {
  type: string;
  message: string;
};

// Error implementations

export const INTERNAL_ERROR: APIError = {
  type: 'internal',
  message: 'Something went wrong. Try again later.',
};

export const UNAUTHENTICATED_ERROR: APIError = {
  type: 'unauthenticated',
  message:
    'The request is missing an `Authorization: Bearer <TOKEN>` token. Please provide one and try again.',
};

export const INVALID_TOKEN_ERROR: APIError = {
  type: 'unauthenticated',
  message:
    'The given token is invalid. Please provide a valid one and try again.',
};
