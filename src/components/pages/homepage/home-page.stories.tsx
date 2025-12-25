import {StoryObj} from "@storybook/nextjs";
import React from "react";
import HomePage from "./home-page";
import {getRandomReview} from "@/dataGenerator/review";
import {ReviewConverter} from "@/src/converters/review/review-converter";

export default {
    component: HomePage,
    args: {}
};

export const HomePageStory: StoryObj = {
    render: (args) => <HomePage
        {...args}
        reviews={[ReviewConverter.toJson(getRandomReview())]}
    />,
    args: {}
};