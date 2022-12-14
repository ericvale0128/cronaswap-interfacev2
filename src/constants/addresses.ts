import { ChainId } from '@cronaswap/core-sdk'

type AddressMap = { [chainId: number]: string }

export const CRONAVAULT_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0xDf3EBc46F283eF9bdD149Bb24c9b201a70d59389',
  [ChainId.CRONOS_TESTNET]: '0xEC2c9b42d56588654d2626F13D8F4FFd30fdf199',

  [ChainId.BSC_TESTNET]: '0x88Ec8078E4468adE096BD097A352FEc90079ad1B',
}

// masterChef
export const MASTERCHEFV1_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x77ea4a4cF9F77A034E4291E8f457Af7772c2B254',
  [ChainId.CRONOS_TESTNET]: '0x8722a9C5AbD2D3935330467A04256c00EC8A2770',

  [ChainId.BSC_TESTNET]: '0xD9ff81C734926cfc10c1b2Bd0B4f490B2cf471bF',
}

export const MASTERCHEFV2_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x7B1982b896CF2034A0674Acf67DC7924444637E4',
  [ChainId.CRONOS_TESTNET]: '0xc09fB2ef107A3c33B3523c85AA0a76D5484f8229',

  [ChainId.BSC_TESTNET]: '0x183A41B49A8ebA3585b923115162fed03f5B1Ad9',
}

// boost
export const VOTING_ESCROW_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x1E9d7DD649A1714f424f178036dbb79FA702b37d',
  [ChainId.CRONOS_TESTNET]: '0x57fc66Ec66Eb05E292A2ec5ba1728450C51dC3a1',

  [ChainId.BSC_TESTNET]: '0x873c905681Fb587cc12a29DA5CD3c447bE61F146',
}

export const REWARD_POOL_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x79956c0ccC9906Ee24B96CCF02234da1FB456dD8',
  [ChainId.CRONOS_TESTNET]: '0xb8cF67ECA3923daF019f767c0dbcbAe16dcAf548',

  [ChainId.BSC_TESTNET]: '0xbA1366602230ACC2DD2796c6ba6B6Ee5aB28A0Aa',
}

export const DASHBOARDV1_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x3647f6A3Ef1Aa70697b09407FF092fe878e9CeBA',
  [ChainId.CRONOS_TESTNET]: '0x845D4EebB195745b26052C3136A08C137F465701',

  [ChainId.BSC_TESTNET]: '0x4f5D75166C0ACa2A303e0cfE9Ee49096fa1A2a70',
}

export const DASHBOARDV2_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0xcB9a81865d908eBF0F877fea6a45a60a9FE83c47',
  [ChainId.CRONOS_TESTNET]: '0x3c75d3D228c15D592f807553321E16DF234434EC',

  [ChainId.BSC_TESTNET]: '0x9526eec4455C4910c389E6a753fbFFF374ACCd00',
}

// gemo
export const GRONA_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x3916598D3C1aA1252D3F7Bf5b428B1303d87A9CC',
  [ChainId.CRONOS_TESTNET]: '0x0000000000000000000000000000000000000000',

  [ChainId.BSC_TESTNET]: '0xE9A7077e47BBD95b5a010D626d5c2B8Dd227131c',
}

export const TREASURY_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0xcbfA29eEdaFA0A0F34C5E1B02CFaB1d51Ff65444',
  [ChainId.CRONOS_TESTNET]: '0x0000000000000000000000000000000000000000',

  [ChainId.BSC_TESTNET]: '0x9f2bbea22350ab3e52fb092e5238f6bb8e43c1a7',
}

export const BATCHNODE_ADDRESS: AddressMap = {
  [ChainId.BSC_TESTNET]: '0xc02F875faE1404D2a3f000583b270aeA47ca04Cf',
}

// Seed / Private / Public Sale
export const SEED_SALE_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x94f3Dfc9E8AE00892984d8fA003BF09a46987DFd',
  [ChainId.CRONOS_TESTNET]: '',
}

export const PRIVATE_SALEA_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x1c41BE3D395494e636aE7Ec9b8B5AB32A9Ddd1Ce',
  [ChainId.CRONOS_TESTNET]: '',
}

export const PRIVATE_SALEB_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x309afba23f791B5c38Ab9057D11D6869755fAcaf',
  [ChainId.CRONOS_TESTNET]: '',
}

export const PUBLIC_SALE_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x941a3703E106707668f38E779c7984383638173e',
  [ChainId.CRONOS_TESTNET]: '',
}

export const VOTE_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0x2Cb151D71D5EE6FD5a805a8614803e0e48e67c3B',
  [ChainId.BSC_TESTNET]: '0x6a8c1ba309136D78245f1F0a14790239b71a9577',
}

export const ZAP_ADDRESS: AddressMap = {
  [ChainId.CRONOS]: '0xb81Ea14a5896B1D85FDbc1C79df0f7bF4077A6F0', //old 0xe7CD641c86B6F2Ccf63b95B9b2951beb5fe567e9
  [ChainId.CRONOS_TESTNET]: '',
  [ChainId.BSC_TESTNET]: '0xF4E667173f6983A81fABFAf8d71e6078F261E596',
}

export const FAUCET_ADDRESS: AddressMap = {
  [ChainId.BSC_TESTNET]: '0xe5eD4378f4761cb4b6a6904df5A29003C3e35557',
}

export const PRIVATESALE_ADDRESS: AddressMap = {
  [ChainId.BSC_TESTNET]: '0xf3CAb862A2f696fa493db85749736411635fA273',
}

export const COINTOSS_ADDRESS: AddressMap = {
  [ChainId.BSC_TESTNET]: '0xdB064022Ef7e53a486864bad648cAec854b09490',
  [ChainId.CRONOS_TESTNET]: '0xCCCC262A193d809e1d348D446E5d950f05a1b5B0',
  [ChainId.CRONOS]: '0xF9eb945f1FE0572f660A9A61eA491109C6D0D699',
}

export const DICEROLL_ADDRESS: AddressMap = {
  [ChainId.BSC_TESTNET]: '0x37990e2840dA098262f9B9546fb03fF1bD13E2DF',
  [ChainId.CRONOS_TESTNET]: '0x3919f90c01c59DB44FC23a51C151FD0D7b6A28FF',
  [ChainId.CRONOS]: '0x0dDb097f027DbD5Ae31069767560789Ce70477fb',
}
