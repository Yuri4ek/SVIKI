import React from 'react';
import { View, Text, ScrollView, useColorScheme, StatusBar } from 'react-native';
import { createMainStyles } from '@/styles';

const MainPage = () => {
  const theme = useColorScheme() ?? 'light';
  const styles = createMainStyles(theme);

  // Пример данных для демонстрации логики
  const data = {
    cars: ['BMW X5', 'Lada Vesta'],
    carPrices: ['5 000 000 ₽', '1 200 000 ₽'],
    carLoansCount: 1,
    carLoanBalances: ['3 400 000 ₽'],
    carArrears: 'Нет',
    
    hasMortgage: 'Да',
    mortgageBalance: '4 500 000 ₽',
    additionalProperty: 'Да (Дача)',
    mortgageArrears: 'Нет',

    fsspSum: '0 ₽',
    fsspDebt: 'Нет',

    taxSum: '1 200 ₽',
    taxDebt: 'Транспортный налог'
  };

  const renderValueList = (list: string[], fallback: string = 'Нет') => (
    <View style={styles.valueList}>
      {list.length > 0 
        ? list.map((item, index) => <Text key={index} style={styles.subValue}>{item}</Text>)
        : <Text style={styles.value}>{fallback}</Text>
      }
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      
      <Text style={styles.header}>СВИКИ</Text>

      {/* Кредитный рейтинг (без СКОР) */}
      <Text style={styles.sectionTitle}>Кредитный рейтинг</Text>
      <View style={styles.card}>
        <View style={styles.scoreGrid}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreValue}>450</Text>
            <Text style={styles.scoreLabel}>НБКИ</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreValue}>380</Text>
            <Text style={styles.scoreLabel}>ОКБ</Text>
          </View>
        </View>
      </View>

      {/* Дашборд про Автомобили (Заголовок скрыт) */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Кол-во автомобилей</Text>
          <Text style={styles.value}>{data.cars.length || 'Нет'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Стоимость авто</Text>
          {renderValueList(data.carPrices)}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Кол-во Автокредитов</Text>
          <Text style={styles.value}>{data.carLoansCount || 'Нет'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Остаток по кредиту</Text>
          {renderValueList(data.carLoanBalances)}
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Наличие просрочек</Text>
          <Text style={[styles.value, data.carArrears === 'Нет' ? styles.statusPositive : styles.statusNegative]}>
            {data.carArrears}
          </Text>
        </View>
      </View>

      {/* Дашборд Ипотека */}
      <Text style={styles.sectionTitle}>Ипотека и недвижимость</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Ипотека</Text>
          <Text style={styles.value}>{data.hasMortgage}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Остаток</Text>
          <Text style={styles.value}>{data.mortgageBalance}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Доп. недвижимость</Text>
          <Text style={styles.value}>{data.additionalProperty}</Text>
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Наличие просрочек</Text>
          <Text style={[styles.value, data.mortgageArrears === 'Нет' ? styles.statusPositive : styles.statusNegative]}>
            {data.mortgageArrears}
          </Text>
        </View>
      </View>

      {/* Дашборд ФССП */}
      <Text style={styles.sectionTitle}>ФССП</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Сумма по ФССП</Text>
          <Text style={styles.value}>{data.fsspSum}</Text>
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Долг по ФССП</Text>
          <Text style={[styles.value, data.fsspDebt === 'Нет' ? styles.statusPositive : styles.statusNegative]}>
            {data.fsspDebt}
          </Text>
        </View>
      </View>

      {/* Дашборд Налоги */}
      <Text style={styles.sectionTitle}>Налоги</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Сумма налогов</Text>
          <Text style={styles.value}>{data.taxSum}</Text>
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Налоговый долг</Text>
          <Text style={[styles.value, data.taxDebt === 'Нет' ? styles.statusPositive : styles.statusNegative]}>
            {data.taxDebt}
          </Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default MainPage;