# Security Specification

## Data Invariants
1. A `User` profile must have an `email`, `role`, and `createdAt` timestamp. Only the user themself or an admin can access their profile. The `role` must be 'user' by default unless verified by an admin. Users cannot change their own roles.
2. An `ExamResult` must be tied to a specific `userId`. A user can only view and create their own exam results. 

## The "Dirty Dozen" Payloads

1. **Identity Spoofing (Create)**: Creating an `ExamResult` with a `userId` belonging to someone else.
2. **Identity Spoofing (Update)**: Changing the `userId` of an existing `ExamResult` to another user's ID.
3. **Ghost Fields**: Creating a `User` profile with an extra unrecognized field like `isAdmin: true`.
4. **Data Type Poisoning**: Creating an `ExamResult` with `score` as a 1MB string instead of a number.
5. **Unauthorized Read**: Attempting to read another user's `ExamResult`.
6. **Self-Escalation**: A user updating their own user profile to change their `role` from "user" to "admin".
7. **Invalid Timestamps**: Providing a client-provided timestamp string instead of a server timestamp for `createdAt` or `date`.
8. **Orphaned Write**: Creating an `ExamResult` for a `userId` that does not exist in the `users` collection.
9. **Blanket Query**: Querying the `users` collection for all users without filtering.
10. **ID Poisoning**: Creating a user with a document ID that contains unallowed path characters.
11. **Spoofed Email / PII Attack**: Changing the `email` of a profile to match an admin's email when `email_verified` is false on the auth token.
12. **Status Shortcutting**: Appending invalid payload states into an exam result that's already finalized. 
