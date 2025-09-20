Yautja tech applied to your editor using LSP side channels. ([Lore](https://en.wikipedia.org/wiki/Predator_(fictional_species)))

# Fixtures

Microsoft uses Typescript to define LSP message parsing, and the safest way to
generate JSON fixtuers is to use those specs to create that output.

Spec: https://microsoft.github.io/language-server-protocol/specifications/specification-current

Generated fixtures come from from `testdata_ts/` which leverage types defined
in the LSP spec to output fixtures. Those fixtures live inside `testdata/` .

Requires yarn and nodejs, versions are in `.tool-versions`. If using OSX, you
can install these quickly using asdf.
```
brew install asdf
asdf plugin add yarn
asdf plugin add nodejs
asdf install
```

Use make to compile fixtures.
```
make fixtures
```
