// promises and async/await practice

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
