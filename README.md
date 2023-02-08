# MovieJunkie Frontend

:wave: Welcome to the Movie Junkie Frontend repository where we provide a platform for users to
find, review and share their thoughts in the world of cinema!

## :mag: Getting Started

**NOTE: Please have at least Node 16 or above to run the following project.**

1. Clone the repository

```
git clone https://github.com/wen-wong/MovieJunkie-Frontend.git
```

2. Install any dependencies

```
npm install
```

3. Format all source files

```
npm run prettier
```

4. Run the project locally

```
npm run build
```

## :books: Tech Stack

-   **Node**: a Javascript runtime environment where the project is running on
-   **Node Package Manager**: a tool to install any javascript dependency
-   **Vue 3**: a Frontend Framework to build the UI of the project
-   **Vite**: a bundler to handle the source code in the browser

## :bookmark_tabs: Project Structure

Below is a summarized version of the repository's project structure:

1. `public`: Public assets shown on the tab or browser
2. `assets`: Images, Audio, and Video files used in the project
3. `components`: UI components that are independent from a page
4. `router`: Determines the routing of each layout
5. `views`: Layouts of the project

```
*
|_ public           #1
|_ src
    |_ assets       #2
    |_ components   #3
    |_ router       #4
    |_ views        #5
```

## :safety_pin: Plugins

-   **Prettier**: a Javascript code formatter to ensure that the project maintains a consistent
    style
-   **Dotenv**: a plugin to encapsulate any credentials used in this project
