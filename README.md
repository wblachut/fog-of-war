﻿# Fog Of War Simulator

#### Table of Contents

- [About](#about)
- [Running the App](#running-the-app)
- [Project Setup](#project-setup)
- [Structure](#structure)
- [Development](#development)
- [Testing](#testing)
- [Todos](#todos)
- [Acknowledgments](#acknowledgments)

## About

This Project is a web application that simulates map exploration commonly known in games as *fog of war*. The project uses html `<canvas>` elements to display map elements as raster graphics. Move the player with arrow keys or by dragging the mouse to uncover the map. Your progress is shown in the bottom right corner.

## Running the App

To run the app follow the steps:

1. Clone GitHub repository to your project folder with:
   `git clone https://github.com/akena-engineering/wojciech-blachut.git`
2. Move to the project catalogue and type the command below in the terminal to install packages:
   `yarn`
3. To Start the app (Vite.js dev server):
   `yarn run dev`
4. To build the App use
   `yarn build`
5. To run tests use one of:
   `yarn test`
   `yarn coverage`

## Project Setup

This project uses React Framework with Vite.js as the building tool. The main package manager used is `yarn`. Project styling is achieved mostly through in JS styles, except for the root and custom scrollbar ([common/scrollbar.css](src/common/scrollbar.css)). The project has a theme based on the Heroes of Might & Magic III game, utilizing assets to style borders and create overlays. Project mechanics are written in TypeScript (you can find types and enums in the [model](src/model) directory).

## Structure

Simplified Project Structure

```
	project-root
	├── README.md
	├── package.json
	├── yarn.lock
	├── .gitignore
	├── eslint & prettier, ts config
	├── index.html
	├── testSetup.ts
	├── vite.config.ts
	├── dist // build folder
	│   ├── assets
	│   └── index.html
	└── src
		├── assets // images
		├── mocks
		├── model // custom types and enums
		├── components // arranged by subdomains
	  	│   ├── info
	  	│   ├── player
	  	│   └── map // eg.
 		     	├── componentName.tsx
 		     	├── componentName.style.tsx
	 			└── componentName.spec.ts
		├── hooks
		├── helpers
  	  	│   ├── helperFile.ts
	  	│   └── helperFile.spec.ts
		├── App.tsx
		└── main.tsx
```

The core simulator App component [`<ExplorerMap />`](src\hooks\useAssetSetup.tsx) contains the main logic. It renders presentation components: `FogOfWarStage`, `PlayerWrapper` `ProgressTracker` and `ExplorerBorder (a map overlay component)` and uses the main 3 hooks to get all the data needed for passing down to them. The first one, [`useAssetSetup()`](src/hooks/useAssetSetup.tsx) is a simple hook to initialize map images and get image dimensions. The second one, [`usePlayerMovement()`](src/hooks/usePlayerMovement.tsx) is responsible for handling player movement. The Last hook is [`useMapCanvas()`](src/components/map/hooks/useMapCanvas.tsx) and his job is to handle canvas updates. Most of the logic in hooks is delivered from the [`helpers`](src/helpers). The Popup component keeps its timers logic inside, because of its simplicity. Common Style files can be found in [common](src/common) while component style files are situated next to components `tsx` files.

Types and Enums can be found in the model directory. Test files are placed next to files they test and are appended by `.spec`.

## Development

The project was developed for Akena. It is better to have plenty of known errors on compile time than one unknown on runtime, Therefor TypeScript was used over Javascript. Also due to its features including IDE suggestions and type checking during development. Setup with vite.js was done because of its superiority over CRA. It uses the `esbuild` bundler, which is much faster than the Webpack used by CRA, you can read more information [here](https://blog.logrocket.com/vite-3-vs-create-react-app-comparison-migration-guide/). To see the pros of Vite simply start the dev server, which takes moments to run. Vite also provides testing tool: `vitest` which is quicker than the common CRA test runner `Jest`. In this project [vitest](https://vitest.dev/) is used alongside [react-testing-library](https://github.com/testing-library/react-testing-library) and [Jest](https://jestjs.io/). After researching the fog of war implementation and some trials I have decided to use html `canvas` element and its tools to achieve the desired effect. There is no dynamic grid matrix, only a raster layer. [React-Konva](https://konvajs.org/) was chosen as the library best suited for delivering good development and user experience with `canvas`. All canvas components are wrapped in the main `<Stage>` component which is similar to a root for Konva projects. The player and his movement are implemented solely as UI components and UI changes. There are no classes or extra logic for the player since this is a small project and that was not a focus. The app simulates map uncovering by using 2 layers of HTML Canvas. The lower layer represents the map and the top layer represents the fog. The app listens to player movement by `useEffect` hook with `playerPosition` in the dependency array. Whenever player position changes (by a meaningful amount) the portion of a map is cleared by adding circles that change pixels from image fill to fully opaque. The number of filled pixels is used to calculate the current player's progress. On the App start player sees a popup with information about the simulator - this animation uses simple logic from [react-spring](https://www.react-spring.dev/) library. No CSS tools like. `sccs`, `emotion`, `styled-components` were used because of the small project size.

**Acceptance Criteria:**

1. Implement Map Design
2. Implement Player Character
3. Implement Map Uncovering
4. Implement Progress Tracker

## Testing

Testing tools: `vitest`, `react-testing-library`, `jest`, `jsdom`, `canvas`

Unit tests were written for helper files. Component rendering was tested with `react-testing-library`. Additionally, hooks could be tested as the main source of logic. It would be nice to test UX with tools like `Cypress` to test the rendering and behaviour on the user site. Test coverage was determined by the time frames for the project. Mocks used in testing can be found in [mocks](src/mocks). `<FogOfWarStage>` component is not tested because of no `React Konva` support for `react-testing-library`.

Test issues: `vitest` has issues while testing with VSC (It is suggested to run tests from the terminal)

## Todos

- [x] Add Screen Scrolling on the player move
- [x] Fix race conditions for 1st move and ExplorerBorder size
- [x] Fix movement performance (player marker spikes on move)
- [x] Add on mouse hold movement.
- [ ] Optimize heavy imports (react konva supports cannot be simplified)
- Add scrolling to player location if a marker is outside of viewport (WIP)
- Add 3rd canvas for tracking player progress, so the blurred areas are counted as uncovered
- Write canvas test cases (mock canvas), test hooks, add snapshots
- Deploy the Vite app to gh-pages (via personal repo)
- Expand player directions to 4 for each arrow key
- Add PopUp allowing to choose player marker from HoMM3 heroes

## Acknowledgments

- [HeroWO](https://github.com/HeroWO-js) - Heroes of Might & Magic III game in JS engine (inspiration, assets)
- [spriters-resource](https://www.spriters-resource.com/pc_computer/heroes3/) - HoMM3 Assets
- [VCMI Forum](https://forum.vcmi.eu/) - HoMM3 backgrounds
