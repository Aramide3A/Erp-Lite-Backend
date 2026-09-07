// Sample records for local development. Only the seed script imports this file.
export const sampleData = {
  "settings": {
    "key": "default",
    "company": {
      "name": "AutoCore Services Ltd.",
      "industry": "Automotive Services",
      "location": "Lagos, Nigeria",
      "currency": "NGN",
      "registrationNumber": "RC 1840293",
      "phone": "+234 1 453 2910",
      "email": "finance@autocore.ng",
      "country": "Nigeria",
      "fiscalYear": "January - December"
    },
    "currentUser": {
      "id": "usr-001",
      "name": "Damilola Adamson",
      "role": "Administrator",
      "initials": "DA",
      "email": "damilola@autocore.ng"
    },
    "approvalRules": [
      {
        "label": "Up to NGN 100,000",
        "roles": [
          "Department Manager"
        ]
      },
      {
        "label": "NGN 100,001 - 1,000,000",
        "roles": [
          "Department Manager",
          "Finance Manager"
        ]
      },
      {
        "label": "Above NGN 1,000,000",
        "roles": [
          "Department Manager",
          "Finance Manager",
          "Managing Director"
        ]
      }
    ],
    "paymentMethods": [
      {
        "name": "Manual Bank Transfer",
        "enabled": true
      },
      {
        "name": "Paystack Transfer",
        "enabled": false
      },
      {
        "name": "Flutterwave Transfer",
        "enabled": false
      }
    ]
  },
  "employees": [
    {
      "name": "Damilola Adamson",
      "initials": "DA",
      "department": "Administration",
      "position": "Finance Administrator",
      "salary": 580000,
      "status": "Active",
      "employeeCode": "EMP-001",
      "joinedAt": "2023-01-12"
    },
    {
      "name": "Michael Adeyemi",
      "initials": "MA",
      "department": "Operations",
      "position": "Operations Manager",
      "salary": 720000,
      "status": "Active",
      "employeeCode": "EMP-002",
      "joinedAt": "2022-04-18"
    },
    {
      "name": "Aisha Bello",
      "initials": "AB",
      "department": "Procurement",
      "position": "Procurement Officer",
      "salary": 460000,
      "status": "Active",
      "employeeCode": "EMP-003",
      "joinedAt": "2024-06-08"
    },
    {
      "name": "Chinedu Okafor",
      "initials": "CO",
      "department": "Workshop",
      "position": "Senior Technician",
      "salary": 385000,
      "status": "Active",
      "employeeCode": "EMP-004",
      "joinedAt": "2023-03-04"
    },
    {
      "name": "Ifunanya Obi",
      "initials": "IO",
      "department": "Workshop",
      "position": "Service Advisor",
      "salary": 320000,
      "status": "On Leave",
      "employeeCode": "EMP-005",
      "joinedAt": "2024-09-21"
    }
  ],
  "vendors": [
    {
      "name": "Lagos Auto Parts",
      "category": "Vehicle Parts",
      "contact": "Aisha Musa",
      "phone": "0803 456 7821",
      "email": "sales@lagosautoparts.ng",
      "bank": "GTBank",
      "paid": 5240000,
      "status": "Active",
      "vendorCode": "VEN-001",
      "accountNumber": "0123456789"
    },
    {
      "name": "Techpoint Equipment Ltd.",
      "category": "Equipment",
      "contact": "Emeka Obi",
      "phone": "0802 813 5520",
      "email": "orders@techpoint.ng",
      "bank": "Access Bank",
      "paid": 1850000,
      "status": "Active",
      "vendorCode": "VEN-002",
      "accountNumber": "0183726450"
    },
    {
      "name": "MainOne",
      "category": "Utilities",
      "contact": "Corporate Support",
      "phone": "01 448 0000",
      "email": "support@mainone.net",
      "bank": "Zenith Bank",
      "paid": 1140000,
      "status": "Active",
      "vendorCode": "VEN-003",
      "accountNumber": "0201837465"
    }
  ],
  "accounts": [
    {
      "code": "1000",
      "name": "Assets",
      "type": "Asset",
      "description": "Company assets",
      "balance": 38450000,
      "status": "Active"
    },
    {
      "code": "1100",
      "name": "Cash and Bank",
      "type": "Asset",
      "description": "Cash and bank balances",
      "balance": 18420500,
      "status": "Active",
      "parentCode": "1000"
    },
    {
      "code": "1120",
      "name": "Main Operating Bank Account",
      "type": "Asset",
      "description": "Primary operating account",
      "balance": 17685000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "1100"
    },
    {
      "code": "1130",
      "name": "Petty Cash",
      "type": "Asset",
      "description": "Cash held for small expenses",
      "balance": 735500,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "1100"
    },
    {
      "code": "1200",
      "name": "Accounts Receivable",
      "type": "Asset",
      "description": "Amounts due from customers",
      "balance": 1850000,
      "status": "Active",
      "parentCode": "1000"
    },
    {
      "code": "1500",
      "name": "Fixed Assets",
      "type": "Asset",
      "description": "Long-term operating assets",
      "balance": 18179500,
      "status": "Active",
      "parentCode": "1000"
    },
    {
      "code": "1510",
      "name": "Motor Vehicles",
      "type": "Asset",
      "description": "Company vehicles",
      "balance": 14200000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "1500"
    },
    {
      "code": "1520",
      "name": "Workshop Equipment",
      "type": "Asset",
      "description": "Workshop tools and equipment",
      "balance": 2240000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "1500"
    },
    {
      "code": "1530",
      "name": "Diagnostic Equipment",
      "type": "Asset",
      "description": "Automotive diagnostic equipment",
      "balance": 722500,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "1500"
    },
    {
      "code": "1600",
      "name": "Accumulated Depreciation",
      "type": "Asset",
      "description": "Accumulated asset depreciation",
      "balance": -750000,
      "status": "Active",
      "parentCode": "1000"
    },
    {
      "code": "2000",
      "name": "Liabilities",
      "type": "Liability",
      "description": "Company obligations",
      "balance": 9750000,
      "status": "Active"
    },
    {
      "code": "2100",
      "name": "Accounts Payable",
      "type": "Liability",
      "description": "Amounts due to suppliers",
      "balance": 1240000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "2000"
    },
    {
      "code": "2200",
      "name": "Accrued Expenses",
      "type": "Liability",
      "description": "Accrued operating costs",
      "balance": 1110000,
      "status": "Active",
      "parentCode": "2000"
    },
    {
      "code": "2500",
      "name": "Loans Payable",
      "type": "Liability",
      "description": "Business loans",
      "balance": 7400000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "2000"
    },
    {
      "code": "3000",
      "name": "Equity",
      "type": "Equity",
      "description": "Owner and investor equity",
      "balance": 28700000,
      "status": "Active"
    },
    {
      "code": "3100",
      "name": "Owner Capital",
      "type": "Equity",
      "description": "Owner contributions",
      "balance": 15000000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "3000"
    },
    {
      "code": "3200",
      "name": "Additional Capital",
      "type": "Equity",
      "description": "Additional owner capital",
      "balance": 5500000,
      "status": "Active",
      "parentCode": "3000"
    },
    {
      "code": "3300",
      "name": "Investor Capital",
      "type": "Equity",
      "description": "Investor contributions",
      "balance": 8000000,
      "status": "Active",
      "parentCode": "3000"
    },
    {
      "code": "4000",
      "name": "Revenue",
      "type": "Revenue",
      "description": "Operating revenue",
      "balance": 153000000,
      "status": "Active"
    },
    {
      "code": "4100",
      "name": "Automotive Repair Revenue",
      "type": "Revenue",
      "description": "Vehicle repair revenue",
      "balance": 105000000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "4000"
    },
    {
      "code": "4200",
      "name": "Diagnostic Services Revenue",
      "type": "Revenue",
      "description": "Diagnostic service revenue",
      "balance": 28000000,
      "status": "Active",
      "parentCode": "4000"
    },
    {
      "code": "4400",
      "name": "Parts Sales Revenue",
      "type": "Revenue",
      "description": "Parts sales",
      "balance": 18000000,
      "status": "Active",
      "parentCode": "4000"
    },
    {
      "code": "4900",
      "name": "Other Income",
      "type": "Revenue",
      "description": "Other operating income",
      "balance": 2000000,
      "status": "Active",
      "parentCode": "4000"
    },
    {
      "code": "6000",
      "name": "Operating Expenses",
      "type": "Expense",
      "description": "Operating expenses",
      "balance": 96500000,
      "status": "Active"
    },
    {
      "code": "6100",
      "name": "Salaries and Wages",
      "type": "Expense",
      "description": "Employee compensation",
      "balance": 24500000,
      "status": "Active",
      "parentCode": "6000"
    },
    {
      "code": "6110",
      "name": "Basic Salaries",
      "type": "Expense",
      "description": "Employee monthly base salaries",
      "balance": 21800000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "6100"
    },
    {
      "code": "6120",
      "name": "Staff Allowances",
      "type": "Expense",
      "description": "Employee allowances",
      "balance": 2700000,
      "status": "Active",
      "parentCode": "6100"
    },
    {
      "code": "6200",
      "name": "Rent",
      "type": "Expense",
      "description": "Office and workshop rent",
      "balance": 6480000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "6000"
    },
    {
      "code": "6300",
      "name": "Utilities",
      "type": "Expense",
      "description": "Utilities and communications",
      "balance": 4820000,
      "status": "Active",
      "parentCode": "6000"
    },
    {
      "code": "6330",
      "name": "Internet and Communications",
      "type": "Expense",
      "description": "Internet and communication services",
      "balance": 1140000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "6300"
    },
    {
      "code": "6400",
      "name": "Transportation",
      "type": "Expense",
      "description": "Transportation costs",
      "balance": 5980000,
      "status": "Active",
      "parentCode": "6000"
    },
    {
      "code": "6410",
      "name": "Fuel",
      "type": "Expense",
      "description": "Vehicle fuel",
      "balance": 3420000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "6400"
    },
    {
      "code": "6500",
      "name": "Marketing and Advertising",
      "type": "Expense",
      "description": "Marketing costs",
      "balance": 3900000,
      "status": "Active",
      "parentCode": "6000"
    },
    {
      "code": "6600",
      "name": "Software and Technology",
      "type": "Expense",
      "description": "Technology costs",
      "balance": 5300000,
      "status": "Active",
      "parentCode": "6000"
    },
    {
      "code": "6610",
      "name": "Software Subscriptions",
      "type": "Expense",
      "description": "Recurring software subscriptions",
      "balance": 2450000,
      "status": "Active",
      "hasTransactions": true,
      "parentCode": "6600"
    }
  ],
  "requests": [
    {
      "title": "Purchase of automotive diagnostic equipment",
      "requester": "Michael Adeyemi",
      "department": "Operations",
      "category": "Equipment",
      "type": "Purchase Request",
      "amount": 850000,
      "beneficiary": "Techpoint Equipment Ltd.",
      "description": "Replacement diagnostic scanner for the service bay.",
      "status": "Under Review",
      "requestCode": "REQ-2026-0148",
      "submittedAt": "2026-09-01",
      "requiredDate": "2026-09-12",
      "items": [
        {
          "name": "Autel diagnostic scanner",
          "description": "Professional automotive diagnostics",
          "quantity": 1,
          "unitPrice": 850000
        }
      ],
      "documents": []
    },
    {
      "title": "September vehicle parts restock",
      "requester": "Aisha Bello",
      "department": "Procurement",
      "category": "Vehicle Parts",
      "type": "Purchase Request",
      "amount": 1240000,
      "beneficiary": "Lagos Auto Parts",
      "status": "Approved",
      "requestCode": "REQ-2026-0147",
      "submittedAt": "2026-08-27",
      "requiredDate": "2026-09-05",
      "documents": []
    },
    {
      "title": "Client site transport",
      "requester": "Tunde Adeyemi",
      "department": "Operations",
      "category": "Transport",
      "type": "Expense Request",
      "amount": 78000,
      "beneficiary": "Tunde Adeyemi",
      "status": "Payment Pending",
      "requestCode": "REQ-2026-0146",
      "submittedAt": "2026-08-26",
      "requiredDate": "2026-08-29",
      "documents": []
    },
    {
      "title": "Safety equipment supplies",
      "requester": "Ifunanya Obi",
      "department": "Workshop",
      "category": "Equipment",
      "type": "Purchase Request",
      "amount": 164500,
      "beneficiary": "Safety First Nigeria",
      "status": "Paid",
      "requestCode": "REQ-2026-0145",
      "submittedAt": "2026-08-25",
      "requiredDate": "2026-08-30",
      "documents": []
    },
    {
      "title": "Workshop fuel advance",
      "requester": "Chinedu Okafor",
      "department": "Workshop",
      "category": "Fuel",
      "type": "Cash Advance",
      "amount": 65000,
      "beneficiary": "Chinedu Okafor",
      "description": "Fuel advance for offsite customer call-outs.",
      "status": "Submitted",
      "requestCode": "REQ-2026-0143",
      "submittedAt": "2026-08-22",
      "requiredDate": "2026-08-25",
      "documents": []
    },
    {
      "title": "August client hospitality",
      "requester": "Damilola Adamson",
      "department": "Administration",
      "category": "Other",
      "type": "Reimbursement",
      "amount": 46500,
      "beneficiary": "Damilola Adamson",
      "status": "Draft",
      "requestCode": "REQ-2026-0144",
      "submittedAt": "2026-08-20",
      "requiredDate": "2026-08-21",
      "documents": []
    }
  ],
  "payments": [
    {
      "requestTitle": "September vehicle parts restock",
      "beneficiary": "Lagos Auto Parts",
      "bank": "GTBank",
      "accountNumber": "0123456789",
      "amount": 1240000,
      "method": "Manual Bank Transfer",
      "status": "Payment Pending",
      "requestedBy": "Aisha Bello",
      "approvedBy": "Damilola Adamson",
      "paymentCode": "PAY-2026-0084",
      "requestCode": "REQ-2026-0147",
      "approvedDate": "2026-08-30",
      "paymentDate": null
    },
    {
      "requestTitle": "Client site transport",
      "beneficiary": "Tunde Adeyemi",
      "bank": "Access Bank",
      "accountNumber": "0183726450",
      "amount": 78000,
      "method": "Paystack Transfer",
      "status": "Processing",
      "requestedBy": "Tunde Adeyemi",
      "approvedBy": "Damilola Adamson",
      "reference": "PST_20260828_238194",
      "paymentCode": "PAY-2026-0083",
      "requestCode": "REQ-2026-0146",
      "approvedDate": "2026-08-28",
      "paymentDate": null
    },
    {
      "requestTitle": "Safety equipment supplies",
      "beneficiary": "Safety First Nigeria",
      "bank": "Zenith Bank",
      "accountNumber": "0201837465",
      "amount": 164500,
      "method": "Manual Bank Transfer",
      "status": "Paid",
      "requestedBy": "Ifunanya Obi",
      "approvedBy": "Damilola Adamson",
      "reference": "FIN_20260828_1859",
      "paymentCode": "PAY-2026-0082",
      "requestCode": "REQ-2026-0145",
      "approvedDate": "2026-08-27",
      "paymentDate": "2026-08-28"
    },
    {
      "requestTitle": "Workshop power generator service",
      "beneficiary": "PowerPro Services",
      "bank": "FirstBank",
      "accountNumber": "0137465829",
      "amount": 285000,
      "method": "Flutterwave Transfer",
      "status": "Payment Failed",
      "requestedBy": "Chinedu Okafor",
      "approvedBy": "Damilola Adamson",
      "paymentCode": "PAY-2026-0081",
      "requestCode": "REQ-2026-0139",
      "approvedDate": "2026-08-22",
      "paymentDate": null
    }
  ],
  "financialRecords": [
    {
      "description": "Automotive diagnostic equipment",
      "category": "Equipment",
      "department": "Operations",
      "party": "Techpoint Equipment Ltd.",
      "amount": 850000,
      "paymentMethod": "Manual Bank Transfer",
      "reference": "FIN_20260901_4308",
      "source": "Request",
      "status": "Paid",
      "direction": "out",
      "account": "GTBank Operations",
      "recordCode": "EXP-2026-0092",
      "date": "2026-09-01",
      "attachments": [],
      "accountCode": "1530",
      "paymentStatus": "Paid"
    },
    {
      "description": "Workshop fuel refill",
      "category": "Fuel",
      "department": "Workshop",
      "party": "TotalEnergies Nigeria",
      "amount": 285000,
      "paymentMethod": "Cash",
      "reference": "CASH_0829",
      "source": "Manual",
      "status": "Paid",
      "direction": "out",
      "account": "Petty Cash",
      "recordCode": "EXP-2026-0091",
      "date": "2026-08-30",
      "attachments": [],
      "accountCode": "6410",
      "paymentStatus": "Paid"
    },
    {
      "description": "August employee payroll",
      "category": "Salaries",
      "department": "Administration",
      "party": "AutoCore Employees",
      "amount": 2180000,
      "paymentMethod": "Manual Bank Transfer",
      "reference": "PAYROLL_AUG26",
      "source": "Payroll",
      "status": "Paid",
      "direction": "out",
      "account": "GTBank Payroll",
      "recordCode": "EXP-2026-0090",
      "date": "2026-08-28",
      "attachments": [],
      "accountCode": "6110",
      "paymentStatus": "Paid"
    },
    {
      "description": "Workshop internet subscription",
      "category": "Software",
      "department": "Workshop",
      "party": "MainOne",
      "amount": 95000,
      "paymentMethod": "Paystack",
      "reference": "PST_20260825_1182",
      "source": "Recurring Expense",
      "status": "Paid",
      "direction": "out",
      "account": "GTBank Operations",
      "recordCode": "EXP-2026-0089",
      "date": "2026-08-25",
      "attachments": [],
      "accountCode": "6610",
      "paymentStatus": "Paid"
    },
    {
      "description": "Fleet maintenance service invoice",
      "category": "Service Revenue",
      "party": "Adebayo Logistics Ltd.",
      "amount": 1825000,
      "paymentMethod": "Bank Transfer",
      "reference": "INV-AC-260901",
      "source": "Manual",
      "status": "Paid",
      "direction": "in",
      "account": "GTBank Operations",
      "recordCode": "INC-2026-0068",
      "date": "2026-09-01",
      "attachments": [],
      "accountCode": "4100",
      "paymentStatus": "Paid"
    },
    {
      "description": "Vehicle spare parts sales",
      "category": "Product Sales",
      "party": "Motorlink Ventures",
      "amount": 640000,
      "paymentMethod": "POS",
      "reference": "POS-081922",
      "source": "Manual",
      "status": "Paid",
      "direction": "in",
      "account": "GTBank Operations",
      "recordCode": "INC-2026-0067",
      "date": "2026-08-29",
      "attachments": [],
      "accountCode": "4100",
      "paymentStatus": "Paid"
    },
    {
      "description": "Workshop process consulting",
      "category": "Consulting",
      "party": "Prime Garage Ltd.",
      "amount": 425000,
      "paymentMethod": "Bank Transfer",
      "reference": "TRF-287421",
      "source": "Manual",
      "status": "Paid",
      "direction": "in",
      "account": "GTBank Operations",
      "recordCode": "INC-2026-0066",
      "date": "2026-08-20",
      "attachments": [],
      "accountCode": "4100",
      "paymentStatus": "Paid"
    },
    {
      "recordCode": "SAMPLE-IN-2026-01",
      "date": "2026-01-15",
      "description": "Monthly vehicle servicing receipts",
      "category": "Service Revenue",
      "department": "Operations",
      "party": "Fleet customers",
      "amount": 1285000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-in-1",
      "source": "Manual",
      "status": "Paid",
      "direction": "in",
      "account": "Automotive Repair Revenue",
      "accountCode": "4100",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-OUT-2026-01",
      "date": "2026-01-15",
      "description": "Monthly workshop running costs",
      "category": "Utilities",
      "department": "Operations",
      "party": "Workshop suppliers",
      "amount": 342000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-out-1",
      "source": "Manual",
      "status": "Paid",
      "direction": "out",
      "account": "Utilities",
      "accountCode": "6330",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-IN-2026-02",
      "date": "2026-02-15",
      "description": "Monthly vehicle servicing receipts",
      "category": "Service Revenue",
      "department": "Operations",
      "party": "Fleet customers",
      "amount": 1370000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-in-2",
      "source": "Manual",
      "status": "Paid",
      "direction": "in",
      "account": "Automotive Repair Revenue",
      "accountCode": "4100",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-OUT-2026-02",
      "date": "2026-02-15",
      "description": "Monthly workshop running costs",
      "category": "Utilities",
      "department": "Operations",
      "party": "Workshop suppliers",
      "amount": 364000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-out-2",
      "source": "Manual",
      "status": "Paid",
      "direction": "out",
      "account": "Utilities",
      "accountCode": "6330",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-IN-2026-03",
      "date": "2026-03-15",
      "description": "Monthly vehicle servicing receipts",
      "category": "Service Revenue",
      "department": "Operations",
      "party": "Fleet customers",
      "amount": 1455000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-in-3",
      "source": "Manual",
      "status": "Paid",
      "direction": "in",
      "account": "Automotive Repair Revenue",
      "accountCode": "4100",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-OUT-2026-03",
      "date": "2026-03-15",
      "description": "Monthly workshop running costs",
      "category": "Utilities",
      "department": "Operations",
      "party": "Workshop suppliers",
      "amount": 386000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-out-3",
      "source": "Manual",
      "status": "Paid",
      "direction": "out",
      "account": "Utilities",
      "accountCode": "6330",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-IN-2026-04",
      "date": "2026-04-15",
      "description": "Monthly vehicle servicing receipts",
      "category": "Service Revenue",
      "department": "Operations",
      "party": "Fleet customers",
      "amount": 1540000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-in-4",
      "source": "Manual",
      "status": "Paid",
      "direction": "in",
      "account": "Automotive Repair Revenue",
      "accountCode": "4100",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-OUT-2026-04",
      "date": "2026-04-15",
      "description": "Monthly workshop running costs",
      "category": "Utilities",
      "department": "Operations",
      "party": "Workshop suppliers",
      "amount": 408000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-out-4",
      "source": "Manual",
      "status": "Paid",
      "direction": "out",
      "account": "Utilities",
      "accountCode": "6330",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-IN-2026-05",
      "date": "2026-05-15",
      "description": "Monthly vehicle servicing receipts",
      "category": "Service Revenue",
      "department": "Operations",
      "party": "Fleet customers",
      "amount": 1625000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-in-5",
      "source": "Manual",
      "status": "Paid",
      "direction": "in",
      "account": "Automotive Repair Revenue",
      "accountCode": "4100",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-OUT-2026-05",
      "date": "2026-05-15",
      "description": "Monthly workshop running costs",
      "category": "Utilities",
      "department": "Operations",
      "party": "Workshop suppliers",
      "amount": 430000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-out-5",
      "source": "Manual",
      "status": "Paid",
      "direction": "out",
      "account": "Utilities",
      "accountCode": "6330",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-IN-2026-06",
      "date": "2026-06-15",
      "description": "Monthly vehicle servicing receipts",
      "category": "Service Revenue",
      "department": "Operations",
      "party": "Fleet customers",
      "amount": 1710000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-in-6",
      "source": "Manual",
      "status": "Paid",
      "direction": "in",
      "account": "Automotive Repair Revenue",
      "accountCode": "4100",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-OUT-2026-06",
      "date": "2026-06-15",
      "description": "Monthly workshop running costs",
      "category": "Utilities",
      "department": "Operations",
      "party": "Workshop suppliers",
      "amount": 452000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-out-6",
      "source": "Manual",
      "status": "Paid",
      "direction": "out",
      "account": "Utilities",
      "accountCode": "6330",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-IN-2026-07",
      "date": "2026-07-15",
      "description": "Monthly vehicle servicing receipts",
      "category": "Service Revenue",
      "department": "Operations",
      "party": "Fleet customers",
      "amount": 1795000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-in-7",
      "source": "Manual",
      "status": "Paid",
      "direction": "in",
      "account": "Automotive Repair Revenue",
      "accountCode": "4100",
      "paymentStatus": "Paid",
      "attachments": []
    },
    {
      "recordCode": "SAMPLE-OUT-2026-07",
      "date": "2026-07-15",
      "description": "Monthly workshop running costs",
      "category": "Utilities",
      "department": "Operations",
      "party": "Workshop suppliers",
      "amount": 474000,
      "paymentMethod": "Bank Transfer",
      "reference": "SAMPLE-out-7",
      "source": "Manual",
      "status": "Paid",
      "direction": "out",
      "account": "Utilities",
      "accountCode": "6330",
      "paymentStatus": "Paid",
      "attachments": []
    }
  ],
  "journalEntries": [
    {
      "description": "Automotive diagnostic equipment",
      "reference": "FIN_20260901_4308",
      "sourceType": "Expense",
      "sourceId": "EXP-2026-0092",
      "status": "Posted",
      "entryCode": "JRN-2026-0092",
      "date": "2026-09-01",
      "lines": [
        {
          "accountCode": "1530",
          "accountName": "Diagnostic Equipment",
          "debit": 850000,
          "credit": 0
        },
        {
          "accountCode": "1120",
          "accountName": "Main Operating Bank Account",
          "debit": 0,
          "credit": 850000
        }
      ]
    },
    {
      "description": "August employee payroll",
      "reference": "PAYROLL_AUG26",
      "sourceType": "Payroll",
      "sourceId": "EXP-2026-0090",
      "status": "Posted",
      "entryCode": "JRN-2026-0090",
      "date": "2026-08-28",
      "lines": [
        {
          "accountCode": "6110",
          "accountName": "Basic Salaries",
          "debit": 2180000,
          "credit": 0
        },
        {
          "accountCode": "1120",
          "accountName": "Main Operating Bank Account",
          "debit": 0,
          "credit": 2180000
        }
      ]
    },
    {
      "description": "Fleet maintenance service invoice",
      "reference": "INV-AC-260901",
      "sourceType": "Income",
      "sourceId": "INC-2026-0068",
      "status": "Posted",
      "entryCode": "JRN-2026-0068",
      "date": "2026-09-01",
      "lines": [
        {
          "accountCode": "1120",
          "accountName": "Main Operating Bank Account",
          "debit": 1825000,
          "credit": 0
        },
        {
          "accountCode": "4100",
          "accountName": "Automotive Repair Revenue",
          "debit": 0,
          "credit": 1825000
        }
      ]
    }
  ],
  "assets": [
    {
      "name": "Vehicle Diagnostic Scanner",
      "category": "Equipment",
      "cost": 850000,
      "value": 722500,
      "location": "Ikeja Workshop",
      "assigned": "Chinedu Okafor",
      "status": "In Use",
      "code": "AST-001",
      "purchaseDate": "2026-05-12"
    },
    {
      "name": "Toyota Hilux Service Van",
      "category": "Vehicles",
      "cost": 18500000,
      "value": 14200000,
      "location": "Lagos Operations",
      "assigned": "Tunde Adeyemi",
      "status": "In Use",
      "code": "AST-002",
      "purchaseDate": "2025-01-18"
    },
    {
      "name": "Office Computers",
      "category": "Computers",
      "cost": 2480000,
      "value": 1680000,
      "location": "Head Office",
      "assigned": "Administration",
      "status": "In Use",
      "code": "AST-003",
      "purchaseDate": "2025-03-09"
    },
    {
      "name": "Workshop Generator",
      "category": "Equipment",
      "cost": 3200000,
      "value": 2240000,
      "location": "Ikeja Workshop",
      "assigned": "Workshop",
      "status": "In Maintenance",
      "code": "AST-004",
      "purchaseDate": "2024-07-04"
    }
  ],
  "liabilities": [
    {
      "name": "GTBank business expansion loan",
      "creditor": "Guaranty Trust Bank",
      "original": 12000000,
      "outstanding": 7400000,
      "status": "Active",
      "start": "2025-02-01",
      "due": "2028-01-31"
    },
    {
      "name": "September parts payable",
      "creditor": "Lagos Auto Parts",
      "original": 1240000,
      "outstanding": 1240000,
      "status": "Due Soon",
      "start": "2026-08-27",
      "due": "2026-09-15"
    },
    {
      "name": "Office lease obligation",
      "creditor": "Ikeja Commercial Properties",
      "original": 2160000,
      "outstanding": 1080000,
      "status": "Active",
      "start": "2026-01-01",
      "due": "2026-12-31"
    }
  ],
  "capital": [
    {
      "owner": "Damilola Adamson",
      "type": "Owner Capital",
      "amount": 15000000,
      "reference": "CAP-2023-001",
      "notes": "Initial business capital",
      "date": "2023-01-08"
    },
    {
      "owner": "Damilola Adamson",
      "type": "Additional Capital",
      "amount": 5500000,
      "reference": "CAP-2025-004",
      "notes": "Workshop expansion",
      "date": "2025-04-16"
    },
    {
      "owner": "AutoCore Holdings Ltd.",
      "type": "Equity Investment",
      "amount": 8000000,
      "reference": "EQ-2026-001",
      "notes": "Minority equity investment",
      "date": "2026-06-03"
    }
  ],
  "budgets": [
    {
      "category": "Operations",
      "budget": 4200000
    },
    {
      "category": "Payroll",
      "budget": 2600000
    },
    {
      "category": "Marketing",
      "budget": 850000
    },
    {
      "category": "Equipment",
      "budget": 1800000
    },
    {
      "category": "Administrative",
      "budget": 640000
    }
  ],
  "salaries": [
    {
      "base": 580000,
      "allowance": 25000,
      "deduction": 8000,
      "status": "Paid",
      "code": "SAL-2026-2-EMP-001",
      "employeeCode": "EMP-001",
      "period": "2026-02-01",
      "paymentDate": "2026-02-28"
    },
    {
      "base": 580000,
      "allowance": 25000,
      "deduction": 8000,
      "status": "Paid",
      "code": "SAL-2026-3-EMP-001",
      "employeeCode": "EMP-001",
      "period": "2026-03-01",
      "paymentDate": "2026-03-28"
    },
    {
      "base": 580000,
      "allowance": 25000,
      "deduction": 8000,
      "status": "Paid",
      "code": "SAL-2026-4-EMP-001",
      "employeeCode": "EMP-001",
      "period": "2026-04-01",
      "paymentDate": "2026-04-28"
    },
    {
      "base": 580000,
      "allowance": 25000,
      "deduction": 8000,
      "status": "Paid",
      "code": "SAL-2026-5-EMP-001",
      "employeeCode": "EMP-001",
      "period": "2026-05-01",
      "paymentDate": "2026-05-28"
    },
    {
      "base": 580000,
      "allowance": 25000,
      "deduction": 8000,
      "status": "Paid",
      "code": "SAL-2026-6-EMP-001",
      "employeeCode": "EMP-001",
      "period": "2026-06-01",
      "paymentDate": "2026-06-28"
    },
    {
      "base": 580000,
      "allowance": 25000,
      "deduction": 8000,
      "status": "Paid",
      "code": "SAL-2026-7-EMP-001",
      "employeeCode": "EMP-001",
      "period": "2026-07-01",
      "paymentDate": "2026-07-28"
    },
    {
      "base": 580000,
      "allowance": 25000,
      "deduction": 8000,
      "status": "Paid",
      "code": "SAL-2026-8-EMP-001",
      "employeeCode": "EMP-001",
      "period": "2026-08-01",
      "paymentDate": "2026-08-28"
    },
    {
      "base": 580000,
      "allowance": 25000,
      "deduction": 8000,
      "status": "Paid",
      "code": "SAL-2026-9-EMP-001",
      "employeeCode": "EMP-001",
      "period": "2026-09-01",
      "paymentDate": "2026-09-28"
    },
    {
      "base": 720000,
      "allowance": 30000,
      "deduction": 10000,
      "status": "Paid",
      "code": "SAL-2026-2-EMP-002",
      "employeeCode": "EMP-002",
      "period": "2026-02-01",
      "paymentDate": "2026-02-28"
    },
    {
      "base": 720000,
      "allowance": 30000,
      "deduction": 10000,
      "status": "Paid",
      "code": "SAL-2026-3-EMP-002",
      "employeeCode": "EMP-002",
      "period": "2026-03-01",
      "paymentDate": "2026-03-28"
    },
    {
      "base": 720000,
      "allowance": 30000,
      "deduction": 10000,
      "status": "Paid",
      "code": "SAL-2026-4-EMP-002",
      "employeeCode": "EMP-002",
      "period": "2026-04-01",
      "paymentDate": "2026-04-28"
    },
    {
      "base": 720000,
      "allowance": 30000,
      "deduction": 10000,
      "status": "Paid",
      "code": "SAL-2026-5-EMP-002",
      "employeeCode": "EMP-002",
      "period": "2026-05-01",
      "paymentDate": "2026-05-28"
    },
    {
      "base": 720000,
      "allowance": 30000,
      "deduction": 10000,
      "status": "Paid",
      "code": "SAL-2026-6-EMP-002",
      "employeeCode": "EMP-002",
      "period": "2026-06-01",
      "paymentDate": "2026-06-28"
    },
    {
      "base": 720000,
      "allowance": 30000,
      "deduction": 10000,
      "status": "Paid",
      "code": "SAL-2026-7-EMP-002",
      "employeeCode": "EMP-002",
      "period": "2026-07-01",
      "paymentDate": "2026-07-28"
    },
    {
      "base": 720000,
      "allowance": 30000,
      "deduction": 10000,
      "status": "Paid",
      "code": "SAL-2026-8-EMP-002",
      "employeeCode": "EMP-002",
      "period": "2026-08-01",
      "paymentDate": "2026-08-28"
    },
    {
      "base": 720000,
      "allowance": 30000,
      "deduction": 10000,
      "status": "Paid",
      "code": "SAL-2026-9-EMP-002",
      "employeeCode": "EMP-002",
      "period": "2026-09-01",
      "paymentDate": "2026-09-28"
    },
    {
      "base": 460000,
      "allowance": 35000,
      "deduction": 12000,
      "status": "Paid",
      "code": "SAL-2026-2-EMP-003",
      "employeeCode": "EMP-003",
      "period": "2026-02-01",
      "paymentDate": "2026-02-28"
    },
    {
      "base": 460000,
      "allowance": 35000,
      "deduction": 12000,
      "status": "Paid",
      "code": "SAL-2026-3-EMP-003",
      "employeeCode": "EMP-003",
      "period": "2026-03-01",
      "paymentDate": "2026-03-28"
    },
    {
      "base": 460000,
      "allowance": 35000,
      "deduction": 12000,
      "status": "Paid",
      "code": "SAL-2026-4-EMP-003",
      "employeeCode": "EMP-003",
      "period": "2026-04-01",
      "paymentDate": "2026-04-28"
    },
    {
      "base": 460000,
      "allowance": 35000,
      "deduction": 12000,
      "status": "Paid",
      "code": "SAL-2026-5-EMP-003",
      "employeeCode": "EMP-003",
      "period": "2026-05-01",
      "paymentDate": "2026-05-28"
    },
    {
      "base": 460000,
      "allowance": 35000,
      "deduction": 12000,
      "status": "Paid",
      "code": "SAL-2026-6-EMP-003",
      "employeeCode": "EMP-003",
      "period": "2026-06-01",
      "paymentDate": "2026-06-28"
    },
    {
      "base": 460000,
      "allowance": 35000,
      "deduction": 12000,
      "status": "Paid",
      "code": "SAL-2026-7-EMP-003",
      "employeeCode": "EMP-003",
      "period": "2026-07-01",
      "paymentDate": "2026-07-28"
    },
    {
      "base": 460000,
      "allowance": 35000,
      "deduction": 12000,
      "status": "Paid",
      "code": "SAL-2026-8-EMP-003",
      "employeeCode": "EMP-003",
      "period": "2026-08-01",
      "paymentDate": "2026-08-28"
    },
    {
      "base": 460000,
      "allowance": 35000,
      "deduction": 12000,
      "status": "Paid",
      "code": "SAL-2026-9-EMP-003",
      "employeeCode": "EMP-003",
      "period": "2026-09-01",
      "paymentDate": "2026-09-28"
    },
    {
      "base": 385000,
      "allowance": 40000,
      "deduction": 14000,
      "status": "Paid",
      "code": "SAL-2026-2-EMP-004",
      "employeeCode": "EMP-004",
      "period": "2026-02-01",
      "paymentDate": "2026-02-28"
    },
    {
      "base": 385000,
      "allowance": 40000,
      "deduction": 14000,
      "status": "Paid",
      "code": "SAL-2026-3-EMP-004",
      "employeeCode": "EMP-004",
      "period": "2026-03-01",
      "paymentDate": "2026-03-28"
    },
    {
      "base": 385000,
      "allowance": 40000,
      "deduction": 14000,
      "status": "Paid",
      "code": "SAL-2026-4-EMP-004",
      "employeeCode": "EMP-004",
      "period": "2026-04-01",
      "paymentDate": "2026-04-28"
    },
    {
      "base": 385000,
      "allowance": 40000,
      "deduction": 14000,
      "status": "Paid",
      "code": "SAL-2026-5-EMP-004",
      "employeeCode": "EMP-004",
      "period": "2026-05-01",
      "paymentDate": "2026-05-28"
    },
    {
      "base": 385000,
      "allowance": 40000,
      "deduction": 14000,
      "status": "Paid",
      "code": "SAL-2026-6-EMP-004",
      "employeeCode": "EMP-004",
      "period": "2026-06-01",
      "paymentDate": "2026-06-28"
    },
    {
      "base": 385000,
      "allowance": 40000,
      "deduction": 14000,
      "status": "Paid",
      "code": "SAL-2026-7-EMP-004",
      "employeeCode": "EMP-004",
      "period": "2026-07-01",
      "paymentDate": "2026-07-28"
    },
    {
      "base": 385000,
      "allowance": 40000,
      "deduction": 14000,
      "status": "Paid",
      "code": "SAL-2026-8-EMP-004",
      "employeeCode": "EMP-004",
      "period": "2026-08-01",
      "paymentDate": "2026-08-28"
    },
    {
      "base": 385000,
      "allowance": 40000,
      "deduction": 14000,
      "status": "Pending",
      "code": "SAL-2026-9-EMP-004",
      "employeeCode": "EMP-004",
      "period": "2026-09-01",
      "paymentDate": null
    },
    {
      "base": 320000,
      "allowance": 45000,
      "deduction": 16000,
      "status": "Paid",
      "code": "SAL-2026-2-EMP-005",
      "employeeCode": "EMP-005",
      "period": "2026-02-01",
      "paymentDate": "2026-02-28"
    },
    {
      "base": 320000,
      "allowance": 45000,
      "deduction": 16000,
      "status": "Paid",
      "code": "SAL-2026-3-EMP-005",
      "employeeCode": "EMP-005",
      "period": "2026-03-01",
      "paymentDate": "2026-03-28"
    },
    {
      "base": 320000,
      "allowance": 45000,
      "deduction": 16000,
      "status": "Paid",
      "code": "SAL-2026-4-EMP-005",
      "employeeCode": "EMP-005",
      "period": "2026-04-01",
      "paymentDate": "2026-04-28"
    },
    {
      "base": 320000,
      "allowance": 45000,
      "deduction": 16000,
      "status": "Paid",
      "code": "SAL-2026-5-EMP-005",
      "employeeCode": "EMP-005",
      "period": "2026-05-01",
      "paymentDate": "2026-05-28"
    },
    {
      "base": 320000,
      "allowance": 45000,
      "deduction": 16000,
      "status": "Paid",
      "code": "SAL-2026-6-EMP-005",
      "employeeCode": "EMP-005",
      "period": "2026-06-01",
      "paymentDate": "2026-06-28"
    },
    {
      "base": 320000,
      "allowance": 45000,
      "deduction": 16000,
      "status": "Paid",
      "code": "SAL-2026-7-EMP-005",
      "employeeCode": "EMP-005",
      "period": "2026-07-01",
      "paymentDate": "2026-07-28"
    },
    {
      "base": 320000,
      "allowance": 45000,
      "deduction": 16000,
      "status": "Paid",
      "code": "SAL-2026-8-EMP-005",
      "employeeCode": "EMP-005",
      "period": "2026-08-01",
      "paymentDate": "2026-08-28"
    },
    {
      "base": 320000,
      "allowance": 45000,
      "deduction": 16000,
      "status": "Pending",
      "code": "SAL-2026-9-EMP-005",
      "employeeCode": "EMP-005",
      "period": "2026-09-01",
      "paymentDate": null
    }
  ],
  "recurringExpenses": [
    {
      "expense": "Office rent",
      "amount": 540000,
      "frequency": "Monthly",
      "category": "Rent",
      "vendor": "Ikeja Commercial Properties",
      "status": "Active",
      "code": "REC-001",
      "nextDue": "2026-09-05"
    },
    {
      "expense": "Workshop internet",
      "amount": 95000,
      "frequency": "Monthly",
      "category": "Utilities",
      "vendor": "MainOne",
      "status": "Active",
      "code": "REC-002",
      "nextDue": "2026-09-12"
    },
    {
      "expense": "Cloud hosting",
      "amount": 185000,
      "frequency": "Monthly",
      "category": "Software",
      "vendor": "AWS",
      "status": "Active",
      "code": "REC-003",
      "nextDue": "2026-09-18"
    },
    {
      "expense": "Business insurance",
      "amount": 680000,
      "frequency": "Annually",
      "category": "Insurance",
      "vendor": "Leadway Assurance",
      "status": "Active",
      "code": "REC-004",
      "nextDue": "2026-11-01"
    },
    {
      "expense": "Security services",
      "amount": 240000,
      "frequency": "Monthly",
      "category": "Professional Services",
      "vendor": "SecureGuard Nigeria",
      "status": "Paused",
      "code": "REC-005",
      "nextDue": "2026-09-30"
    }
  ]
};
