import React, { useEffect, useState } from 'react'
import { Currency, CurrencyAmount, Token } from '@cronaswap/core-sdk'
import Button from 'components/Button'
import Dots from 'components/Dots'
import Loader from 'components/Loader'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from 'services/web3'
import { useLingui } from '@lingui/react'
import {
    useClaimCallback as useProtocolClaimCallback,
    useUserUnclaimedAmount as useUserUnclaimedProtocolAmount,
} from 'state/claim/protocol/hooks'
import { useModalOpen, useToggleSelfClaimModal } from 'state/application/hooks'
import { useUserHasSubmittedClaim } from 'state/transactions/hooks'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from './Toast'
import { ApplicationModal } from 'state/application/actions'
import { getBalanceNumber } from 'functions/formatBalance'
import { usePrivateSaleBContract } from 'hooks/useContract'
import { usePurchased, useClaimable, useClaimed } from '../hooks/usePrivateSaleBInfo'

export const PrivateSaleBVesting = () => {
    const { i18n } = useLingui()

    const isOpen = useModalOpen(ApplicationModal.SELF_CLAIM)
    const toggleClaimModal = useToggleSelfClaimModal()

    const { account } = useActiveWeb3React()
    const [attempting, setAttempting] = useState<boolean>(false)
    const { claimCallback } = useProtocolClaimCallback(account)
    const unclaimedAmount: CurrencyAmount<Currency> | undefined = useUserUnclaimedProtocolAmount(account)
    const { claimSubmitted } = useUserHasSubmittedClaim(account ?? undefined)
    const claimConfirmed = false
    const privateSaleBContract = usePrivateSaleBContract()
    const [pendingTx, setPendingTx] = useState(false)
    const { callWithGasPrice } = useCallWithGasPrice()
    const { toastError, toastSuccess } = useToast()
    const DEFAULT_GAS_LIMIT = 250000

    const handleClaim = async () => {
        setPendingTx(true)
        try {
            const tx = await callWithGasPrice(privateSaleBContract, 'claim', undefined, { gasLimit: DEFAULT_GAS_LIMIT })
            const receipt = await tx.wait()
            if (receipt.status) {
                toastSuccess(
                    i18n._(t`Private-sale B claimed!`,
                        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                            {i18n._(t`CRONAs has been sent to your wallet.`)}
                        </ToastDescriptionWithTx>,
                    )),
                    setPendingTx(false)
            }
        } catch (error) {
            console.error(error)
            toastError(i18n._(t`Error`), i18n._(t`Please try again. Confirm the transaction and make sure you are paying enough gas!`))
            setPendingTx(false)
        }
    }

    // once confirmed txn is found, if modal is closed open, mark as not attempting regradless
    useEffect(() => {
        if (claimConfirmed && claimSubmitted && attempting) {
            setAttempting(false)
            if (!isOpen) {
                toggleClaimModal()
            }
        }
    }, [attempting, claimConfirmed, claimSubmitted, isOpen, toggleClaimModal])

    // // remove once treasury signature passed
    const pendingTreasurySignature = false

    // New Adding
    const userPurchased = usePurchased()
    const userClaimable = useClaimable()
    const userClaimed = useClaimed()

    const hasFetchedCronaAmount = userPurchased ? userPurchased.gte(0) : false
    const purchasedCrona = hasFetchedCronaAmount ? getBalanceNumber(userPurchased, 18) : 0
    const claimableCrona = hasFetchedCronaAmount ? getBalanceNumber(userClaimable, 18) : 0
    const unclaimedCrona = hasFetchedCronaAmount ? purchasedCrona - getBalanceNumber(userClaimed) : 0

    return (
        <div className="flex flex-col gap-3 md:max-w-full">
            <div className="relative w-full h-full overflow-hidden rounded bg-dark-900">
                <div className="flex flex-col gap-3 p-4">
                    <div className="text-lg font-bold text-white">{i18n._(t`Claimable CRONA from Private Sale Round B`)}</div>
                    <div className="flex flex-col items-baseline pb-4">
                        <div className="font-bold text-white text-[26px]">{claimableCrona}</div>
                        {account ? (
                            <div className="text-sm text-secondary">{i18n._(t`Your Claimable CRONAs`)}</div>
                        ) : (
                            <div className="text-sm text-secondary">{i18n._(t`Your Claimable CRONAs: Connect Wallet`)}</div>
                        )}
                    </div>
                    <div className="flex flex-col pb-4 space-y-2">
                        <div className="flex flex-row justify-between text-md">
                            <h2>Your Purchased CRONAs</h2> <span>{purchasedCrona}</span>
                        </div>
                        <div className="flex flex-row justify-between text-lg">
                            <h2>Your UnClaimed CRONAs</h2> <span>{unclaimedCrona}</span>
                        </div>
                    </div>
                    <Button
                        color={
                            !claimableCrona
                                ? 'gray'
                                : 'gradient'
                        }
                        disabled={!claimableCrona}
                        size="default"
                        onClick={handleClaim}
                        className="inline-flex items-center justify-center"
                    >
                        {pendingTx ? (
                            <Dots>{i18n._(t`Pending Claim`)}</Dots>
                        ) : (
                            <> {claimConfirmed ? i18n._(t`Claimed`) : i18n._(t`Claim CRONA`)}</>
                        )}

                        {attempting && (
                            <Loader
                                stroke="white"
                                style={{
                                    marginLeft: '10px',
                                    height: '16px',
                                }}
                            />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}