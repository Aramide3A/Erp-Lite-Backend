export enum RequestStatus {
  Draft = "Draft",
  Submitted = "Submitted",
  UnderReview = "Under Review",
  Approved = "Approved",
  Rejected = "Rejected",
  Returned = "Returned",
  PaymentPending = "Payment Pending",
  Processing = "Processing",
  Paid = "Paid",
  PaymentFailed = "Payment Failed",
  Cancelled = "Cancelled",
  PartiallyPaid = "Partially Paid",
}

export enum RequestType {
  PurchaseRequest = "Purchase Request",
  ExpenseRequest = "Expense Request",
  Reimbursement = "Reimbursement",
  CashAdvance = "Cash Advance",
  ServicePayment = "Service Payment",
  Other = "Other",
}

export enum PaymentMethod {
  ManualBankTransfer = "Manual Bank Transfer",
  PaystackTransfer = "Paystack Transfer",
  FlutterwaveTransfer = "Flutterwave Transfer",
  Cash = "Cash",
  Other = "Other",
}

export enum PaymentStatus {
  PaymentPending = "Payment Pending",
  Processing = "Processing",
  Paid = "Paid",
  PaymentFailed = "Payment Failed",
}

export enum AccountType {
  Asset = "Asset",
  Liability = "Liability",
  Equity = "Equity",
  Revenue = "Revenue",
  CostOfSales = "Cost of Sales",
  Expense = "Expense",
  Other = "Other",
}

export enum Direction {
  In = "in",
  Out = "out",
}

export enum RecordStatus {
  Draft = "Draft",
  Processing = "Processing",
  Paid = "Paid",
}
