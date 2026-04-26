--
description: Read this file to understand how to fetch data in this project.
--
# Data Fetching
This document outlines the best practices for fetching data in this Next.js project. Follow these guidelines to ensure consistency, security, and optimal performance across the codebase.

## 1. Server Components for Data Fetching
In Next.js, ALWAYS use Server Components for data fetching. Server Components can safely access server-side resources and do not include client-side JavaScript, making them ideal for data fetching. NEVER use Client Components for data fetching.

## 2. Data Fetching Methods
- ALWAYS use the helper functions in the /data directory for fetching data. NEVER fetch data directly from components.
- **Direct Database Queries:** Use Drizzle ORM's query builder directly in Server Components to fetch data. This is the most efficient way to retrieve data without unnecessary abstraction.
- **Server Actions:** For operations that modify data, use Server Actions to handle the logic. Always ensure that Server Actions include authentication checks using Clerk's `auth()` function to verify the user's identity before performing any write operations.