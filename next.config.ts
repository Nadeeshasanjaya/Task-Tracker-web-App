import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default withSentryConfig(nextConfig, {
  org: "nibm",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/sentry-tunnel",
});
