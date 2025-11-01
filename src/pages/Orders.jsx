import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navmenu from '../components/Navmenu';
import NotificationSidebar from '../components/NotificationSidebar';
import ordersData from '../data/orders.json';

const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false); // 🔹 Toggle filter dropdown

  const itemsPerPage = 5;

  // Filter orders based on search term and filters
  const filteredOrders = useMemo(() => {
    return ordersData.orders.filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Handle checkbox selection
  const handleSelectAll = e => {
    if (e.target.checked) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = orderId => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusColor = status => {
    const colors = {
      'In Progress': 'text-[#8A8CD9]',
      Complete: 'text-[#4AA785]',
      Pending: 'text-[#59A8D4]',
      Approved: 'text-[#FFC555]',
      Rejected: 'text-[#FF6B6B]',
    };
    return colors[status] || 'text-gray-600 bg-gray-50';
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-background text-primary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <Navmenu />

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-primary">Order List</h1>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between bg-card backdrop-blur-sm rounded-2xl px-4 py-3 relative">
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-muted transition">
                <Plus size={16} className="text-muted-foreground" />
              </button>

              {/* 🔹 Filter Icon with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="p-2 rounded-lg hover:bg-muted transition cursor-pointer"
                >
                  <Filter size={16} className="text-muted-foreground" />
                </button>

                {showFilter && (
                  <div className="absolute top-10 left-0 bg-background  rounded-md shadow-lg w-40 z-20">
                    {['All', 'In Progress', 'Complete', 'Pending', 'Approved', 'Rejected'].map(status => (
                      <div
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setShowFilter(false);
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted transition ${
                          statusFilter === status ? 'text-primary font-medium' : 'text-secondary'
                        }`}
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="p-2 rounded-lg hover:bg-muted transition">
                <ArrowUpDown size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-72">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full h-9 pl-9 pr-4 rounded-lg bg-background text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none transition"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

         

      {/* Table */}
      <div className="bg-background  rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-default">
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  className="rounded border-default text-primary focus:ring-primary"
                  checked={selectedOrders.length === filteredOrders.length}
                  onChange={handleSelectAll}
                   style={{
    accentColor: getComputedStyle(document.documentElement)
      .getPropertyValue('--chaeckbox-bg')
      .trim() || '#3b82f6',
  }}
                />
              </th>
              <th className="px-6 py-4 text-left">
                <button className="text-secondary hover:text-primary font-medium text-sm flex items-center gap-1">
                  Order ID
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button className="text-secondary hover:text-primary font-medium text-sm flex items-center gap-1">
                  User
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button className="text-secondary hover:text-primary font-medium text-sm flex items-center gap-1">
                  Project
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button className="text-secondary hover:text-primary font-medium text-sm flex items-center gap-1">
                  Address
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button className="text-secondary hover:text-primary font-medium text-sm flex items-center gap-1">
                  Date
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button className="text-secondary hover:text-primary font-medium text-sm flex items-center gap-1">
                  Status
                  <ArrowUpDown size={14} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b border-default last:border-0">
                <td className="px-6 py-4">
                <input
  type="checkbox"
  className="rounded border-default  transition-all duration-200 hover:none"
  checked={selectedOrders.includes(order.id)}
  onChange={() => handleSelectOrder(order.id)}
  style={{
    accentColor: getComputedStyle(document.documentElement)
      .getPropertyValue('--chaeckbox-bg')
      .trim() || '#3b82f6',
  }}
/>

                </td>
                <td className="px-6 py-4 text-primary font-medium">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.user.avatar}
                      alt={order.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-primary font-medium">{order.user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-primary">{order.project}</td>
                <td className="px-6 py-4 text-primary">{order.address}</td>
                <td className="px-6 py-4 text-secondary">{order.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-default flex items-center justify-between">
          <div className="text-sm text-secondary">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {ordersData.orders.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm
                ${currentPage === 1 
                  ? 'text-secondary bg-card cursor-not-allowed' 
                  : 'text-secondary hover:text-primary hover:bg-hover'
                }`}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm
                  ${page === currentPage ? 'text-secondary' : 'text-secondary hover:text-primary hover:bg-hover'}`}
                style={page === currentPage ? { backgroundColor: '#a7a7a750', color: 'var(--primary)' } : {}}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm
                ${currentPage === totalPages 
                  ? 'text-secondary bg-card cursor-not-allowed' 
                  : 'text-secondary hover:text-primary hover:bg-hover'
                }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

        </div>
      </div>

      {/* Notification Sidebar */}
      <NotificationSidebar />
    </div>
  );
};

export default Orders;