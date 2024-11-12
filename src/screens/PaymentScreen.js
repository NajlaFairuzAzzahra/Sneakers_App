// src/screens/PaymentScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PaymentScreen = ({ route, navigation }) => {
  const { sneaker } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);
  
  const paymentMethods = [
    {
      id: 'qris',
      name: 'QRIS',
      icon: 'qr-code-outline',
      description: 'Scan & Pay Instantly',
      color: '#00A3D7',
      bgColor: '#E8F7FC',
    },
    {
      id: 'gopay',
      name: 'GoPay',
      icon: 'wallet-outline', 
      description: 'Pay with GoPay Balance',
      color: '#00875A',
      bgColor: '#E6F3EE',
    },
    {
      id: 'ovo',
      name: 'OVO',
      icon: 'wallet-outline',
      description: 'Pay with OVO Balance',
      color: '#4C3494', 
      bgColor: '#EEEAF5',
    },
    {
      id: 'bca',
      name: 'BCA Virtual Account',
      icon: 'business-outline',
      description: 'Automatic verification',
      color: '#005CAB',
      bgColor: '#E6F0F9', 
    },
    {
      id: 'mandiri', 
      name: 'Mandiri Virtual Account',
      icon: 'business-outline',
      description: 'Automatic verification',
      color: '#003D79',
      bgColor: '#E6EDF5',
    },
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    const vaNumber = Math.random().toString().slice(2, 18);
    
    if (selectedMethod === 'qris') {
      Alert.alert(
        'QRIS Payment',
        'Scan this QR code to pay',
        [{ text: 'Done', onPress: () => navigation.navigate('MainTabs') }]
      );
    } else {
      Alert.alert(
        'Virtual Account Number',
        `Your VA Number: ${vaNumber}\nPlease complete payment within 24 hours`,
        [{ text: 'Copy Number', onPress: () => navigation.navigate('MainTabs') }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.headerSubtitle}>Complete your purchase</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Summary Card */}
        <View style={styles.orderSummaryCard}>
          <View style={styles.productSummary}>
            <Image 
              source={{ uri: sneaker.image }} 
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.brandText}>{sneaker.brand}</Text>
              <Text style={styles.nameText} numberOfLines={2}>{sneaker.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.priceText}>${sneaker.price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Choose Payment Method</Text>
          
          <View style={styles.methodsContainer}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  selectedMethod === method.id && styles.selectedMethod,
                  { backgroundColor: selectedMethod === method.id ? method.bgColor : '#fff' }
                ]}
                onPress={() => setSelectedMethod(method.id)}
                activeOpacity={0.7}
              >
                <View style={styles.methodInfo}>
                  <View style={[styles.iconContainer, { backgroundColor: method.bgColor }]}>
                    <Ionicons 
                      name={method.icon} 
                      size={24} 
                      color={method.color}
                    />
                  </View>
                  <View style={styles.methodTexts}>
                    <Text style={[
                      styles.methodName, 
                      selectedMethod === method.id && { color: method.color }
                    ]}>
                      {method.name}
                    </Text>
                    <Text style={styles.methodDesc}>{method.description}</Text>
                  </View>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedMethod === method.id && { borderColor: method.color }
                ]}>
                  {selectedMethod === method.id && (
                    <View style={[styles.radioInner, { backgroundColor: method.color }]} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Payment Section */}
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <View>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalAmount}>${sneaker.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.payButton, 
              !selectedMethod && styles.payButtonDisabled
            ]} 
            onPress={handlePayment}
            disabled={!selectedMethod}
            activeOpacity={0.8}
          >
            <Text style={styles.payButtonText}>Pay Now</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 15,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  orderSummaryCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  productSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
  },
  productInfo: {
    marginLeft: 15,
    flex: 1,
  },
  brandText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    lineHeight: 22,
  },
  priceContainer: {
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  priceText: {
    fontSize: 20,
    color: '#FF385C',
    fontWeight: '700',
  },
  paymentSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
    letterSpacing: 0.5,
  },
  methodsContainer: {
    marginBottom: 100,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  selectedMethod: {
    borderWidth: 2,
    borderColor: '#FF385C',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodTexts: {
    marginLeft: 16,
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  methodDesc: {
    fontSize: 13,
    color: '#666',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  payButton: {
    backgroundColor: '#FF385C',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF385C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonDisabled: {
    backgroundColor: '#ffd5dc',
    shadowOpacity: 0,
    elevation: 0,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default PaymentScreen;