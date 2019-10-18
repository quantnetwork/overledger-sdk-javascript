default:
	yarn run bootstrap
	cd packages/overledger-types && yarn run build && cd ../..
	cd packages/overledger-provider && yarn run build && cd ../..
	cd packages/overledger-dlt-abstract && yarn run build && cd ../..
	cd packages/overledger-search && yarn run build && cd ../..
	cd packages/overledger-core && yarn run build && cd ../..
	cd packages/overledger-dlt-ethereum && yarn run build && cd ../..
	cd packages/overledger-dlt-ripple && yarn run build && cd ../..
	cd packages/overledger-bundle && yarn run build && cd ../..
