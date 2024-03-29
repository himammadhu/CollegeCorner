import React from 'react'
import "./Home.scss"

import Widgets from '../../components/widgets/Widgets'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
// import Tables from '../../components/table/Tables'

const Home = () => {
  return (
    <>
      <div className="widgets">
        <Widgets type="user" />
        <Widgets type="order" />
        <Widgets type="Earnings" />
        <Widgets type="Balance" />
      </div>
      <div className="charts">
        <Featured />
        <Chart aspect={3 / 1} title="Last 6 Months (Revenue)" />
      </div>
      {/* <div className="listContainer">
          <div className="ListTitle">Latest Transactions</div>
          <Tables/>
        </div> */}

    </>
  )
}

export default Home
