import {words} from "./texts_db";

export function getRandomText(countOfWords: number): string {
    const text = [];

    for (let i = 0; i < countOfWords; i++) {
        text.push(words[Math.floor(Math.random() * words.length)]);
    }
    return text.join(" ");
}