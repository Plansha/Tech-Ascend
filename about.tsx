import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Linking,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function AboutScreen({ navigation }) {
  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Go back pressed');
    }
  };

  const features = [
    {
      icon: 'location-outline',
      title: 'Location-Based Data',
      desc: 'Data tailored to your region',
    },
    {
      icon: 'cloud-outline',
      title: 'Live Weather Data',
      desc: 'Real-time weather and forecasts',
    },
    {
      icon: 'leaf-outline',
      title: 'Crop Recommendations',
      desc: 'Based on weather and soil conditions',
    },
    {
      icon: 'document-text-outline',
      title: 'Government Schemes',
      desc: 'Eligibility and benefits info',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Pressable onPress={handleBackPress} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>About</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#1B5E20', '#2E7D32']}
          style={styles.heroBanner}
        >
          <View style={styles.heroLogo}>
            <View style={styles.heroLogoInner}>
              <Icon name="leaf" size={36} color="#fff" />
            </View>
          </View>
          <Text style={styles.heroTitle}>FarmGPT</Text>
          <Text style={styles.heroTagline}>Empowering Farmers with AI</Text>
        </LinearGradient>

        <View style={styles.descCard}>
          <Text style={styles.descText}>
            FarmGPT is your personal agriculture assistant providing location-based 
            weather forecasts, crop recommendations, and government scheme information 
            to help farmers make informed decisions.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Key Features</Text>

        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIconWrap}>
              <Icon name={feature.icon} size={22} color="#4CAF50" />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          </View>
        ))}

        <View style={styles.helplineCard}>
          <Icon name="call" size={24} color="#4CAF50" />
          <View style={styles.helplineTextWrap}>
            <Text style={styles.helplineTitle}>Farmer Helpline</Text>
            <Pressable onPress={() => Linking.openURL('tel:18001801551')}>
              <Text style={styles.helplineNumber}>1800-180-1551</Text>
            </Pressable>
            <Text style={styles.helplineDesc}>Official Government Support</Text>
          </View>
        </View>

        <Text style={styles.versionText}>Version 1.0.0</Text>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    color: '#000',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  heroBanner: {
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  heroLogo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  heroLogoInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
  },
  heroTagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  descCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  descText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
    marginBottom: 12,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  featureIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  featureDesc: {
    fontSize: 12,
    color: '#666',
  },
  helplineCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 18,
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  helplineTextWrap: {
    flex: 1,
  },
  helplineTitle: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  helplineNumber: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: '700',
  },
  helplineDesc: {
    fontSize: 11,
    color: '#666',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
});
