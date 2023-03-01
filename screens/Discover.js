import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from '@expo/vector-icons';
import ItemCarDontainer from "../components/ItemCarDontainer";

const Discover = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("restaurants");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
          <Text className="text-[#527283] text-[36px]">the beauty today</Text>
        </View>
        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      <View className="flex-row items-center bg-white mx-4 rouded-xl py-1 px-4 shadow-lg">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: "YOUR_API_KEY",
            language: "en",
          }}
        />
      </View>

      {/* Menu container */}
      <ScrollView>
        <View className="flex-row items-center justify-between px-8 mt-8">
          <MenuContainer
            key={"hetel"}
            title="Hotels"
            imageSrc={Hotels}
            type={type}
            setType={setType}
          />

          <MenuContainer
            key={"attractions"}
            title="Attraction"
            imageSrc={Attractions}
            type={type}
            setType={setType}
          />

          <MenuContainer
            key={"restaurants"}
            title="Restaurants"
            imageSrc={Restaurants}
            type={type}
            setType={setType}
          />
        </View>

        <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
                <Text className="text-[#2C7379] text-[28px] font-bold">Top Tips</Text>
                <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#A0C4C7] text-[20px] font-bold">Explore</Text>
                <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
                </TouchableOpacity>
            </View>

            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
                <ItemCarDontainer key={"101"} imageSrc={""} title="Something" location="Doha" />
                <ItemCarDontainer key={"102"} imageSrc={""} title="Sample" location="Quatar" />
            </View>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

export default Discover;
