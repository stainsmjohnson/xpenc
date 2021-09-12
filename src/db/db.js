import Realm, {BSON} from 'realm';
import moment from 'moment';

//schemas
const TransactionSchema = {
  name: 'Transaction',
  properties: {
    _id: {type: 'objectId', default: new BSON.ObjectID()},
    label: 'string',
    amount: 'int',
    type: 'string',
    time: {type: 'date', default: new Date()},
  },
};

const getRealm = async () => {
  const realm = await Realm.open({
    path: 'transactions',
    schema: [TransactionSchema],
    schemaVersion: 1,
  });
  return realm;
};

const createTestData = async (data = [], onProgress = progress => {}) => {
  const realm = await getRealm();
  realm.write(() => {
    let lastProgressTime = moment();
    const total = data.length;
    for (let i = 0; i < total; i++) {
      realm.create('Transaction', data[i]);
      const differenceInSeconds = moment().diff(lastProgressTime, 'second');
      if (differenceInSeconds > 1) {
        onProgress(i / total);
        lastProgressTime = moment();
      } else if (total === i + 1) {
        onProgress(1);
      }
    }
  });
};

module.exports = {
  getRealm,
  createTestData,
};
