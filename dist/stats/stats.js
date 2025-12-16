"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stats = void 0;
class StatsService {
    constructor() {
        this.endpointCalls = 0;
        this.responseTimes = [];
        this.shopifyCalls = 0;
        this.shopifyTimes = [];
    }
    recordEndpoint(ms) {
        this.endpointCalls++;
        this.responseTimes.push(ms);
    }
    recordShopifyCall(ms) {
        this.shopifyCalls++;
        this.shopifyTimes.push(ms);
    }
    summary() {
        const avg = (arr) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
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
exports.stats = new StatsService();
