import React, { useCallback, useRef, useState } from 'react'
import { useLingui } from '@lingui/react'
import Head from 'next/head'
import Container from 'app/components/Container'
import { map } from 'lodash'
import QuestionHelper from 'app/components/QuestionHelper'
import InformationHelper from 'app/components/InformationHelper'
import { CoinTossBetPanel } from 'app/components/CoinTossBetPanel'
import { CoinTossVolumePanel } from 'app/components/CoinTossVolumePanel'
import SwapCroToWCro from 'app/components/SwapCroToWCro'
import GameRewardClaimPanel from 'app/components/GameRewardClaimPanel'
import { useRouter } from 'next/router'
import NavLink from 'app/components/NavLink'
import { CoinTossReview, CoinTossStatus } from 'app/features/gamefi/cointoss/enum'
import GameReviewPanel from 'app/components/GameReviewPanel'
import { DiceRollVolumePanel } from 'app/components/DiceRollVolumePanel'
import { DiceRollBetPanel } from 'app/components/DiceRollBetPanel'
import { DiceRollOption } from 'app/constants/gamefi'
import { DiceRollStatus } from 'app/features/gamefi/diceroll/enum'

export default function DiceRoll() {
  const { i18n } = useLingui()

  const router = useRouter()
  const type = router.query.filter == null ? '' : (router.query.filter as string)
  const tabStyle = 'px-[27px] py-[8px] rounded text-base font-normal cursor-pointer'
  const activeTabStyle = `${tabStyle} bg-[#0D0C2B]`
  const inactiveTabStyle = `${tabStyle}`
  const [activeTab, setActiveTab] = useState<CoinTossReview>(CoinTossReview.ALLBETS)
  const [diceRollOption, setDiceRollOption] = useState<DiceRollOption>({
    [DiceRollStatus.D1]: false,
    [DiceRollStatus.D2]: false,
    [DiceRollStatus.D3]: false,
    [DiceRollStatus.D4]: false,
    [DiceRollStatus.D5]: false,
    [DiceRollStatus.D6]: false,
  })
  const handleDiceSelect = (selection: DiceRollOption) => {
    setDiceRollOption(selection)
  }

  return (
    <Container id="cointoss-page" maxWidth="full" className="">
      <Head>
        <title key="title">DiceRoll | CronaSwap</title>
        <meta key="description" name="description" content="Welcome to CronaSwap" />
      </Head>
      <div className="relative flex flex-col items-center w-full">
        {/* <div className="absolute top-1/4 -left-10 bg-blue bottom-4 w-3/5 rounded-full z-0 filter blur-[150px]" />
        <div className="absolute bottom-1/4 -right-10 bg-red top-4 w-3/5 rounded-full z-0  filter blur-[150px]" /> */}
        <div className="relative">
          <div className="flex flex-col items-center">
            {/* <div className="text-[5vw] font-bold text-white font-sans leading-[89.3px]">Coin Toss Game</div>
            <div className="max-w-[469px] text-center text-white text-[18px] leading-[24px] mt-[14px]"></div> */}

            <DiceRollVolumePanel tokenName={'WCRO'} totalBetsCount={245} totalBetsAmount={123} houseEdge={1} />
            <div className="flex flex-col w-auto">
              <div className="flex lg:flex-row flex-col items-center gap-10 mt-[64px]">
                <div className="w-[605px] h-[834px] bg-[#1C1B38] rounded relative">
                  <DiceRollBetPanel diceRollOption={diceRollOption} onDiceRollSelect={handleDiceSelect} />
                </div>
                <div className="flex flex-col gap-10">
                  <SwapCroToWCro />
                  <GameRewardClaimPanel />
                </div>
              </div>
              <div className="w-[fit-content] h-[56px] mt-[64px] py-[8px] px-[8px] rounded bg-[#1C1B38]">
                <div className="flex flex-row">
                  <div
                    onClick={() => {
                      setActiveTab(CoinTossReview.ALLBETS)
                    }}
                  >
                    <NavLink href="/diceroll?filter=allbets">
                      <div className={activeTab === CoinTossReview.ALLBETS ? activeTabStyle : inactiveTabStyle}>
                        All Bets
                      </div>
                    </NavLink>
                  </div>
                  <div
                    onClick={() => {
                      setActiveTab(CoinTossReview.YOURBETS)
                    }}
                  >
                    <NavLink href="/diceroll?filter=yourbets">
                      <div className={activeTab === CoinTossReview.YOURBETS ? activeTabStyle : inactiveTabStyle}>
                        Your Bets
                      </div>
                    </NavLink>
                  </div>
                  <div
                    onClick={() => {
                      setActiveTab(CoinTossReview.LEADERBOARD)
                    }}
                  >
                    <NavLink href="/diceroll?filter=leaderboard">
                      <div className={activeTab === CoinTossReview.LEADERBOARD ? activeTabStyle : inactiveTabStyle}>
                        Leaderboard
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="mt-[22px]">
                <GameReviewPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
