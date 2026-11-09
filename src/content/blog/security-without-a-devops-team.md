---
title: 'Security without a DevOps team: four habits for a small stack'
description: A connected, low-cost stack means more integrations and more keys. Here are the four habits that keep a solo operator safe without a security team.
date: 2026-11-09
pillar: playbook
takeaways:
  - 'Owning your stack means owning its security. Integrations and self-hosted tools like n8n add keys and servers that nobody else is watching.'
  - 'Patch everything you run, from analytics to servers to the storefront, and patch critical vulnerabilities first.'
  - 'Rotate keys after a security patch and on a regular schedule. The first thing an attacker looks for after a breach is keys.'
  - 'Give every key the least access its job needs, and never reuse one key across systems.'
  - "Allowlist who can reach your systems: your IP, your people, and the specific services that need in. Don't leave admin access open to the public."
  - "A solo operator can't watch all of this by hand. AI agents and scheduled jobs can do the watching."
faq:
  - question: 'Do I need to worry about security if I only use SaaS tools?'
    answer: 'Yes. You may not run servers, but you still hold API keys, admin accounts and integrations between tools. A leaked key to your store or email platform is a breach whether or not you host anything.'
  - question: 'How often should a small business rotate API keys?'
    answer: 'After any patch for a vulnerability that could have exposed secrets, and on a regular schedule, for example every 90 days. Put the schedule on a calendar or a job so it does not depend on memory.'
  - question: 'What does least privilege mean for a small store?'
    answer: 'Each key or account gets only the access its job needs. A reporting integration gets read-only access. A reviews app gets access to orders, not to staff accounts. If a key leaks, the damage is limited to that one job.'
  - question: 'What is IP allowlisting?'
    answer: 'A rule that only lets approved addresses reach a system: your own IP, your team, or the specific services that need to connect. Everyone else is blocked, so the system is not open to the public internet.'
  - question: 'Can AI help a solo operator with security?'
    answer: 'Yes. AI agents and scheduled jobs can watch for new patches and advisories, remind you when keys are due for rotation, and scan logs for anything unusual. That is the subject of a future post.'
---

<!-- WILL: Want to name one of the incidents you've been through (no company names needed) to open this? One or two sentences on what happened and which habit would have stopped it would make the post much stronger. -->

The [Micro Stack](/blog/the-micro-stack) frees you from depending on large enterprises. The trade is that you're integrating a lot of things yourself. Every connection between your store, your email platform, your reviews app and Claude runs on a key. And once you start running your own automation, n8n on a droplet, a small app behind a CDN, you're also running servers.

At a big company, a DevOps or security team handles this. As a solo operator or a small business, you are that team. The good news is that most of the protection comes from four habits, and you can keep all four yourself.

## Even SaaS-only stacks need this

You might think security is only a problem if you host your own servers. It isn't. A SaaS-only stack still has admin accounts, API keys and app integrations. A leaked Shopify or Klaviyo key is a breach whether or not you host anything. Self-hosting adds more to look after, but the habits are the same.

## 1. Patch everything you run

If you maintain it, patch it. That means everything from analytics to servers to the storefront: the operating system on your droplet, n8n and its nodes, themes and apps, plugins, any code you deployed.

- Patch on a schedule, not when you remember.
- When a patch fixes a critical or actively exploited vulnerability, don't wait for the schedule. Patch that day.
- Turn on automatic security updates where the tool supports them, such as unattended upgrades on a Linux server.

SaaS tools patch their own platforms, but the apps and integrations you added to them are still yours to keep current.

## 2. Rotate your keys

This is the habit most companies skip. Keys get created once, set and forgotten, sometimes for years.

The first thing attackers do after getting in anywhere is search for keys. A patched server with the same old keys may already be compromised, so patching alone isn't enough.

- **After a security patch,** rotate the keys that system holds or could have exposed.
- **On a schedule,** rotate everything else, for example every 90 days.
- **When someone leaves** or a contractor's work ends, rotate whatever they could see.

Rotating means creating a new key, switching each integration to it, then deleting the old one. Keep a simple list of every key, where it's used and when it was last rotated. That list is most of the job.

<!-- WILL: Is 90 days the cadence you'd recommend, or do you use something different? -->

## 3. Least access, one key per job

When you create keys, roles and accounts, give each one the lowest access it needs to do its job, and nothing more.

- A reporting integration gets read-only access.
- A reviews app gets order access, not staff or payment settings.
- Your MCP connection to Claude gets the scopes the work needs, not full admin by default.

And don't share keys across systems. Generate a separate key for each purpose, even when two integrations need the same access. If one leaks, you rotate one key and one integration breaks, instead of everything at once. Separate keys also tell you exactly which system leaked.

## 4. Allowlist who can get in

Don't leave your systems open to the public. Wherever a tool lets you, allowlist the addresses that can reach it:

- **Your own systems:** only your IP and your approved people can reach admin panels, servers and n8n. A cloud firewall on the droplet does most of this.
- **Other services:** when a SaaS tool or data center system needs to connect, allow its published IPs, or use a direct, private connection where one is offered.

Anything that isn't on the list gets blocked before it can try a password or a key.

## You still can't watch it all yourself

These four habits, and a few more, are how you protect yourself. I've been through enough incidents to know they work. But they all depend on someone noticing: a new patch, a key that's due, a strange login at 3am.

A solo operator doesn't have a team to monitor all of that. This is where AI earns its keep: listeners, scheduled jobs and agents that are always watching for new patches and threats, reminding you when keys are due, and reading your logs for anything unusual. That's the next post.

In the meantime, start the key list. Every key, where it's used, and when it was last rotated. If you can't fill it in, that's your first finding. Then make all four habits part of your written processes; the [Processes track](/path/processes) shows how to write one any operator can follow.
