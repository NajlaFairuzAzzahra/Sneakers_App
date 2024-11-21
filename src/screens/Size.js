import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const sizingSystems = {
  normal: {
    title: 'Regular Fit',
    description: 'Standard width for most feet',
    sizes: {
      us: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      eu: [39, 39.5, 40, 41, 41.5, 42, 42.5, 43, 44],
      uk: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5],
    }
  },
  wide: {
    title: 'Wide Fit',
    description: 'Extra width for broader feet',
    sizes: {
      us: ['6W', '6.5W', '7W', '7.5W', '8W', '8.5W', '9W', '9.5W', '10W'],
      eu: ['39E', '39.5E', '40E', '41E', '41.5E', '42E', '42.5E', '43E', '44E'],
      uk: ['5.5E', '6E', '6.5E', '7E', '7.5E', '8E', '8.5E', '9E', '9.5E'],
    }
  }
};

const SizeGuide = () => {
  const [selectedSystem, setSelectedSystem] = useState('us');
  const [showNormalModal, setShowNormalModal] = useState(false);
  const [showWideModal, setShowWideModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFit, setSelectedFit] = useState('normal');

  const SizeModal = ({ visible, onClose, fitType }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{sizingSystems[fitType].title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.modalDescription}>
            {sizingSystems[fitType].description}
          </Text>
          
          <View style={styles.systemButtons}>
            {Object.keys(sizingSystems[fitType].sizes).map((sys) => (
              <TouchableOpacity
                key={sys}
                style={[
                  styles.systemButton,
                  selectedSystem === sys && styles.selectedSystem
                ]}
                onPress={() => setSelectedSystem(sys)}
              >
                <Text style={[
                  styles.systemText,
                  selectedSystem === sys && styles.selectedText
                ]}>
                  {sys.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.sizeList}>
            {sizingSystems[fitType].sizes[selectedSystem].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSize
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  styles.sizeText,
                  selectedSize === size && styles.selectedSizeText
                ]}>
                  {size}
                </Text>
                {selectedSize === size && (
                  <View style={styles.conversionContainer}>
                    {Object.entries(sizingSystems[fitType].sizes)
                      .filter(([sys]) => sys !== selectedSystem)
                      .map(([sys, sizes], index) => (
                        <Text key={sys} style={styles.conversionText}>
                          {sys.toUpperCase()}: {sizes[sizes.indexOf(size)]}
                        </Text>
                      ))}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Size</Text>
      
      <TouchableOpacity 
        style={styles.fitButton}
        onPress={() => setShowNormalModal(true)}
      >
        <View style={styles.fitContent}>
          <View>
            <Text style={styles.fitTitle}>Regular Fit</Text>
            <Text style={styles.fitDescription}>Standard width for most feet</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.fitButton}
        onPress={() => setShowWideModal(true)}
      >
        <View style={styles.fitContent}>
          <View>
            <Text style={styles.fitTitle}>Wide Fit</Text>
            <Text style={styles.fitDescription}>Extra width for broader feet</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </View>
      </TouchableOpacity>

      <SizeModal 
        visible={showNormalModal}
        onClose={() => setShowNormalModal(false)}
        fitType="normal"
      />
      
      <SizeModal 
        visible={showWideModal}
        onClose={() => setShowWideModal(false)}
        fitType="wide"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  fitButton: {
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  fitContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fitTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  fitDescription: {
    color: '#666',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalDescription: {
    color: '#666',
    marginBottom: 20,
  },
  systemButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  systemButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedSystem: {
    backgroundColor: '#000',
  },
  systemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  sizeList: {
    flex: 1,
  },
  sizeButton: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    borderRadius: 12,
  },
  selectedSize: {
    backgroundColor: '#000',
  },
  sizeText: {
    fontSize: 18,
    fontWeight: '500',
  },
  selectedSizeText: {
    color: '#fff',
  },
  conversionContainer: {
    marginTop: 10,
  },
  conversionText: {
    color: '#fff',
    marginTop: 5,
  },
});

export default SizeGuide;