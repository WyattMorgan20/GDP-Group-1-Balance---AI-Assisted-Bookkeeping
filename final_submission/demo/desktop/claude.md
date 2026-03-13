# Claude AI Integration Guide

## Overview
This document provides guidelines for integrating Claude AI into the Balancd AI-Assisted Bookkeeping system. The AI should assist with intelligent bookkeeping, month-end closes, and accounting process automation while maintaining security and accuracy.

## Current Implementation Status (March 12, 2026)

### ✅ Infrastructure Ready for AI Integration
- **Audit Trail System**: Fully implemented in `audit_logs` table with metadata JSONB columns
- **API Endpoints**: 17 commands ready (organizations, transactions, audit operations)
- **Database Schema**: Supports document storage, transaction classification, variance flagging
- **Multi-Tenant Isolation**: Each organization completely isolated with UUID primary keys
- **Type System**: Comprehensive TypeScript types for all data structures

### ❌ Not Yet Implemented
- **UI Wired to Suggestions**: Components exist but don't call API endpoints yet
- **Confidence Scoring**: Database ready (metadata JSONB) but no scoring logic
- **AI Provider Integration**: Template structure ready, no actual provider calls
- **Permission System**: Must complete before exposing AI features to users

### 🔄 In Progress or Coming Next
- **Permission/Access Control**: Current priority before UI wiring
- **Page Routing & Navigation**: Needed before AI suggestion UI can connect
- **Form Submission Handling**: Required for transaction entry with AI classification

## Supported Transaction Types

The system supports these account classifications (used for AI categorization):
- **Assets**: Bank accounts, receivables, inventory, equipment
- **Liabilities**: Payables, loans, credit cards
- **Equity**: Owner contributions, retained earnings
- **Income**: Revenue, refunds, gains
- **Expenses**: COGS, operating expenses, depreciation

Variance types for anomaly detection:
- `DuplicateEntry`, `SuspiciousAmount`, `OutOfCategory`, `TimingIssue`, `UncategorizedTransaction`, `ManualReview`

## Data Architecture for AI Integration

### Database Foundation
- **transactions table**: All financial records with account_type classification
- **documents table**: Receipts, invoices, bank statements (ready for OCR/AI processing)
- **audit_logs table**: Complete decision trail with metadata JSONB for AI reasoning
- **variances table**: Flagged suspicious transactions for AI review

## AI Capabilities & Use Cases

### 1. **Intelligent Document Processing**
- Extract transaction data from receipts, invoices, and bank statements
- Classify transactions automatically (Expenses, Income, Assets, Liabilities, Equity)
- Validate data quality and flag anomalies
- Match unreconciled items to source documents

### 2. **Month-End Close Automation**
- Generate month-end close checklists
- Identify missing reconciliations and adjusting entries
- Suggest accruals and deferrals based on transaction history
- Review cutoff issues and help categorize late-period transactions
- Draft audit-ready documentation

### 3. **AI-Assisted Bookkeeping**
- Suggest account classifications for new transactions
- Identify duplicate or suspicious entries
- Recommend cost allocations across departments/locations
- Provide real-time compliance alerts
- Generate explanatory notes for journal entries

### 4. **Financial Analysis & Insights**
- Detect trends (revenue growth, expense patterns)
- Identify cash flow risks and opportunities
- Flag unusual transactions or accounts
- Provide variance analysis recommendations
- Benchmark against industry standards (where available)

### 5. **Audit Trail & Compliance**
- Generate audit trails with AI decision reasoning
- Maintain compliance with accounting standards (GAAP, IFRS)
- Document AI-assisted adjustments for review and approval
- Create audit notes explaining AI recommendations

## Key Principles

### Security First
- **Data Privacy**: Never send sensitive customer data to external AI services without encryption
- **Local Processing**: Prefer local/on-device AI (Ollama) for sensitive operations
- **Audit Trail**: Log all AI decisions and Human approvals
- **User Override**: All AI suggestions must be reviewed and approved by humans before posting

### Accuracy & Quality
- AI suggestions should cite source data (transaction IDs, amounts, dates)
- Confidence scores should be provided for AI recommendations
- High-confidence actions (>95%): Can suggest auto-posting with review queue
- Medium-confidence actions (70-95%): Require user approval
- Low-confidence recommendations (<70%): Flagged for human review only

### User Control
- Users can override or modify any AI suggestion
- Provide explanations for all recommendations ("Why is this suggested?")
- Allow users to train the AI by providing feedback on suggestions
- Settings to adjust AI aggressiveness (conservative vs. automated)

## Integration Points

### Frontend (Specific Integration Points)

**CompanyStructure Page** - Transaction Management
- Transaction entry form where AI suggests account classification
- Confidence score displayed next to suggestion
- One-click accept/override workflow
- Shows explanation: "Why did AI suggest this?"

**Dashboard Page** - AI Insights
- Anomaly alerts (unusual transactions or patterns)
- Cash flow predictions/warnings
- Month-end close checklist with AI suggestions
- Variance summary with AI-flagged items

**Transactions Page** (when created)
- AI bulk classification for unclassified transactions
- Duplicate detection and merging suggestions
- Compliance alerts (out-of-range amounts, timing issues)

**Audit Trail Page** - Decision Transparency
- Shows AI reasoning for each automated decision
- Links to source documents
- User approval timestamps
- Easy rollback if AI was wrong

### Backend (Ready for Connection)
- **AI Service Layer**: Create `services/ai_service.rs` following existing patterns
- **Command Handlers**: Add new commands for AI operations (classify_transaction, flag_anomaly, etc.)
- **Confidence Scoring**: Store in transaction metadata JSONB
- **Request Logging**: Audit trail already captures all actions
- **Rate Limiting**: Can be added to Tauri commands as needed

### Database
- Store AI suggestions alongside transactions in metadata JSONB
- Track human approvals and overrides in audit_logs
- Maintain confidence scores and reasoning in audit entries
- Archive decision history for compliance and model improvement

## Supported AI Providers

### Open-Source (Local, Free)
- **Ollama** - Run models locally (Recommended for sensitive data)
- Models: Llama 2, Mistral 7B, Phi-2, etc.

### Web-Based (Paid)
- **OpenAI GPT-4** - Professional accounting expertise
- **Anthropic Claude API** - Legal/regulatory compliance focus
- **Google Gemini** - Multimodal capabilities

### Configuration
Switch between providers via environment variables. Users can choose based on:
- Privacy requirements (local vs. cloud)
- Budget constraints
- Feature needs (advanced reasoning vs. speed)

## Error Handling

When AI makes mistakes or confidence is low:
1. Flag the suggestion with confidence score displayed to user
2. Provide alternative suggestions (top 3 if available)
3. Allow easy rollback - one click to revert to manual entry
4. Log all corrections in audit trail for model improvement
5. Never auto-post low-confidence items - always require approval

## Audit Trail & AI Transparency

Every AI decision is logged with full context in the audit_logs table:

```json
{
  "entity_type": "transaction",
  "action": "ai_classified",
  "metadata": {
    "ai_model": "claude-3-sonnet",
    "confidence_score": 0.92,
    "suggested_account": "Expense",
    "alternatives": ["Asset", "Liability"],
    "reasoning": "Matched against similar 100 transactions",
    "source_data": ["tx-123", "tx-456"]
  }
}
```

This enables:
- **Explainability**: Users see exactly why AI made a suggestion
- **Compliance**: Complete audit trail for regulatory review
- **Improvement**: Track which suggestions were accepted/rejected
- **Rollback**: Revert AI decisions easily by referencing audit log

## Testing & Validation

Before deploying AI features:
- Test with sample transactions from real clients
- Validate classifications against GAAP/IFRS standards
- Measure accuracy metrics (precision, recall, F1 score)
- Get client feedback on recommendations
- Audit AI decisions for bias and errors

## Continuous Improvement

- Collect user feedback on AI suggestions
- Monitor accuracy metrics over time
- Update classifiers with new client data (with permission)
- Share learnings in team meetings
- Plan weekly AI model updates and retraining

## Implementation Roadmap

### Phase 1: Foundation (Current - March 12-18)
- [x] Database schema built
- [x] Audit trail system implemented
- [x] API endpoints created
- [ ] Permission system (blocking further progress)
- [ ] UI wired to API endpoints

### Phase 2: AI Skeleton (March 18-25)
1. **Choose primary AI provider**
   - Recommend: Start with Ollama locally (security first, can switch to Claude API later)
   - Model: Mistral 7B or Phi-2 (accounting-focused)
   - Fallback: Claude API for complex decisions

2. **Create AI service skeleton** (`services/ai_service.rs`)
   ```rust
   pub async fn classify_transaction(
       description: &str,
       amount: f64,
       org_id: &str
   ) -> Result<AIClassification, String> {
       // Call AI provider
       // Return { account_type, confidence, reasoning }
   }
   ```

3. **Add AI commands**
   - `classify_transaction` - Return suggested account type + confidence
   - `flag_anomalies` - Review transactions for suspicious patterns
   - `suggest_adjustments` - Accruals, deferrals, etc.

### Phase 3: UI Integration (March 25-April 1)
1. Wire CompanyStructure transaction form to `classify_transaction` command
2. Display confidence score and reasoning
3. Add approve/override workflow
4. Show audit trail linking back to AI decision

### Phase 4: Advanced Features (Post-Launch)
1. Confidence scoring model tuning
2. User feedback loop for continuous improvement
3. Batch processing (classify multiple transactions at once)
4. Month-end close automation
5. Variance pattern detection

### Phase 5: Deploy & Monitor
1. Choose final AI provider based on performance
2. Create user training materials
3. Plan rollout with customer feedback
4. Monitor accuracy metrics and collect improvement signals

