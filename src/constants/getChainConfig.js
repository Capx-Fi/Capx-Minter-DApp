import {
	AVALANCHE_CHAIN_ID,
	BSC_CHAIN_ID,
	ETHEREUM_CHAIN_ID,
	EXPLORER_AVALANCHE,
	EXPLORER_BSC,
	EXPLORER_ETHEREUM,
	EXPLORER_MATIC,
	MATIC_CHAIN_ID,
	GRAPH_FETCH_ETHEREUM,
	CAPX_FACTORY_ADDRESS_ETHEREUM
} from "./config";



export const getFactoryAddress = (chainId) => {
	const explorer =
    chainId?.toString() === ETHEREUM_CHAIN_ID?.toString()
      ? CAPX_FACTORY_ADDRESS_ETHEREUM
      : CAPX_FACTORY_ADDRESS_ETHEREUM
  return explorer;
}

export const getGraphFetch = (chainId) => {
	const graphURL =
		chainId?.toString() === ETHEREUM_CHAIN_ID?.toString()
			? GRAPH_FETCH_ETHEREUM
			: GRAPH_FETCH_ETHEREUM
	return graphURL;
}


export const getExplorer = (chainId) => {
	const explorer =
		chainId?.toString() === ETHEREUM_CHAIN_ID?.toString()
			? EXPLORER_ETHEREUM
			: chainId?.toString() === MATIC_CHAIN_ID?.toString()
			? EXPLORER_MATIC
			: chainId?.toString() === AVALANCHE_CHAIN_ID?.toString()
			? EXPLORER_AVALANCHE
			: EXPLORER_BSC;
	return explorer;
};


export const getSortBy = (chainId) => {
	const sortBy =
		chainId?.toString() === BSC_CHAIN_ID?.toString()
			? "BSC"
			: chainId?.toString() === MATIC_CHAIN_ID?.toString()
			? "Matic"
			: chainId?.toString() === AVALANCHE_CHAIN_ID?.toString()
			? "Avalanche"
			: chainId?.toString() === ETHEREUM_CHAIN_ID?.toString()
			? "Ethereum"
			: "Unknown";
	return sortBy;
};
