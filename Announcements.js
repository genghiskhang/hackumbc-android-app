import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';


const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch announcements from your server
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('YOUR_SERVER_URL/api/announcements');
      const data = response.data;
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.content}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={announcements}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Announcements;
