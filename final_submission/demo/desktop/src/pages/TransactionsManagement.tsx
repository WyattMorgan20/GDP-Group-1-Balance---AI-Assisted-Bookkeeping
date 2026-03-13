import React, { useState, useEffect } from 'react';
import { Transaction, Variance, TransactionAccountType } from '../logic/types';
import api from '../services/api';
import '../styles/TransactionsManagement.css';

interface TransactionsManagementProps {
  organizationId: string;
  userId: string;
}

export const TransactionsManagement: React.FC<TransactionsManagementProps> = ({ 
  organizationId, 
  userId 
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [variances, setVariances] = useState<Variance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'transactions' | 'variances'>('transactions');

  // Form states
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState<TransactionAccountType>('Expense');
  const [amount, setAmount] = useState('');
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const accountTypes: TransactionAccountType[] = ['Asset', 'Liability', 'Equity', 'Income', 'Expense'];

  useEffect(() => {
    loadData();
  }, [organizationId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const transactionsList = await api.transactions.getByOrganization(organizationId);
      setTransactions(transactionsList);

      const variancesList = await api.transactions.getVariances(organizationId);
      setVariances(variancesList);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName.trim() || !amount) return;

    try {
      await api.transactions.create({
        organization_id: organizationId,
        account_name: accountName,
        account_type: accountType,
        amount: parseFloat(amount),
        transaction_date: transactionDate,
        description: description || undefined
      });

      setAccountName('');
      setAmount('');
      setDescription('');
      setTransactionDate(new Date().toISOString().split('T')[0]);
      setAccountType('Expense');
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create transaction');
    }
  };

  const handleResolveVariance = async (varianceId: string) => {
    try {
      await api.transactions.resolveVariance(varianceId, userId);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resolve variance');
    }
  };

  const getAccountTypeColor = (type: TransactionAccountType): string => {
    const colors: Record<TransactionAccountType, string> = {
      'Asset': '#3498db',
      'Liability': '#e74c3c',
      'Equity': '#f39c12',
      'Income': '#27ae60',
      'Expense': '#c0392b'
    };
    return colors[type] || '#95a5a6';
  };

  if (loading) {
    return <div className="transactions-loading">Loading transactions...</div>;
  }

  return (
    <div className="transactions-container">
      <h1>Transactions Management</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="transactions-tabs">
        <button 
          className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions ({transactions.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'variances' ? 'active' : ''}`}
          onClick={() => setActiveTab('variances')}
        >
          Variances ({variances.length})
        </button>
      </div>

      {activeTab === 'transactions' && (
        <div className="transactions-tab">
          <section className="add-transaction-section">
            <h2>Add Transaction</h2>
            <form onSubmit={handleCreateTransaction} className="transaction-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Account Name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                />
                <select value={accountType} onChange={(e) => setAccountType(e.target.value as TransactionAccountType)}>
                  {accountTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <input
                  type="number"
                  placeholder="Amount"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <input
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                />
              </div>
              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
              <button type="submit">Add Transaction</button>
            </form>
          </section>

          <section className="transactions-list-section">
            <h2>Recent Transactions</h2>
            {transactions.length === 0 ? (
              <div className="no-data">No transactions found</div>
            ) : (
              <div className="transactions-table-wrapper">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Account</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.slice(-20).reverse().map(tx => (
                      <tr key={tx.id} className={tx.variance_flagged ? 'has-variance' : ''}>
                        <td>{new Date(tx.transaction_date).toLocaleDateString()}</td>
                        <td>{tx.account_name}</td>
                        <td>
                          <span 
                            className="type-badge"
                            style={{ backgroundColor: getAccountTypeColor(tx.account_type as TransactionAccountType) }}
                          >
                            {tx.account_type}
                          </span>
                        </td>
                        <td className="amount">${Math.abs(tx.amount).toFixed(2)}</td>
                        <td>{tx.description || '-'}</td>
                        <td>
                          <span className={`status ${tx.reconciled ? 'reconciled' : 'pending'}`}>
                            {tx.reconciled ? '✓ Reconciled' : '○ Pending'}
                          </span>
                          {tx.variance_flagged && <span className="variance-indicator">⚠ Variance</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}

      {activeTab === 'variances' && (
        <div className="variances-tab">
          <section className="variances-section">
            <h2>Flagged Variances</h2>
            {variances.length === 0 ? (
              <div className="no-data">No variances found</div>
            ) : (
              <div className="variances-list">
                {variances.map(variance => {
                  const transaction = transactions.find(t => t.id === variance.transaction_id);
                  return (
                    <div key={variance.id} className="variance-card">
                      <div className="variance-header">
                        <span className="variance-type-badge">{variance.variance_type}</span>
                        <span className="variance-status">{variance.resolved ? '✓ Resolved' : '○ Pending'}</span>
                      </div>
                      <div className="variance-details">
                        {transaction && (
                          <>
                            <p><strong>Account:</strong> {transaction.account_name}</p>
                            <p><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</p>
                            <p><strong>Date:</strong> {new Date(transaction.transaction_date).toLocaleDateString()}</p>
                          </>
                        )}
                        {variance.description && (
                          <p><strong>Description:</strong> {variance.description}</p>
                        )}
                        <p><strong>Flagged:</strong> {new Date(variance.flagged_at).toLocaleString()}</p>
                      </div>
                      {!variance.resolved && (
                        <button 
                          className="resolve-button"
                          onClick={() => handleResolveVariance(variance.id)}
                        >
                          Mark as Resolved
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default TransactionsManagement;
