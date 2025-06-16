# My-LinkTree

A linktree project made with React, Vite, Typescript and
SWC.

## Summary of implemented features

> Basic Authentication using JWT and localStorage
>
> Basic CRUD of users and links useSWR and fetch
>
> Basic validation using alert and react.toastify
>
> Basic styling in CSS
>
> Basic redirects with window.location.href

## Scope decisions and key trade-offs

### Vite and SWC

I've decided to use these technologies because they are the
most modern and performant right now for React. In addition
to this I used them to be possible to code in my Macbook Air
that is very old and would freeze a lot otherwise.

### JWT and Localstorage

I chose to store the JWT in Localstorage for simplicity. One
better and safer way would be using http only cookies but I
had some trouble with them in the past and would probably
need more time to use this approach.

### Styling with CSS only

For simplicity I decided to use only CSS instead of
libraries such as Tailwind for example. Another good option
would be Styled Components but the lib is already
deprecated.

### Redirects with window.location.href

This approach is easy but not very elegant. With more time I
would choose to use react router navigation. This would
enable a smoother navigation experience.

### SWR

This library helped me avoid doing requests inside of
useEffects and made my code cleaner. Another option would be
React Query that is also well known by the React community.
Other advantage of SWR is the automatic cache it creates in
the frontend and the possibility of optimistic mutations as
well as only refetch when making changes.

#### Tests and Documentation

Due to time constraints automated tests and components
documentation weren't implemented in this project. With more
time I could create unit tests with Jest and React Testing
Library and document the components with storybook.

## Setup and run instructions

### Project setup

```bash
$ pnpm install
```

### Compile and run the project

```bash
# development
$ pnpm run dev

# build
$ pnpm run build

# production mode
$ pnpm run start
```
