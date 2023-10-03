import aurelia from "../assets/images/aurelia.svg";
import angular from "../assets/images/angular.svg";
import ember from "../assets/images/ember.svg";
import vue from "../assets/images/vue.svg";
import backbone from "../assets/images/backbone.svg";
import react from "../assets/images/react.svg";
import threads from "../assets/images/thread.svg";
import nextjs from '../assets/images/next-js.svg'
import playstore from '../assets/images/google-play.svg'
import facebook from "../assets/images/facebook.svg";
import instagram from "../assets/images/instagram.svg";
import twitter from '../assets/images/twitter.svg'
import apple from '../assets/images/apple.png'


const cardsEasy = [
    { id: 1, name: "aurelia", image: aurelia },
    { id: 2, name: "aurelia", image: aurelia },
    { id: 3, name: "angular", image: angular },
    { id: 4, name: "angular", image: angular },
    { id: 5, name: "ember", image: ember },
    { id: 6, name: "ember", image: ember },
    { id: 7, name: "vue", image: vue },
    { id: 8, name: "vue", image: vue },
    { id: 9, name: "backbone", image: backbone },
    { id: 10, name: "backbone", image: backbone },
    { id: 11, name: "react", image: react },
    { id: 12, name: "react", image: react },
    { id: 13, name: "thread", image: threads },
    { id: 14, name: "thread", image: threads },
    { id: 15, name: "nextjs", image: nextjs },
    { id: 16, name: "nextjs", image: nextjs },
];

const cardsMedium = [
    { id: 1, name: "aurelia", image: aurelia },
    { id: 2, name: "aurelia", image: aurelia },
    { id: 3, name: "angular", image: angular },
    { id: 4, name: "angular", image: angular },
    { id: 5, name: "ember", image: ember },
    { id: 6, name: "ember", image: ember },
    { id: 7, name: "vue", image: vue },
    { id: 8, name: "vue", image: vue },
    { id: 9, name: "backbone", image: backbone },
    { id: 10, name: "backbone", image: backbone },
    { id: 11, name: "react", image: react },
    { id: 12, name: "react", image: react },
    { id: 13, name: "thread", image: threads },
    { id: 14, name: "thread", image: threads },
    { id: 15, name: "nextjs", image: nextjs },
    { id: 16, name: "nextjs", image: nextjs },
    { id: 17, name: "playstore", image: playstore },
    { id: 18, name: "playstore", image: playstore },
    { id: 19, name: "facebook", image: facebook },
    { id: 20, name: "facebook", image: facebook },
    { id: 21, name: "instagram", image: instagram },
    { id: 22, name: "instagram", image: instagram },
    { id: 23, name: "twitter", image: twitter },
    { id: 24, name: "twitter", image: twitter },
];


export const levelGame = (level) => {
    let cardsData;
    if (level === "Easy") {
        cardsData = cardsEasy
    } else if (level === "Medium") {
        cardsData = cardsMedium
    } else if (level === "difficult") {
        cardsData = cardsMedium
    } 

    return cardsData?.map((card) => ({
        ...card,
        order: Math.floor(Math.random() * 12),
        isFlipped: false,
    }));
}