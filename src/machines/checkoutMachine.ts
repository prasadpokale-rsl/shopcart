import { assign, fromPromise, setup } from 'xstate';
import type { CartItem } from '../types';

interface CheckoutInput {
  items: CartItem[];
}

interface CheckoutOutput {
  id: string | number;
  items: CartItem[];
  total: number;
}

interface CheckoutContext {
  items: CartItem[];
  order?: CheckoutOutput;
  error?: string;
}

type CheckoutEvent =
  | { type: 'CHECKOUT'; items: CartItem[] }
  | { type: 'RETRY' };

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContext,
    input: {} as CheckoutInput,
    output: {} as CheckoutOutput,
    events: {} as CheckoutEvent,
  },

  actors: {
    submitOrder: fromPromise<CheckoutOutput, CheckoutInput>(
      async ({ input }) => {
        const total = input.items.reduce(
          (sum, item) =>
            sum + item.product.price * item.quantity,
          0
        );

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: input.items, total }),
        });

        if (!response.ok) {
          throw new Error('Checkout failed. Please try again.');
        }

        return (await response.json()) as CheckoutOutput;
      }
    ),
  },
}).createMachine({
  id: 'checkout',
  initial: 'idle',

  context: ({ input }) => ({
    items: input.items,
  }),

  output: ({ context }) => context.order!,

  states: {
    idle: {
      on: {
        CHECKOUT: {
          target: 'submitting',
          guard: ({ event }) => event.items.length > 0,
          actions: assign({
            items: ({ event }) => event.items,
            error: () => undefined,
          }),
        },
      },
    },

    submitting: {
      invoke: {
        src: 'submitOrder',
        input: ({ context }) => ({
          items: context.items,
        }),
        onDone: {
          target: 'success',
          actions: assign({
            order: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            error: ({ event }) =>
              event.error instanceof Error
                ? event.error.message
                : 'Checkout failed. Please try again.',
          }),
        },
      },
    },

    success: {
      type: 'final',
    },

    error: {
      on: {
        RETRY: {
          target: 'submitting',
          actions: assign({
            error: () => undefined,
          }),
        },
      },
    },
  },
});
