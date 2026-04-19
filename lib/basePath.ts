// Resolves the basePath injected by configure-pages (e.g. /portfolio_website)
// Falls back to "" in local dev where no basePath is set.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
