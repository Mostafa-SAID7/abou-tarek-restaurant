---
name: ESLint Vue CLI compile errors
description: How ESLint behaves in this Vue CLI project and what to expect
---

## Rule
This project uses `@vue/cli-plugin-eslint` with `eslint-loader`. It treats ESLint errors as **hard compile errors** — the build fails until they are fixed.

## Key behaviors
- `no-unused-vars` fires on imports whose consuming `const` hasn't been added yet (mid-edit transient state). These self-resolve once the consuming code is saved.
- Imports inside `<script setup>` must appear **before** any executable statements to satisfy ESLint's import ordering rules.
- Template usage of a `<script setup>` variable does NOT count as "used" for ESLint's purposes in some versions — if ESLint complains about a variable that IS used in the template, double-check the `eslint-plugin-vue` version.

**Why:** Mid-edit parallel saves can cause transient compile errors because the linter sees incomplete state. This is normal and resolves on the next save.

**How to apply:** When doing parallel edits, expect transient ESLint errors between saves. The final compiled state will be clean.
