# Fog Of War Simulator

#### Table of Contents

- [About](#about)
- [Running the App](#running-the-app)
- [Setup](#project-setup)
- [Structure](#structure)
- [Development](#development)
- [Testing](#testing)
- [todos](#todos)
- [Acknowledgments](#acknowledgments)

## About

This Project in a web application that simulates map exploration commonly known in games as fog of war. Project uses html `<canvas>` elements to display map elements as raster graphics. Move the player with arrow keys or by dragging the mouse to uncover the map. Your progress is displayed in the bottom right corner.

## Running the App

To run the app follow the steps:

1. Clone github repository to your project folder with:
   `git clone https://github.com/akena-engineering/wojciech-blachut.git`
2. Move to project catalog and type command bellow in the terminal to install packages:
   `yarn`
3. To Start the app (Vite.js dev server):
   `yarn run dev`
   app should be listening on:
4. To build the App use
   `yarn build`
5. To run tests use:
   `yarn test` or
   `yarn coverage`

## Project Setup

This project uses React Framework with Vite.js as building tool. As main package manger tool it uses `yarn`. Project styling is achieved mostly by in JS styles, except root and custom scrollbar [common\scrollbar](src\common\scrollbar.css). Project has theme based on Heroes of Might & MAgic III game, utilizing assets to style borders and create overlays. Project mechanics are written in Typescript (you can find types and modals in [model](src\model)).

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
The core simulator App component [`<ExplorerMap />`](src\components\map\ExplorerMap\ExplorerMap.tsx) contains major logic. It renders presentation components: `FogOfWarStage`, `PlayerWrapper` `ProgressTracker` and `ExplorerBorder (a map overlay component)` and uses main 3 hooks to get all the data needed for passing down to them. The first one, [`useMapImage()`](src\components\map\hooks\useMapImage.tsx) is simple hook to initialize map images and get image dimensions. The second one, [`usePlayerMovement()`](src\components\map\hooks\usePlayerMovement.tsx) is responsible for handling player movement. The Last hook is [`useMapCanvas()`](src\components\map\hooks\useMapCanvas.tsx) and his job is to handle canvas updates. Most of the logic in hooks is delivered from the [`helpers`](src\helpers). The Popup component keeps it's timers logic inside, because of it simplicity. Common Style files can be find in [common](src\common) while component style file situated next to components tsx files.

Types and Enums can be find in model directory. Test files are placed next to files they test and are appended by `.spec`.

## Development

Project was developed as a recruitment task. It is better to have plenty of known errors on compile time than one unknown on runtime, Therefor TypeScript was used over Javascript. Also due to its features including IDE suggestions and type checking during development. Setup with vite.js was done because of it's superiority over CRA. It uses the esbuild bundler, which is much faster than the Webpack used by CRA, you can read more information [here](https://blog.logrocket.com/vite-3-vs-create-react-app-comparison-migration-guide/). To see pros of vite by simply start dev server, which takes moments to run. Vite also provides testing tool: `vitest` which is quicker than common CRA test runner `Jest`. In this project [vitest](https://vitest.dev/) is used alongside [react-testing-library](https://github.com/testing-library/react-testing-library) and [Jest](https://jestjs.io/). After research about fog of war implementation and some trials I have decided to use canvas and its tools to achieve desired effect. There is no dynamic grid matrix, only raster layer. [React-Konva](https://konvajs.org/) was chosen as library best suited for delivering good development and user experience with canvas. All canvas components are wrapped in main `<Stage>` component which is similar to a root for Konva projects. Player and his movement are implemented solely as UI component and UI changes. There are no classes or extra logic for player since this is a small project and that was not a focus. The app simulates map uncovering by using 2 layers of HTML Canvas. The lower layer represents the map and the top layer represents the fog. By moving around player is clearing the fog by adding circles that change pixels form image fill to fully opaque. Number of filled pixels is used to calculate current player progress. On the App start player sees popup with information about the simulator - this animation uses simple logic from [react-spring](https://www.react-spring.dev/) library. No CSS tools like. `sccs`, `emotion`, `styled-components` were used because of small project size.


**Acceptance Criteria:**

1. Implement Map Design
2. Implement Player Character
3. Implement Map Uncovering
4. Implement Progress Tracker

## Testing

Testing tools: `vitest`, `react-testing-library`, `jest`, `jsdom`, `canvas`

Unit test were written for helper files. Component rendering was tested with `react-testing-library`. Additionally hooks could be tested as main source of logic, especially `useMapCanvas()` hook. It would be nice to test ux by tools like `Cypress` to test rendering and user behavior. Test coverage was determined by time frames for project. Mocks used in testing can be find in [mocks](src\mocks). `<FogOfWarStage>` component is not tested because of no `React Konva` support for `react-testing-library`.

Test issues: due to problems with `vitest` setup few test are not working as expected


## Todos

- Add scroll on player move
- Fix race conditions for 1st move (uncovering starter location) and ExplorerBorder size (handle dynamic change to client size)
- Fix movement performance (player marker spikes on move)
- Optimize heavy imports
- Write more test cases (fix mapExplorerHelpers.spec, test hooks, add snapshots)
- Expand player directions to 4 for each arrow key
- Add PopUp allowing to change player marker from HoMM3 heroes

## Acknowledgments

- **Akena** - for delivering the map and idea (leading to use one of my favorite games as simulator theme)
- [HeroWO](https://github.com/HeroWO-js) - Heroes of Might & Magic III game in JS engine (inspiration, assets)
- [spriters-resource](https://www.spriters-resource.com/pc_computer/heroes3/) - HoMM3 Assets
- [VCMI Forum](https://forum.vcmi.eu/) - HoMM3 backgrounds
