// HomeModal.js
import React from 'react';
import {
  View,
  Modal,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Tambahkan ini

const { width } = Dimensions.get('window');

const HomeModal = ({ visible, sneaker, onClose }) => { // Hapus navigation dari props
  const navigation = useNavigation(); // Tambahkan ini
  
  if (!sneaker) return null;

  const handleBuyNow = () => {
    onClose();
    navigation.navigate('Payment', { 
      sneaker: {
        id: sneaker.id,
        name: sneaker.name,
        brand: sneaker.brand_name,
        price: (sneaker.retail_price_cents || 0) / 100,
        image: sneaker.main_picture_url,
        sku: sneaker.sku
      }
    });
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={{ uri: sneaker.main_picture_url || 'https://via.placeholder.com/150' }}
              style={styles.modalImage}
              resizeMode="cover"
            />
            
            <View style={styles.modalInfo}>
              <Text style={styles.modalBrand}>{sneaker.brand_name}</Text>
              <Text style={styles.modalName}>{sneaker.name}</Text>
              
              <View style={styles.modalDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Color:</Text>
                  <View style={styles.colorChip}>
                    <Text style={styles.colorText}>{sneaker.color}</Text>
                  </View>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Release Date:</Text>
                  <Text style={styles.detailValue}>
                    {new Date(sneaker.release_date).toLocaleDateString()}
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Condition:</Text>
                  <Text style={styles.detailValue}>
                    {sneaker.shoe_condition.replace(/_/g, ' ')}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>SKU:</Text>
                  <Text style={styles.detailValue}>{sneaker.sku}</Text>
                </View>
              </View>

              <View style={styles.priceSection}>
                <Text style={styles.modalPrice}>
                  ${((sneaker.retail_price_cents || 0) / 100).toFixed(2)}
                </Text>
                <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
                  <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>

              {sneaker.story_html && (
                <View style={styles.storySection}>
                  <Text style={styles.storyTitle}>Story</Text>
                  <Text style={styles.storyText}>
                    {sneaker.story_html.replace(/<[^>]*>/g, '')}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '90%',
    paddingTop: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  modalInfo: {
    padding: 20,
  },
  modalBrand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  colorChip: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  colorText: {
    fontSize: 14,
    color: '#666',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF385C',
  },
  buyButton: {
    backgroundColor: '#FF385C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  storySection: {
    marginTop: 20,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  storyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});

export default HomeModal;