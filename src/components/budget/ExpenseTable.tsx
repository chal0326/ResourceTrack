import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import Card from '../common/Card';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const ExpenseTable: React.FC = () => {
  const { expenses, getProjectById } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const filteredExpenses = expenses.filter(expense => 
    expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getProjectById(expense.projectId)?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    let compareValueA: any;
    let compareValueB: any;
    
    switch (sortField) {
      case 'project':
        compareValueA = getProjectById(a.projectId)?.name || '';
        compareValueB = getProjectById(b.projectId)?.name || '';
        break;
      case 'description':
        compareValueA = a.description;
        compareValueB = b.description;
        break;
      case 'category':
        compareValueA = a.category;
        compareValueB = b.category;
        break;
      case 'date':
        compareValueA = new Date(a.date).getTime();
        compareValueB = new Date(b.date).getTime();
        break;
      case 'budgeted':
        compareValueA = a.budgetedAmount;
        compareValueB = b.budgetedAmount;
        break;
      case 'actual':
        compareValueA = a.actualAmount;
        compareValueB = b.actualAmount;
        break;
      case 'variance':
        compareValueA = a.budgetedAmount - a.actualAmount;
        compareValueB = b.budgetedAmount - b.actualAmount;
        break;
      default:
        compareValueA = new Date(a.date).getTime();
        compareValueB = new Date(b.date).getTime();
    }
    
    if (typeof compareValueA === 'string') {
      const result = compareValueA.localeCompare(compareValueB);
      return sortDirection === 'asc' ? result : -result;
    } else {
      const result = compareValueA - compareValueB;
      return sortDirection === 'asc' ? result : -result;
    }
  });
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Category color classes
  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case 'labor': return 'bg-blue-100 text-blue-800';
      case 'hardware': return 'bg-purple-100 text-purple-800';
      case 'software': return 'bg-green-100 text-green-800';
      case 'vendor': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card title="Expense Details">
      <div className="mb-4 flex items-center">
        <div className="relative flex-1 mr-4">
          <input
            type="text"
            placeholder="Search expenses..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <button className="px-3 py-2 border border-gray-300 rounded-lg flex items-center">
          <Filter className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-700">Filter</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('date')}
                >
                  <span>Date</span>
                  {sortField === 'date' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('project')}
                >
                  <span>Project</span>
                  {sortField === 'project' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('description')}
                >
                  <span>Description</span>
                  {sortField === 'description' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('category')}
                >
                  <span>Category</span>
                  {sortField === 'category' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center justify-end focus:outline-none"
                  onClick={() => handleSort('budgeted')}
                >
                  <span>Budgeted</span>
                  {sortField === 'budgeted' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center justify-end focus:outline-none"
                  onClick={() => handleSort('actual')}
                >
                  <span>Actual</span>
                  {sortField === 'actual' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center justify-end focus:outline-none"
                  onClick={() => handleSort('variance')}
                >
                  <span>Variance</span>
                  {sortField === 'variance' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedExpenses.map((expense) => {
              const project = getProjectById(expense.projectId);
              const variance = expense.budgetedAmount - expense.actualAmount;
              const variancePercentage = (variance / expense.budgetedAmount) * 100;
              
              return (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{project?.name}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{expense.description}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-0.5 text-xs rounded-full ${getCategoryColorClass(expense.category)}`}>
                      {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="text-sm text-gray-900 font-medium">{formatCurrency(expense.budgetedAmount)}</div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="text-sm text-gray-900 font-medium">{formatCurrency(expense.actualAmount)}</div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className={`text-sm font-medium ${
                      variance >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(Math.abs(variance))}
                      <span className="text-xs ml-1">
                        ({variance >= 0 ? 'under' : 'over'})
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ExpenseTable;