---
title: Requirements — Platform MCP (Shopify first)
description: The access, data, people and decisions you need before you connect your store platform and catalog to Claude.
track: platform-mcp
part: requirements
order: 2
access: free
---

Connecting a live store to an AI assistant is easy to do badly. Get these in place first.

## Accounts and tools

- Admin access to your store platform, with permission to install apps and create API credentials. On Shopify, that means the store owner or a staff account given those permissions.
- A Claude plan that lets you connect MCP servers.
- A safe place to test changes before they reach the live store, such as a development store, or a small set of test products that are hidden from customers.

## Data

- A full export of your catalog, so you can see its real state before anything is connected.
- A list of the attributes and custom fields your products use (on Shopify, metafields), with what each one is for.
- Your collections, and the rules behind any automated ones.
- Known gaps and problems: missing descriptions, inconsistent titles, duplicates, products without images.
- If another system feeds your catalog, such as an ERP or a PIM, a clear picture of which fields it owns.

## Access and security

- One person who holds the store credentials the connection uses, and knows where they're stored.
- A list of what the connection needs to read, and what it needs to change. Start from the smallest set that does the job.

## People and time

- A catalog owner: the person who knows what good product data looks like for your store.
- Someone to review bulk changes before they go live. On a solo store, that's you, with time set aside for it.

<!-- WILL: Do you have an ERP or PIM feeding the catalog? If so, how did that change what you let Claude edit in the store itself? -->

## Decisions to make first

- **Read-only or read-write.** Whether Claude starts by only reading your store, or can change it from day one.
- **What it can touch.** Product content, collections, prices, inventory, orders. Each is a separate decision.
- **Customer data.** Whether Claude needs to see customers' personal information at all. If it doesn't, keep it out of reach.
- **Approval rules.** Which changes need a human to sign off before they go live, and what counts as a bulk change.
- **Source of truth.** Where a field should be fixed when the store and another system disagree.
- **Your first job.** One catalog task you do by hand today, to hand over first.

<!-- WILL: What access did you start with on your own store: read-only, or write from day one? Would you do it the same way again? -->

**Next:** the [Checklist](/path/platform-mcp/checklist), so you know what a 4 looks like before you start.
