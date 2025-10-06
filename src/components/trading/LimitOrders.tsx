'use client'

import React, { useState } from 'react'
import { Clock, TrendingUp, TrendingDown, X, CheckCircle, AlertCircle } from 'lucide-react'
import { G8Button } from '@/components/ui/g8-button'

interface LimitOrder {
  id: string
  tokenSymbol: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  status: 'pending' | 'filled' | 'cancelled'
  createdAt: Date
  expiresAt?: Date
}

interface LimitOrdersProps {
  orders: LimitOrder[]
  onCreateOrder: (order: Omit<LimitOrder, 'id' | 'status' | 'createdAt'>) => void
  onCancelOrder: (orderId: string) => void
  className?: string
}

export function LimitOrders({ 
  orders, 
  onCreateOrder, 
  onCancelOrder, 
  className = '' 
}: LimitOrdersProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newOrder, setNewOrder] = useState({
    tokenSymbol: '',
    type: 'buy' as 'buy' | 'sell',
    amount: '',
    price: '',
    expiresAt: ''
  })

  const handleCreateOrder = () => {
    if (newOrder.tokenSymbol && newOrder.amount && newOrder.price) {
      onCreateOrder({
        tokenSymbol: newOrder.tokenSymbol,
        type: newOrder.type,
        amount: parseFloat(newOrder.amount),
        price: parseFloat(newOrder.price),
        expiresAt: newOrder.expiresAt ? new Date(newOrder.expiresAt) : undefined
      })
      
      setNewOrder({
        tokenSymbol: '',
        type: 'buy',
        amount: '',
        price: '',
        expiresAt: ''
      })
      setIsCreating(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-g8-warning" />
      case 'filled': return <CheckCircle className="w-4 h-4 text-g8-success" />
      case 'cancelled': return <X className="w-4 h-4 text-g8-error" />
      default: return <AlertCircle className="w-4 h-4 text-g8-text-secondary" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-g8-warning'
      case 'filled': return 'text-g8-success'
      case 'cancelled': return 'text-g8-error'
      default: return 'text-g8-text-secondary'
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-g8-text-primary" />
          <h3 className="text-g8-h3 text-g8-text-primary font-semibold">Limit Orders</h3>
        </div>
        <G8Button
          onClick={() => setIsCreating(!isCreating)}
          size="sm"
          variant={isCreating ? 'secondary' : 'primary'}
        >
          {isCreating ? 'Cancel' : 'New Order'}
        </G8Button>
      </div>

      {/* Create Order Form */}
      {isCreating && (
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4 space-y-4">
          <h4 className="text-g8-body text-g8-text-primary font-medium">Create Limit Order</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-g8-caption text-g8-text-secondary mb-1">Token</label>
              <input
                type="text"
                value={newOrder.tokenSymbol}
                onChange={(e) => setNewOrder({ ...newOrder, tokenSymbol: e.target.value })}
                placeholder="e.g., WCAT"
                className="w-full px-3 py-2 bg-g8-surface border border-g8-stroke rounded-g8-lg text-g8-text-primary placeholder-g8-text-secondary focus:outline-none focus:ring-2 focus:ring-g8-primary"
              />
            </div>
            
            <div>
              <label className="block text-g8-caption text-g8-text-secondary mb-1">Type</label>
              <select
                value={newOrder.type}
                onChange={(e) => setNewOrder({ ...newOrder, type: e.target.value as 'buy' | 'sell' })}
                className="w-full px-3 py-2 bg-g8-surface border border-g8-stroke rounded-g8-lg text-g8-text-primary focus:outline-none focus:ring-2 focus:ring-g8-primary"
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-g8-caption text-g8-text-secondary mb-1">Amount</label>
              <input
                type="number"
                value={newOrder.amount}
                onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
                placeholder="0.00"
                className="w-full px-3 py-2 bg-g8-surface border border-g8-stroke rounded-g8-lg text-g8-text-primary placeholder-g8-text-secondary focus:outline-none focus:ring-2 focus:ring-g8-primary"
              />
            </div>
            
            <div>
              <label className="block text-g8-caption text-g8-text-secondary mb-1">Price (WLD)</label>
              <input
                type="number"
                value={newOrder.price}
                onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                placeholder="0.00"
                step="0.0001"
                className="w-full px-3 py-2 bg-g8-surface border border-g8-stroke rounded-g8-lg text-g8-text-primary placeholder-g8-text-secondary focus:outline-none focus:ring-2 focus:ring-g8-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-g8-caption text-g8-text-secondary mb-1">Expires At (Optional)</label>
            <input
              type="datetime-local"
              value={newOrder.expiresAt}
              onChange={(e) => setNewOrder({ ...newOrder, expiresAt: e.target.value })}
              className="w-full px-3 py-2 bg-g8-surface border border-g8-stroke rounded-g8-lg text-g8-text-primary focus:outline-none focus:ring-2 focus:ring-g8-primary"
            />
          </div>

          <div className="flex space-x-2">
            <G8Button onClick={handleCreateOrder} className="flex-1">
              Create Order
            </G8Button>
            <G8Button 
              onClick={() => setIsCreating(false)} 
              variant="secondary" 
              className="flex-1"
            >
              Cancel
            </G8Button>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-2">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-g8-text-secondary mx-auto mb-4" />
            <p className="text-g8-body text-g8-text-secondary">No limit orders yet</p>
            <p className="text-g8-caption text-g8-text-secondary">Create your first limit order above</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {order.type === 'buy' ? (
                    <TrendingUp className="w-5 h-5 text-g8-success" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-g8-error" />
                  )}
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-g8-body text-g8-text-primary font-medium">
                        {order.type.toUpperCase()} {order.tokenSymbol}
                      </span>
                      {getStatusIcon(order.status)}
                    </div>
                    <p className="text-g8-caption text-g8-text-secondary">
                      {order.amount} tokens at {order.price} WLD
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-g8-caption font-medium ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                  
                  {order.status === 'pending' && (
                    <button
                      onClick={() => onCancelOrder(order.id)}
                      className="p-1 text-g8-text-secondary hover:text-g8-error transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {order.expiresAt && (
                <div className="mt-2 pt-2 border-t border-g8-stroke">
                  <p className="text-g8-caption text-g8-text-secondary">
                    Expires: {order.expiresAt.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
