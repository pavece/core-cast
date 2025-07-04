# Shared Packages

Shared code used across different backend services.

## What's shared?

Criteria I use to decide when to share a package:

- It's used in more than one service.
- The implementation across services is completely identical.
- There's no plan to customize the implementation for a specific service.

## Why don't I share repository implementations?

While I could share repository implementations, I choose not to because:

- Implementations may vary slightly depending on the service.
- I do share repository interfaces when they are used in multiple services.
- To avoid future refactors, I prefer to keep repository implementations independent per service.
