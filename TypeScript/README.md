# Gilded Rose

This is the Gilded Rose kata in TypeScript.

This implementation refactors the existing inventory logic and adds support for **Conjured items**, which degrade in Quality twice as fast as normal items.

## Getting started

Install dependencies:

```sh
npm install
```

## Run the unit tests from the Command-Line

Jest is used for the unit tests:

```sh
npm run test:jest
```

To run the tests in watch mode:

```sh
npm run test:jest:watch
```

## Compile the project

```sh
npm run compile
```

## Run the TextTest fixture from the Command-Line

From the repository root:

```sh
./start_texttest.sh
```

The TextTest configuration is already set to use the TypeScript implementation.

On macOS, `opendiff` is configured as the graphical diff tool.

## Implementation

The main implementation is located in:

```text
app/gilded-rose.ts
```

The Jest unit tests are located in:

```text
test/jest/gilded-rose.spec.ts
```

The refactoring separates the update behaviour by item category and uses a strategy resolver to select the correct Quality update logic.
