import { Page } from "@playwright/test";

export class RandomGenerator{
     random5Digit = Math.floor(10000 + Math.random() * 90000);
}
