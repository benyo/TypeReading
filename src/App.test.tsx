import { describe, expect, it } from 'vitest';
import { extractPriceFromWebSocketMessage } from './App';

describe('Simple working test', () => {
  it('extractPriceFromWebSocketMessage', () => {
    const wsMessage: any = { data: { p: '1.23' } };

    const result = extractPriceFromWebSocketMessage(wsMessage);

    expect(result).equal('1.23');
  });
});
