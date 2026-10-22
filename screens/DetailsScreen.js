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
  container: { flex: 1, backgroundColor: '#EAF2E8' },
  imageContainer: { position: 'relative', backgroundColor: '#D5E2D2' },
  bannerImage: { width: '100%', height: 390, backgroundColor: '#D5E2D2' },
  backButton: {
    position: 'absolute', top: 18, left: 20,
    backgroundColor: 'rgba(28,43,32,0.78)',
    borderRadius: 24, padding: 11,
  },
  favoriteButton: {
    position: 'absolute', top: 18, right: 20,
    backgroundColor: '#FFFFFF', borderRadius: 25, padding: 11,
  },
  content: {
    backgroundColor: '#EAF2E8', marginTop: -28,
    paddingHorizontal: 22, paddingTop: 27, paddingBottom: 36,
    borderTopLeftRadius: 30, borderTopRightRadius: 30,
  },
  metaHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', gap: 12,
  },
  title: { fontSize: 29, fontWeight: '800', color: '#1B2B20', flexShrink: 1 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  locationText: { fontSize: 14, color: '#718075', marginLeft: 4, flexShrink: 1 },
  categoryBadge: { backgroundColor: '#DCE9D3', paddingHorizontal: 11, paddingVertical: 7, borderRadius: 10 },
  categoryBadgeText: { color: '#45623C', fontWeight: '700', fontSize: 11 },
  infoCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#DCE9DD', borderRadius: 18,
    padding: 16, marginVertical: 22,
  },
  infoTextContainer: { marginLeft: 13, flex: 1 },
  infoTitle: { fontSize: 11, color: '#718075', textTransform: 'uppercase', fontWeight: '800', letterSpacing: 0.7 },
  infoSubtitle: { fontSize: 15, fontWeight: '700', color: '#263B2B', marginTop: 5 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1B2B20', marginBottom: 9, marginTop: 12 },
  description: { fontSize: 15, lineHeight: 24, color: '#657568', marginBottom: 15 },
  attractionsScroll: { marginBottom: 24, marginTop: 6 },
  attractionCard: {
    marginRight: 14, width: 150, backgroundColor: '#FFFFFF',
    padding: 7, borderRadius: 17, borderWidth: 1, borderColor: '#DCE7DB',
  },
  attractionImage: { width: '100%', height: 105, borderRadius: 12, backgroundColor: '#D5E2D2' },
  attractionName: { fontSize: 13, fontWeight: '700', color: '#263B2B', marginTop: 9, marginBottom: 5, marginHorizontal: 3 },
  actionButton: {
    backgroundColor: '#C8E83E', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    paddingVertical: 16, borderRadius: 17, gap: 9,
  },
  actionButtonActive: { backgroundColor: '#405B43' },
  actionButtonText: { color: '#20321D', fontSize: 15, fontWeight: '800' },
});