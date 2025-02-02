import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SCREEN_WIDTH } from '@/themes/app.constant'
import { Colors } from '@/constants/Colors';

const ImageCarousel = () => {
    const flatListRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);
    
    const carouselData = [
        {
            id: "1",
            image: require("../../assets/images/banner/banner_1.png")
        },
        {
            id: "2",
            image: require("../../assets/images/banner/banner_2.png")
        }
    ];

    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === carouselData.length - 1) {
                flatListRef.current.scrollToIndex({
                    index: 0,
                    animated: true,
                });
                setActiveIndex(0);
            } else {
                flatListRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true,
                });
                setActiveIndex((prevIndex) => prevIndex + 1);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const getItemLayout = (_, index) => ({
        length: SCREEN_WIDTH,
        offset: SCREEN_WIDTH * index,
        index
    });

    const renderItem = ({ item }) => {
        return (
            <View style={styles.bannerContainer}>
                <Image source={item.image} style={styles.bannerImage} />
                <View style={styles.dotContainer}>{renderDotIndicators()}</View>
            </View>
        );
    };

    const renderDotIndicators = () => {
        return carouselData.map((_, index) => (
            <View key={index} style={activeIndex === index ? styles.activeDot : styles.dot} />
        ));
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / SCREEN_WIDTH);
        setActiveIndex(index);
    };

    return (
        <View style={{ paddingVertical: 10 }}>
            <FlatList
                ref={flatListRef}
                keyExtractor={(item) => item.id}
                data={carouselData}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                getItemLayout={getItemLayout}
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        width: SCREEN_WIDTH,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    dotContainer: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    dot: {
        backgroundColor: "#666",
        height: 7,
        width: 7,
        borderRadius: 5,
        marginHorizontal: 3,
    },
    activeDot: {
        backgroundColor: Colors.primary,
        height: 7,
        width: 7,
        borderRadius: 5,
        marginHorizontal: 3,
    },
});

export default ImageCarousel;
