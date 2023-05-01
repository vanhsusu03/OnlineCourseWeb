const fs = require('fs');
const readline = require('readline')
        
class DepositController {
    async getTransferInfo(req, res, next) {
        const fileStream = fs.createReadStream('TransferInfo.txt');
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        var transferInfo = []
        for await (const line of rl) {
            transferInfo.push(line);
        }

        return res.status(200).json({
            bankName: transferInfo[0],
            accountNumber: transferInfo[1],
            nameOfBankAccount: transferInfo[2]
        });
    }
}

module.exports = new DepositController();