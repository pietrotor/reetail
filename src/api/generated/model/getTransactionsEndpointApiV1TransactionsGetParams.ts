/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Current-Payment
 * OpenAPI spec version: 0.1.0
 */
import type { TransactionStatus } from './transactionStatus';

export type GetTransactionsEndpointApiV1TransactionsGetParams = {
payment_term_id: string;
skip?: number;
limit?: number;
order_by?: string;
order_direction?: string;
status?: TransactionStatus | null;
};
