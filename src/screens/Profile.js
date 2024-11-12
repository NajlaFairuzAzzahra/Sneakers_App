import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
  const appInfo = {
    version: '1.0.0',
    developer: 'Sneakers Store',
    website: 'sneakersstore.com',
    email: 'hello@sneakersstore.com',
    developerLink: 'https://github.com/yourusername',
    websiteLink: 'https://sneakersstore.com',
  };

  const menuItems = [
    {
      id: 1,
      icon: 'information-circle-outline',
      title: 'App Version',
      subtitle: appInfo.version,
      clickable: false
    },
    {
      id: 2, 
      icon: 'code-outline',
      title: 'Developer',
      subtitle: appInfo.developer,
      clickable: true,
      onPress: () => Linking.openURL(appInfo.developerLink)
    },
    {
      id: 3,
      icon: 'globe-outline',
      title: 'Website',
      subtitle: appInfo.website,
      clickable: true,
      onPress: () => Linking.openURL(appInfo.websiteLink)
    },
    {
      id: 4,
      icon: 'mail-outline',
      title: 'Contact Support',
      subtitle: appInfo.email,
      clickable: false
    },
    {
      id: 5,
      icon: 'star-outline',
      title: 'Rate App',
      subtitle: 'Rate us on Play Store',
      clickable: false
    },
    {
      id: 6,
      icon: 'share-social-outline',
      title: 'Share App',
      subtitle: 'Share with friends',
      clickable: false
    },
    {
      id: 7,
      icon: 'document-text-outline',
      title: 'Terms & Conditions',
      subtitle: 'Read our terms',
      clickable: false
    },
    {
      id: 8,
      icon: 'shield-checkmark-outline',
      title: 'Privacy Policy',
      subtitle: 'Read our privacy policy',
      clickable: false
    },
  ];

  const handleMenuPress = (item) => {
    if (item.clickable && item.onPress) {
      item.onPress();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Information</Text>
          </View>
          <View style={styles.headerRight} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.content}
      >
        {/* App Info Card */}
        <View style={styles.appCard}>
          <View style={styles.logoContainer}>
            <Image 
              source={{uri: 'https://ui-avatars.com/api/?name=Sneakers+Store&background=random&size=200'}}
              style={styles.appLogo}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.appName}>Najla Fairuz A</Text>
          <Text style={styles.appDescription}>
            Find and buy original branded sneakers with the best prices and get exclusive benefits
          </Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item)}
              activeOpacity={item.clickable ? 0.7 : 1}
            >
              <View style={styles.menuIcon}>
                <Ionicons 
                  name={item.icon} 
                  size={24} 
                  color="#666"
                />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              {item.clickable && (
                <Ionicons name="chevron-forward" size={24} color="#ccc" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ by {appInfo.developer}
          </Text>
          <Text style={styles.copyright}>
            © 2024 All rights reserved
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContent: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.5,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  appCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 15,
  },
  appLogo: {
    width: '100%',
    height: '100%',
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
  },
});

export default Profile;