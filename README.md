# Gilded Rose Refactoring Kata

This repository is my implementation of the [Gilded Rose Refactoring Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata).

The exercise consists of refactoring the existing Gilded Rose inventory logic while preserving its current behaviour and adding support for **Conjured items**, which degrade in Quality twice as fast as normal items.

## Scope

This repository is a fork of the original kata, which contains implementations in many programming languages.

**This submission uses TypeScript only.** The implementation and unit tests relevant to this exercise are located in:

```text
TypeScript/
├── app/gilded-rose.ts
└── test/jest/gilded-rose.spec.ts
```

The other language directories are unchanged from the upstream repository and are intentionally retained to preserve the original fork structure.

The TextTest configuration has also been updated to run against the TypeScript implementation.

## Requirements

To run the TypeScript implementation and unit tests:

* Node.js
* npm

To run the TextTest approval tests:

* Python 3

## Install

Clone the repository:

```bash
git clone https://github.com/rkeshmir/GildedRose-Refactoring-Kata.git
cd GildedRose-Refactoring-Kata
```

Install the TypeScript dependencies:

```bash
cd TypeScript
npm install
```

## Run the unit tests

From the `TypeScript` directory:

```bash
npm run test:jest
```

To run Jest in watch mode:

```bash
npm run test:jest:watch
```

## Compile the TypeScript project

From the `TypeScript` directory:

```bash
npm run compile
```

## Run the TextTest approval tests

TextTest is used as an additional safety net to verify the behaviour of the inventory system.

From the repository root:

```bash
./start_texttest.sh
```

The script creates a Python virtual environment when needed, installs TextTest, and launches the configured approval tests.

The TextTest configuration is set to execute the **TypeScript** implementation.

### macOS note

The current TextTest configuration uses the macOS `opendiff` utility to display graphical differences.

If you run the repository on another operating system and need to inspect a failing TextTest result, you may need to change the configured diff tool in:

```text
texttests/config.gr
```

## Implementation

The main implementation is:

```text
TypeScript/app/gilded-rose.ts
```

The refactored solution separates the Quality-update behaviour by item category and uses a strategy resolver to select the appropriate update behaviour for:

* normal items
* Aged Brie
* Sulfuras
* Backstage passes
* Conjured items

## Tests

The Jest unit tests are located in:

```text
TypeScript/test/jest/gilded-rose.spec.ts
```

They cover the existing Gilded Rose behaviour as well as the new Conjured-item requirement.

For the original exercise requirements, see [GildedRoseRequirements.md](./GildedRoseRequirements.md).
