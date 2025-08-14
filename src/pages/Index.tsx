import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  // Mock data for transactions
  const recentTransactions = [
    { id: '1', amount: '₽15,250', merchant: 'ООО "Техника"', status: 'success', time: '14:32', type: 'card' },
    { id: '2', amount: '₽8,400', merchant: 'Сбербанк', status: 'pending', time: '14:28', type: 'transfer' },
    { id: '3', amount: '₽3,200', merchant: 'Яндекс.Маркет', status: 'success', time: '14:15', type: 'online' },
    { id: '4', amount: '₽25,800', merchant: 'ВТБ', status: 'failed', time: '14:02', type: 'transfer' },
  ];

  const stats = {
    totalVolume: '₽2,450,320',
    successfulTransactions: '98.2%',
    averageAmount: '₽12,450',
    dailyTransactions: '1,247'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Успешно';
      case 'pending': return 'В обработке';
      case 'failed': return 'Ошибка';
      default: return 'Неизвестно';
    }
  };

  // Mock data for accounts
  const accounts = [
    { id: '1', name: 'Основной счёт', balance: '2,450,320', currency: '₽', type: 'main' },
    { id: '2', name: 'Резервный счёт', balance: '856,740', currency: '₽', type: 'reserve' },
    { id: '3', name: 'USD Account', balance: '25,840', currency: '$', type: 'currency' },
    { id: '4', name: 'Транзитный счёт', balance: '124,500', currency: '₽', type: 'transit' },
  ];

  const quickAmounts = ['1000', '5000', '10000', '25000', '50000', '100000'];

  const handleTransfer = (type: 'send' | 'receive') => {
    console.log(`${type} transfer:`, { amount: transferAmount, account: selectedAccount });
    setTransferAmount('');
    setSelectedAccount('');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'transfers':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Переводы</h2>
            
            {/* Account Balances */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {accounts.map((account) => (
                <Card key={account.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">{account.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {account.type === 'main' ? 'Основной' : 
                           account.type === 'reserve' ? 'Резерв' :
                           account.type === 'currency' ? 'Валютный' : 'Транзит'}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">{account.balance} {account.currency}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Transfer Operations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Send Money */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="ArrowUpRight" size={20} className="text-red-500" />
                    <span>Отправить перевод</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Счёт списания</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      value={selectedAccount}
                      onChange={(e) => setSelectedAccount(e.target.value)}
                    >
                      <option value="">Выберите счёт</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name} - {account.balance} {account.currency}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Сумма перевода</label>
                    <input 
                      type="number"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Введите сумму"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Быстрые суммы</label>
                    <div className="grid grid-cols-3 gap-2">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setTransferAmount(amount)}
                          className="text-xs"
                        >
                          {amount} ₽
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Получатель</label>
                    <input 
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Номер карты или счёта"
                    />
                  </div>

                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={() => handleTransfer('send')}
                    disabled={!transferAmount || !selectedAccount}
                  >
                    <Icon name="ArrowUpRight" size={16} className="mr-2" />
                    Отправить перевод
                  </Button>
                </CardContent>
              </Card>

              {/* Receive Money */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="ArrowDownLeft" size={20} className="text-green-500" />
                    <span>Принять перевод</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Счёт зачисления</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      value={selectedAccount}
                      onChange={(e) => setSelectedAccount(e.target.value)}
                    >
                      <option value="">Выберите счёт</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name} - {account.balance} {account.currency}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ожидаемая сумма</label>
                    <input 
                      type="number"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Введите сумму"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Быстрые суммы</label>
                    <div className="grid grid-cols-3 gap-2">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setTransferAmount(amount)}
                          className="text-xs"
                        >
                          {amount} ₽
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium mb-2">Реквизиты для перевода:</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Номер карты: 2202 2020 **** 5847</p>
                      <p>Номер счёта: 40817810099910004312</p>
                      <p>БИК: 044525225</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => handleTransfer('receive')}
                    disabled={!transferAmount || !selectedAccount}
                  >
                    <Icon name="ArrowDownLeft" size={16} className="mr-2" />
                    Ожидать перевод
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transfers */}
            <Card>
              <CardHeader>
                <CardTitle>Последние переводы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: '1', type: 'sent', amount: '15,000 ₽', recipient: 'Иван И.', time: '2 мин назад', status: 'completed' },
                    { id: '2', type: 'received', amount: '8,500 ₽', sender: 'Мария П.', time: '15 мин назад', status: 'completed' },
                    { id: '3', type: 'sent', amount: '25,000 ₽', recipient: 'ООО "Техника"', time: '1 час назад', status: 'pending' },
                  ].map((transfer) => (
                    <div key={transfer.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transfer.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          <Icon 
                            name={transfer.type === 'sent' ? 'ArrowUpRight' : 'ArrowDownLeft'} 
                            size={16} 
                            className={transfer.type === 'sent' ? 'text-red-600' : 'text-green-600'} 
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            {transfer.type === 'sent' ? `Кому: ${transfer.recipient}` : `От: ${transfer.sender}`}
                          </p>
                          <p className="text-sm text-muted-foreground">{transfer.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{transfer.amount}</p>
                        <Badge className={getStatusColor(transfer.status)}>
                          {getStatusText(transfer.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'banks':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Банки-партнёры</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Сбербанк', 'ВТБ', 'Альфа-Банк', 'Тинькофф', 'Райффайзен', 'Газпромбанк'].map((bank) => (
                <Card key={bank} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Building2" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{bank}</h3>
                        <p className="text-sm text-muted-foreground">Активен</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">История транзакций</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name={transaction.type === 'card' ? 'CreditCard' : transaction.type === 'transfer' ? 'ArrowRightLeft' : 'Globe'} size={16} />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.merchant}</p>
                            <p className="text-sm text-muted-foreground">{transaction.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{transaction.amount}</p>
                          <Badge className={getStatusColor(transaction.status)}>
                            {getStatusText(transaction.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'payments':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Платежи</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Новый платёж</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Получатель</label>
                    <input className="w-full px-3 py-2 border rounded-md" placeholder="Введите реквизиты" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Сумма</label>
                    <input className="w-full px-3 py-2 border rounded-md" placeholder="0.00 ₽" />
                  </div>
                  <Button className="w-full">Отправить платёж</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Быстрые платежи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Коммунальные услуги', 'Мобильная связь', 'Интернет', 'Налоги'].map((service) => (
                      <Button key={service} variant="outline" className="w-full justify-start">
                        <Icon name="Zap" size={16} className="mr-2" />
                        {service}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Общий оборот</p>
                      <p className="text-2xl font-bold text-foreground">{stats.totalVolume}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="TrendingUp" size={24} className="text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Успешные операции</p>
                      <p className="text-2xl font-bold text-foreground">{stats.successfulTransactions}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Icon name="CheckCircle" size={24} className="text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Средний чек</p>
                      <p className="text-2xl font-bold text-foreground">{stats.averageAmount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon name="DollarSign" size={24} className="text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Транзакций сегодня</p>
                      <p className="text-2xl font-bold text-foreground">{stats.dailyTransactions}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Icon name="Activity" size={24} className="text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Radio" size={20} />
                  <span>Мониторинг в реальном времени</span>
                  <div className="transaction-pulse w-2 h-2 bg-green-500 rounded-full"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.01] cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center transition-transform hover:scale-110">
                          <Icon name={transaction.type === 'card' ? 'CreditCard' : transaction.type === 'transfer' ? 'ArrowRightLeft' : 'Globe'} size={16} />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.merchant}</p>
                          <p className="text-sm text-muted-foreground">{transaction.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{transaction.amount}</p>
                        <Badge className={`${getStatusColor(transaction.status)} transition-colors`}>
                          {getStatusText(transaction.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Analytics Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Аналитика платежей</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative overflow-hidden rounded-lg">
                  <img 
                    src="/img/b3a08ec5-cc5b-49d6-8691-a38fabd018ae.jpg" 
                    alt="График аналитики платежей"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-sm font-medium text-white bg-black/20 px-2 py-1 rounded">
                      График транзакций за последние 30 дней
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen payment-dashboard">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Icon name="CreditCard" size={20} className="text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">Onfocus</h1>
            </div>
            
            <nav className="flex items-center space-x-1">
              {[
                { key: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
                { key: 'banks', label: 'Банки', icon: 'Building2' },
                { key: 'transfers', label: 'Переводы', icon: 'ArrowRightLeft' },
                { key: 'history', label: 'История', icon: 'History' },
                { key: 'payments', label: 'Платежи', icon: 'Send' },
              ].map((item) => (
                <Button
                  key={item.key}
                  variant={activeSection === item.key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection(item.key)}
                  className="flex items-center space-x-2"
                >
                  <Icon name={item.icon as any} size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              ))}
            </nav>

            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;