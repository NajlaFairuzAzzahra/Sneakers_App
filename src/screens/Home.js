import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import { getSneakers } from '../service/SneakersService';
import { Ionicons } from '@expo/vector-icons';
import HomeModal from '../components/HomeModal';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;
const ITEMS_PER_PAGE = 10;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
 
  const renderPageNumbers = () => {
    return pages.map(pageNum => (
      <TouchableOpacity
        key={pageNum}
        style={[
          styles.pageButton,
          currentPage === pageNum && styles.activePageButton
        ]}
        onPress={() => onPageChange(pageNum)}
      >
        <Text
          style={[
            styles.pageButtonText,
            currentPage === pageNum && styles.activePageButtonText
          ]}
        >
          {pageNum}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.paginationContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.paginationContent}
      >
        {renderPageNumbers()}
      </ScrollView>
    </View>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedSneaker, setSelectedSneaker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (sneakerId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(sneakerId)) {
        newFavorites.delete(sneakerId);
      } else {
        newFavorites.add(sneakerId);
      }
      return newFavorites;
    });
  };

  const fetchSneakers = async (pageNum = 1, isRefreshing = false) => {
    try {
      setLoading(true);
      const data = await getSneakers(pageNum);
      
      setSneakers(data.sneakers);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setHasMore(pageNum < data.totalPages);
      setError(null);
      
    } catch (err) {
      setError('Failed to fetch sneakers');
      setHasMore(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSneakers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await fetchSneakers(1, true);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.card} 
      key={index}
      onPress={() => {
        setSelectedSneaker(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.grid_picture_url || 'https://via.placeholder.com/150' }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={[
            styles.favoriteButton,
            favorites.has(item.id) && styles.favoriteButtonActive
          ]}
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
        >
          <Ionicons 
            name={favorites.has(item.id) ? "heart" : "heart-outline"} 
            size={20} 
            color={favorites.has(item.id) ? "#FF385C" : "#FF385C"} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{item.brand_name || 'Unknown Brand'}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {item.name || 'Product Name'}
        </Text>
        <View style={styles.details}>
          <View style={styles.colorChip}>
            <Text style={styles.colorText}>{item.color || 'N/A'}</Text>
          </View>
          <Text style={styles.price}>
            ${((item.retail_price_cents || 0) / 100).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (loading && page > 1) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#FF385C" />
        </View>
      );
    }

    return (
      <View style={styles.footerContainer}>
        <Pagination 
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(pageNum) => {
            setPage(pageNum);
            setSneakers([]);
            fetchSneakers(pageNum);
          }}
        />
        {!hasMore && sneakers.length > 0 && (
          <Text style={styles.footerText}>
            Showing {sneakers.length} of {totalItems} items
          </Text>
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.header}>Discover Your</Text>
        <Text style={styles.headerBold}>Dream Sneakers</Text>
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="filter-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  if (loading && page === 1) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF385C" />
      </View>
    );
  }

  if (error && sneakers.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.safeArea}>
        {renderHeader()}
        <FlatList
          data={sneakers}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item.id || index).toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={['#FF385C']}
              tintColor="#FF385C"
            />
          }
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
        <HomeModal
          visible={modalVisible}
          sneaker={selectedSneaker}
          onClose={() => {
            setModalVisible(false);
            setSelectedSneaker(null);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 50,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  header: {
    fontSize: 24,
    color: '#000',
    fontWeight: '400',
  },
  headerBold: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: ITEM_WIDTH,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteButtonActive: {
    backgroundColor: '#fff',
    transform: [{ scale: 1.1 }],
  },
  infoContainer: {
    padding: 12,
  },
  brand: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorChip: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  colorText: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF385C',
  },
  errorText: {
    fontSize: 16,
    color: '#FF385C',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#FF385C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  paginationContainer: {
    marginVertical: 10,
  },
  paginationContent: {
    paddingHorizontal: 20,
  },
  pageButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activePageButton: {
    backgroundColor: '#FF385C',
  },
  pageButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activePageButtonText: {
    color: '#fff',
  }
});

export default Home;