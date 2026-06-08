# Security Specifications & Threat Model (TDD)

## 1. Data Invariants
- A `Consultation` document represents a user's request for diagnostic consulting and a motor design catalog.
- It must contain non-empty `name`, `contact`, and `specs` strings, and a dynamic boolean toggle `consent` indicating acceptance of personal data collection guidelines.
- It must have a `createdAt` timestamp verified strictly against the server timestamp (`request.time`).
- No anonymous or arbitrary field updates are allowed after submission.
- Since this is a public form for new clients, creation is allowed without authentication, but reading/updating/deleting is strictly denied for standard users or restricted only to administrative checks. Wait, let's support public submissions (anyone can create a consultation request).

## 2. The Dirty Dozen Payloads
Below are 12 specific payloads or actions designed to break identity, integrity, and safety:
1. **The Ghost Field (Shadow Update)**: `{"id": "c1", "name": "Admin", "contact": "010-0000", "specs": "voltage", "consent": true, "createdAt": "request.time", "ghost_secret": "inject_admin_privileges"}` -> REJECT.
2. **Missing Consent**: `{"id": "c2", "name": "User", "contact": "010-1234", "specs": "Pump motor", "consent": false, "createdAt": "request.time"}` -> REJECT.
3. **Impersonated Timestamp**: `{"id": "c3", "name": "User", "contact": "010-1234", "specs": "Specs", "consent": true, "createdAt": "2020-01-01T00:00:00Z"}` -> REJECT (Must match server timestamp).
4. **Massive Payload Size**: Name string > 256 characters -> REJECT.
5. **Specs Overflow Payload**: Specs string > 2000 characters -> REJECT.
6. **Path Variable ID Poisoning**: Creating document /consultations/very_long_poison_id_exceeding_128_bytes_and_containing_characters_like_percent_symbols_or_backslashes -> REJECT.
7. **Bypassing Consent Required**: Creating a consultation with `consent = null` -> REJECT.
8. **Malicious Update (Owner Spoofing)**: Trying to modify someone else's document in `/consultations/{id}` -> REJECT.
9. **Illegal Deletion**: Attempting to delete a consultation submission without admin privileges -> REJECT.
10. **Query Harvesting**: Querying all submissions without filters or permissions -> REJECT (allow list: if false).
11. **State Step Over (Status Hijacking)**: Injecting un-validated administrative values -> REJECT.
12. **Wrong Type Injection**: `{"id": "c12", "name": 12345, "contact": true, ...}` -> REJECT.

## 3. Firestore Rules draft
Below we will declare the rules draft which closes all of these holes.
