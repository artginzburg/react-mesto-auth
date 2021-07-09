# [Место · React](https://artginzburg.github.io/mesto-react/)

> Mesto project frontend on React.

Project 10: <kbd>[Reviewed and accepted version of the project](https://github.com/artginzburg/mesto-react/tree/project-10_final)</kbd>

Project 11: <kbd>[Reviewed and accepted version of the project](https://github.com/artginzburg/mesto-react/tree/project-11_final)</kbd>

## Description

5th course work at the [Web-development](https://praktikum.yandex.ru/web/) faculty of [Yandex.Praktikum](https://praktikum.yandex.ru/)

## Install

```bash
# Clone the repository
git clone https://github.com/artginzburg/mesto-react
# Enter the project directory
cd mesto-react
# Install dependencies
npm i
```

## Available Scripts

In the project directory, you can run:

### `npm start`

> Starts a local server on [localhost:3000](http://localhost:3000) · With automatic updates on any change and lint errors in the console.

### `npm run build`

> Builds the app for production to the `build` folder

### `npm run deploy`

> Places the production version code into the `gh-pages` branch

<br>

## To-do

- Ideas (sorted by concern)

  - [ ] Move popups to React.createPortal and other container
  - [ ] Add locales and English language
  - [x] Clear popups when they are not opened, but keep the open/close transition
  - [x] Use localStorage to make last saved data appear instantly after page refresh (which might look strange with cards, but is a must-have for user profile information)
  - [x] Create FormInput component that wraps up input, its error status, and repeating props
  - [x] Create Popup react component so that ImagePopup and PopupWithForm use exactly identical modal window logic

- Transfer all the features from _mesto_ to _mesto-react_
  - [x] Live form validation
  - [x] Card features
  - [x] Profile features
  - [x] Close popups on `Esc` or overlay click

## Tech

- JSON API
- BEM Methodology
- CRA
- File Structure — Nested BEM
- Adaptive design
- CSS transformations and transitions
- Flexbox & Grid Layout
- JavaScript (Classes, Modules)
- [Image optimization](https://tinypng.com/)

## Links

- [Checklist 10](https://code.s3.yandex.net/web-developer/checklists/new-program/checklist-10/index.html)
- [Checklist 11](https://code.s3.yandex.net/web-developer/checklists/new-program/checklist-11/index.html)

<br>
<br>

<p align="center">
  <a href="https://github.com/artginzburg/mesto"><-- Prev.</a>
  &nbsp;
  <code><a href="https://github.com/artginzburg/yandex.praktikum-portfolio">Portfolio</a></code>
  &nbsp;
  <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
</p>
