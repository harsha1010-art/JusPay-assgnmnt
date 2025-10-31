import React from 'react'
import Sidebar from '../components/Sidebar'
import Navmenu from '../components/Navmenu'
import NotificationSidebar from '../components/NotificationSidebar'
import StatsCard from '../components/StatsCard'
import RevenueTrendChart from '../components/RevenueTrendChart'
import WorldMap from '../components/WorldMap'
import TopProducts from '../components/TopProducts'

function Dashboard() {
  const stats = [
    {
      title: "Customers",
      value: "3,781",
      change: "+11.01%",
      isPositive: true
    },
    {
      title: "Orders",
      value: "1,219",
      change: "-0.03%",
      isPositive: false
    },
    {
      title: "Revenue",
      value: "$695",
      change: "+15.03%",
      isPositive: true
    },
    {
      title: "Growth",
      value: "30.1%",
      change: "+6.08%",
      isPositive: true
    }
  ];


  return (
    <div className="flex h-screen bg-background text-primary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <Navmenu />

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                isPositive={stat.isPositive}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-3 gap-8">
            {/* Revenue Trend */}
            <div className="col-span-2 bg-card rounded-xl border border-default overflow-hidden">
              <div className="p-6 border-b border-default">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-primary">Revenue</h2>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span>
                      <span className="text-sm text-secondary">Current Week <span className="text-primary font-medium ml-1">$58,211</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#e5e7eb]"></span>
                      <span className="text-sm text-secondary">Previous Week <span className="text-primary font-medium ml-1">$68,768</span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <RevenueTrendChart />
              </div>
            </div>

            {/* Revenue by Location */}
            <div className="col-span-1">
              <WorldMap />
            </div>
          </div>

          {/* Top Products */}
          <TopProducts />
        </div>
      </div>

      {/* Notification Sidebar */}
      <NotificationSidebar />
    </div>
  )
}

export default Dashboard
