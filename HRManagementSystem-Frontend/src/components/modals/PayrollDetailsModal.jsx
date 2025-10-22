import React from 'react';

const PayrollDetailsModal = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null;

  // Calculate totals from the details object, providing fallbacks for safety
  const totalEarnings = record.details?.earnings?.reduce((sum, item) => sum + item.amount, 0) || record.grossPay;
  const totalDeductions = record.details?.deductions?.reduce((sum, item) => sum + item.amount, 0) || record.deductions;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-start mb-4 border-b pb-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Payslip</h2>
                <p className="text-gray-500 text-sm">For the period of {record.payPeriod}</p>
            </div>
            <button onClick={onClose} className="text-3xl text-gray-400 hover:text-gray-700 leading-none" aria-label="Close">&times;</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
                <p className="font-bold text-lg">{record.employeeName}</p>
                <p className="text-gray-600">Employee ID: {record.employeeId}</p>
            </div>
            <div className="text-right">
                <p className="text-gray-600">Pay Date: <span className="font-semibold text-gray-800">{record.payDate || 'Unpaid'}</span></p>
                <p className="text-gray-600">Status: <span className="font-semibold text-gray-800">{record.status}</span></p>
            </div>
        </div>

        <div className="border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-700 border-b pb-1">Earnings</h3>
                    <div className="space-y-2 text-sm">
                        {record.details?.earnings?.map((item, index) => (
                            <div key={index} className="flex justify-between text-gray-600">
                                <span>{item.item}</span>
                                <span className="font-mono text-right">₹{item.amount.toLocaleString('en-IN')}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between font-bold border-t mt-3 pt-2 text-gray-800">
                        <span>Gross Earnings</span>
                        <span className="font-mono text-right">₹{totalEarnings.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-700 border-b pb-1">Deductions</h3>
                    <div className="space-y-2 text-sm">
                        {record.details?.deductions?.map((item, index) => (
                            <div key={index} className="flex justify-between text-gray-600">
                                <span>{item.item}</span>
                                <span className="font-mono text-right text-red-600">(₹{item.amount.toLocaleString('en-IN')})</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between font-bold border-t mt-3 pt-2 text-gray-800">
                        <span>Total Deductions</span>
                        <span className="font-mono text-right text-red-600">(₹{totalDeductions.toLocaleString('en-IN')})</span>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 p-4 rounded-b-lg mt-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-green-800">Net Pay</h3>
                <p className="text-2xl font-bold text-green-800 font-mono">₹{record.netPay.toLocaleString('en-IN')}</p>
            </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
            <button onClick={onClose} className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm font-semibold">Close</button>
        </div>
      </div>
    </div>
  );
};

export default PayrollDetailsModal;