---
name: grep/rg string-literal redaction in this env
description: Why ripgrep/grep output shows "n" or "ln" instead of real string contents here
---

In this Replit environment, `rg`/`grep` output redacts string-literal contents,
displaying placeholders like `n` or `ln` in place of the actual matched text
(e.g. an import line shows `from "n"` instead of the real module path).

**Why:** environment-level output filtering, not a code problem. It is easy to
misread this as a broken import or wrong dependency name.

**How to apply:** when a search result looks suspiciously like `"n"`/`"ln"` or
otherwise blank, do NOT trust the redacted snippet — open the file with the
`read` tool (or `cat` via the read tool) to confirm the exact text before acting.
