
class StatsService {
  endpointCalls = 0;
  responseTimes: number[] = [];
  shopifyCalls = 0;
  shopifyTimes: number[] = [];

  recordEndpoint(ms: number) {
    this.endpointCalls++;
    this.responseTimes.push(ms);
  }

  recordShopifyCall(ms: number) {
    this.shopifyCalls++;
    this.shopifyTimes.push(ms);
  }

  summary() {
    const avg = (arr: number[]) =>
      arr.reduce((a, b) => a + b, 0) / (arr.length || 1);

    return {
      endpoint_response_times_ms: {
        average: avg(this.responseTimes),
        min: Math.min(...this.responseTimes),
        max: Math.max(...this.responseTimes)
      },
      total_endpoint_calls: this.endpointCalls,
      average_shopify_call_responsetime_ms: avg(this.shopifyTimes),
      total_shopify_api_calls: this.shopifyCalls
    };
  }
}

export const stats = new StatsService();
