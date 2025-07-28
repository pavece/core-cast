# Core Cast Frontend

## Important Notes

This Next.js application accesses cookies provided by backend services under a strict SameSite policy. Therefore, it must be served under the same domain as those backend services.

## Data Fetching Decisions

This project uses a backend that is agnostic to Next.js. The primary reason for using Next.js is to support SEO optimization for individual video records.

**Why are some API requests handled on the client and others on the server?**

The goal is to minimize the number of API requests made from server components, as it often doesn't provide significant benefits (in this context). Server-side requests are limited to cases where they are essential or fiding alternative solutions complicates things a lot:

- Validating the user session and retrieving user data (e.g., for middleware logic).
- Fetching data for dynamic routes.

Public-facing content such as videos and feeds—where SEO matters—is fetched server-side and statically rendered. All other requests are handled client-side whenever possible.
