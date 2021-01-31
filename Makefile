include silicon.mk

BABEL := node_modules/.bin/babel
BABEL_NODE := node_modules/.bin/babel-node
CLOC := node_modules/.bin/cloc
CSPELL := node_modules/.bin/cspell
ESLINT := node_modules/.bin/eslint
JEST := node_modules/.bin/jest
LOCKFILE_LINT := node_modules/.bin/lockfile-lint
MAJESTIC := node_modules/.bin/majestic
PRETTIER := node_modules/.bin/prettier
TSC := node_modules/.bin/tsc
WEBPACK := node_modules/.bin/webpack
COLLECT_COVERAGE_FROM := ["src/**/*.{js,jsx,ts,tsx}"]

BUILD_DEPS := $(patsubst src/%.ts,lib/%.d.ts,$(shell find src -name '*.ts' -not -name '*.d.ts')) \
	$(patsubst src/%.tsx,lib/%.d.ts,$(shell find src -name '*.tsx'))
BUILD_TARGET := $(BUILD_DEPS) lib

FORMAT_DEPS := $(patsubst %,$(DONE)/_format/%,$(shell $(GIT) ls-files 2>$(NULL) | grep -E "\.((json)|(ya?ml)|(md)|([jt]sx?))$$"))
FORMAT_TARGET := $(FORMAT_DEPS) $(DONE)/format

LINT_DEPS := $(patsubst %,$(DONE)/_lint/%,$(shell $(GIT) ls-files 2>$(NULL) | grep -E "\.([jt]sx?)$$"))
LINT_TARGET := $(LINT_DEPS) $(DONE)/lint

SPELLCHECK_DEPS := $(patsubst %,$(DONE)/_spellcheck/%,$(shell $(GIT) ls-files 2>$(NULL) | $(GIT) ls-files | grep -E "\.(md)$$"))
SPELLCHECK_TARGET := $(SPELLCHECK_DEPS) $(DONE)/spellcheck

TEST_DEPS := $(patsubst %,$(DONE)/_test/%,$(shell $(GIT) ls-files 2>$(NULL) | grep -E "\.([jt]sx?)$$"))
TEST_TARGET := $(TEST_DEPS) $(DONE)/test

.PHONY: all
all: build

.PHONY: install +install _install ~install
install: _install ~install
~install: $(DONE)/install
+install: _install $(DONE)/install
_install:
	-@rm -rf $(DONE)/install $(NOFAIL)
$(DONE)/install: package.json
	@$(NPM) install
	@$(call done,install)

.PHONY: prepare
prepare:
	@

.PHONY: upgrade
upgrade:
	@$(NPM) upgrade --latest

.PHONY: inc
inc:
	@npm version patch --git=false $(NOFAIL)

.PHONY: format +format _format ~format
format: _format ~format
~format: ~install $(FORMAT_TARGET)
+format: _format $(FORMAT_TARGET)
_format:
	-@rm -rf $(DONE)/_format $(NOFAIL)
$(DONE)/format:
	@for i in $$($(call get_deps,format)); do echo $$i | \
		grep -E "\.[jt]sx?$$"; done | xargs $(ESLINT) --fix >/dev/null ||true
	@$(PRETTIER) --write $(shell $(call get_deps,format))
	@$(call reset_deps,format)
	@$(call done,format)
$(DONE)/_format/%: %
	-@rm $(DONE)/format $(NOFAIL)
	@$(call add_dep,format,$<)
	@$(call add_cache,$@)

.PHONY: spellcheck +spellcheck _spellcheck ~spellcheck
spellcheck: _spellcheck ~spellcheck
~spellcheck: ~format $(SPELLCHECK_TARGET)
+spellcheck: _spellcheck $(SPELLCHECK_TARGET)
_spellcheck:
	-@rm -rf $(DONE)/_spellcheck $(NOFAIL)
$(DONE)/spellcheck:
	-@$(CSPELL) --config .cspellrc $(shell $(call get_deps,spellcheck))
	@$(call reset_deps,spellcheck)
	@$(call done,spellcheck)
$(DONE)/_spellcheck/%: %
	-@rm $(DONE)/spellcheck $(NOFAIL)
	@$(call add_dep,spellcheck,$<)
	@$(call add_cache,$@)

.PHONY: lint +lint _lint ~lint
lint: _lint ~lint
~lint: ~spellcheck $(LINT_TARGET)
+lint: _lint $(LINT_TARGET)
_lint:
	-@rm -rf $(DONE)/_lint $(NOFAIL)
$(DONE)/lint:
#	-@$(LOCKFILE_LINT) --type npm --path package-lock.json --validate-https
	-@$(ESLINT) -f json -o node_modules/.tmp/eslintReport.json $(shell $(call get_deps,lint)) $(NOFAIL)
	-@$(ESLINT) $(shell $(call get_deps,lint))
	@$(call reset_deps,lint)
	@$(call done,lint)
$(DONE)/_lint/%: %
	-@rm $(DONE)/lint $(NOFAIL)
	@$(call add_dep,lint,$<)
	@$(call add_cache,$@)

.PHONY: test +test _test ~test
test: _test ~test
~test: ~lint $(TEST_TARGET)
+test: _test $(TEST_TARGET)
_test:
	-@rm -rf $(DONE)/_test $(NOFAIL)
$(DONE)/test:
	-@$(JEST) --json --outputFile=node_modules/.tmp/jestTestResults.json --coverage \
		--coverageDirectory=node_modules/.tmp/coverage --testResultsProcessor=jest-sonar-reporter \
		--collectCoverageFrom='$(COLLECT_COVERAGE_FROM)' --findRelatedTests $(shell $(call get_deps,test))
	@$(call reset_deps,test)
	@$(call done,test)
$(DONE)/_test/%: %
	-@rm $(DONE)/test $(NOFAIL)
	@$(call add_dep,test,$<)
	@$(call add_cache,$@)

.PHONY: build +build _build ~build
build: _build ~build
~build: ~test $(BUILD_TARGET)
+build: _build $(BUILD_TARGET)
_build:
	-@rm -rf es lib $(NOFAIL)
lib:
# @$(WEBPACK)
	@$(BABEL) --env-name umd src -d lib --extensions '.js,.jsx,.ts,.tsx' --source-maps
	@$(BABEL) --env-name esm src -d es --extensions '.js,.jsx,.ts,.tsx' --source-maps
	@$(TSC) -p tsconfig.app.json -d --emitDeclarationOnly

.PHONY: publish +publish
publish: build
	@$(MAKE) -s +publish
+publish:
	@$(NPM) publish

.PHONY: pack +pack
pack: build
	@$(MAKE) -s +pack
+pack:
	@$(NPM) pack

.PHONY: coverage
coverage: ~lint
	@$(MAKE) -s +coverage
+coverage:
	@$(JEST) --coverage --collectCoverageFrom='$(COLLECT_COVERAGE_FROM)' $(ARGS)

.PHONY: test-ui
test-ui: ~lint
	@$(MAKE) -s +test-ui
+test-ui:
	@$(MAJESTIC) $(ARGS)

.PHONY: test-watch
test-watch: ~lint
	@$(MAKE) -s +test-watch
+test-watch:
	@$(JEST) --watch $(ARGS)

.PHONY: start +start
start: ~format
	@$(MAKE) -s +start
+start:
	@$(BABEL_NODE) --extensions '.ts,.tsx' example $(ARGS)

.PHONY: clean
clean:
	-@$(JEST) --clearCache $(NOFAIL)
	-@$(GIT) clean -fXd \
		-e $(BANG)/node_modules \
		-e $(BANG)/node_modules/**/* \
		-e $(BANG)/package-lock.json \
		-e $(BANG)/pnpm-lock.yaml \
		-e $(BANG)/yarn.lock $(NOFAIL)
	-@rm -rf node_modules/.cache $(NOFAIL)
	-@rm -rf node_modules/.make $(NOFAIL)
	-@rm -rf node_modules/.tmp $(NOFAIL)

.PHONY: purge
purge: clean
	-@$(GIT) clean -fXd

.PHONY: count
count:
	@$(CLOC) $(shell $(GIT) ls-files)

.PHONY: report
report: spellcheck lint test
	@

%:
	@
