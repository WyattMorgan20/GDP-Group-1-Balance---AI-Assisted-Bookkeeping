# Balancd AI Skills & Baseline Knowledge

## Accounting Fundamentals

### Chart of Accounts
The AI must understand standard accounting structures:

**Assets (Debit positive)**
- Current Assets: Cash, Accounts Receivable, Inventory, Prepaid Expenses
- Fixed Assets: Equipment, Vehicles, Furniture, Leasehold Improvements
- Intangible Assets: Goodwill, Trademarks, Patents

**Liabilities (Credit positive)**
- Current Liabilities: Accounts Payable, Short-term Debt, Accrued Expenses
- Long-term Liabilities: Mortgages, Bonds, Lease Obligations

**Equity (Credit positive)**
- Owner's Capital, Retained Earnings, Common Stock, Distributions

**Revenue (Credit positive)**
- Service Revenue, Product Sales, Interest Income, Consulting Fees

**Expenses (Debit positive)**
- Cost of Goods Sold, Salaries, Utilities, Depreciation, Interest Expense
- Rent, Insurance, Taxes, Office Supplies

### Accounting Equation
- **Assets = Liabilities + Equity**
- Every transaction affects at least two accounts (double-entry bookkeeping)
- Debits and credits must always balance

## Transaction Classification

### Common Transaction Types
1. **Sales & Receivables**
   - Invoice creation → Accounts Receivable (debit), Revenue (credit)
   - Cash receipt → Cash (debit), Accounts Receivable (credit)

2. **Purchases & Payables**
   - Invoice received → Expense/Asset (debit), Accounts Payable (credit)
   - Payment → Accounts Payable (debit), Cash (credit)

3. **Payroll**
   - Salary accrual → Salary Expense (debit), Salaries Payable (credit)
   - Payroll payment → Salaries Payable (debit), Cash (credit)
   - Tax withholding → Payroll Tax Expense (debit), Tax Payable (credit)

4. **Adjusting Entries**
   - Depreciation → Depreciation Expense (debit), Accumulated Depreciation (credit)
   - Accruals → Expense (debit), Payable (credit)
   - Deferrals → Prepaid Expense (debit), Cash (credit)

## Month-End Close Procedures

### Standard Checklist
1. **Record All Transactions**
   - Verify all invoices, receipts, and bank feeds are entered
   - Reconcile all accounts to source documents

2. **Reconciliations**
   - Bank reconciliation (cash vs. bank statement)
   - Accounts Receivable aging and allocation reviews
   - Inventory count vs. system records
   - Debt schedule review

3. **Adjusting Entries**
   - Accrued expenses and revenues
   - Depreciation and amortization
   - Bad debt allowances
   - Inventory adjustments

4. **Account Reviews**
   - General ledger review for unusual items
   - Intercompany account analysis
   - Expense categorization review

5. **Financial Statement Preparation**
   - Trial balance verification
   - Balance sheet review
   - Income statement review
   - Cash flow statement analysis

6. **Compliance & Documentation**
   - Variance analysis vs. budget
   - Footnotes and disclosures
   - Audit trail documentation
   - Client PBC (Prepared by Client) items

## Industry-Specific Knowledge

### For Service Businesses
- Revenue recognition (when service is performed, not when invoiced)
- Time tracking integration with billing
- Billable vs. non-billable expense tracking

### For Product-Based Businesses
- COGS calculation and inventory valuation (FIFO, LIFO, Weighted Average)
- Sales tax compliance and liability tracking
- Inventory obsolescence reserves

### For Professional Firms (Accountants, Law, Consulting)
- Time and materials billing
- Realization and write-offs
- Partner equity and profit distributions
- CLE and compliance expense tracking

## Data Quality Standards

### Transaction Data Requirements
- **Date**: Must be valid and not in future
- **Amount**: Must be positive and reasonable
- **Account**: Must match Chart of Accounts
- **Description**: Clear, concise, non-vague
- **Supporting Document**: Receipt, Invoice, or Statement reference

### Red Flags to Identify
- Transactions posted after month-end cutoff
- Unusual or round amounts ($1000, $5000)
- Transactions to/from related parties
- Manual journal entries without supporting documentation
- Duplicate transactions
- Debit/Credit mismatches

## Compliance & Standards

### Standards to Follow
- **GAAP** (US Generally Accepted Accounting Principles)
- **IFRS** (International Financial Reporting Standards)
- **SOX Compliance** (for public companies)
- **IRS Regulations** (US Tax Code)

### Key Principles
- Revenue Recognition (ASC 606)
- Leases (ASC 842 / IFRS 16)
- Fair Value Measurement (ASC 820)
- Consolidation (ASC 810)
- Impairment & Goodwill (ASC 350)

## AI Decision-Making Rules

### High Confidence Classifications (>95%)
- Payroll expenses to Salary Expense
- Utilities to Utility Expense
- Bank fees to Bank Charges
- Clear vendor receipts to matching expense accounts

### Medium Confidence (70-95%)
- New vendor first transactions
- Mixed expense receipts
- Expense allocations across departments
- Intercompany transactions

### Low Confidence (<70%)
- Complex multi-line transactions
- One-time or unusual items
- Professional services (consulting, legal)
- Related party transactions
- Items requiring judgment

## Continuous Learning

### Feedback Loop
- Track AI classification accuracy
- Ask users for corrections and explanations
- Improve model with client-specific patterns
- Share learnings across all client accounts (with permission)

### Clients to Observe
- Service business (law firm, consulting)
- Product business (retail, manufacturing)
- Non-profit organization
- Real estate holding company

## Success Metrics

The AI should aim to achieve:
- **Classification Accuracy**: >95% for standard transactions
- **Month-End Closing**: 50% faster with AI assistance
- **Error Detection**: Catch 90%+ of common errors
- **User Satisfaction**: 4/5 stars on helpfulness
- **Time Savings**: 10+ hours per month per user
