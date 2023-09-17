module.exports = {
  client: {
    service: {
      name: "my-app",
      // URL to the GraphQL API
      url: process.env.GRAPHQL_URL || "http://localhost:8000/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
