# Autumn’s Nook

## Overview
Autumn’s Nook is a personal reading tracker built with React, TypeScript, and Vite. Users can search for books,  organize books into shelves, track reading progress, and discover books.

---

## Features

-  Search books with the Google Books API
-  Add books to custom reading shelves
- Track reading progress by current page
-  Persistent local storage state
-  Reading insights dashboard
-  “Reading Wrapped” inspired analytics section
-  Fully responsive layout

---

##  Built With

- React
- TypeScript
- Vite
- CSS
- Context API
- Google Books API

## Frontend mentor challenge
https://www.frontendmentor.io/challenges/personal-reading-list


## Reflection
The purpose of developing Autumn's Nook is to help readers discover, organize, track, and share their reading experiences in a more engaging and personalized way. The development process began with planning the structure and overall user experience of the application. I first focused on creating the core layout and reusable React components, including the navigation, bookshelf sections, book cards, and responsive page structure. After establishing the design foundation, I implemented global state management using React Context API so bookshelf data could be shared across the entire application.

The most difficult challenge I faced during development was connecting the bookshelf system to the Insights page. Initially, the pages felt disconnected because updates made to the bookshelf were not automatically reflected in the analytics section. To solve this, I implemented React Context API to manage global bookshelf state. This allowed all components to access the same shared data and instantly update whenever books were added, moved between shelves, or updated with reading progress. Another upgrade I made was integrating the Google Books API instead of relying only on starter JSON data. By connecting the Google Books API, users can now search real books, view detailed information, and add books directly to their shelves. This required asynchronous data fetching, state management, and mapping API data so it would work consistently throughout the application.

Understanding how to structure and share state properly across multiple components was one of the biggest learning experiences of the project.
Overall, I really enjoyed seeing the project functionality come together. Building this out from Design to Deployment and having to overcome challenges and correct every error it really gave me insight on how much work goes into large scale development.




## Live demo


cerra1024.github.io

Clone the project:

```bash
git clone https://github.com/yourusername/autumns-nook.git


