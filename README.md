# 🅰️ Lybra Frontend
This repository contains the **frontend** of **Lybra**, a modern library management system featuring subscriptions, borrowings, gamification, and personalized recommendations.

---
## 🎯 Project Context

This project is developed as part of my full-stack developer training at **Technofuturtic** (Python/Angular).
The goal is to deliver a **Minimum Viable Product (MVP)** within **2 weeks**.

- **Backend**: Python 3.13, Django REST Framework → Backend Repository
- **Frontend**: Angular 20

> 🧠 MVP Scope: Focused on **library management** (admin/staff side).  
> Future versions will include **user-facing features** (catalog browsing, borrowing, recommendations, gamification).

---
## 🚀 MVP Scope

The MVP focuses on the following core apps:

- `auth`: Authentication and roles
- `users`: User profiles
- `books`: Book catalog
- `borrowings`: Borrowing and reservations
- `subscriptions`: Subscriptions and payments
- `cart`: Borrowing cart
- `configuration`: Global settings

Additional apps such as `gamification` and `recommendation` are planned as bonus features if time allows.

---

## 🧱 Project Structure

```
src/
├── app/
│   ├── core/          # Auth, Interceptors, Guards, Layout
│   ├── shared/        # UI components, pipes, directives
│   ├── features/      # Domain modules (auth, books, users, etc.)
│   └── state/        
├── environments/
└── index.html
```

---

## 🔗 Backend Communication

- Uses Angular `HttpClient` for API calls
- API calls are centralized in domain-specific services (`auth.service.ts`, `book.service.ts`, etc.)
- Error handling via **interceptors**
- Authentication via **JWT** stored in `localStorage` or `sessionStorage`
- `AuthInterceptor` injects token into request headers

---

## 🧩 Feature ↔ API Mapping

|Domain|Angular Module|Django App|
|---|---|---|
|Auth|`auth/`|`auth/`|
|Users|`users/`|`users/`|
|Books|`books/`|`books/`|
|Borrowings|`borrowings/`|`borrowings/`|
|Subscriptions|`subscriptions/`|`subscriptions/`|
|Cart|`cart/`|`cart/`|
|Gamification|`gamification/`|`gamification/`|
|Recommendation|`recommendation/`|`recommendation/`|
|Configuration|`configuration/`|`configuration/`|

---

## 🧠 Feature Structure

Each domain module follows a consistent structure:

```
features/
└── books/
    ├── components/      # Reusable UI components
    ├── pages/           # Routable views
    ├── services/        # API logic
    ├── models/          # TypeScript interfaces
    ├── store/           # Signals or NgRx
    └── books.routes.ts  # Local routing
```

---

## 🛠️ Technologies

- Angular 20
- RxJS / Signals
- Angular Material
- NgRx (optional)
- JWT Authentication
- SCSS

---

## 🚀 Setup Instructions

	# Install dependencies
	npm install	
	
	# Run development server
	ng serve
	
	# Access the app at
	http://localhost:4200
