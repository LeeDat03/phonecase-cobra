import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: "https://phonecase-cobra.vercel.app/api/uploadthing", // Updated callback URL
  },
});
