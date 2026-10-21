---
title: Overview — Platform MCP (Shopify first)
description: What connecting your store platform and catalog to Claude means, why clean data matters as much as the connection, and what changes once it's in place.
track: platform-mcp
part: overview
order: 1
access: free
---

Platform MCP is checkpoint 3. It's your store platform and your full catalog connected to Claude, so it can read and update products, collections and orders directly, not through exports and copy-paste.

I've proven this on Shopify so far, so that's where the Path starts. The ideas carry over to other platforms, but the specifics of the connection don't.

<!-- WILL: What would you tell readers on Magento or Salesforce Commerce today? Is this worth starting on their platform, or should they wait for the Path to cover it? -->

## What it is

Two things, and you need both:

- **The connection.** An MCP server, or a similar API connection, that lets Claude work with your store: read your products, collections and orders, and, where you allow it, change them.
- **A catalog worth connecting.** Complete, consistent product data: titles, descriptions, attributes, images and custom fields. AI connected to a patchy catalog just finds the gaps faster. It still needs good data to work from.

## Why it matters

A lot of day-to-day operating time goes here: product data, collections, merchandising, reporting. Most of it is specialist-shaped work that waits in someone's queue, or it's tedious enough that it gets done badly.

Connected, those become conversations instead of tickets.

## What changes once it's in place

- Catalog gaps get found and filled as part of the work, not in a once-a-year clean-up.
- Bulk changes stop being a spreadsheet round trip.
- Merchandising changes, like a new collection or a reordered range, start as a description in plain words.
- Questions about your products and orders get answered from the store itself, not from last week's export.

<!-- WILL: Which catalog job did you hand to Claude first once your store was connected, and what did it replace? -->

## The part to take seriously

This is the first checkpoint where AI can change something customers see, directly, at scale. A wrong price or a broken product page is a real cost. So the connection comes with guardrails: deciding what Claude can touch, reviewing changes before they go live, and being able to see what changed. The requirements and checklist cover what good looks like.

## How it connects to the other checkpoints

- **Design system (1)** and **AI ↔ design (2)** shape how collection and product pages look.
- **Marketing (4)** draws on product data for campaigns, so a clean, connected catalog makes better campaigns.
- **Processes (5)**, like product launches, restocks and weekly reporting, mostly run through this connection.

## Who it's for

- **Solo operators.** This is where you get the most hours back, because catalog work is endless and nobody else is doing it.
- **Small teams.** The connection becomes shared infrastructure. Decide who can make which changes, and who approves the big ones.

**Next:** [Requirements](/path/platform-mcp/requirements), what you need before you connect your store.
