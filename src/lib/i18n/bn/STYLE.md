# Bangla translation style

These rules cover every page under `/bn`. The readers are Bangladeshi designers and PMs studying with Ostad. The reference page is `coming-from-chatgpt` in `tutorials.ts`, so match its voice.

## Voice

- Address the reader with formal আপনি. Casual applies to vocabulary, not to register.
- Use code-mixed Bangla. Wherever a Dhaka designer would say the English word out loud, write the English word: context, priority, plan, short answer, preference, setup, deadline, update, summary, feedback, file, folder, browser, tool, project.
- Keep technical terms in English: CLAUDE.md, prompt, skill, terminal, repo, commit, component, handoff, heuristic, usability test.
- Write user prompts the way a person would say them out loud. Keep them short, and use একটা/দুটো/তিনটা, never একটি/দুটি/তিনটি. For example, "আমি ChatGPT থেকে Claude-এ move করছি।" and "আমাকে short তিনটা bullet-এ বুঝিয়ে দিন।"
- Never translate an idiom word for word. State the meaning in plain Bangla instead.
- Prefer the imperative form people actually say (বেছে নিন, not বাছুন).
- Avoid textbook words: সংক্ষিপ্ত, অগ্রাধিকার, প্রেক্ষাপট, পরিকল্পনা, অনুচ্ছেদ, কথোপকথন, মাধ্যম, প্রতিশ্রুতি, ভূমিকা, সারাংশ.

## What stays exactly as in English

- slug, href, difficulty, availableRoutes, and every `type`/`kind`/`role`/`language` value
- Code, commands, file paths and tool names
- Claude's UI chrome in mocks: tool names, tool results, thinking verbs and status lines such as "Reading file...". User input and Claude's prose replies are in Bangla.
- Number of steps, field order and object shape. A Bangla entry must mirror its English entry key for key.

## Numbers

- Write durations in Bangla numerals (৫ মিনিট). Keep data inside demos, such as $2.4M or 34%, in Western digits.

## Bookkeeping

- `sourceHash` is the hash of the English entry. Compute it with the command in `.github/workflows/bn-sync.yml`, and never make it up.
- `translatedAt` is the date the translation was made, as YYYY-MM-DD.
