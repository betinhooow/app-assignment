<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="./src/assets/images/home.svg" alt="Home"></a>
</p>

<h3 align="center">Front-end Origin</h3>

<div align="center">


  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/betinhooow/app-assignment">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/betinhooow/app-assignment">

  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/betinhooow/app-assignment">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/betinhooow/app-assignment">

</div>

---


## 📝 Summary

- [How to run](#run)
- [Quality](#quality)
- [Applied Concepts](#concepts)

## 🚀 How to run<a name = "run"></a>

### Install dependencies
```sh
npm i
```
### Running app
```sh
npm run start
```
### Accessing the app
[http://localhost:4200/origin/saving-goals](http://localhost:4200/origin/saving-goals)

### Build to prod deploy
```sh
npm run build:prod
```

## 🔧 Quality <a name = "quality"></a>

### Running unit tests debug mode (locally recommended)
```sh
npm run test-local
```
### Running unit tests headless mode (pipeline recommended)
```sh
npm run test
```
### Running E2e tests
```sh
npm run cypress:open
```


## ⛏️ Applied Concepts <a name = "concepts"></a>

- Lazy load
- Modular architecture
- Unit tests (Jasmine and karma)
- E2E (Cypress and cucumber)
- Responsive design
- [Proxy pattern](https://refactoring.guru/pt-br/design-patterns/proxy)
- [Observer pattern](https://refactoring.guru/pt-br/design-patterns/observer)
- Dynamic config setup JSON based (src/app/shared/config)
- Report coverage (xml and html)
- Webpack
- RxJs
- Analytics (with a fake token)
