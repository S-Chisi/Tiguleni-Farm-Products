import React, { useEffect, useState } from "react";
import ControlledSwitches from "./ControlledSwitches";
import axios from "axios";

const Payments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const accessToken = localStorage.getItem("token");
  const [paymentsData, setPaymentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCashOut = () => {
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = { amount, phoneNumber };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/withdrawals/cash-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Cash out successful!");
        console.log("Cash out success:", data);

        setAmount("");
        setPhoneNumber("");
      } else {
        alert("Cash out failed. Please try again.");
        console.error("Cash out failed:", response.statusText);
      }
    } catch (error) {
      alert("An error occurred while processing the cash out.");
      console.error("An error occurred:", error);
    }

    setShowPopup(false);
  };

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/withdrawals/seller-withdrwals`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        
        if (response.data && response.data.allSellerWithdrawals) {
          setPaymentsData(response.data.allSellerWithdrawals);
        } else {
          setPaymentsData([]);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPaymentsData();
  }, [accessToken]);

  const filteredPayments = paymentsData.filter((payment) => {
    return (
      payment.transID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.mobile?.includes(searchTerm) ||
      payment.amountCashedOut?.toString().includes(searchTerm)
    );
  });

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-semibold">Payments</h2>
        <div className="flex items-center">
          <span className="text-sm mr-2">Switch to buy</span>
          <ControlledSwitches />
        </div>
      </div>

      <div className="flex items-center mb-6">
        <button
          className="bg-gray-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-700 transition-all"
          onClick={handleCashOut}
        >
          Cash Out
        </button>
        <input
          type="text"
          placeholder="Search"
          className="border ml-64 border-gray-300 rounded-lg px-4 py-2 w-64 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full table-auto text-left">
        <thead className="bg-gray-200 text-sm text-gray-600">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Amount Cashed Out</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">Status</th>
            <th className="p-3">Transaction ID</th>
            <th className="p-3">Seller Email</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment, index) => (
              <tr key={payment.withdrawal_Id} className="border-t border-gray-300">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{payment.amountCashedOut}</td>
                <td className="p-3">{payment.mobile}</td>
                <td className="p-3">{payment.status}</td>
                <td className="p-3">{payment.transID}</td>
                <td className="p-3">{payment.seller?.email}</td>
                <td className="p-3">{new Date(payment.date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-3 text-center">
                {loading ? "Loading..." : "No matching payments found."}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Popup for cash out */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Cash Out</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Amount</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
