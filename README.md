# [Relog](https://relog-app.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel)

Relog is a simple full-stack daily activity log tracker to make you feel productive every day.

## What is Relog?

Think of Relog as a simple digital diary that you can use to keep track of what you did today, with features like search, tags, favorite, and more to help you manage your log more easily and effectively! Relog supports both secure online and local data storage to keep your privacy with management features like exporting, importing, and backing up data.

## Tech stack

This is a [Next.js](https://nextjs.org) app hosted on [Vercel](https://vercel.com) built with [React](https://react.dev), [TypeScript](https://typescriptlang.org), [MongoDB](https://mongodb.com), and [Tailwind](https://tailwindcss.com), and the libraries [NextAuth](https://next-auth.js.org), [Mongoose](https://mongoosejs.com), [Framer Motion](https://motion.dev), and [React Icons](https://react-icons.github.io). The app folder contains the frontend page routes, page-specific components, server actions, and the auth API. The components folder contains UI frontend components. The lib, models, and types folders contain extra stuff for setup and the public folder contains frontend assets like icons and logos.

## Quick start

To host Relog on your machine for local development or other purposes, simply follow these steps below:

1. Clone the GitHub [repository](https://github.com/tonymac129/relog) using the command
   ```bash
   git clone https://github.com/tonymac129/relog.git
   ```
2. Open it with your favorite code editor or through the terminal
3. Create the file `.env.local` at the root folder and initialize the following variables:
   ```
   MONGO_URI=your_mongo_uri
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```
4. If you don't have a MongoDB cluster/connection string, only guest mode will be available (otherwise the app will crash because of obvious reasons)
5. Open the terminal and run the commands

   ```bash
   npm install
   npm run dev
   ```

   to start the Next.js dev server at localhost:3000 and see the magic!

## Contribution

Any kind of contribution is welcome, but please follow the guideline below!

- Submit an issue if there's a bug/issue or if you want to suggest new features/subscriptions to be added.
- Submit a pull request if you want to add or improve the code base!
- Commit messages should be specific and address the issue
- Please don't submit random issues that aren't specific
- Please don't submit pull requests that "fix typo" or "improve formatting"
