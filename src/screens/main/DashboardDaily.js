import React from 'react';
import {StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native';
import {FAB} from 'react-native-paper';
//components
import ExpenseChart from '../../components/ExpenseChart';
import PieChart from '../../components/PieChart';
import BarChart from '../../components/BarChart';

//
import Database from '../../db/db';

const Dashboard = () => {
  const [outgoingXpenc, setOutgoingXpenc] = React.useState([]);
  React.useEffect(() => {
    // setDe();
  }, []);

  const setDe = async () => {
    const realm = await Database.getRealm();
    const transactions = realm.objects('Transaction');
    const startDate = new Date('2021-08-10');
    const endDate = new Date('2021-08-20');
    const outgoingTransactions =
      transactions
        .filtered(
          "type = 'outgoing' && time >= $0 && time < $1",
          startDate,
          endDate,
        )
        .sorted('time') || [];
    setOutgoingXpenc(outgoingTransactions);
  };
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 24}}
        // style={{ paddingHorizontal: 16, paddingVertical: 24 }}
      >
        <BarChart />
        <PieChart style={{marginTop: 24}} />
        <ExpenseChart style={{marginTop: 24}} data={outgoingXpenc} />
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  },
});
