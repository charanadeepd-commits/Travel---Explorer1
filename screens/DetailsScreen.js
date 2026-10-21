import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../context/WishlistContext';

export default function DetailsScreen({ route, navigation }) {
  const { destination } = route.params;
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(destination.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.image }} style={styles.bannerImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleWishlist(destination)}>
            <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={22} color={isSaved ? '#ff3b30' : '#000'} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.metaHeader}>
            <View>
              <Text style={styles.title}>{destination.name}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={15} color="#007AFF" />
                <Text style={styles.locationText}>{destination.location}</Text>
              </View>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{destination.category}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="calendar-outline" size={24} color="#007AFF" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Best Time to Visit</Text>
              <Text style={styles.infoSubtitle}>{destination.bestTimeToVisit}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.description}>{destination.description}</Text>

          <Text style={styles.sectionTitle}>Popular Attractions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.attractionsScroll}>
            {destination.attractions.map((attraction, index) => (
              <View key={index} style={styles.attractionCard}>
                <Image source={{ uri: attraction.image }} style={styles.attractionImage} />
                <Text style={styles.attractionName}>{attraction.name}</Text>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[styles.actionButton, isSaved && styles.actionButtonActive]}
            onPress={() => toggleWishlist(destination)}
          >
            <Ionicons name={isSaved ? 'trash-outline' : 'heart'} size={20} color="#fff" />
            <Text style={styles.actionButtonText}>
              {isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { position: 'relative' },
  bannerImage: { width: '100%', height: 280 },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 4,
  },
  content: { padding: 20 },
  metaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 26, fontWeight: '700', color: '#1c1c1e' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { fontSize: 14, color: '#6c757d', marginLeft: 4 },
  categoryBadge: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  categoryBadgeText: { color: '#007AFF', fontWeight: '600', fontSize: 12 },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    padding: 14,
    marginVertical: 18,
  },
  infoTextContainer: { marginLeft: 12 },
  infoTitle: { fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: '600' },
  infoSubtitle: { fontSize: 15, fontWeight: '600', color: '#1e293b', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1c1c1e', marginBottom: 8, marginTop: 10 },
  description: { fontSize: 15, lineHeight: 22, color: '#475569', marginBottom: 14 },
  attractionsScroll: { marginBottom: 24, marginTop: 4 },
  attractionCard: { marginRight: 14, width: 140 },
  attractionImage: { width: 140, height: 100, borderRadius: 12 },
  attractionName: { fontSize: 13, fontWeight: '600', color: '#334155', marginTop: 6 },
  actionButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  actionButtonActive: { backgroundColor: '#ff3b30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});