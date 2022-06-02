# Project Structure

This outlines the concepts for how the code is to be organized in `src`

- src/addons (addons are high-level react components which require some kind of registration at the root app level)
  - /`name-of-addon`
- src/views
  - /components: reusable react view components (button, loader, logo, etc.)
    - /`name-of-component`
      - `index.js` (react component definition will reside here)
      - `NameOfComponent.test.js`
      - `NameOfComponent.styles.js`
      - `NameOfComponent.stories.js` (if we use storyboard -- it is a great tool for documentation & component exploration)
  - /pages: reflects the routing of the app (Home, Profile, etc.)
    - /`name-of-page`
      - `index.js` (react component definition will reside here)
      - `NameOfPage.test.js`
      - `NameOfPage.styles.js`
- src/services
  - /`name-of-service`
    - description: uses stores and APIs to transform data into the required use case for various components
    - justification: services may be used across several different components
    - `index.js` (service class will reside here)
    - `NameOfService.model.js` (these models will not be shared across services, they are tailored made for the particular service)
    - `NameOfService.test.js`
- src/data
  - /models
    - description: models that reflect incoming/outgoing data on the server
    - justification: database models may be used across several different APIs and stores
  - /apis
    - description: logic for talking to APIs
    - justification: same APIs may be used across several different stores or services
  - /stores (this may not be needed right away, may come in later on as the project matures)
    - description: uses apis and models to store/cache data on a case-by-case basis
    - justification: abstracts caching of data from service and api layer, provides easy access to data, is used by service layer
- src/utils: pure functions, hooks, etc.
- src/config: env, routing, constants, etc.
