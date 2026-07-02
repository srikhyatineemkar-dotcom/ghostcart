# GhostCart

GhostCart is a shopping simulation platform that recreates the experience of modern online shopping without placing real orders. Users can browse products, add them to their cart, apply coupons, complete the checkout flow, and experience a realistic order journey. Instead of processing a purchase, GhostCart records the amount the user would have spent and displays the corresponding savings.

The project is intended to explore user interface design, shopping workflows, and behavioral approaches to reducing impulse purchases.

## Features

- Grocery shopping experience
- Food ordering experience
- Beauty shopping experience
- Product search
- Category-based browsing
- Product detail pages
- Shopping cart
- Coupon system
- Checkout flow
- Simulated order tracking
- Savings summary after checkout
- Address selection
- Responsive design

## Technology Stack

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

Backend

- Firebase / Supabase

Database

- Firestore / PostgreSQL

Maps

- Browser Geolocation API
- OpenStreetMap or Google Maps (optional)

## Project Structure

```text
app/
components/
data/
hooks/
lib/
public/
styles/
types/
utils/
```

## How It Works

GhostCart follows the same interaction flow as a typical shopping application.

```
Browse Products
        ↓
Add to Cart
        ↓
Apply Coupons
        ↓
Checkout
        ↓
Order Simulation
        ↓
Savings Summary
```

The application never places real orders or processes payments. Every transaction is simulated locally.

## Current Status

GhostCart is under active development. The current version focuses on replicating familiar shopping experiences across grocery, food, and beauty categories while maintaining a simulated checkout process.

Planned improvements include:

- Improved product catalog
- Better search experience
- Location-based restaurant discovery
- Richer product datasets
- Performance optimizations
- Mobile application

## Disclaimer

GhostCart is an independent project created for educational and demonstration purposes. It does not place real orders, process payments, or integrate with merchants for purchasing products.
