
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, DESTINATIONS } from '../data/destinations';
import { useWishlist } from '../context/WishlistContext';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toggleWishlist, isInWishlist } = useWishlist();

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featured = filteredDestinations[0];
  const remaining = filteredDestinations.slice(1);

  const renderDestination = (item, compact = false) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.card,
        compact ? styles.smallCard : styles.featuredCard,
      ]}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('Details', { destination: item })
      }
    >
      <Image
        source={
          item.image
            ? { uri: item.image }
            : require('../assets/icon.png')
        }
        style={styles.cardImage}
        resizeMode="cover"
      />

      <View style={styles.imageShade} />

      <View style={styles.cardTopRow}>
        <View style={styles.countryBadge}>
          <Text style={styles.countryText}>
            {item.location.toUpperCase()}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleWishlist(item)}
        >
          <Ionicons
            name={
              isInWishlist(item.id)
                ? 'heart'
                : 'heart-outline'
            }
            size={20}
            color={
              isInWishlist(item.id)
                ? '#FF6670'
                : '#FFFFFF'
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBottom}>
        <Text style={styles.cardCategory}>
          {item.category}
        </Text>

        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.cardFooter}>
          <Ionicons
            name="location-outline"
            size={13}
            color="#FFFFFF"
          />

          <Text style={styles.cardLocation} numberOfLines={1}>
            {item.location}
          </Text>

          <View style={styles.arrowCircle}>
            <Ionicons
              name="arrow-forward"
              size={17}
              color="#20321D"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#EAF3E9"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.page}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>
              Hello, Explorer 👋
            </Text>
            <Text style={styles.smallGreeting}>
              YOUR NEXT ADVENTURE AWAITS
            </Text>
          </View>

          <View style={styles.weatherCircle}>
            <Ionicons
              name="partly-sunny-outline"
              size={25}
              color="#526B43"
            />
          </View>
        </View>

        <View style={styles.headingBlock}>
          <Text style={styles.eyebrow}>
            DISCOVER THE OUTDOORS
          </Text>
          <Text style={styles.heading}>The Nature</Text>
          <Text style={styles.heading}>Out of Power</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={21}
            color="#263B2B"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations, places..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#89958A"
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color="#718075"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Explore places
          </Text>
          <Text style={styles.resultCount}>
            {filteredDestinations.length} places
          </Text>
        </View>

        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
          renderItem={({ item }) => {
            const selected = selectedCategory === item;

            return (
              <TouchableOpacity
                style={[
                  styles.chip,
                  selected && styles.selectedChip,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selected && styles.selectedChipText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {filteredDestinations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="leaf-outline"
              size={42}
              color="#718075"
            />
            <Text style={styles.emptyTitle}>
              No places found
            </Text>
            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>
          </View>
        ) : (
          <>
            {featured && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    Featured escape
                  </Text>
                  <Ionicons
                    name="sparkles-outline"
                    size={20}
                    color="#526B43"
                  />
                </View>

                {renderDestination(featured)}
              </>
            )}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Find your next escape
              </Text>
            </View>

            <View style={styles.grid}>
              {remaining.map((item) =>
                renderDestination(item, true)
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF3E9',
  },
  page: {
    paddingTop: 12,
    paddingBottom: 30,
  },
  topBar: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    color: '#1B2B20',
    fontSize: 20,
    fontWeight: '800',
  },
  smallGreeting: {
    color: '#7B8B7C',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginTop: 5,
  },
  weatherCircle: {
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingBlock: {
    paddingHorizontal: 22,
    paddingTop: 27,
    paddingBottom: 16,
  },
  eyebrow: {
    fontSize: 10,
    color: '#6F8567',
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 9,
  },
  heading: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '900',
    color: '#15251A',
    letterSpacing: -0.8,
  },
  searchContainer: {
    marginHorizontal: 22,
    height: 53,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E0E9DE',
  },
  searchInput: {
    flex: 1,
    color: '#203629',
    fontSize: 14,
  },
  sectionHeader: {
    paddingHorizontal: 22,
    marginTop: 25,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1B2B20',
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  resultCount: {
    color: '#7B8B7C',
    fontSize: 12,
  },
  categories: {
    paddingHorizontal: 22,
    paddingBottom: 3,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DDE7DA',
  },
  selectedChip: {
    backgroundColor: '#C8E83E',
    borderColor: '#C8E83E',
  },
  chipText: {
    color: '#536458',
    fontSize: 12,
    fontWeight: '700',
  },
  selectedChipText: {
    color: '#20321D',
    fontWeight: '900',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#D5E2D2',
  },
  featuredCard: {
    marginHorizontal: 22,
    height: 225,
  },
  smallCard: {
    flex: 1,
    height: 205,
    marginBottom: 12,
  },
  cardImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 22, 13, 0.35)',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
  },
  countryBadge: {
    backgroundColor: 'rgba(16, 31, 20, 0.55)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 9,
    maxWidth: '78%',
  },
  countryText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(18, 34, 23, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottom: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 14,
  },
  cardCategory: {
    color: '#E5F1DC',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '800',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cardLocation: {
    color: '#FFFFFF',
    fontSize: 11,
    marginLeft: 4,
    flex: 1,
  },
  arrowCircle: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: '#C8E83E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 35,
    marginHorizontal: 22,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  emptyTitle: {
    color: '#1B2B20',
    fontWeight: '800',
    fontSize: 17,
    marginTop: 12,
  },
  emptyText: {
    color: '#718075',
    marginTop: 6,
    fontSize: 13,
  },
});
