build:
	go build ./cmd/flipper-lsp/

install:
	go install ./cmd/flipper-lsp/

fixtures:
	rm testdata/**/*.json || true
	cd testdata_ts && yarn create_fixtures
	tree --gitignore testdata
