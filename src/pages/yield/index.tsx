import useFuse from '../../hooks/useFuse'
import Container from '../../components/Container'
import Head from 'next/head'
import { useRouter } from 'next/router'
import NavLink from '../../components/NavLink'

import React, { useState } from 'react'
import Search from '../../components/Search'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import useSortableData from '../../hooks/useSortableData'
import useFarms from '../../features/yield/useFarms'
import { formatNumberScale } from '../../functions'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import QuestionHelper from '../../components/QuestionHelper'
import Dots from '../../components/Dots'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteScroll } from '../../features/yield/hooks'
import FarmListItem from '../../features/yield/FarmListItem'

export default function Yield(): JSX.Element {
  const { i18n } = useLingui()

  const router = useRouter()
  const type = router.query.filter == null ? 'all' : (router.query.filter as string)

  const query = useFarms()
  const farms = query?.farms

  let tokenPrice = 0
  let totalTvlInUSD = 0

  query?.farms.map((farm: any) => {
    tokenPrice = farm.tokenPrice
    totalTvlInUSD = farm.totalTvlInUSD
  })

  const FILTER = {
    all: (farm) => farm.multiplier !== 0,
    inactive: (farm) => farm.multiplier == 0,
  }

  const datas = query?.farms.filter((farm) => {
    return type in FILTER ? FILTER[type](farm) : true
  })

  // Search Setup
  const options = { keys: ['symbol', 'name', 'lpToken'], threshold: 0.4 }
  const { result, search, term } = useFuse({
    data: datas && datas.length > 0 ? datas : [],
    options,
  })

  // const { result, search, term } = useFuse({
  //     data: farms && farms.length > 0 ? farms : [],
  //     options
  // })

  const flattenSearchResults = result.map((a: { item: any }) => (a.item ? a.item : a))

  // Sorting Setup
  const { items, requestSort, sortConfig } = useSortableData(flattenSearchResults)
  const [numDisplayed, setNumDisplayed] = useInfiniteScroll(items)

  const tabStyle = 'flex justify-center items-center h-full w-full rounded-lg cursor-pointer text-sm md:text-base'
  const activeTabStyle = `${tabStyle} text-high-emphesis font-bold bg-dark-900`
  const inactiveTabStyle = `${tabStyle} text-secondary`

  return (
    <Container id="farm-page" className="grid h-full px-2 py-4 mx-auto md:py-8 lg:py-12 gap-9" maxWidth="7xl">
      <Head>
        <title>Farm | CronaSwap</title>
        <meta key="description" name="description" content="Farm CronaSwap" />
      </Head>

      <div className="col-span-4 space-y-6 lg:col-span-3">
        {/* Hero */}
        <div className="space-y-10 md:block">
          <div className="relative w-full p-4 overflow-hidden rounded bg-opaque-blue">
            <div className="font-bold text-lg text-white">Farm</div>
            <div className="text-md text-primary">
              <p>Stake liquidity pool tokens to earn rewards in CronaSwap.</p>
              <p>Farms TVL: {formatNumberScale(totalTvlInUSD, true)}</p>
            </div>
          </div>
        </div>

        {/* search bar */}
        <div className="md:flex flex-row justify-between">
          {/* select tab */}
          <div className="m-auto mb-2 flex md:m-0 md:w-3/12 rounded h-14 bg-dark-800">
            <div className="h-full w-6/12 p-1">
              <div className={0 === 0 ? activeTabStyle : inactiveTabStyle}>
                <p>All Farms</p>
              </div>
            </div>
            <div className="h-full w-6/12 p-1">
              <div className={1 != 1 ? activeTabStyle : inactiveTabStyle}>
                <p>Inactive Farms</p>
              </div>
            </div>
            {/* <div className="h-full w-6/12 p-1">
              <div className={2 != 2 ? activeTabStyle : inactiveTabStyle}>
                <p>My Farms</p>
              </div>
            </div> */}
          </div>

          <div className="flex md:w-5/12 gap-10">
            {/* sort select menu*/}
            <div className="w-1/3 h-14">
              <div className="relative inline-block w-full h-full group">
                <button className="inline-flex items-center justify-between w-full h-full px-4 py-2 font-semibold bg-dark-800 rounded">
                  <span className="mr-1">Hot</span>
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                <ul className="hidden pt-1 group-hover:block">
                  <li className="">
                    <a className="block px-4 py-2 whitespace-no-wrap bg-dark-800 hover:bg-gray-900" href="#">
                      APR
                    </a>
                  </li>
                  <li className="">
                    <a className="block px-4 py-2 whitespace-no-wrap bg-dark-800 hover:bg-gray-900" href="#">
                      Multiplier
                    </a>
                  </li>
                  <li className="">
                    <a className="block px-4 py-2 whitespace-no-wrap bg-dark-800 hover:bg-gray-900" href="#">
                      Liquidity
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* filter menu */}
            <Search
              search={search}
              term={term}
              inputProps={{
                className:
                  'relative w-full bg-transparent border border-transparent focus:border-gradient-r-blue-pink-dark-900 rounded placeholder-secondary focus:placeholder-primary font-bold text-base px-6 py-3.5',
              }}
            />
          </div>
        </div>
        {/* All Farms */}
        {/* //logo|name, Earned, APR, TVL, Multiplier */}
        <div className="grid grid-cols-5 pb-4 px-4 text-sm  text-primary">
          <div className="flex items-center cursor-pointer hover:text-secondary" onClick={() => requestSort('symbol')}>
            <div className="hover:text-high-emphesis">{i18n._(t`Pool`)}</div>
            {sortConfig &&
              sortConfig.key === 'symbol' &&
              ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
                (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
          </div>
          <div className="hidden md:block ml-4">
            <div className="flex items-center justify-end">
              <div>{i18n._(t`Earned`)}</div>
            </div>
          </div>
          <div className="hidden md:block ml-4">
            <div className="flex items-center justify-end">
              <div>{i18n._(t`Multiplier`)}</div>
              <QuestionHelper
                text="The multiplier represents the amount of CRONA rewards each farm gets. 
                      For example, if a 1x farm was getting 1 CRONA per second, a 40x farm would be getting 40 CRONA per second."
              />
            </div>
          </div>
          <div className="hover:text-secondary cursor-pointer" onClick={() => requestSort('apr')}>
            <div className="flex items-center justify-end">
              <div>{i18n._(t`APR`)}</div>
              {sortConfig &&
                sortConfig.key === 'roiPerYear' &&
                ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
                  (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
            </div>
          </div>
          <div className="hover:text-secondary cursor-pointer" onClick={() => requestSort('tvl')}>
            <div className="flex items-center justify-end">
              <div>{i18n._(t`TVL`)}</div>
              {sortConfig &&
                sortConfig.key === 'tvl' &&
                ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
                  (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
            </div>
          </div>
        </div>
        {/* <FarmList items={items} term={term} /> */}

        {items && items.length > 0 ? (
          <InfiniteScroll
            dataLength={numDisplayed}
            next={() => setNumDisplayed(numDisplayed + 5)}
            hasMore={true}
            loader={null}
          >
            <div className="space-y-2">
              {items.slice(0, numDisplayed).map((farm, index) => (
                <FarmListItem key={index} farm={farm} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="w-full py-6 text-center">{term ? <span>No Results.</span> : <Dots>Loading</Dots>}</div>
        )}
      </div>
    </Container>
  )
}