## This consists of the following parts

- Content script (vanilla TS)

_And, of course, the `./manifest.json` file describing its configuration._

## Environment

- Node.js >=12.0.0
- NPM >= 6.0.0

_Most probably it will work with earlier versions too but I didn't test it._

## Testing

`Jest` is included and ready for the vanilla TS parts.

## Scripts

- `npm run dist` - build the extension into `./dist` folder
- `npm run lint` - ESLint for `.ts` and `.tsx` files
- `npm run test` - Jest unit tests
