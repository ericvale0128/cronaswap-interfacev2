import { classNames, formatNumber, formatPercent } from '../../functions'

import DoubleLogo from '../../components/DoubleLogo'
import React from 'react'
import { useCurrency } from '../../hooks/Tokens'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

import FarmListItemDetails from './FarmListItemDetails'
import { usePendingCrona } from './hooks'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

const FarmListItem = ({ farm, ...rest }) => {
  const { i18n } = useLingui()

  let token0 = useCurrency(farm.token0?.id)
  let token1 = useCurrency(farm.token1?.id)

  const pendingCrona = usePendingCrona(farm)

  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <Disclosure.Button
            className={classNames(
              open && 'rounded-b-none',
              'w-full px-4 py-6 text-left rounded cursor-pointer select-none bg-dark-900 text-primary text-sm md:text-lg'
            )}
          >
            <div className="flex">
              {/* Token logo */}
              <div className="flex w-4/12 col-span-2 gap-20 space-x-4 md:col-span-1">
                <DoubleLogo currency0={token0} currency1={token1} size={40} />
                <div className="flex flex-col justify-center">
                  {/* <div className="text-xs md:text-base text-blue">FARMING</div> */}
                  <div className="text-xs font-bold md:text-base">
                    {farm?.pid} {farm?.name}
                  </div>
                </div>
              </div>

              {/* Earned */}
              <div className="flex flex-col justify-center w-2/12">
                <div className="text-xs md:text-base text-secondary">{i18n._(t`Earned`)}</div>
                <div className="text-xs font-bold md:text-base">{formatNumber(pendingCrona?.toFixed(18))}</div>
              </div>

              {/* Liquidity */}
              <div className="flex-col justify-center hidden w-2/12 lg:block">
                <div className="text-xs md:text-base text-secondary">{i18n._(t`Liquidity`)}</div>
                <div className="text-xs font-bold md:text-base">{formatNumber(farm.tvl, true)}</div>
              </div>

              {/* Multiplier */}
              <div className="flex-col justify-center hidden w-2/12 lg:block">
                <div className="text-xs md:text-base text-secondary">{i18n._(t`Multiplier`)}</div>
                <div className="text-xs font-bold md:text-base">{farm.multiplier / 100}x</div>
              </div>

              {/* APR */}
              {/* <div className="flex flex-col justify-center">
                            <div className="text-xs md:text-base text-secondary">APR</div>
                            <div className="md:flex">
                            <div className="text-xs font-bold md:text-base">26.78% / </div>
                            <div className="flex items-center">
                                <LockClosedIcon className="h-4" />
                                <div className="text-xs font-bold md:text-base">278.68%</div>
                                <CalculatorIcon className="h-4" />
                            </div>
                            </div>
                        </div> */}

              <div className="flex flex-col justify-center w-1/12">
                <div className="text-xs md:text-base text-secondary">APR</div>
                <div className="text-xs font-bold md:text-base">{formatPercent(farm.apr)} </div>
              </div>

              <div className="flex flex-col items-center justify-center w-1/12">
                <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
              </div>
            </div>
          </Disclosure.Button>

          {open && <FarmListItemDetails farm={farm} />}
        </div>
      )}
    </Disclosure>
  )
}

export default FarmListItem
