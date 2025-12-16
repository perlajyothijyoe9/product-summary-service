# product-summary-service

Security:
- Do not commit secrets. Keep secret values in `.env` and ensure `.env` is in `.gitignore`.
- If a secret is accidentally committed, rotate it immediately and purge it from git history (this repository recently had such an incident).
- Use `.env.example` for placeholder values.

If you need help rotating or invalidating a Shopify token, see Shopify admin docs.
