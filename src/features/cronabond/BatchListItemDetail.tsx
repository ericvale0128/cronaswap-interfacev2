import { Disclosure, Transition } from '@headlessui/react'
import React, { useCallback, useState } from 'react'

import { ExternalLink as LinkIcon } from 'react-feather'
import { useLingui } from '@lingui/react'
import { useActiveWeb3React } from 'app/services/web3'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { Token, ZERO } from '@cronaswap/core-sdk'
import { formatNumber, formatNumberScale, tryParseAmount } from 'app/functions'
import { ApprovalState, useApproveCallback, useContract } from 'app/hooks'
import { getAddress } from '@ethersproject/address'
import { useTokenBalance } from 'app/state/wallet/hooks'
import Button from 'app/components/Button'
import Dots from 'app/components/Dots'
import NumericalInput from 'app/components/NumericalInput'
import { t } from '@lingui/macro'
import { useBatchInfo, useUserInfo } from './hooks'
import { CRONA, GRONA } from 'app/config/tokens'
import { useBuyBatch, useHarvestBatch } from './useBatches'
import BATCH_BOND_ABI from 'app/constants/abis/batch-bond.json'

const BatchListItemDetail = ({ batch }) => {
  const { i18n } = useLingui()

  const { account, chainId } = useActiveWeb3React()

  const stakingToken = GRONA[chainId]
  const earningToken = CRONA[chainId]
  const {
    pending,
    userBought,
    bondsAvailable,
    batchLimit,
    batchSold,
    expiration,
    price,
    rewardPerBondPerSecond,
    startTime,
    userLimit,
    earningTokenPrice,
  } = useBatchInfo(batch, account, earningToken)

  const [pendingConvert, setPendingConvert] = useState(false)
  const [pendingReturn, setPendingReturn] = useState(false)

  const [pendingTx, setPendingTx] = useState(false)
  const [depositValue, setDepositValue] = useState<string>('')

  const bondContract = useContract(batch.batchBond, BATCH_BOND_ABI)

  const typedDepositValue = tryParseAmount(
    (Number(depositValue) * price?.toFixed(stakingToken.decimals)).toString(),
    stakingToken
  )

  const stakeBalance = useTokenBalance(account, stakingToken)

  const [approvalState, approve] = useApproveCallback(typedDepositValue, bondContract?.address)
  const addTransaction = useTransactionAdder()

  const { handleBuy } = useBuyBatch(batch)
  const { handleHarvest } = useHarvestBatch(batch)

  const buy = useCallback(async () => {
    try {
      setPendingConvert(true)
      let tx = await handleBuy(depositValue)
      addTransaction(tx, {
        summary: `${i18n._(t`Buying `)} ${depositValue} batches with ${typedDepositValue.toFixed(
          stakingToken.decimals
        )} ${stakingToken?.symbol}`,
      })
      setPendingConvert(false)
    } catch (e) {
      setPendingConvert(false)
      console.warn(e)
    }
  }, [handleBuy, depositValue, addTransaction, stakingToken?.symbol])

  const harvest = useCallback(async () => {
    try {
      setPendingReturn(true)
      let tx = await handleHarvest()
      addTransaction(tx, {
        summary: `${i18n._(t`Claiming rewards in `)} ${earningToken?.symbol}`,
      })
      setPendingReturn(false)
    } catch (e) {
      setPendingReturn(false)
      console.warn(e)
    }
  }, [handleHarvest, addTransaction, earningToken?.symbol])

  // // TODO: Replace these
  // const { amount } = useUserInfo(pool, stakingToken)

  // const { deposit, withdraw, emergencyWithdraw, harvest } = useSmartChef(pool)

  // const userMaxStake = tryParseAmount('30000', stakingToken).subtract(
  //   tryParseAmount(amount && amount?.greaterThan(0) ? amount.toFixed(stakingToken?.decimals) : '0.000001', stakingToken)
  // )

  return (
    <Transition
      show={true}
      enter="transition-opacity duration-0"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Disclosure.Panel className="flex flex-col w-full border-t-0 rounded rounded-t-none bg-dark-800" static>
        {/* <div className="grid grid-cols-2 gap-4 p-4"> */}
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
          <div className="col-span-2 text-center md:col-span-1 items-center grid">
            {account && (
              <div className="flex flex-row justify-between">
                <div className="pr-4 mb-2 text-left cursor-pointer text-sm text-secondary">
                  Your GRONA balance: <span className="font-bold text-primary">{formatNumberScale(stakeBalance?.toSignificant(6, undefined, 2) ?? 0, false, 4)}</span>
                </div>
              </div>
            )}
            <div className="relative flex items-center mb-4 w-full">
              <NumericalInput
                className="w-full px-4 py-4 pr-20 rounded bg-dark-700 focus:ring focus:ring-dark-purple"
                value={depositValue}
                onUserInput={setDepositValue}
              />
              {account && (
                <Button
                  variant="outlined"
                  color="blue"
                  size="xs"
                  onClick={() => {
                    setDepositValue(bondsAvailable)
                  }}
                  className="absolute border-0 right-4 focus:ring focus:ring-light-purple"
                >
                  {i18n._(t`MAX`)}
                </Button>
              )}
            </div>

            <div className="flex space-x-2">
              {approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.PENDING ? (
                <Button
                  className="w-full"
                  color="gradient"
                  disabled={approvalState === ApprovalState.PENDING}
                  onClick={approve}
                >
                  {approvalState === ApprovalState.PENDING ? <Dots>{i18n._(t`Approving`)}</Dots> : i18n._(t`Approve`)}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  color="blue"
                  disabled={
                    pendingTx ||
                    !typedDepositValue ||
                    // (pool.pid === 0 && Number(depositValue) > 30000) ||
                    stakeBalance?.lessThan(typedDepositValue)
                  }
                  onClick={buy}
                >
                  {i18n._(t`Buy`)}
                </Button>
              )}
            </div>
          </div>
          <div className="col-span-2 text-center md:col-span-1 items-center grid">
            {/* <div className="pr-4 mb-2 text-center cursor-pointer">Your bonds</div> */}
            <div className="relative w-full border border-secondary rounded-md text-center text-lg font-semibold py-4 text-primary">
              Your bonds {formatNumber(userBought)} / {formatNumber(batchLimit)}
            </div>
            <div className="relative w-full border border-secondary rounded-md text-center text-lg font-semibold py-4 text-primary">
              Total rewards per bond is 540 crona
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-sm text-secondary">Crona Earned</div>
            <div className="flex flex-col justify-between text-sm gap-1 mt-1 rounded-lg bg-dark-700">
              <div className="flex mt-4">
                <div className="flex flex-col w-1/2 px-4 align-middle">
                  <div className="text-2xl font-bold"> {formatNumber(pending?.toFixed(earningToken?.decimals))}</div>
                  <div className="text-sm">
                    ~
                    {formatNumber(
                      pending?.toFixed(earningToken?.decimals) * earningTokenPrice?.toFixed(earningToken?.decimals), true
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-1/2 px-4 align-middle gap-y-1">
                  <Button
                    color={
                      // Number(formatNumber(pendingReward?.toFixed(earningToken?.decimals))) <= 0 ? 'blue' : 'gradient'
                      'blue'
                    }
                    size="sm"
                    className="w-full !text-sm"
                    variant={
                      // Number(formatNumber(pendingReward?.toFixed(earningToken?.decimals))) <= 0 ? 'outlined' : 'filled'
                      'filled'
                    }
                    disabled={Number(formatNumber(pending?.toFixed(earningToken?.decimals))) <= 0}
                    onClick={harvest}
                  >
                    {i18n._(t`Claim Rewards`)}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col p-2 space-y-2">
                <div className="flex flex-row justify-between px-2 text-md hidden">
                  <div className="text-sm">Next rewards in</div>
                  <div className="text-md">Block / {formatNumber(86000)}</div>
                </div>
              </div>
            </div>
            <div className="text-xs pt-2 text-yellow">
              * User can claim rewards, principal deposits can&apos;t be withdrawn.
            </div>
          </div>
        </div>
      </Disclosure.Panel>
    </Transition>
  )
}

export default BatchListItemDetail
