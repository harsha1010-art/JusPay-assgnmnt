import React from 'react';

const TopProducts = () => {
  const products = [
    { name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
    { name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
    { name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
    { name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
    { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" }
  ];

  return (
    <div className="bg-card rounded-xl ">
      <div className="px-6 py-4 border-b border-default">
        <h3 className="text-lg font-semibold text-primary">Top Selling Products</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-default">
              <th className="text-left px-6 py-3 text-sm font-medium text-secondary">Name</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-secondary">Price</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-secondary">Quantity</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-secondary">Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b border-default last:border-0">
                <td className="px-6 py-4 text-sm font-medium text-primary">{product.name}</td>
                <td className="px-6 py-4 text-sm text-secondary text-right">{product.price}</td>
                <td className="px-6 py-4 text-sm text-secondary text-right">{product.quantity}</td>
                <td className="px-6 py-4 text-sm text-primary font-medium text-right">{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;