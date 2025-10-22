export const employees = [
    { id: 101, fullName: 'Alice Johnson', email: 'alice.j@example.com', jobTitle: 'Lead Designer', department: 'Design', status: 'Active', role: 'USER' },
    { id: 102, fullName: 'Bob Williams', email: 'bob.w@example.com', jobTitle: 'Senior Backend Engineer', department: 'Engineering', status: 'Active', role: 'USER' },
    { id: 103, fullName: 'Charlie Brown', email: 'charlie.b@example.com', jobTitle: 'Marketing Specialist', department: 'Marketing', status: 'On Leave', role: 'USER' },
    { id: 104, fullName: 'Diana Prince', email: 'diana.p@example.com', jobTitle: 'Product Manager', department: 'Product', status: 'Active', role: 'USER' },
];

export const leaveRequests = [
    { id: 1, employeeName: 'Alice Johnson', leaveType: 'Vacation', startDate: '2025-10-20', endDate: '2025-10-22', days: 3, status: 'Pending' },
    { id: 2, employeeName: 'Charlie Brown', leaveType: 'Sick Leave', startDate: '2025-09-15', endDate: '2025-09-15', days: 1, status: 'Approved' },
    { id: 3, employeeName: 'Bob Williams', leaveType: 'Personal', startDate: '2025-11-01', endDate: '2025-11-01', days: 1, status: 'Pending' },
    { id: 4, employeeName: 'Diana Prince', leaveType: 'Vacation', startDate: '2025-09-28', endDate: '2025-09-28', days: 1, status: 'Denied' },
];

export const payrollRecords = [
    {
        id: 1,
        employeeName: 'Alice Johnson',
        employeeId: 'EMP101',
        payPeriod: 'September 2025',
        grossPay: 60000,
        deductions: 12500,
        netPay: 47500,
        status: 'Pending',
        payDate: null,
        details: {
            earnings: [
                { item: 'Basic Salary', amount: 36000 },
                { item: 'House Rent Allowance (HRA)', amount: 18000 },
                { item: 'Special Allowance', amount: 6000 },
            ],
            deductions: [
                { item: 'Provident Fund (PF)', amount: 4320 },
                { item: 'Professional Tax', amount: 200 },
                { item: 'Income Tax (TDS)', amount: 7980 },
            ]
        }
    },
    {
        id: 2,
        employeeName: 'Bob Williams',
        employeeId: 'EMP102',
        payPeriod: 'September 2025',
        grossPay: 75000,
        deductions: 18000,
        netPay: 57000,
        status: 'Pending',
        payDate: null,
        details: {
            earnings: [
                { item: 'Basic Salary', amount: 45000 },
                { item: 'House Rent Allowance (HRA)', amount: 22500 },
                { item: 'Special Allowance', amount: 7500 },
            ],
            deductions: [
                { item: 'Provident Fund (PF)', amount: 5400 },
                { item: 'Professional Tax', amount: 200 },
                { item: 'Income Tax (TDS)', amount: 12400 },
            ]
        }
    },
    {
        id: 3,
        employeeName: 'Diana Prince',
        employeeId: 'EMP104',
        payPeriod: 'September 2025',
        grossPay: 68000,
        deductions: 15500,
        netPay: 52500,
        status: 'Paid',
        payDate: '2025-09-15',
        details: {
            earnings: [
                { item: 'Basic Salary', amount: 40800 },
                { item: 'House Rent Allowance (HRA)', amount: 20400 },
                { item: 'Special Allowance', amount: 6800 },
            ],
            deductions: [
                { item: 'Provident Fund (PF)', amount: 4896 },
                { item: 'Professional Tax', amount: 200 },
                { item: 'Income Tax (TDS)', amount: 10404 },
            ]
        }
    }
];

export const jobPostings = [
    { id: 1, title: 'Senior Frontend Developer', department: 'Engineering', location: 'Remote', applicants: 12 },
    { id: 2, title: 'UI/UX Designer', department: 'Design', location: 'New York, NY', applicants: 25 },
    { id: 3, title: 'DevOps Engineer', department: 'Engineering', location: 'Remote', applicants: 7 },
];

export const jobApplicants = [
    { id: 1, name: 'Eve Adams', appliedFor: 'Senior Frontend Developer', stage: 'Interview', submitted: '2025-09-20' },
    { id: 2, name: 'Frank Miller', appliedFor: 'UI/UX Designer', stage: 'Screening', submitted: '2025-09-18' },
    { id: 3, name: 'Grace Hopper', appliedFor: 'Senior Frontend Developer', stage: 'Offer', submitted: '2025-09-12' },
];
