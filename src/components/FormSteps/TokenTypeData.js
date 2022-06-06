const tokenTypeData = [
  {
    id: "f01",
    name: "Standard Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: false,
      "Liquidity Generator": false,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00000000",
  },
  {
    id: "f02",
    name: "Mintable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00000000",
  },
  {
    id: "f03",
    name: "Burnable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: false,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: true,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00000000",
  },
  {
    id: "f04",
    name: "Mintable & Burnable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: true,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00000000",
  },
  {
    id: "f05",
    name: "Pausable Standard Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: false,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: true,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00000000",
  },
  {
    id: "f06",
    name: "Pausable Mintable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: true,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00000000",
  },
  {
    id: "f07",
    name: "Pausable Burnable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: false,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: true,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00000000",
  },
  {
    id: "f08",
    name: "Pausable Mint&Burnable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: true,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: true,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00000000",
  },
  {
    id: "s09",
    name: "Capped Mintable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": true,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "11000000",
  },
  {
    id: "s10",
    name: "Capped Mint&Burnable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: true,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": true,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "11000000",
  },
  {
    id: "s11",
    name: "Capped Pausable Mintable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: true,
      "Yield Generator": false,
      "Capped Total Supply": true,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "11000000",
  },
  {
    id: "s12",
    name: "Capped Pausable Mint&Burnable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: true,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: true,
      "Yield Generator": false,
      "Capped Total Supply": true,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "11000000",
  },
  {
    id: "s13",
    name: "Taxable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: false,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": true,
    },
    advancedFeatures: "00100000",
  },
  {
    id: "s14",
    name: "AutoLP Taxable Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: false,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": true,
    },
    advancedFeatures: "00101010",
  },
  {
    id: "s15",
    name: "Deflationary Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00110000",
  },
  {
    id: "s16",
    name: "AutoLP Deflationary Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00111010",
  },
  {
    id: "s17",
    name: "Super Deflationary Token",
    description: "Token Description",
    features: {
      "ERC 20 Compliant": true,
      Mintable: true,
      "Liquidity Generator": true,
      "Verified Source Code": true,
      Burnable: false,
      "Donation (Charity)": true,
      Ownable: false,
      Pausable: false,
      "Yield Generator": false,
      "Capped Total Supply": false,
      "Taxable (Burn Tax)": false,
    },
    advancedFeatures: "00111111",
  },
];

export default tokenTypeData;