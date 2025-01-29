import { IsIPAD } from "@/themes/app.constant";
import { Dimensions, Image } from 'react-native';
import { scale, verticalScale } from "react-native-size-matters"


export const onBoardingSlides = [{
    id: 1,
    color: "#fff",
    image: require("../assets/images/onboarding/onboard_1.png"),
    title: "Fast and Reliable Delivery, Every Time!",
    desc: "Get your packages delivered on time with our trusted network of couriers.",
},
    {
    id: 2,
    color: "#fff",
    image: require("../assets/images/onboarding/onboard_2.png"),
    title: "Track Your Orders in Real-Time",
    desc: "Know exactly where your delivery is with live location updates.",
    },
    {
    id: 3,
    color: "#fff",
    image: require("../assets/images/onboarding/onboard_3.png"),
    title: "Secure Payments at Your Fingertips",
    desc: "Pay conveniently and securely with multiple payment options like cards, wallets, and more.",
    }]

export const MIN_LEDGE = 25;
export const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
export const MARGIN_WIDTH = MIN_LEDGE + 50;
export const PREV = WIDTH;
export const NEXT = 0;
export const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
export const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];