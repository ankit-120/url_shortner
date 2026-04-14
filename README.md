# 🚀 URL Shortener (Production-Grade Learning Project)

## 📌 Overview

This project is a **production-style URL shortener** built step-by-step to understand:

- Backend architecture
- System design fundamentals
- Scalability patterns
- Real-world engineering trade-offs

---

## 🔹 Features

- 🔗 Shorten long URLs
- 🔄 Redirect using short URLs
- 📊 Click tracking
- ⏳ Expiry support (optional)
- ⚡ Redis caching
- 🛡️ Rate limiting
- 🔢 Scalable ID generation (Base62, Range Allocation, Snowflake)

---

## 🏗️ Architecture Overview

```
User → API → ID Generator → Base62 → Redis → MongoDB → Response
                              ↓
                          Redirect Flow
```

---

## 📁 Folder Structure

```
src/
├── config/        # DB & Redis configs
├── controllers/   # Request handlers
├── routes/        # API routes
├── services/      # Business logic
├── models/        # MongoDB schemas
├── utils/         # Helpers (Base62, Snowflake)
├── middlewares/   # Error handling, rate limit
├── app.js         # Express setup
└── server.js      # Entry point
```

---

## 🔹 Phase-wise Learning

---

# 🧠 Phase 1: Basic URL Shortener

### Concepts:

- REST APIs
- Key-value storage
- Redirect handling

### Flow:

```
POST /shorten → generate code → store
GET /:code → lookup → redirect
```

---

# 🧠 Phase 2: Database Integration

### Added:

- MongoDB persistence
- URL validation
- Duplicate handling

### Schema:

```
shortCode (unique, indexed)
longUrl
clicks
timestamps
expiresAt (optional)
```

### Key Learning:

- Indexing improves read performance
- Avoid duplicate entries

---

# ⚡ Phase 3: Performance & Protection

---

## 🔹 Redis Caching

### Problem:

- Every request hits DB

### Solution:

- Cache frequently accessed URLs

### Pattern:

```
Redis → hit → return
       ↓ miss
     MongoDB → store in Redis
```

---

## 🔹 Rate Limiting

### Problem:

- Abuse / DDoS

### Solution:

- Limit requests per IP

---

## 🔹 Expiry Links

### Use Case:

- Temporary links
- Campaigns

---

# 🔢 Phase 4: ID Generation Evolution

---

## ❌ Random IDs (nanoid)

Problems:

- Possible collisions
- Requires DB check
- Not scalable

---

## ✅ Base62 Encoding

### Idea:

```
ID (number) → Base62 → short string
```

### Example:

```
1001 → g9
```

### Benefits:

- No collisions
- Deterministic
- Compact URLs

---

# ⚡ Phase 4.1: Range Allocation

---

## ❌ Problem:

```
Every request → DB call for ID
```

---

## ✅ Solution:

```
DB gives range (1–1000)
Server uses locally
```

---

## Example:

```
Server A → 1–1000
Server B → 1001–2000
```

---

## Benefits:

- Reduces DB calls
- Improves performance

---

## Trade-off:

- Gaps in IDs (acceptable)

---

# 🚀 Phase 5: Snowflake ID Generator

---

## ❌ Problem with Date.now()

```
Same millisecond → duplicate IDs
```

---

## ✅ Solution:

```
timestamp + sequence + machineId
```

---

## How it works:

### Same millisecond:

```
Request 1 → seq 0
Request 2 → seq 1
Request 3 → seq 2
```

---

## Example IDs:

```
1000-1-0
1000-1-1
1000-1-2
```

---

## Benefits:

- No DB dependency
- Works across servers
- Time-ordered
- Highly scalable

---

## Key Insight:

| Component | Purpose                 |
| --------- | ----------------------- |
| timestamp | time uniqueness         |
| sequence  | same-time uniqueness    |
| machineId | multi-server uniqueness |

---

# 🔥 Key System Design Learnings

---

## 🧠 1. Read-heavy systems

- Most requests = redirects
- Optimize reads using caching

---

## ⚡ 2. Reduce DB dependency

- Avoid unnecessary DB calls
- Move logic to memory when possible

---

## 🔢 3. ID generation strategies

- Random → simple but limited
- Counter → deterministic
- Range allocation → scalable
- Snowflake → distributed systems

---

## 🛡️ 4. System protection

- Rate limiting prevents abuse
- Validation ensures data quality

---

## 🧩 5. Trade-offs

| Trade-off                 | Explanation                |
| ------------------------- | -------------------------- |
| Gaps in IDs               | acceptable for performance |
| Consistency vs speed      | choose based on use case   |
| Complexity vs scalability | evolve gradually           |

---

# 🧠 Mental Models

---

## 🔹 Optimization thinking

❌ Don’t aim for:

- Perfect sequence
- Zero gaps

✅ Aim for:

- High throughput
- Low latency
- Scalability

---

## 🔹 Golden Rule

> “Remove unnecessary work from the database”

---

# 🚀 Final Architecture

```
User → API
       ↓
   ID Generator (Snowflake / Range)
       ↓
   Base62 Encoding
       ↓
   Redis Cache
       ↓
   MongoDB (persistent)
       ↓
   Redirect
```

---

# 📈 Future Improvements

- Sharding (handle billions of URLs)
- CDN (global fast redirects)
- Analytics pipeline (Kafka, ClickHouse)
- Async processing
- Custom aliases
- QR code generation

---

# 🎯 Conclusion

This project evolved from:

```
Simple CRUD app
```

to:

```
Scalable distributed backend system
```

---

# 💡 What You Mastered

- Backend architecture
- System design fundamentals
- Performance optimization
- Distributed ID generation
- Real-world trade-offs

---

# 🚀 Next Steps

- Build Rate Limiter system
- Design Chat system
- Study Uber / Food delivery system
- Add analytics pipeline

---

## ✨ Final Thought

> “Good engineers make things work.
> Great engineers make them scale.”

---
