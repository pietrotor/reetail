export const MOCK_PAYMENT_DETAIL = {
  termStart: "03/03/2024",
  termEnd: "03/03/2025",
  customer: {
    fullName: "Jonathan Smith",
    company: "SmithIndustries",
    jobTitle: "Director",
    email: "jonathan@smith.com",
  },
  stakeholder: {
    fullName: "Jonathan Smith",
    email: "jonathan@smith.com",
    phone: "(555)555-5555",
  },
  bankAccount: {
    name: "PNC Checking ",
    accountNumber: "4415",
  },
  paymentDetails: {
    amount: 10000,
    achDiscount: "5%",
    paymentType: "Variable",
    firstPayment: "03/03/2024",
    frequency: "Monthly",
    duration: "12 Months",
    lateFee: 500,
  },
  lastPayment: {
    amount: 10000,
    date: "03.03.2024",
  },
  nextPayment: {
    amount: 10000,
    date: "03.03.2024",
  },
};
