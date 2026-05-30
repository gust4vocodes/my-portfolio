---
layout: "../../layouts/ProjectPost.astro"
title: "FatumCap"
description: "A small prediction markets data aggregator built to explore large amounts of market data with low-delay updates."
year: "2026"
type: "Data dashboard"
stack: "FastAPI · Python · Kalshi API · Jinja · Cache"
order: 1
---


## What it is

FatumCap is a prediction markets data dashboard.

I built it to explore larger amounts of market data in a faster and more organized way. The first version focuses on Kalshi markets, collecting events and nested markets, enriching the raw data, and displaying the result in a simple web interface.

The goal was not to build a trading terminal yet.

The goal was to create a fast observation layer: a place where I could quickly see which markets were active, which ones had liquidity, where spreads were tight or wide, and which events were worth paying attention to.


<figure>
  <img src="/images/fatumdashboard.png" alt="FatumCap dashboard" />
  <figcaption>FatumCap dashboard.</figcaption>
</figure>

## Why I built it

I wanted to get better at working with larger datasets in a real product-like environment.

Prediction markets are interesting because the data is messy, constantly changing, and not equally useful. Some markets have volume. Some are completely dead. Some have tight spreads. Others are technically open but impossible to trade seriously.

I wanted to build something that could help me filter that noise.

The original motivation was simple: I wanted a website that could show a lot of market data quickly, without making me wait every time I opened the page.

Even though FatumCap is not a trading system, I still cared a lot about delay. If the real market changed and my site took too long to reflect that, it felt wrong. I wanted the dashboard to feel close to the real market, even if it was only for monitoring.

## The main technical challenge

The biggest challenge was handling many markets without making the site feel slow.

At first, the obvious solution was to fetch fresh data whenever the page loaded. But that quickly became annoying. Too many API calls, too much waiting, and too much delay between opening the site and actually seeing useful data.

So the project became less about just "fetching Kalshi data" and more about building a simple data pipeline:

- fetch events and markets;
- enrich the raw data;
- calculate useful metrics;
- cache the result;
- refresh data in the background;
- serve the dashboard from cached data.

That made the site feel much faster.

Instead of forcing the user to wait for every request, the app keeps the data warm and updates it periodically.

## What I learned

The biggest lesson was that data products are not only about getting data.

They are about deciding:

- what data matters;
- how often it should update;
- what should be cached;
- what should be calculated ahead of time;
- how to avoid unnecessary latency;
- and how to make the interface useful instead of just full of numbers.

I also learned that performance problems can appear even in projects that look simple.

A dashboard seems easy until it needs to handle many records, refresh regularly, filter data, calculate metrics, and still feel instant.

This project helped me understand why caching, background jobs, and data enrichment matter so much.

## Project status

I do not plan to actively continue FatumCap right now.

The project did what I needed it to do: it helped me understand how to fetch, enrich, cache, and display a large amount of data with low delay. It also helped me think more clearly about the infrastructure needed before building more serious trading or market-making tools.

But at this stage, I do not want to keep expanding it as a full product.

There is a point where a learning project starts turning into maintenance, and I do not think FatumCap is the main thing I should be maintaining right now.

## What might happen to it

I may still keep some version of it online.

Not necessarily as a polished product, but as a working demo of the idea: a lightweight dashboard, market activity, spreads, liquidity, and basic health metrics.

I am also considering making the code open source.

That would make more sense than letting the project disappear completely. Even if I do not keep developing it actively, the code can still show how the system works and what I learned while building it.

## Final thoughts

FatumCap was useful because it forced me to deal with real data problems.

Real API responses, real latency, real caching problems, real filtering issues, and real trade-offs between freshness and speed.

I am not sure if I will come back to it, but I am glad I built it.

It gave me a better understanding of how data-heavy tools are structured, and it gave me a stronger foundation for future projects.