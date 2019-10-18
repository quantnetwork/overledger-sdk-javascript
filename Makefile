default:
	yarn run bootstrap
	cd packages/types && yarn run build && cd ../..
	cd packages/provider && yarn run build && cd ../..
	cd packages/dlt-abstract && yarn run build && cd ../..
	cd packages/search && yarn run build && cd ../..
	cd packages/core && yarn run build && cd ../..
	cd packages/dlt-ethereum && yarn run build && cd ../..
	cd packages/dlt-ripple && yarn run build && cd ../..
	cd packages/bundle && yarn run build && cd ../..
