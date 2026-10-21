import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistScreen({ navigation }) {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Wishlist</Text>
        <Text style={styles.subtitle}>{wishlist.length} saved places</Text>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={54} color="#ccc" />
            <Text style={styles.emptyText}>No destinations saved yet.</Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('HomeTab')}
            >
              <Text style={styles.exploreBtnText}>Explore Destinations</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Details', { destination: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardDetails}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={13} color="#007AFF" />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => toggleWishlist(item)}
            >
              <Ionicons name="trash-outline" size={20} color="#ff3b30" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 },
  title: { fontSize: 28, fontWeight: '700', color: '#1c1c1e' },
  subtitle: { fontSize: 14, color: '#6c757d', marginTop: 2 },
  listContent: { padding: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: 75, height: 75, borderRadius: 10 },
  cardDetails: { flex: 1, marginLeft: 14 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: '#212529' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  locationText: { fontSize: 12, color: '#6c757d', marginLeft: 3 },
  category: { fontSize: 11, color: '#007AFF', fontWeight: '600', marginTop: 4 },
  removeBtn: { padding: 8 },
  emptyContainer: { alignItems: 'center', marginTop: 80 },
  emptyText: { marginTop: 12, fontSize: 16, color: '#888' },
  exploreBtn: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  exploreBtnText: { color: '#fff', fontWeight: '600' },
});
