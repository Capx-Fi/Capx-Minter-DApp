import {
	ACALA_CHAIN_ID,
	AVALANCHE_CHAIN_ID,
	BSC_CHAIN_ID,
	ETHEREUM_CHAIN_ID,
	EXPLORER_AVALANCHE,
	EXPLORER_BSC,
	EXPLORER_ETHEREUM,
	EXPLORER_MATIC,
	EXPLORER_ACALA,
	MATIC_CHAIN_ID,
	GRAPH_FETCH_ETHEREUM,
	GRAPH_FETCH_BSC,
	GRAPH_FETCH_MATIC,
	GRAPH_FETCH_AVALANCHE,
	GRAPH_FETCH_ACALA,
	CAPX_FACTORY_ADDRESS_ETHEREUM,
	CAPX_FACTORY_ADDRESS_BSC,
	CAPX_FACTORY_ADDRESS_MATIC,
	CAPX_FACTORY_ADDRESS_ACALA,
	CAPX_FACTORY_ADDRESS_AVALANCHE,
	ETHEREUM_RPC,
	MATIC_RPC,
	BSC_RPC,
	AVALANCHE_RPC,
	ACALA_RPC,
} from "./config";



export const getFactoryAddress = (chainId) => {
	const explorer =
    chainId?.toString() === ETHEREUM_CHAIN_ID?.toString()
      ? CAPX_FACTORY_ADDRESS_ETHEREUM
			: chainId?.toString() === BSC_CHAIN_ID?.toString()
				? CAPX_FACTORY_ADDRESS_BSC
				: chainId?.toString() === MATIC_CHAIN_ID?.toString()
					? CAPX_FACTORY_ADDRESS_MATIC
					: chainId?.toString() === AVALANCHE_CHAIN_ID?.toString()
						? CAPX_FACTORY_ADDRESS_AVALANCHE 
						: CAPX_FACTORY_ADDRESS_ACALA;
  return explorer;
}

export const getGraphFetch = (chainId) => {
	const graphURL =
		chainId?.toString() === ETHEREUM_CHAIN_ID?.toString()
			? GRAPH_FETCH_ETHEREUM
			: chainId?.toString() === MATIC_CHAIN_ID?.toString()
				? GRAPH_FETCH_MATIC
				: chainId?.toString() === BSC_CHAIN_ID?.toString()
					? GRAPH_FETCH_BSC
					: chainId?.toString() === AVALANCHE_CHAIN_ID?.toString()
						? GRAPH_FETCH_AVALANCHE
						: GRAPH_FETCH_ACALA;
	return graphURL;
}


export const getExplorer = (chainId) => {
	const explorer =
		chainId?.toString() === ETHEREUM_CHAIN_ID?.toString()
			? EXPLORER_ETHEREUM
			: chainId?.toString() === MATIC_CHAIN_ID?.toString()
				? EXPLORER_MATIC
				: chainId?.toString() === BSC_CHAIN_ID?.toString()
					? EXPLORER_BSC
					: chainId?.toString() === AVALANCHE_CHAIN_ID?.toString()
						? EXPLORER_AVALANCHE
						: EXPLORER_ACALA;
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
			: chainId?.toString() === ACALA_CHAIN_ID?.toString()
			? "Acala"
			: "Unknown";
	return sortBy;
};
