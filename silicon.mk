PLATFORM := $(shell node -e "process.stdout.write(process.platform)")

ifeq ($(PLATFORM), win32)
  BANG := !
	MAKE = make
	NULL := nul
	SHELL = cmd.exe
else
  BANG := \!
	NULL := /dev/null
  SHELL := $(shell bash --version >$(NULL) 2>&1 && echo bash|| echo sh)
endif

ifeq ($(CWD),)
  CWD := $(shell pwd)
endif

CD := cd
GIT := $(shell git --version >$(NULL) 2>&1 && echo git|| echo true)
NPM := $(shell pnpm --version >$(NULL) 2>&1 && echo pnpm|| (yarn --version >$(NULL) 2>&1 && echo yarn|| echo npm))
NOFAIL := 2>$(NULL)|| true

.EXPORT_ALL_VARIABLES:

DEPSLIST := node_modules/.bin/depslist

MAKE_CACHE := node_modules/.make

DONE := $(MAKE_CACHE)/done
define done
	mkdir -p $(DONE) && touch -m $(DONE)/$1
endef

define add_dep
	mkdir -p $(MAKE_CACHE)/deps && echo $2 >> $(MAKE_CACHE)/deps/$1
endef

define reset_deps
	rm $(MAKE_CACHE)/deps/$1 $(NOFAIL)
endef

define get_deps
	cat $(MAKE_CACHE)/deps/$1 $(NOFAIL)
endef

define add_cache
	mkdir -p $$(echo $1 | sed 's/\/[^\/]*$$//g') && touch -m $1
endef
