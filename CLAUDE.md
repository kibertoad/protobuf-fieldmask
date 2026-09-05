# protobuf-fieldmask

Library for generating and applying protobuf FieldMasks. Plain CommonJS, no build step:
`index.js` re-exports `lib/`, `index.d.ts` holds the public types.

## Commands

- `pnpm install --frozen-lockfile` - install dependencies
- `pnpm test` - run the mocha suite
- `pnpm run test:coverage` - run the suite with nyc (100% coverage is enforced)
- `pnpm run test:types` - run the tsd type tests
- `pnpm run lint` / `pnpm run lint:fix` - biome

## Always add a changeset

Every change needs a changeset. Add it in the same commit as the change itself, never as
a follow-up:

```sh
pnpm changeset
```

That writes a markdown file to `.changeset/`; commit it. Pick the bump the way the
consumers of the package experience it:

- `patch` - bug fixes, performance, docs shipped in the package (`README.md`)
- `minor` - new exports, new options, anything additive
- `major` - removed or renamed exports, changed defaults, dropped Node versions

The summary lands verbatim in `CHANGELOG.md`, so write it for a consumer reading the
release notes, not as a description of the diff.

The only changes that do not need one are those that cannot reach the published package:
workflows, repository config, tests, and this file. `.changeset/config.json` and
`.changeset/README.md` are configuration, not changesets.

## Releasing

`.github/workflows/release.yml` runs on every push to `master` and does the whole
release, so never bump `version` in `package.json` or edit `CHANGELOG.md` by hand:

1. Changesets are present -> a `Version Packages` pull request is opened with the version
   bump and the changelog, and merged automatically.
2. `master` carries a version that is not on npm -> the package is published to npm, and
   the git tag plus the GitHub release are created.

Publishing authenticates through GitHub OIDC ([npm trusted
publishing](https://docs.npmjs.com/trusted-publishers)), so there is no npm token in the
repository secrets, and the workflow file name and job must keep matching the trusted
publisher configured on npm.

## Conventions

- Actions in workflows are pinned to a commit SHA with the version in a trailing comment.
- Workflows are linted by [zizmor](https://docs.zizmor.sh) at `medium` severity: give
  every job its own least-privilege `permissions`, check out with
  `persist-credentials: false`, and pass values into `run:` blocks through `env:` rather
  than interpolating them.
- Release jobs must not restore a dependency cache (cache poisoning).
