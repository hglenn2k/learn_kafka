const { BankAccount } = require('../third_party/mongo/models/bankAccount');

export default  [
    { // this shit needs a name
        route: '/bankaccounts',
        model: BankAccount
    }
];